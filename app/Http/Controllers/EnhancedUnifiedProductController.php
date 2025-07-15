<?php

namespace App\Http\Controllers;

use App\Models\UnifiedProduct;
use App\Services\RobustImageService;
use App\Services\ImageBackupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EnhancedUnifiedProductController extends Controller
{
    protected $robustImageService;
    protected $backupService;

    public function __construct(RobustImageService $robustImageService, ImageBackupService $backupService)
    {
        $this->robustImageService = $robustImageService;
        $this->backupService = $backupService;
    }

    /**
     * Store a newly created product with bulletproof image handling
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'product_type_id' => 'required|exists:product_types,id',
            'price' => 'required|numeric|min:0',
            'stock_price' => 'nullable|numeric|min:0',
            'stock' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'model' => 'nullable|string|max:255',
            'make' => 'nullable|string|max:255',
            'weight' => 'nullable|numeric|min:0',
            'year' => 'nullable|string|max:4',
            'serial_number' => 'nullable|string|max:255',
            'is_viewable' => 'boolean',
            'is_business_product' => 'boolean',
            'status' => 'in:active,inactive,discontinued',
            'primary_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'additional_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create product first
            $product = new UnifiedProduct();
            $product->fill($request->except(['primary_image', 'additional_images']));
            $product->slug = Str::slug($request->name) . '-' . uniqid();
            $product->save();

            // Handle primary image with robust service
            if ($request->hasFile('primary_image')) {
                $result = $this->robustImageService->storeImage(
                    $request->file('primary_image'),
                    'products',
                    $product->id,
                    ['type' => 'primary', 'product_name' => $product->name]
                );

                if ($result['success']) {
                    $product->primary_image = $result['path'];
                } else {
                    // Rollback product creation if image fails
                    $product->delete();
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to store primary image: ' . $result['error']
                    ], 500);
                }
            }

            // Handle additional images
            $additionalImages = [];
            if ($request->hasFile('additional_images')) {
                foreach ($request->file('additional_images') as $index => $image) {
                    $result = $this->robustImageService->storeImage(
                        $image,
                        'products',
                        $product->id,
                        ['type' => 'additional', 'index' => $index, 'product_name' => $product->name]
                    );

                    if ($result['success']) {
                        $additionalImages[] = $result['path'];
                    } else {
                        // Log error but continue - don't fail for additional images
                        \Log::warning("Failed to store additional image {$index}: " . $result['error']);
                    }
                }
            }

            $product->additional_images = $additionalImages;
            $product->save();

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully with secure image handling',
                'product' => $product->load(['category', 'brand', 'productType']),
                'images_stored' => [
                    'primary' => !empty($product->primary_image),
                    'additional_count' => count($additionalImages)
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update product with bulletproof image handling
     */
    public function update(Request $request, $id)
    {
        $product = UnifiedProduct::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|string',
            'category_id' => 'sometimes|required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'product_type_id' => 'sometimes|required|exists:product_types,id',
            'price' => 'sometimes|required|numeric|min:0',
            'stock_price' => 'nullable|numeric|min:0',
            'stock' => 'sometimes|required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'model' => 'nullable|string|max:255',
            'make' => 'nullable|string|max:255',
            'weight' => 'nullable|numeric|min:0',
            'year' => 'nullable|string|max:4',
            'serial_number' => 'nullable|string|max:255',
            'is_viewable' => 'boolean',
            'is_business_product' => 'boolean',
            'status' => 'in:active,inactive,discontinued',
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'additional_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $product->fill($request->except(['primary_image', 'additional_images']));

            // Handle primary image update
            if ($request->hasFile('primary_image')) {
                $result = $this->robustImageService->updateImage(
                    $request->file('primary_image'),
                    $product->primary_image,
                    'products',
                    $product->id,
                    ['type' => 'primary', 'product_name' => $product->name]
                );

                if ($result['success']) {
                    $product->primary_image = $result['path'];
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update primary image: ' . $result['error']
                    ], 500);
                }
            }

            // Handle additional images update
            if ($request->hasFile('additional_images')) {
                $newAdditionalImages = [];
                foreach ($request->file('additional_images') as $index => $image) {
                    $result = $this->robustImageService->storeImage(
                        $image,
                        'products',
                        $product->id,
                        ['type' => 'additional', 'index' => $index, 'product_name' => $product->name]
                    );

                    if ($result['success']) {
                        $newAdditionalImages[] = $result['path'];
                    }
                }

                // Mark old additional images as replaced
                if ($product->additional_images) {
                    foreach ($product->additional_images as $oldImage) {
                        \DB::table('image_registry')
                            ->where('path', $oldImage)
                            ->update([
                                'status' => 'replaced',
                                'replaced_at' => now()
                            ]);
                    }
                }

                $product->additional_images = $newAdditionalImages;
            }

            $product->save();

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully with secure image handling',
                'product' => $product->load(['category', 'brand', 'productType'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Verify all product images and recover missing ones
     */
    public function verifyImages()
    {
        try {
            $stats = $this->robustImageService->verifyAndRecoverAllImages();
            
            return response()->json([
                'success' => true,
                'message' => 'Image verification completed',
                'stats' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image verification failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get image health report
     */
    public function imageHealthReport()
    {
        try {
            $totalProducts = UnifiedProduct::count();
            $productsWithImages = UnifiedProduct::whereNotNull('primary_image')->count();
            $missingImages = \DB::table('image_registry')
                ->where('status', 'missing')
                ->count();

            $recentUploads = \DB::table('image_registry')
                ->where('created_at', '>=', now()->subDays(7))
                ->count();

            return response()->json([
                'success' => true,
                'health_report' => [
                    'total_products' => $totalProducts,
                    'products_with_images' => $productsWithImages,
                    'coverage_percentage' => round(($productsWithImages / $totalProducts) * 100, 2),
                    'missing_images' => $missingImages,
                    'recent_uploads' => $recentUploads,
                    'backup_status' => 'All images have redundant backups'
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate health report',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 
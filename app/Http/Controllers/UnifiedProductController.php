<?php

namespace App\Http\Controllers;

use App\Models\UnifiedProduct;
use App\Models\Category;
use App\Models\Brand;
use App\Models\ProductType;
use App\Services\ImageBackupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UnifiedProductController extends Controller
{
    protected $backupService;

    public function __construct(ImageBackupService $backupService)
    {
        $this->backupService = $backupService;
    }

    /**
     * Display a listing of products
     */
    public function index(Request $request)
    {
        $query = UnifiedProduct::with(['category', 'brand', 'productType']);

        // Filter by product type
        if ($request->has('product_type_id')) {
            $query->byType($request->product_type_id);
        }

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by brand
        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by visibility
        if ($request->has('is_viewable')) {
            $query->where('is_viewable', $request->is_viewable);
        }

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Stock filter
        if ($request->has('in_stock')) {
            $query->inStock();
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate($request->get('per_page', 16));

        return response()->json([
            'success' => true,
            'products' => $products,
            'filters' => [
                'product_types' => ProductType::all(),
                'categories' => Category::all(),
                'brands' => Brand::all(),
            ]
        ]);
    }

    /**
     * Store a newly created product
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
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'additional_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
            $product = new UnifiedProduct();
            $product->fill($request->except(['primary_image', 'additional_images']));
            $product->slug = Str::slug($request->name) . '-' . uniqid();
            $product->save();

            // Handle primary image
            if ($request->hasFile('primary_image')) {
                $primaryImagePath = $request->file('primary_image')->store('public/images/products/' . $product->id);
                $product->primary_image = $primaryImagePath;
                
                // Create backup immediately
                $this->backupService->backupImage($primaryImagePath, $product, true);
            }

            // Handle additional images
            if ($request->hasFile('additional_images')) {
                $additionalImages = [];
                foreach ($request->file('additional_images') as $index => $image) {
                    $imagePath = $image->store('public/images/products/' . $product->id);
                    $additionalImages[] = $imagePath;
                    
                    // Create backup immediately
                    $this->backupService->backupImage($imagePath, $product, false, $index);
                }
                $product->additional_images = $additionalImages;
            }

            $product->save();

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'product' => $product->load(['category', 'brand', 'productType'])
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
     * Display the specified product
     */
    public function show($id)
    {
        $product = UnifiedProduct::with(['category', 'brand', 'productType', 'reviews'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'product' => $product
        ]);
    }

    /**
     * Update the specified product
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
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'additional_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
                // Delete old primary image
                if ($product->primary_image) {
                    Storage::delete($product->primary_image);
                }
                
                $primaryImagePath = $request->file('primary_image')->store('public/images/products/' . $product->id);
                $product->primary_image = $primaryImagePath;
                
                // Create backup immediately
                $this->backupService->backupImage($primaryImagePath, $product, true);
            }

            // Handle additional images update
            if ($request->hasFile('additional_images')) {
                // Delete old additional images
                if ($product->additional_images) {
                    foreach ($product->additional_images as $oldImage) {
                        Storage::delete($oldImage);
                    }
                }
                
                $additionalImages = [];
                foreach ($request->file('additional_images') as $index => $image) {
                    $imagePath = $image->store('public/images/products/' . $product->id);
                    $additionalImages[] = $imagePath;
                    
                    // Create backup immediately
                    $this->backupService->backupImage($imagePath, $product, false, $index);
                }
                $product->additional_images = $additionalImages;
            }

            $product->save();

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
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
     * Remove the specified product
     */
    public function destroy($id)
    {
        try {
            $product = UnifiedProduct::findOrFail($id);
            
            // Delete images from storage
            if ($product->primary_image) {
                Storage::delete($product->primary_image);
            }
            
            if ($product->additional_images) {
                foreach ($product->additional_images as $image) {
                    Storage::delete($image);
                }
            }
            
            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products by type
     */
    public function getByType($typeId)
    {
        $products = UnifiedProduct::with(['category', 'brand', 'productType'])
            ->byType($typeId)
            ->active()
            ->viewable()
            ->paginate(16);

        return response()->json([
            'success' => true,
            'products' => $products
        ]);
    }

    /**
     * Search products
     */
    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required'
            ], 400);
        }

        $products = UnifiedProduct::with(['category', 'brand', 'productType'])
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('features', 'like', "%{$query}%")
            ->active()
            ->viewable()
            ->paginate(16);

        return response()->json([
            'success' => true,
            'products' => $products,
            'query' => $query
        ]);
    }

    /**
     * Backup product images
     */
    public function backupImages($id)
    {
        try {
            $product = UnifiedProduct::findOrFail($id);
            $success = $this->backupService->backupProductImages($product);

            return response()->json([
                'success' => $success,
                'message' => $success ? 'Images backed up successfully' : 'Failed to backup images'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to backup images',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 
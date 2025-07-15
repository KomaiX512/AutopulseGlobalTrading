<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\RobustImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    protected $robustImageService;

    public function __construct(RobustImageService $robustImageService)
    {
        $this->robustImageService = $robustImageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function getCategory($id)
    {
        try {
            if ($id) {
                $category = Category::find($id);
                return response()->json(['success' => true, 'data' => $category], 200);
            } else {
                return response()->json(['success' => false, 'error' => 'Category Id missing'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to get category', 'error' => $e->getMessage()], 500);
        }
    }

    public function homeCategories()
    {
        try {
            $categories = Category::where('is_viewable', 1)->with('products')->with('prods_count')->get();
            return response()->json(['success' => true, 'categories' => $categories]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to get categories', 'error' => $e->getMessage()], 500);
        }
    }
   
    public function index(Request $request)
    {
        $searchTerm = $request->input('search_term', '') ?? '';
        $sortOrder = $request->input('sort_order', 'desc') ?? 'desc';
        $productTypeId = $request->input('product_type_id');

        $categories = Category::when($searchTerm, function ($query, $searchTerm) {
                return $query->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->when($productTypeId, function ($query, $productTypeId) {
                return $query->where('product_type_id', $productTypeId);
            })
            ->orderBy('created_at', $sortOrder)
            ->with(['prods_count', 'productType'])
            ->get();

        if ($categories) {
            return response()->json(['success' => true, 'categories' => $categories], 200);
        } else {
            return response()->json(['success' => false, 'categories' => []], 400);
        }
    }

    /**
     * Store a newly created resource in storage with bulletproof image handling
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'product_type_id' => 'required|exists:product_types,id',
            'is_viewable' => 'nullable|boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        // Add debug logging
        \Log::info('Category creation attempt:', [
            'request_data' => $request->except(['image']),
            'has_image' => $request->hasFile('image'),
            'image_details' => $request->hasFile('image') ? [
                'size' => $request->file('image')->getSize(),
                'mime' => $request->file('image')->getMimeType(),
                'name' => $request->file('image')->getClientOriginalName()
            ] : 'No image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

            // Create category first
                $category = new Category();
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->product_type_id = $request->input('product_type_id');
            $category->is_viewable = $request->input('is_viewable') ? 1 : 0;
            $category->slug = Str::slug($request->input('name')) . '-' . uniqid();
            $category->save();

            // Handle image with robust service
                if ($request->hasFile('image')) {
                $result = $this->robustImageService->storeImage(
                    $request->file('image'),
                    'categories',
                    $category->id,
                    ['type' => 'category', 'category_name' => $category->name]
                );

                if ($result['success']) {
                    $category->image = $result['path'];
                $category->save();
            } else {
                    // Rollback category creation if image fails
                    $category->delete();
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to store category image: ' . $result['error']
                    ], 500);
                }
            }

            return response()->json([
                'success' => true, 
                'message' => 'Category created successfully with secure image handling',
                'category' => $category
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage with bulletproof image handling
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'product_type_id' => 'required|exists:product_types,id',
            'is_viewable' => 'nullable|boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

                $category = Category::findOrFail($request->input('id'));
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->product_type_id = $request->input('product_type_id');
            $category->is_viewable = $request->input('is_viewable') ? 1 : 0;

            // Handle image update with robust service
                if ($request->hasFile('image')) {
                $result = $this->robustImageService->updateImage(
                    $request->file('image'),
                    $category->image,
                    'categories',
                    $category->id,
                    ['type' => 'category', 'category_name' => $category->name]
                );

                if ($result['success']) {
                    $category->image = $result['path'];
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update category image: ' . $result['error']
                    ], 500);
                }
                }

                $category->save();

            return response()->json([
                'success' => true, 
                'message' => 'Category updated successfully with secure image handling',
                'category' => $category
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update category', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);

            // Mark image as deleted in registry
            if ($category->image) {
                \DB::table('image_registry')
                    ->where('path', $category->image)
                    ->update([
                        'status' => 'deleted',
                        'updated_at' => now()
                    ]);
            }

                $category->delete();
            return response()->json(['success' => true, 'message' => 'Category deleted successfully.'], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}

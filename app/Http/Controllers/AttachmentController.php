<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\AttachmentImage;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AttachmentController extends Controller
{
    /**
     * Get attachment by ID
     */
    public function getAttachment($id)
    {
        try {
            if ($id) {
                $attachment = Attachment::with(['category', 'brand', 'images'])->find($id);
                return response()->json(['success' => true, 'attachment' => $attachment], 200);
            } else {
                return response()->json(['success' => false, 'error' => 'Attachment Id missing'], 400);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to get attachment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get viewable attachments for homepage
     */
    public function homeAttachments()
    {
        try {
            $attachments = Attachment::with(['category', 'brand', 'primaryImage'])
                ->where('is_viewable', 1)
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json(['success' => true, 'attachments' => $attachments]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to get attachments', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display a listing of attachments
     */
    public function index(Request $request)
    {
        try {
            $searchTerm = $request->input('search_term', '') ?? '';
            $sortOrder = $request->input('sort_order', 'desc') ?? 'desc';
            $categoryId = $request->input('category_id');
            $brandId = $request->input('brand_id');
            $type = $request->input('type');

            $query = Attachment::with(['category', 'brand', 'primaryImage']);

            if ($searchTerm) {
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', '%' . $searchTerm . '%')
                      ->orWhere('description', 'like', '%' . $searchTerm . '%');
                });
            }

            if ($categoryId) {
                $query->where('category_id', $categoryId);
            }

            if ($brandId) {
                $query->where('brand_id', $brandId);
            }

            if ($type) {
                $query->where('type', $type);
            }

            $attachments = $query->orderBy('created_at', $sortOrder)->get();

            return response()->json(['success' => true, 'attachments' => $attachments], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'attachments' => [], 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Filter attachments for frontend page
     */
    public function filterAttachments(Request $request)
    {
        $searchTerm = $request->query('search_term');
        $selectedPrice = $request->query('price');
        $selectedCategories = $request->query('categories');
        $sortOrder = $request->query('sort_order', 'desc');
        $type = $request->query('type');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 15);
        $sortField = 'created_at';
        
        $query = Attachment::with(['category', 'brand', 'primaryImage']);

        if ($searchTerm) {
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('description', 'LIKE', "%{$searchTerm}%");
            });
        }

        if ($selectedCategories) {
            $selectedCategoriesArray = explode(',', $selectedCategories);
            $query->whereIn('category_id', $selectedCategoriesArray);
        }

        // Handle price sorting
        if ($selectedPrice === 'lowToHigh') {
            $sortField = 'price';
            $sortOrder = 'asc';
        } elseif ($selectedPrice === 'highToLow') {
            $sortField = 'price';
            $sortOrder = 'desc';
        }

        if ($type) {
            $query->where('type', $type);
        }

        $query->orderBy($sortField, $sortOrder);

        $attachments = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'attachments' => $attachments->items(),
            'total' => $attachments->total(),
            'current_page' => $attachments->currentPage(),
            'last_page' => $attachments->lastPage(),
        ]);
    }

    /**
     * Get attachment categories (for filtering)
     */
    public function getAttachmentCategories()
    {
        \Log::info('AttachmentController::getAttachmentCategories called');
        try {
            // Get categories that have attachments - using a direct approach
            $categoryIds = Attachment::distinct()->pluck('category_id')->filter();
            $categories = Category::whereIn('id', $categoryIds)->get();
            
            \Log::info('Found ' . $categories->count() . ' categories');
            return response()->json($categories);
        } catch (\Exception $e) {
            \Log::error('Error in getAttachmentCategories: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to get attachment categories', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created attachment
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

            // Add debug logging
            \Log::info('Attachment creation attempt:', [
                'request_data' => $request->except(['images']),
                'has_images' => $request->hasFile('images'),
                'image_count' => $request->hasFile('images') ? count($request->file('images')) : 0
            ]);

            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'category_id' => 'required|exists:categories,id',
                'brand_id' => 'nullable|exists:brands,id',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|numeric|min:0',
                'type' => 'required|in:customer,business',
                'is_viewable' => 'nullable|boolean',
                'features' => 'nullable|string',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                \Log::error('Attachment validation failed:', $validator->errors()->toArray());
                return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
            }

            $attachment = new Attachment();
            $attachment->name = $request->input('name');
            $attachment->description = $request->input('description');
            $attachment->features = $request->input('features');
            $attachment->category_id = $request->input('category_id');
            $attachment->brand_id = $request->input('brand_id');
            $attachment->price = $request->input('price');
            $attachment->stock = $request->input('stock');
            $attachment->type = $request->input('type');
            $attachment->is_viewable = $request->input('is_viewable') ? 1 : 0;

            // Generate slug from name
            $attachment->slug = Str::slug($request->input('name')) . '-' . uniqid();

            $attachment->save();

            // Handle multiple images
            if ($request->hasFile('images') && count($request->file('images')) > 0) {
                $images = $request->file('images');
                foreach ($images as $index => $image) {
                    try {
                        $path = $image->store('public/images/attachments');
                        
                        AttachmentImage::create([
                            'attachment_id' => $attachment->id,
                            'filename' => $image->getClientOriginalName(),
                            'path' => $path,
                            'sort_order' => $index,
                            'is_primary' => $index === 0 // First image is primary
                        ]);
                    } catch (\Exception $imageError) {
                        \Log::error('Failed to save attachment image: ' . $imageError->getMessage());
                        // Continue with other images even if one fails
                    }
                }
            }

            return response()->json(['success' => true, 'message' => 'Attachment created successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to create attachment: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to create attachment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update an attachment
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

            $attachment = Attachment::findOrFail($id);

            // Add debug logging
            \Log::info('Attachment update attempt:', [
                'attachment_id' => $id,
                'request_data' => $request->all(),
                'has_images' => $request->hasFile('images'),
                'image_count' => $request->hasFile('images') ? count($request->file('images')) : 0,
                'content_type' => $request->header('Content-Type'),
                'method' => $request->method()
            ]);

            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'category_id' => 'required|exists:categories,id',
                'brand_id' => 'nullable|exists:brands,id',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|numeric|min:0',
                'type' => 'required|in:customer,business',
                'is_viewable' => 'nullable|boolean',
                'features' => 'nullable|string',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                \Log::error('Attachment update validation failed:', [
                    'errors' => $validator->errors()->toArray(),
                    'request_data' => $request->all(),
                    'attachment_id' => $id
                ]);
                return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 422);
            }

            $attachment->name = $request->input('name');
            $attachment->description = $request->input('description');
            $attachment->features = $request->input('features');
            $attachment->category_id = $request->input('category_id');
            $attachment->brand_id = $request->input('brand_id');
            $attachment->price = $request->input('price');
            $attachment->stock = $request->input('stock');
            $attachment->type = $request->input('type');
            $attachment->is_viewable = $request->input('is_viewable') ? 1 : 0;

            $attachment->save();

            // Handle multiple images - only process if new images are uploaded
            if ($request->hasFile('images') && count($request->file('images')) > 0) {
                // Delete existing images only if new images are being uploaded
                $existingImages = $attachment->images;
                foreach ($existingImages as $existingImage) {
                    try {
                        Storage::delete($existingImage->path);
                        $existingImage->delete();
                    } catch (\Exception $deleteError) {
                        \Log::error('Failed to delete existing image: ' . $deleteError->getMessage());
                        // Continue even if deletion fails
                    }
                }

                // Upload new images
                $images = $request->file('images');
                foreach ($images as $index => $image) {
                    try {
                        $path = $image->store('public/images/attachments');
                        
                        AttachmentImage::create([
                            'attachment_id' => $attachment->id,
                            'filename' => $image->getClientOriginalName(),
                            'path' => $path,
                            'sort_order' => $index,
                            'is_primary' => $index === 0 // First image is primary
                        ]);
                    } catch (\Exception $imageError) {
                        \Log::error('Failed to save attachment image: ' . $imageError->getMessage());
                        // Continue with other images even if one fails
                    }
                }
            }
            // If no new images are uploaded, keep existing images (do nothing)

            return response()->json(['success' => true, 'message' => 'Attachment updated successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to update attachment: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to update attachment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove an attachment
     */
    public function destroy($id)
    {
        try {
            $attachment = Attachment::findOrFail($id);

            if ($attachment) {
                // Delete all images
                $images = $attachment->images;
                foreach ($images as $image) {
                    Storage::delete($image->path);
                }
                
                $attachment->delete();
                return response()->json(['success' => true, 'message' => 'Attachment deleted successfully.'], 200);
            }

            return response()->json(['success' => false, 'error' => 'Attachment not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get attachment details by slug for product profile page
     */
    public function getAttachmentDetails($slug)
    {
        try {
            $attachment = Attachment::where('slug', $slug)
                ->with(['category', 'brand', 'images'])
                ->first();

            if (!$attachment) {
                return response()->json(['success' => false, 'message' => 'Attachment not found'], 404);
            }

            return response()->json([
                'success' => true,
                'attachment' => $attachment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching attachment details: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get related attachments for product profile page
     */
    public function getRelatedAttachments($slug)
    {
        try {
            $attachment = Attachment::where('slug', $slug)->first();
            
            if (!$attachment) {
                return response()->json(['success' => false, 'message' => 'Attachment not found'], 404);
            }

            $relatedAttachments = Attachment::where('category_id', $attachment->category_id)
                ->where('id', '!=', $attachment->id)
                ->with(['category', 'brand', 'primaryImage'])
                ->limit(6)
                ->get();

            return response()->json([
                'success' => true,
                'relatedAttachments' => $relatedAttachments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching related attachments: ' . $e->getMessage()
            ], 500);
        }
    }
}

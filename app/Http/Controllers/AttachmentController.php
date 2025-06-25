<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AttachmentController extends Controller
{
    /**
     * Get attachment by ID
     */
    public function getAttachment($id)
    {
        try {
            if ($id) {
                $attachment = Attachment::find($id);
                return response()->json(['success' => true, 'data' => $attachment], 200);
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
            $attachments = Attachment::where('is_viewable', 1)->orderBy('created_at', 'desc')->get();
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
        $searchTerm = $request->input('search_term', '') ?? '';
        $sortOrder = $request->input('sort_order', 'desc') ?? 'desc';

        $attachments = Attachment::when($searchTerm, function ($query, $searchTerm) {
            return $query->where('name', 'like', '%' . $searchTerm . '%');
        })->orderBy('created_at', $sortOrder)->get();

        if ($attachments) {
            return response()->json(['success' => true, 'attachments' => $attachments], 200);
        } else {
            return response()->json(['success' => false, 'attachments' => []], 400);
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
        
        $query = Attachment::query();

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

        $attachments = $query->with('category')->paginate($perPage, ['*'], 'page', $page);

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

            if ($user) {
                $attachment = new Attachment();
                $attachment->name = $request->input('name');
                $attachment->description = $request->input('description');
                $attachment->is_viewable = $request->input('is_viewable') ? 1 : 0;

                if ($request->hasFile('image')) {
                    $attachment->image = $request->file('image')->store('public/images/attachments');
                }

                $uuid = uniqid('attachment-');
                $attachment->slug = $uuid;
                $attachment->save();

                return response()->json(['success' => true, 'message' => 'Attachment created successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create attachment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update an attachment
     */
    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user) {
                $attachment = Attachment::findOrFail($request->input('id'));
                $attachment->name = $request->input('name');
                $attachment->description = $request->input('description');
                $attachment->is_viewable = $request->input('is_viewable') ? 1 : 0;

                if ($request->hasFile('image')) {
                    if ($attachment->image) {
                        Storage::delete($attachment->image);
                    }
                    $attachment->image = $request->file('image')->store('public/images/attachments');
                }

                $attachment->save();

                return response()->json(['success' => true, 'message' => 'Attachment updated successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }
        } catch (\Exception $e) {
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
                $attachment->delete();
                return response()->json(['message' => 'Attachment deleted successfully.'], 200);
            }

            return response()->json(['error' => 'Attachment not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get attachment details by slug for product profile page
     */
    public function getAttachmentDetails($slug)
    {
        try {
            $attachment = Attachment::where('slug', $slug)
                ->with(['category'])
                ->first();

            if (!$attachment) {
                return response()->json(['message' => 'Attachment not found'], 404);
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
                return response()->json(['message' => 'Attachment not found'], 404);
            }

            $relatedAttachments = Attachment::where('category_id', $attachment->category_id)
                ->where('id', '!=', $attachment->id)
                ->with(['category'])
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

<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Services\RobustImageService;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    protected $robustImageService;

    public function __construct(RobustImageService $robustImageService)
    {
        $this->robustImageService = $robustImageService;
    }

    public function index($slug = null)
    {
        try {
            $blogs = $slug ? Blog::where('slug', $slug)->get() : Blog::all();

            if ($blogs) {
                return response()->json(['success' => true, 'data' => $slug ? $blogs[0] : $blogs]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'failed to get blogs', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Log the request data for debugging
        \Log::info('Blog store request:', [
            'request_data' => $request->except(['image']),
            'has_image' => $request->hasFile('image'),
            'image_size' => $request->hasFile('image') ? $request->file('image')->getSize() : null
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($validator->fails()) {
            \Log::error('Blog store validation failed:', $validator->errors()->toArray());
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

                $blog = new Blog();
                $blog->title = $request->input('title');
            $blog->content = $request->input('content');
            $blog->author = $request->input('author') ?? $user->name;
            $blog->is_published = $request->input('is_published') ? 1 : 0;
            $blog->published_at = $blog->is_published ? now() : null;

                // Generate an SEO-friendly unique slug from the title
                $baseSlug = Str::slug($request->input('title'));
                $slug = $baseSlug;
                $counter = 1;
                while (Blog::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }
                $blog->slug = $slug;
            $blog->save();

            // Handle image with robust service
            if ($request->hasFile('image')) {
                $result = $this->robustImageService->storeImage(
                    $request->file('image'),
                    'blogs',
                    $blog->id,
                    ['type' => 'blog', 'blog_title' => $blog->title]
                );

                if ($result['success']) {
                    $blog->image = $result['path'];
                    $blog->save();
                } else {
                    // Rollback blog creation if image fails
                    $blog->delete();
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to store blog image: ' . $result['error']
                    ], 500);
                }
            } elseif ($request->has('image') && $request->input('image') === null) {
                // Handle case where image is explicitly set to null
                $blog->image = null;
                $blog->save();
            }

            return response()->json([
                'success' => true, 
                'message' => 'Blog created successfully with secure image handling',
                'blog' => $blog
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to create blog', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        // Log the request data for debugging
        \Log::info('Blog update request:', [
            'request_data' => $request->except(['image']),
            'has_image' => $request->hasFile('image'),
            'image_size' => $request->hasFile('image') ? $request->file('image')->getSize() : null
        ]);

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:blogs,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($validator->fails()) {
            \Log::error('Blog update validation failed:', $validator->errors()->toArray());
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

                $blog = Blog::findOrFail($request->input('id'));
            $blog->title = $request->input('title');
                    $blog->content = $request->input('content');
            $blog->author = $request->input('author') ?? $blog->author;
            $blog->is_published = $request->input('is_published') ? 1 : 0;
            $blog->published_at = $blog->is_published ? ($blog->published_at ?? now()) : null;

                    // Update slug if title has been changed
                    $baseSlug = Str::slug($request->input('title'));
            $slug = $baseSlug;
            $counter = 1;
                    while (Blog::where('slug', $slug)->where('id', '!=', $blog->id)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }
                    $blog->slug = $slug;

            // Handle image update with robust service
            if ($request->hasFile('image')) {
                $result = $this->robustImageService->updateImage(
                    $request->file('image'),
                    $blog->image,
                    'blogs',
                    $blog->id,
                    ['type' => 'blog', 'blog_title' => $blog->title]
                );

                if ($result['success']) {
                    $blog->image = $result['path'];
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update blog image: ' . $result['error']
                    ], 500);
                }
            } elseif ($request->has('image') && $request->input('image') === null) {
                // Handle image removal
                if ($blog->image) {
                    // Mark old image as deleted in registry
                    \DB::table('image_registry')
                        ->where('path', $blog->image)
                        ->update([
                            'status' => 'deleted',
                            'updated_at' => now()
                        ]);
                }
                $blog->image = null;
            }

                    $blog->save();

            return response()->json([
                'success' => true, 
                'message' => 'Blog updated successfully with secure image handling',
                'blog' => $blog
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to save blog', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $blog = Blog::findOrFail($id);

            // Mark image as deleted in registry
            if ($blog->image) {
                \DB::table('image_registry')
                    ->where('path', $blog->image)
                    ->update([
                        'status' => 'deleted',
                        'updated_at' => now()
                    ]);
            }

                $blog->delete();
            return response()->json(['success' => true, 'message' => 'Blog deleted successfully.'], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}

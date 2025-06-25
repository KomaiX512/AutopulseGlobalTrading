<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;

class BlogController extends Controller
{
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
        try {

            $user = Auth::user();

            if ($user) {

                $blog = new Blog();
                $blog->title = $request->input('title');
                // Generate an SEO-friendly unique slug from the title
                $baseSlug = Str::slug($request->input('title'));

                // If the slug already exists, append an incremental suffix
                $slug = $baseSlug;
                $counter = 1;
                while (Blog::where('slug', $slug)->exists()) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }

                $blog->slug = $slug;
                $blog->content = $request->input('content');

                if ($request->hasFile('image')) {
                    $blog->image = $request->file('image')->store('public/images/blogs');
                }

                $blog->save();

                return response()->json(['success' => true, 'message' => 'Category created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request,)
    {
        try {

            $user = Auth::user();

            if ($user) {

                $blog = Blog::findOrFail($request->input('id'));

                if ($blog) {

                    $blog->title   = $request->input('title');
                    $blog->content = $request->input('content');

                    // Update slug if title has been changed
                    $baseSlug = Str::slug($request->input('title'));
                    $slug      = $baseSlug;
                    $counter   = 1;
                    while (Blog::where('slug', $slug)->where('id', '!=', $blog->id)->exists()) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }
                    $blog->slug = $slug;

                    if ($request->hasFile('image')) {
                        $blog->image = $request->file('image')->store('public/images/blogs');
                    }

                    $blog->save();

                    return response()->json(['success' => true, 'message' => 'blog created successfully'], 200);
                }

                return response()->json(['success' => false, 'message' => 'blog not found'], 404);
            } else {

                return response()->json(['success' => false, 'message' => 'Unauthorized User '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to save blog', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {

            $blog = Blog::findOrFail($id);

            if ($blog) {

                $blog->delete();

                return response()->json(['message' => 'blog deleted successfully.'], 200);
            }

            return response()->json(['error' => 'blog not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}

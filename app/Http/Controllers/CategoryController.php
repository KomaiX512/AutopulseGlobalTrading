<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getCategory($id)
    {

        try {
            if ($id) {

                $category = Category::find($id);

                return response()->json(['success' => true, 'data' => $category], 200);
                
            } else {

                return response()->json(['success' => true, 'error' => 'Category Id missing'], 200);
            }
        } catch (\Exception $e) {


            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }
    public function homeCategories()
    {

        try {

            $categories = Category::where('is_viewable', 1)->with('products')->with('prods_count')->get();

            return response()->json(['success' => true, 'categories' => $categories]);
        } catch (\Exception $e) {


            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }
   
    public function index(Request $request)
    {
        $searchTerm = $request->input('search_term', '') ?? '';
        $sortOrder = $request->input('sort_order', 'desc') ?? 'desc';

        $categories = Category::when($searchTerm, function ($query, $searchTerm) {
            return $query->where('name', 'like', '%' . $searchTerm . '%');
        })->orderBy('created_at', $sortOrder)->with('prods_count')->get();

        if ($categories) {
            return response()->json(['success' => true, 'categories' => $categories], 200);
        } else {
            return response()->json(['success' => false, 'categories' => []], 400);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {

            $user = Auth::user();

            if ($user) {

                $category = new Category();
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->product_type_id = $request->input('product_type_id');
                $category->is_viewable =  $request->input('is_viewable') ? 1 : 0;

                if ($request->hasFile('image')) {
                    $category->image = $request->file('image')->store('public/images/categories');
                }

                $uuid = uniqid('category-');
                $category->slug = $uuid;
                $category->save();

                return response()->json(['success' => true, 'message' => 'Category created successfully'], 200);

            } else {

                return response()->json(['success' => false, 'message' => 'Category created '], 201);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => 'Failed to create category', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        try {

            $user = Auth::user();

            if ($user) {

                $category = Category::findOrFail($request->input('id'));
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->product_type_id = $request->input('product_type_id');
                $category->is_viewable =  $request->input('is_viewable') ? 1 : 0;

                if ($request->hasFile('image')) {

                    if ($category->image) {
                        Storage::delete($category->image);
                    }

                    $category->image = $request->file('image')->store('public/images/categories');
                }

                $category->save();

                return response()->json(['success' => true, 'message' => 'Category updated successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update category', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $category = Category::findOrFail($id);

            if ($category) {

                $category->delete();
                return response()->json(['message' => 'Category deleted successfully.'], 200);
            }

            return response()->json(['error' => 'category not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}

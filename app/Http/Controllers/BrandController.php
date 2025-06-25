<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{

    public function index(Request $request, $id = null)
    {

        if ($id) {

            $brand = Brand::find($id);

            return response()->json(['success' => true, 'data' => $brand], 200);
        }

        $searchTerm = $request->input('search_term', '') ?? '';
        $sortOrder = $request->input('sort_order', 'desc') ?? 'desc';

        $brands = Brand::when($searchTerm, function ($query, $searchTerm) {

            return $query->where('name', 'like', '%' . $searchTerm . '%');
        })->orderBy('created_at', $sortOrder)->get();

        if ($brands) {

            return response()->json(['success' => true, 'brands' => $brands], 200);
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

                $brand = new Brand();
                $brand->name = $request->input('name');
                $brand->description = $request->input('description');

                if ($request->hasFile('logo')) {

                    $brand->logo = $request->file('logo')->store('public/images/brands');
                }

                $brand->save();

                return response()->json(['success' => true, 'message' => 'Brand created successfully'], 200);
            } else {

                return response()->json(['success' => false, 'message' => 'Brand created '], 201);
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

                $brand = Brand::findOrFail($request->input('id'));
                $brand->name = $request->input('name');
                $brand->description = $request->input('description');

                if ($request->hasFile('logo')) {

                    if ($brand->logo) {
                        Storage::delete($brand->logo);
                    }

                    $brand->logo = $request->file('logo')->store('public/images/brands');
                }

                $brand->save();

                return response()->json(['success' => true, 'message' => 'Brand updated successfully'], 200);
            } else {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update brand', 'error' => $e->getMessage()], 500);
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

            $brand = Brand::findOrFail($id);

            if ($brand) {

                $brand->delete();

                return response()->json(['message' => 'Brand deleted successfully.'], 200);
            }

            return response()->json(['error' => 'Brand not found'], 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
    }
}

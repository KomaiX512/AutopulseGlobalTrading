<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function getBrandsAndCats(Request $request, $prod_type_slug)
    {
        try {
            // Map URL slugs to product type names
            $slugToNameMap = [
                'machine' => 'Machine',
                'electric-bikes' => 'Electric Bikes',
                'vehicles' => 'Vehicles',
                'machine-parts' => 'Machine Part',
                'vehicle-parts' => 'Vehicle Part',
                'bike-parts' => 'Bike Part',
                'attachments' => 'Attachments & Accessories',
                'attachments-accessories' => 'Attachments & Accessories'
            ];

            $productTypeName = $slugToNameMap[$prod_type_slug] ?? $prod_type_slug;
            
            $productType = ProductType::where('name', $productTypeName)->first();

            if (!$productType) {
                return response()->json(['error' => 'Product type not found'], 404);
            }

            // Get categories for this product type that are viewable
            $categories = $productType->categories()->where('is_viewable', 1)->get();

            if ($categories) {

                $brands = Brand::whereIn('id', function ($query) use ($productType) {
                    $query->select('products.brand_id')
                        ->from('products')
                        ->whereIn('products.category_id', function ($query) use ($productType) {
                            $query->select('id')
                                ->from('categories')
                                ->where('product_type_id', $productType->id)
                                ->where('is_viewable', 1);
                        })
                        ->distinct();
                })->get();


                $data = [
                    'categories' => $categories,
                    'brands' => $brands
                ];

                return response()->json(['success' => true, 'data' => $data]);
            }
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function getCategories($slug)
    {
        try {
            // Map URL slugs to product type names
            $slugToNameMap = [
                'machine' => 'Machine',
                'electric-bikes' => 'Electric Bikes',
                'vehicles' => 'Vehicles',
                'machine-parts' => 'Machine Part',
                'vehicle-parts' => 'Vehicle Part',
                'bike-parts' => 'Bike Part',
                'attachments' => 'Attachments & Accessories',
                'attachments-accessories' => 'Attachments & Accessories'
            ];

            $productTypeName = $slugToNameMap[$slug] ?? $slug;
            
            $productType = ProductType::where('name', $productTypeName)->first();
            $categories = $productType->categories;


            if ($categories) {

                return response()->json(['succes' => true, 'categories' => $categories]);
            }
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function index()
    {
        try {
            $productTypes = ProductType::all();
            return response()->json(['success' => true, 'productTypes' => $productTypes], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function products($id)
    {
        try {
            $productType = ProductType::findOrFail($id);
            $products = $productType->products;
            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        try {
            $productType = ProductType::create($validatedData);
            return response()->json($productType, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $productType = ProductType::findOrFail($id);
            return response()->json($productType, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        try {
            $productType = ProductType::findOrFail($id);
            $productType->update($validatedData);
            return response()->json($productType, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $productType = ProductType::findOrFail($id);
            $productType->delete();
            return response()->json(['message' => 'Product type deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

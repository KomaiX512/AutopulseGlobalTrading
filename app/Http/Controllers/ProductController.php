<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function searchProducts(Request $request)
    {
        try {
            $searchTerm = $request->input('search_term');
            $products = Product::where('name', 'LIKE', "%{$searchTerm}%")
                ->get();

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while searching for products.'], 500);
        }
    }
    public function getRelatedProducts($slug)
    {
        try {

            $product = Product::where('slug', $slug)->firstOrFail();
            $relatedProducts = Product::where('id', '!=', $product->id)
                ->where(function ($query) use ($product) {
                    $query->where('category_id', $product->category_id);
                })->with('images')->with('category')
                ->get();

            if ($relatedProducts->count() < 10) {
                $additionalProductsNeeded = 10 - $relatedProducts->count();
                $additionalProducts = Product::where('id', '!=', $product->id)
                    ->where('brand_id', '<=', $product->brand_id)->with('images')->with('category')
                    ->take($additionalProductsNeeded)
                    ->get();

                $relatedProducts = $relatedProducts->merge($additionalProducts);
            }

            $relatedProducts = $relatedProducts->take(10);

            return response()->json([
                'success' => true,
                'data' => $relatedProducts
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching related products.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function filterOnProdType(Request $request)
    {
        $prod_type_slug = $request->query('prod_type_slug');
        $searchTerm = $request->query('search_term');
        $selectedCategories = $request->query('categories');
        $selectedBrands = $request->query('brands');
        $selectedPrice = $request->query('price');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 16);
        $weights = $request->query('weights');
        $years = $request->query('years');
        $sortField = 'created_at';
        $sortOrder = 'desc';

        $productType = ProductType::where('slug', $prod_type_slug)->first();

        if (!$productType) {
            return response()->json([
                'success' => false,
                'message' => 'Product type not found'
            ], 404);
        }

        $query = $productType->products()->newQuery();

        if ($searchTerm) {
            $query->where(function ($q) use ($searchTerm) {
                $q->where('products.name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('products.description', 'LIKE', "%{$searchTerm}%");
            });
        }

        if ($selectedCategories) {
            $selectedCategoriesArray = explode(',', $selectedCategories);
            $query->whereIn('category_id', $selectedCategoriesArray);
        }

        if ($selectedBrands) {
            $selectedBrandsArray = explode(',', $selectedBrands);
            $query->whereIn('brand_id', $selectedBrandsArray);
        }

        if ($selectedPrice === 'lowToHigh') {
            $sortField = 'price';
            $sortOrder = 'asc';
        } elseif ($selectedPrice === 'highToLow') {
            $sortField = 'price';
            $sortOrder = 'desc';
        }

        if ($weights) {
            $weightRanges = explode(',', $weights);
            $query->where(function ($q) use ($weightRanges) {
                foreach ($weightRanges as $range) {
                    switch ($range) {
                        case 'up_to_10':
                            $q->orWhere('weight', '<=', 10);
                            break;
                        case 'up_to_20':
                            $q->orWhereBetween('weight', [11, 20]);
                            break;
                        case 'up_to_30':
                            $q->orWhereBetween('weight', [21, 30]);
                            break;
                        case 'up_to_40':
                            $q->orWhereBetween('weight', [31, 40]);
                            break;
                        case 'up_to_50':
                            $q->orWhereBetween('weight', [41, 50]);
                            break;
                        case 'over_50':
                            $q->orWhere('weight', '>', 50);
                            break;
                    }
                }
            });
        }

        if ($years) {
            $yearArray = explode(',', $years);
            $query->whereIn('make', $yearArray);
        }

        $query->orderBy($sortField, $sortOrder);

        $products = $query->with(['category', 'brand', 'images'])->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'products' => $products->items(),
            'total' => $products->total(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
        ]);
    }


    public function filterProducts(Request $request)
    {
        $searchTerm = $request->query('search_term');
        $selectedPrice = $request->query('price');
        $selectedCategories = $request->query('categories');
        $sortOrder = $request->query('sort_order', 'desc');
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 16);
        $sortField = 'created_at';
        $query = Product::query();

        $is_business_product_request = $request->query('is_business_type') ? true : false;

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

        $query->orderBy($sortField, $sortOrder);

        if ($is_business_product_request) {

            $query->where('is_business_product', 1);

        } else {

            $query->where('is_business_product', 0);
        }

        $products = $query->with('images')->with('category')->with('brand')->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'products' => $products->items(),
            'total' => $products->total(),
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
        ]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function home_products()
    {

        $products = [];
        $products = Product::with('category')
            ->latest()
            ->take(8)
            ->get();

        foreach ($products as $prod) {
            $prod->image_url = asset(Storage::url($prod->image));
        }

        return response()->json(['success' => true, 'prodcuts' => $products], 200);
    }
    public function home_orders()
    {
        $orders = User::where('id', Auth::user()->id)->with('orders.orderDetails.product')->get();

        return response()->json(['success' => true, 'orders' => $orders], 200);
    }



    public function getProduct($slug = null)
    {
        $products = [];

        if ($slug) {
            $products = Product::where('slug', $slug)->with('images')->get();
            foreach ($products[0]->images as $image) {
                $image->url = asset(Storage::url($image->image_path));
                $image->uid = $image->id;
            }
        }

        return response()->json(['success' => true, 'prodcuts' => $products], 200);
    }
    public function index($id = null)
    {
        $products = [];

        if ($id) {

            $products = Product::where('id', $id)->with('images')->get();
            // dd($products);
            foreach ($products[0]->images as $image) {
                $image->url = asset(Storage::url($image->image_path));
                $image->uid = $image->id;
            }
        } else {
            $products = Product::with('category')->with('brand')->get();
        }
        // if (!$id) {
        //     foreach ($products as $prod) {
        //         $prod->image_url = asset(Storage::url($prod->image));
        //     }
        // }

        return response()->json(['success' => true, 'prodcuts' => $products], 200);
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

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'features' => 'nullable|string',
                'price' => 'required|numeric',
                'discount' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'brand_id' => 'required|exists:brands,id',
                'stock' => 'required|numeric',
                'make' => 'required|numeric',
                'weight' => 'required|numeric',
                'model' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }



            $product = new Product();
            $product->name = $request->input('name');
            $product->category_id = $request->input('category_id');
            $product->brand_id = $request->input('brand_id');
            $product->description = $request->input('description');
            $product->features = $request->input('features');
            $product->price = $request->input('price');
            $product->discount = $request->input('discount');
            $product->is_business_product =  $request->input('is_business_product') ? 1 : 0;
            $product->stock = $request->input('stock');
            $product->model = $request->input('model');
            $product->make = $request->input('make');
            $product->weight = $request->input('weight');
            // dd('welcome back');

            if ($request->hasFile('image')) {
                $product->image = $request->file('image')->store('public/images/categories');
            }


            $uuid = uniqid('product-');
            $product->slug = $uuid;
            $product->save();
            // dd('product save');

            return response()->json(['success' => true, 'message' => 'Product created successfully'], 200);
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => $e], 500);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json(['product' => $product], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product not found.'], 404);
        }
    }

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

            $product = Product::findOrFail($request->input('id'));

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'features' => 'nullable|string',
                'price' => 'required|numeric',
                'discount' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'brand_id' => 'required|exists:brands,id',
                'stock' => 'required|numeric',
                'make' => 'required|numeric',
                'weight' => 'required|numeric',
                'model' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            $product->name = $request->input('name');
            $product->category_id = $request->input('category_id');
            $product->brand_id = $request->input('brand_id');
            $product->description = $request->input('description');
            $product->features = $request->input('features');
            $product->price = $request->input('price');
            $product->discount = $request->input('discount');
            // $product->is_business_product = $request->has('is_business_product') ? 1 : 0;
            $product->stock = $request->input('stock');
            $product->model = $request->input('model');
            $product->make = $request->input('make');
            $product->weight = $request->input('weight');

            if ($request->hasFile('image')) {

                $imagePath = $request->file('image')->store('public/images/categories');

                if ($product->image) {

                    Storage::delete($product->image);
                }

                $product->image = $imagePath;
            }

            $product->save();

            return response()->json(['success' => true, 'message' => 'Product Updated successfully'], 200);
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'message' => $e], 500);
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
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }
}

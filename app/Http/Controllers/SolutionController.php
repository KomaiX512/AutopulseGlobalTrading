<?php

namespace App\Http\Controllers;

use App\Models\Solution;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SolutionController extends Controller
{
    /**
     * Return viewable solutions for homepage
     */
    public function homeSolutions()
    {
        $solutions = Solution::where('is_viewable', 1)
            ->withCount('products')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['success' => true, 'solutions' => $solutions]);
    }

    /**
     * Solution details with products
     */
    public function solutionDetails($slug)
    {
        $solution = Solution::where('slug', $slug)
            ->with(['products.category', 'products.brand', 'products.images'])
            ->first();
            
        if (!$solution) {
            return response()->json(['success' => false, 'message' => 'Solution not found'], 404);
        }
        
        return response()->json(['success' => true, 'solution' => $solution]);
    }

    /**
     * Get all solutions with pagination
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        $search = $request->get('search');
        
        $query = Solution::withCount('products');
        
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        $solutions = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        return response()->json([
            'success' => true, 
            'solutions' => $solutions
        ]);
    }

    /**
     * Store a new solution
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_viewable' => 'boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $solution = Solution::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $request->image,
            'is_viewable' => $request->get('is_viewable', true)
        ]);

        if ($request->product_ids) {
            $solution->products()->attach($request->product_ids);
        }

        return response()->json([
            'success' => true, 
            'message' => 'Solution created successfully',
            'solution' => $solution->load('products')
        ]);
    }

    /**
     * Show solution for editing
     */
    public function show($id)
    {
        $solution = Solution::with('products')->findOrFail($id);
        return response()->json(['success' => true, 'solution' => $solution]);
    }

    /**
     * Update solution
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_viewable' => 'boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $solution = Solution::findOrFail($id);
        
        $solution->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $request->image,
            'is_viewable' => $request->get('is_viewable', true)
        ]);

        // Sync products
        if ($request->has('product_ids')) {
            $solution->products()->sync($request->product_ids ?? []);
        }

        return response()->json([
            'success' => true, 
            'message' => 'Solution updated successfully',
            'solution' => $solution->load('products')
        ]);
    }

    /**
     * Delete solution
     */
    public function destroy($id)
    {
        $solution = Solution::findOrFail($id);
        $solution->products()->detach(); // Remove product relationships
        $solution->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Solution deleted successfully'
        ]);
    }

    /**
     * Get available products for assignment
     */
    public function getAvailableProducts(Request $request)
    {
        $search = $request->get('search');
        $categoryId = $request->get('category_id');
        
        $query = Product::with(['category', 'brand']);
        
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }
        
        $products = $query->limit(50)->get();
        
        return response()->json([
            'success' => true, 
            'products' => $products
        ]);
    }

    /**
     * Assign products to solution
     */
    public function assignProducts(Request $request, $id)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $solution = Solution::findOrFail($id);
        $solution->products()->attach($request->product_ids);

        return response()->json([
            'success' => true, 
            'message' => 'Products assigned successfully'
        ]);
    }

    /**
     * Remove products from solution
     */
    public function removeProducts(Request $request, $id)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $solution = Solution::findOrFail($id);
        $solution->products()->detach($request->product_ids);

        return response()->json([
            'success' => true, 
            'message' => 'Products removed successfully'
        ]);
    }
} 
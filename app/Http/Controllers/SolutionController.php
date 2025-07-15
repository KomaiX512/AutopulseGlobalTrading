<?php

namespace App\Http\Controllers;

use App\Models\Solution;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
        $isViewable = $request->get('is_viewable');
        
        $query = Solution::withCount('products');
        
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Handle visibility filter
        if ($isViewable !== null && $isViewable !== '') {
            $query->where('is_active', $isViewable);
        }
        
        $solutions = $query->orderBy('created_at', 'desc')->paginate($perPage);
        
        // Transform the response to match frontend expectations
        return response()->json([
            'success' => true,
            'data' => $solutions->items(),
            'current_page' => $solutions->currentPage(),
            'last_page' => $solutions->lastPage(),
            'per_page' => $solutions->perPage(),
            'total' => $solutions->total(),
            'from' => $solutions->firstItem(),
            'to' => $solutions->lastItem(),
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images/solutions');
        }

        $solution = Solution::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $imagePath,
            'is_active' => $request->get('is_active', true)
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
        return response()->json($solution);
    }

    /**
     * Update solution
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        $solution = Solution::findOrFail($id);
        
        $imagePath = $solution->image; // Keep existing image by default
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($solution->image) {
                Storage::delete($solution->image);
            }
            $imagePath = $request->file('image')->store('public/images/solutions');
        }
        
        $solution->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image' => $imagePath,
            'is_active' => $request->get('is_active', true)
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
        
        // Delete image if it exists
        if ($solution->image) {
            Storage::delete($solution->image);
        }
        
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
        
        // Return products array directly for frontend compatibility
        return response()->json($products);
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
            'message' => 'Products assigned successfully',
            'solution' => $solution->load('products')
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
            'message' => 'Products removed successfully',
            'solution' => $solution->load('products')
        ]);
    }
} 
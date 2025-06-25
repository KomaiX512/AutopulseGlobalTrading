<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductImageController extends Controller
{



    public function uploadImages(Request $request)
    {
        $request->validate([
            'files.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id' => 'required|exists:products,id'
        ]);
    
        try {
            DB::beginTransaction();
    
            if ($request->hasFile('files')) {
                $files = $request->file('files');
                $prod_id = $request->input('id');
                $product = Product::find($prod_id);
    
                if ($product) {
                    foreach ($files as $file) {
                        $path = $file->store('public/images/products/' . $prod_id);
    
                        $image = new ProductImage();
                        $image->product_id = $product->id;
                        $image->image_path = $path;
                        $image->save();
                    }
    
                    DB::commit();
                    return response()->json(['success' => true, 'message' => 'Files uploaded successfully'], 200);
                } else {
                    return response()->json(['success' => false, 'message' => 'Product not found'], 404);
                }
            } else {
                return response()->json(['message' => 'No files uploaded'], 400);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    

    public function deleteImage($id)
    {
        try {
            $image = ProductImage::findOrFail($id);
            $image->delete();
            return response()->json(['message' => 'Product image deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete product.'], 500);
        }
    }
}

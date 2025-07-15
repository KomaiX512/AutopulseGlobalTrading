<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\OptimizedImages;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'description',
        'features',
        'stock',
        'ratings',
        'price',
        'stock_price',
        'image',
        'slug',
        'discount',
        'is_business_product',
        'model',
        'make',
        'weight'
    ];
    
    use HasFactory, SoftDeletes, OptimizedImages;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get the images for the product.
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Get the solutions that include this product.
     */
    public function solutions()
    {
        return $this->belongsToMany(Solution::class, 'product_solution');
    }
}

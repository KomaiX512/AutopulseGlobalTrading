<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductType extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany(Category::class, 'product_type_id');
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, Category::class, 'product_type_id', 'category_id');
    }


    // Custom relationship to get distinct brands
    public function brands()
    {
        return $this->hasManyThrough(Brand::class, Product::class, 'category_id', 'id', 'id', 'brand_id')
            ->distinct()
            ->whereIn('products.id', function ($query) {
                $query->select('id')
                    ->from('products')
                    ->whereIn('category_id', function ($query) {
                        $query->select('id')
                            ->from('categories')
                            ->whereColumn('categories.product_type_id', 'product_types.id');
                    });
            });
    }
}

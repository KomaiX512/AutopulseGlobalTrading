<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\OptimizedImages;

class Attachment extends Model
{
    use HasFactory, SoftDeletes, OptimizedImages;

    protected $fillable = [
        'name', 
        'image', 
        'description', 
        'slug', 
        'is_viewable', 
        'type',
        'category_id',
        'brand_id',
        'price',
        'stock',
        'features'
    ];

    protected $casts = [
        'is_viewable' => 'boolean',
        'price' => 'decimal:2',
        'stock' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function images()
    {
        return $this->hasMany(AttachmentImage::class)->orderBy('sort_order', 'asc');
    }

    public function primaryImage()
    {
        return $this->hasOne(AttachmentImage::class)->where('is_primary', true);
    }
}

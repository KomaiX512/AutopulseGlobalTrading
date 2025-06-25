<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 
        'image', 
        'description', 
        'slug', 
        'is_viewable', 
        'type',
        'category_id',
        'price',
        'stock'
    ];

    protected $casts = [
        'is_viewable' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

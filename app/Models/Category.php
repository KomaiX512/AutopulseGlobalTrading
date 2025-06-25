<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'image', 'description'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    // This method should be defined as a relationship
    public function prods_count()
    {
        return $this->hasMany(Product::class)->selectRaw('category_id, count(*) as count')->groupBy('category_id');
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class,'product_type_id');
    }


}

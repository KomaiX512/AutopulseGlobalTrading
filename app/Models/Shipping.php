<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'shipping_address';

    public function order()
    {
        return $this->hasOne(Order::class,'order_id');
    
    }

}

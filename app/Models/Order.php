<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }

    public function status()
    {
        return $this->hasOne(OrderStatus::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function shippingAddress()
    {
        return $this->hasOne(Shipping::class, 'order_id');
    }
    public function pendingOrders()
    {
        return $this->hasMany(Order::class)->where('status', 0);
    }

    public function processingOrders()
    {
        return $this->hasMany(Order::class)->where('status', 1);
    }

    public function shippingOrders()
    {
        return $this->hasMany(Order::class)->where('status', 3);
    }
    public function shippedOrders()
    {
        return $this->hasMany(Order::class)->where('status', 4);
    }
    public function deliveredOrders()
    {
        return $this->hasMany(Order::class)->where('status', 3);
    }
}

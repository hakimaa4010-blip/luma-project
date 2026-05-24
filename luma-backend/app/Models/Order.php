<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_number', 'status', 'payment_method',
        'payment_status', 'subtotal', 'shipping_cost', 'discount',
        'total', 'shipping_address', 'coupon_id'
    ];

    protected $casts = ['shipping_address' => 'array'];

    protected static function booted(): void
    {
        static::creating(function ($order) {
            $order->order_number = 'LUMA-' . strtoupper(uniqid());
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }
}
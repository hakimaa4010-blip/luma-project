<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'slug', 'description',
        'price', 'sale_price', 'gender', 'is_active', 'is_featured'
    ];

    protected $appends = ['image', 'stock'];

    public function getImageAttribute()
    {
        // Load relation if not loaded to prevent N+1 or issues
        $primary = $this->images->where('is_primary', true)->first() ?? $this->images->first();
        return $primary ? $primary->image_path : null;
    }

    public function getStockAttribute()
    {
        return $this->variants->sum('stock');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getFinalPriceAttribute()
    {
        return $this->sale_price ?? $this->price;
    }
}
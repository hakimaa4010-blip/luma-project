<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with(['category', 'images', 'variants'])
            ->where('is_active', true)
            ->when($request->category, function($q) use ($request) {
                if (is_numeric($request->category)) {
                    $q->where('category_id', $request->category);
                } else {
                    $q->whereHas('category', fn($catQ) => $catQ->where('slug', $request->category));
                }
            })
            ->when($request->gender,   fn($q) => $q->where('gender', $request->gender))
            ->when($request->search,   fn($q) => $q->where('name', 'like', "%{$request->search}%"))
            ->paginate(12);

        return response()->json($products);
    }

    public function show($slug)
    {
        $product = Product::with(['category', 'images', 'variants', 'reviews.user'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($product);
    }
}
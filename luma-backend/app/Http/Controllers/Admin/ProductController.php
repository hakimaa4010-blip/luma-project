<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images', 'variants'])->latest()->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'sale_price'  => 'nullable|numeric',
            'gender'      => 'required|in:women,kids',
            'is_active'   => 'boolean',
            'is_featured' => 'boolean',
            'image'       => 'nullable|string',
            'stock'       => 'nullable|integer|min:0',
        ]);

        $data['slug'] = Str::slug($data['name']) . '-' . uniqid();
        $product = Product::create($data);

        // Save Image
        if ($request->filled('image')) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $request->image,
                'is_primary' => true,
            ]);
        }

        // Save default variant/stock
        $stock = $request->input('stock', 10);
        ProductVariant::create([
            'product_id' => $product->id,
            'size'       => 'Taille Unique',
            'color'      => 'Standard',
            'color_hex'  => '#A8956C',
            'stock'      => $stock,
            'sku'        => 'SKU-' . strtoupper(Str::random(6)) . '-' . $product->id,
        ]);

        return response()->json($product->load(['category', 'images', 'variants']), 201);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'images', 'variants'])->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validate([
            'name'        => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric',
            'sale_price'  => 'nullable|numeric',
            'gender'      => 'sometimes|in:women,kids',
            'is_active'   => 'boolean',
            'is_featured' => 'boolean',
            'image'       => 'nullable|string',
            'stock'       => 'nullable|integer|min:0',
        ]);

        $product->update($data);

        if ($request->filled('image')) {
            $product->images()->delete();
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $request->image,
                'is_primary' => true,
            ]);
        }

        if ($request->has('stock')) {
            $variant = $product->variants()->first();
            if ($variant) {
                $variant->update(['stock' => $request->stock]);
            } else {
                ProductVariant::create([
                    'product_id' => $product->id,
                    'size'       => 'Taille Unique',
                    'color'      => 'Standard',
                    'color_hex'  => '#A8956C',
                    'stock'      => $request->stock,
                    'sku'        => 'SKU-' . strtoupper(Str::random(6)) . '-' . $product->id,
                ]);
            }
        }

        return response()->json($product->load(['category', 'images', 'variants']));
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}
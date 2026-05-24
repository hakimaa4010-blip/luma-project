<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::with(['items.product.images', 'items.variant'])
            ->firstOrCreate(['user_id' => auth('api')->id()]);

        return response()->json($cart);
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'product_id'         => 'required|exists:products,id',
            'product_variant_id' => 'required|exists:product_variants,id',
            'quantity'           => 'required|integer|min:1',
        ]);

        $cart = Cart::firstOrCreate(['user_id' => auth('api')->id()]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_variant_id', $request->product_variant_id)
            ->first();

        if ($item) {
            $item->increment('quantity', $request->quantity);
        } else {
            CartItem::create([
                'cart_id'            => $cart->id,
                'product_id'         => $request->product_id,
                'product_variant_id' => $request->product_variant_id,
                'quantity'           => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Article ajouté au panier']);
    }

    public function update(Request $request, $itemId)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);

        $item = CartItem::where('id', $itemId)
            ->whereHas('cart', fn($q) => $q->where('user_id', auth('api')->id()))
            ->firstOrFail();

        $item->update(['quantity' => $request->quantity]);
        return response()->json(['message' => 'Quantité mise à jour']);
    }

    public function destroy($itemId)
    {
        CartItem::where('id', $itemId)
            ->whereHas('cart', fn($q) => $q->where('user_id', auth('api')->id()))
            ->delete();

        return response()->json(['message' => 'Article supprimé']);
    }
}
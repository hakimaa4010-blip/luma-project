<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->where('user_id', auth('api')->id())
            ->latest()->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'payment_method'           => 'required|in:cod,card,mobile',
            'shipping_address'         => 'required|array',
            'shipping_address.name'    => 'required|string',
            'shipping_address.address' => 'required|string',
            'shipping_address.city'    => 'required|string',
            'shipping_address.phone'   => 'required|string',
        ]);

        $cart = Cart::with('items.product')->where('user_id', auth('api')->id())->firstOrFail();

        $subtotal = $cart->items->sum(fn($item) => $item->product->final_price * $item->quantity);
        $shipping = 30.00;
        $total    = $subtotal + $shipping;

        $order = Order::create([
            'user_id'          => auth('api')->id(),
            'payment_method'   => $request->payment_method,
            'shipping_address' => $request->shipping_address,
            'subtotal'         => $subtotal,
            'shipping_cost'    => $shipping,
            'total'            => $total,
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id'           => $order->id,
                'product_id'         => $item->product_id,
                'product_variant_id' => $item->product_variant_id,
                'quantity'           => $item->quantity,
                'unit_price'         => $item->product->final_price,
                'total_price'        => $item->product->final_price * $item->quantity,
            ]);
        }

        $cart->items()->delete();

        try {
            \Illuminate\Support\Facades\Mail::to(auth('api')->user()->email)->send(new \App\Mail\OrderPlaced($order));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Failed to send order email: ' . $e->getMessage());
        }

        return response()->json($order->load('items.product'), 201);
    }

    public function show($id)
    {
        $order = Order::with(['items.product', 'items.variant'])
            ->where('user_id', auth('api')->id())
            ->findOrFail($id);

        return response()->json($order);
    }
}
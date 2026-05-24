<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = Favorite::with('product.images')
            ->where('user_id', auth('api')->id())
            ->get();

        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id']);

        $favorite = Favorite::firstOrCreate([
            'user_id'    => auth('api')->id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy($productId)
    {
        Favorite::where('user_id', auth('api')->id())
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Retiré des favoris']);
    }
}
<?php
namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(auth('api')->user());
    }

    public function update(Request $request)
    {
        $user = auth('api')->user();

        $data = $request->validate([
            'name'  => 'sometimes|string|max:100',
            'phone' => 'nullable|string',
        ]);

        $user->update($data);
        return response()->json($user);
    }
}
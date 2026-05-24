<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $customers = User::where('role', 'client')
            ->withCount('orders')
            ->latest()
            ->get();

        return response()->json($customers);
    }
}

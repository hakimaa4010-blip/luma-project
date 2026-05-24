<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\OrderController as ClientOrderController;
use App\Http\Controllers\Client\FavoriteController;
use App\Http\Controllers\Client\ProfileController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use Illuminate\Support\Facades\Route;

// ===== AUTH =====
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);
    Route::middleware('auth:api')->group(function () {
        Route::post('logout',  [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me',       [AuthController::class, 'me']);
    });
});

// ===== PUBLIC =====
Route::get('products',            [ProductController::class, 'index']);
Route::get('products/{slug}',     [ProductController::class, 'show']);
Route::get('categories',          [CategoryController::class, 'index']);

// ===== CLIENT =====
Route::middleware('auth:api')->prefix('client')->group(function () {
    // Cart
    Route::get('cart',          [CartController::class, 'index']);
    Route::post('cart/add',     [CartController::class, 'addItem']);
    Route::put('cart/{id}',     [CartController::class, 'update']);
    Route::delete('cart/{id}',  [CartController::class, 'destroy']);

    // Orders
    Route::get('orders',        [ClientOrderController::class, 'index']);
    Route::post('orders',       [ClientOrderController::class, 'store']);
    Route::get('orders/{id}',   [ClientOrderController::class, 'show']);

    // Favorites
    Route::get('favorites',           [FavoriteController::class, 'index']);
    Route::post('favorites',          [FavoriteController::class, 'store']);
    Route::delete('favorites/{id}',   [FavoriteController::class, 'destroy']);

    // Profile
    Route::get('profile',  [ProfileController::class, 'show']);
    Route::put('profile',  [ProfileController::class, 'update']);
});

// ===== ADMIN =====
Route::middleware(['auth:api', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('dashboard/stats',       [DashboardController::class, 'stats']);
    Route::get('users',                 [AdminUserController::class, 'index']);

    // Products
    Route::get('products',              [AdminProductController::class, 'index']);
    Route::post('products',             [AdminProductController::class, 'store']);
    Route::get('products/{id}',         [AdminProductController::class, 'show']);
    Route::put('products/{id}',         [AdminProductController::class, 'update']);
    Route::delete('products/{id}',      [AdminProductController::class, 'destroy']);

    // Categories
    Route::get('categories',            [AdminCategoryController::class, 'index']);
    Route::post('categories',           [AdminCategoryController::class, 'store']);
    Route::put('categories/{id}',       [AdminCategoryController::class, 'update']);
    Route::delete('categories/{id}',    [AdminCategoryController::class, 'destroy']);

    // Orders
    Route::get('orders',                [AdminOrderController::class, 'index']);
    Route::get('orders/{id}',           [AdminOrderController::class, 'show']);
    Route::put('orders/{id}',           [AdminOrderController::class, 'update']);
});
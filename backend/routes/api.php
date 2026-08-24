<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UploadController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Upload image
    Route::post('/upload', [UploadController::class, 'store']);

    // Admin CRUD routes
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('articles', ArticleController::class);
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('banners', BannerController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('users', UserController::class);
});

// Public read-only routes (if needed by the frontend)
Route::get('/public/projects', [ProjectController::class, 'index']);
Route::get('/public/products', [ProductController::class, 'index']);
Route::get('/public/services', [ServiceController::class, 'index']);
Route::get('/public/articles', [ArticleController::class, 'index']);
Route::get('/public/reviews', [ReviewController::class, 'index']);
Route::post('/public/reviews', [ReviewController::class, 'store']);
Route::get('/public/banners', [BannerController::class, 'index']);

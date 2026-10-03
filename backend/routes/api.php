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
use App\Http\Controllers\PromotionController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Upload image
    Route::post('/upload', [UploadController::class, 'store'])->middleware('permission:manage-images');
    Route::post('/admin/upload', [UploadController::class, 'store'])->middleware('permission:manage-images');
    Route::get('/admin/images', [UploadController::class, 'index'])->middleware('permission:manage-images');
    Route::post('/admin/images/delete', [UploadController::class, 'destroy'])->middleware('permission:manage-images');

    // Permissions list for Admin
    Route::get('/permissions', [App\Http\Controllers\PermissionController::class, 'index'])->middleware('permission:manage-users');

    // Admin CRUD routes with Permissions
    Route::apiResource('projects', ProjectController::class)->middleware('permission:manage-projects');
    Route::apiResource('products', ProductController::class)->middleware('permission:manage-products');
    Route::apiResource('services', ServiceController::class)->middleware('permission:manage-services');
    Route::apiResource('articles', ArticleController::class)->middleware('permission:manage-articles');
    Route::apiResource('reviews', ReviewController::class)->middleware('permission:manage-reviews');
    Route::apiResource('banners', BannerController::class)->middleware('permission:manage-banners');
    
    // Roles and Users are managed by Admin or users with 'manage-users' permission
    Route::apiResource('roles', RoleController::class)->middleware('permission:manage-users');
    Route::apiResource('users', UserController::class)->middleware('permission:manage-users');
    
    Route::apiResource('contacts', App\Http\Controllers\ContactController::class)->middleware('permission:manage-contacts');
    Route::apiResource('promotions', PromotionController::class)->middleware('permission:manage-promotions');

    // Bitrix Data API for Admin
    Route::prefix('admin/bitrix')->group(function () {
        Route::get('projects', [App\Http\Controllers\Api\BitrixDataController::class, 'getProjects']);
        Route::get('tasks', [App\Http\Controllers\Api\BitrixDataController::class, 'getTasks']);
        Route::get('tasks/{id}', [App\Http\Controllers\Api\BitrixDataController::class, 'getTaskDetails']);
        Route::get('users', [App\Http\Controllers\Api\BitrixDataController::class, 'getUsers']);
        Route::get('customers', [App\Http\Controllers\Api\BitrixDataController::class, 'getCustomers']);
    });
});

// Public read-only routes (if needed by the frontend)
Route::get('/public/projects', [ProjectController::class, 'index']);
Route::get('/public/products', [ProductController::class, 'index']);
Route::get('/public/services', [ServiceController::class, 'index']);
Route::get('/public/articles', [ArticleController::class, 'index']);
Route::get('/public/reviews', [ReviewController::class, 'index']);
Route::post('/public/reviews', [ReviewController::class, 'store']);
Route::get('/public/banners', [BannerController::class, 'index']);
Route::post('/public/contacts', [App\Http\Controllers\ContactController::class, 'store']);
Route::get('/public/promotions/active', [PromotionController::class, 'getActive']);

// Bitrix Outbound Webhook
Route::post('/bitrix/webhook', [App\Http\Controllers\Api\BitrixWebhookController::class, 'handle']);

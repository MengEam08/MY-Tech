<?php

use App\Http\Controllers\adminAuthController;
use App\Http\Controllers\adminBrandController;
use App\Http\Controllers\adminCategoryController;
use App\Http\Controllers\adminProductController;
use App\Http\Controllers\adminStorageController;
use App\Http\Controllers\adminTempImageController;
use App\Http\Controllers\frontAccountController;
use App\Models\Category;
use App\Models\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Correct POST route for login (should call 'authenticate' method)
Route::post('/admin/login', [frontAccountController::class, 'authenticate']); 
Route::post('/login', [frontAccountController::class, 'authenticate']); 
// Correct POST route for registration (should call 'register' method)
Route::post('/register', [frontAccountController::class, 'register']); // Keep this for registration

// Routes for other admin functionalities
Route::resource('categories', adminCategoryController::class);
Route::resource('brands', adminBrandController::class);
Route::get('storages', [adminStorageController::class, 'index']);
Route::resource('products', adminProductController::class);
Route::post('temp-images', [adminTempImageController::class, 'store']);
Route::post('save-product-images', [adminProductController::class, 'saveProductImage']);
Route::delete('delete-product-image/{id}', [adminProductController::class, 'deleteProductImage']);
Route::group(['middleware' => 'auth:sanctum'], function() {
    // Add routes that should be protected by authentication here
    Route::resource('categories', adminCategoryController::class);
    Route::resource('brands', adminBrandController::class);
    Route::get('storages', [adminStorageController::class, 'index']);
    Route::resource('products', adminProductController::class);
    Route::post('temp-images', [adminTempImageController::class, 'store']);
    Route::post('save-product-images', [adminProductController::class, 'saveProductImage']);
    Route::delete('delete-product-image/{id}', [adminProductController::class, 'deleteProductImage']);
});
 
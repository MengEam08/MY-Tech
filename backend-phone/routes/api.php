<?php

use App\Http\Controllers\adminAuthController;
use App\Http\Controllers\adminBrandController;
use App\Http\Controllers\adminCategoryController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [adminAuthController::class, 'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function(){
    // Route::get('categories', [adminCategoryController::class, 'index']);
    // Route::get('categories/{id}', [adminCategoryController::class, 'show']);
    // Route::put('categories/{id}', [adminCategoryController::class, 'update']);
    // Route::delete('categories/{id}', [adminCategoryController::class, 'destroy']);
    // Route::post('categories', [adminCategoryController::class, 'store']);

    Route::resource('categories', adminCategoryController::class);
    Route::resource('brands', adminBrandController::class);


});

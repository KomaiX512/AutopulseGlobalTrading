<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\SolutionController;
use App\Http\Controllers\ProductController;

Route::get('attachment/details/{slug}', [AttachmentController::class, 'getAttachmentDetails'])->name('attachment.details');
Route::get('attachment/related/{slug}', [AttachmentController::class, 'getRelatedAttachments'])->name('attachment.related');

// Product filtering endpoints
Route::get('filter/product/type/{slug}', [ProductController::class, 'filterProductsByType'])->name('api.filter.products.type');

// Solutions endpoints
Route::get('get/home/solutions', [SolutionController::class, 'homeSolutions']);
Route::get('solution/details/{slug}', [SolutionController::class, 'solutionDetails']);

// Admin Solutions Management Routes - MOVED TO web.php with auth middleware
// Route::prefix('admin/solutions')->group(function () {
//     Route::get('/', [SolutionController::class, 'index']);
//     Route::post('/', [SolutionController::class, 'store']);
//     Route::get('/{id}', [SolutionController::class, 'show']);
//     Route::put('/{id}', [SolutionController::class, 'update']);
//     Route::delete('/{id}', [SolutionController::class, 'destroy']);
    
//     // Product assignment routes
//     Route::get('/products/available', [SolutionController::class, 'getAvailableProducts']);
//     Route::post('/{id}/products/assign', [SolutionController::class, 'assignProducts']);
//     Route::post('/{id}/products/remove', [SolutionController::class, 'removeProducts']);
// });

// TEMP debug route
Route::get('admin/solutions/debug', function(){ return response()->json(['ok'=>true]); }); 
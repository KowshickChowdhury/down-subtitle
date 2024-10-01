<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\SubtitleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'index']);
    Route::resource('/comments', CommentController::class);
    // Route::resource('category', CategoryController::class);
    // Route::post('category-update', [CategoryController::class, 'update']);
    // Route::resource('item', ItemController::class);
    // Route::post('item', [ItemController::class, 'store']);
    // Route::post('item-update', [ItemController::class, 'update']);
});

Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Subtitle ex
Route::post('/extract-subtitles', [SubtitleController::class, 'extractSubtitles']);
// History Api's
Route::get('/histories', [HistoryController::class, 'index']);
Route::post('/history/{id}', [HistoryController::class, 'destroy']);
Route::post('/histories', [HistoryController::class, 'destroyAll']);

//Payment Api's
Route::post('/paypal/create-payment', [PayPalController::class, 'createPayment']);
Route::post('/paypal/capture-payment', [PayPalController::class, 'paymentSuccess']);
Route::post('/payment-cancel', [PayPalController::class, 'paymentCancel']);

Route::get('/all-comments', [CommentController::class, 'index']);

//Strip Api's
Route::post('/stripe/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
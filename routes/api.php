<?php

use App\Http\Controllers\HistoryController;
use App\Http\Controllers\SubtitleController;
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

// Subtitle ex
Route::post('/extract-subtitles', [SubtitleController::class, 'extractSubtitles']);
// History Api's
Route::get('/histories', [HistoryController::class, 'index']);
Route::post('/history/{id}', [HistoryController::class, 'destroy']);
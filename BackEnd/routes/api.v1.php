<?php

use App\Http\Controllers\Api\V1\MessageController;
use Illuminate\Support\Facades\Route;
Route::prefix('v1')->group(function () {
    Route::prefix('messages')->group(function () {
        Route::post('/', [MessageController::class, 'store']);
    });
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Team\TeamController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/password/reset', [AuthController::class, 'reset']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/me', [AuthController::class, 'me']);

Route::resource('teams', TeamController::class);
Route::put('/users/{id}', [UserController::class, 'update']);

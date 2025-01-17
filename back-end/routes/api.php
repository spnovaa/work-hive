<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Task\SubTaskController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\Task\UserTaskController;
use App\Http\Controllers\Team\TeamController;
use App\Http\Controllers\Team\TeamMemberController;
use App\Http\Controllers\Team\TeamUserController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserProfileImageController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/password/reset', [AuthController::class, 'reset']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/me', [AuthController::class, 'me']);

Route::post('/teams/users', [TeamUserController::class, 'store']);
Route::post('/teams/users/{team_id}', [TeamUserController::class, 'show']);


Route::post('/users/{userId}/profile-image', [UserProfileImageController::class, 'store']);
Route::put('/users/{userId}/profile-image', [UserProfileImageController::class, 'update']);
Route::delete('/users/{userId}/profile-image', [UserProfileImageController::class, 'destroy']);

Route::post('/users/{user_id}/teams', [TeamUserController::class, 'showUserTeams']);
Route::delete('/teams/users', [TeamUserController::class, 'destroy']);

Route::resource('teams', TeamController::class);
Route::resource('/user/teams', TeamMemberController::class);
Route::get('/user/tasks', [UserTaskController::class, 'index']);
Route::post('/user/tasks', [UserTaskController::class, 'store']);
Route::delete('/user/tasks', [UserTaskController::class, 'destroy']);

Route::resource('tasks', TaskController::class);
Route::resource('subtasks', SubTaskController::class);
Route::resource('projects', ProjectController::class);
Route::put('/users/{id}', [UserController::class, 'update']);


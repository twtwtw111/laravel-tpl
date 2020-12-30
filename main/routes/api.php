<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AuthController;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'auth:sanctum'], function () {

    route::get('admin/userlist', [UserController::class, 'userlist']);
    // Route::get('admin/userlist', function () {
    //     return auth()->user();
    // })->middleware('auth:sanctum');
});
Route::post('admin/login', [AuthController::class, 'login']);
Route::post('admin/test', [UserController::class, 'test']);

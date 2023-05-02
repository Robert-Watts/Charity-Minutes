<?php

use App\Http\Controllers\CharityController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\MemberController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::apiResource('charity', CharityController::class);
Route::apiResource('member', MemberController::class);
Route::apiResource('meeting', MeetingController::class);

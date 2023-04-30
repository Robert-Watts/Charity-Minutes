<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/{path?}', function () {
   return response(view('app', ['laravel_version' => app()->version()]));
            // ->header('Access-Control-Allow-Origin', "Content-Security-Policy: default-src 'none';script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.preview.app.github.dev/");      
});

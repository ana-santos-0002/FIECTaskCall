<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste', function () {
    return view('welcome');
});

Route::get('/teste-usuario', [UsuarioController::class, 'criar']);

Route::post('/salvar-usuario', [UsuarioController::class, 'salvar']);

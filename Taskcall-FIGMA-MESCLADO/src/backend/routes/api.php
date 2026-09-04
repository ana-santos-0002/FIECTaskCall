<?php

use App\Http\Controllers\TaskcallController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [TaskcallController::class, 'login']);
Route::get('/painel', [TaskcallController::class, 'painel']);
Route::get('/equipamentos', [TaskcallController::class, 'equipamentos']);
Route::post('/chamados', [TaskcallController::class, 'store']);
Route::patch('/chamados/{codChamado}/status', [TaskcallController::class, 'updateStatus']);
Route::delete('/chamados/{codChamado}', [TaskcallController::class, 'destroy']);

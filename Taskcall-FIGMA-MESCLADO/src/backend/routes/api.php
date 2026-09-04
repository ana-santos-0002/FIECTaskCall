<?php

use App\Http\Controllers\TaskcallController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [TaskcallController::class, 'login']); //rota ligada a função de login / quando enviar as informações, executar a função login do tascallController
Route::get('/painel', [TaskcallController::class, 'painel']);
Route::get('/equipamentos', [TaskcallController::class, 'equipamentos']);
Route::post('/chamados', [TaskcallController::class, 'store']);
Route::patch('/chamados/{codChamado}/status', [TaskcallController::class, 'updateStatus']);
Route::delete('/chamados/{codChamado}', [TaskcallController::class, 'destroy']);

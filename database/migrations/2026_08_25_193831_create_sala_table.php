<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sala', function (Blueprint $table) {
            // Chave primária simples (num_sala) - Sem auto-incremento
            $table->integer('num_sala')->id()->primary();
            
            // Campo de texto para o prédio
            $table->string('predio', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sala');
    }
};

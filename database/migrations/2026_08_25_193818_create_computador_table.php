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
        Schema::create('computador', function (Blueprint $table) {
            // Chave primária simples (num_computador) - Note que NÃO tem auto-incremento no seu SQL
            $table->integer('num_computador')->primary();
            
            // Campo de texto
            $table->string('status', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('computador');
    }
};

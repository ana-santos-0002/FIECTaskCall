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
        Schema::create('equipamentos', function (Blueprint $table) {
            // Chave primária auto-incremento (num_equipamentos)
            $table->integer('num_equipamentos')->autoIncrement();
            
            // Colunas de números inteiros, textos e datas
            $table->integer('num_sala');
            $table->integer('num_computador');
            $table->string('status', 45);
            $table->dateTime('data');
            
            // Coluna que aceita valor nulo (DEFAULT NULL no Workbench)
            $table->string('equipamentos_col', 45)->nullable();

            // Índices (KEY) das salas e computadores
            $table->index('num_sala', 'fk_sala_idx');
            $table->index('num_computador', 'fk_computador_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamentos');
    }
};

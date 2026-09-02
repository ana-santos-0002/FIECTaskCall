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
        Schema::create('chamados', function (Blueprint $table) {
            // Chave primária customizada (cod_chamado)
            $table->integer('cod_chamado')->primary();
            
            // Campos de texto com os tamanhos exatos do seu banco
            $table->string('descricao', 150);
            $table->string('categoria', 15);
            $table->string('status', 15);
            
            // Campo de data e hora
            $table->dateTime('data');
            
            // Chaves estrangeiras (as colunas precisam ser do mesmo tipo do banco original)
            $table->integer('id_usuario');
            $table->integer('num_equipamento');

            // Índices normais (KEY)
            $table->index('id_usuario', 'idx_chamados_usuario');
            $table->index('num_equipamento', 'idx_chamados_equipamento');

            // Restrições de Chave Estrangeira (FKs) e seus relacionamentos
            $table->foreign('id_usuario', 'fk_chamados_usuario')
                  ->references('id_usuario')
                  ->on('usuarios');

            $table->foreign('num_equipamento', 'fk_chamados_equipment') // Encurtado para evitar limite de caracteres do MySQL
                  ->references('num_equipamentos')
                  ->on('equipamentos');
                  $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chamados');
    }
};

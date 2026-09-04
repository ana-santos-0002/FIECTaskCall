<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('chamados', function (Blueprint $table) {
            $table->integer('cod_chamado')->primary();
            $table->string('descricao', 150);
            $table->string('categoria', 15);
            $table->string('status', 15);
            $table->dateTime('data');
            $table->integer('id_usuario');
            $table->integer('num_equipamento');
            $table->index('id_usuario', 'idx_chamados_usuario');
            $table->index('num_equipamento', 'idx_chamados_equipamento');
            $table->foreign('id_usuario', 'fk_chamados_usuario')->references('id_usuario')->on('usuarios');
            $table->foreign('num_equipamento', 'fk_chamados_equipamento')->references('num_equipamentos')->on('equipamentos');
        });
    }
    public function down(): void { Schema::dropIfExists('chamados'); }
};

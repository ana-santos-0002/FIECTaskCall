<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('equipamentos', function (Blueprint $table) {
            $table->integer('num_equipamentos')->autoIncrement();
            $table->integer('num_sala');
            $table->integer('num_computador');
            $table->string('status', 45);
            $table->dateTime('data');
            $table->string('equipamentos_col', 45)->nullable();
            $table->primary('num_equipamentos');
            $table->index('num_sala', 'fk_sala_idx');
            $table->index('num_computador', 'fk_computador_idx');
        });
    }
    public function down(): void { Schema::dropIfExists('equipamentos'); }
};

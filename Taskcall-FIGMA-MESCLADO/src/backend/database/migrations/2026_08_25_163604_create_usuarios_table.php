<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->integer('id_usuario')->autoIncrement();
            $table->integer('iuid_usuario');
            $table->string('email', 50);
            $table->string('senha', 15);
            $table->integer('cod_responsavel');
            $table->string('funcao', 30);
            $table->primary('id_usuario');
        });
    }
    public function down(): void { Schema::dropIfExists('usuarios'); }
};

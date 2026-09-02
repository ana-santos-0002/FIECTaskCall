<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->string('nome');
            $table->integer('id_usuario')->autoIncrement();
            $table->integer('iuid_usuario');
            $table->string('email', 100)->unique(); 
            // $table->string('senha', 255);  Comentada pois não precisaria de uma senha para entrar no taskcall, o usuario já estará logado nele, e o taskcall vai "acreditar" no layers. -- confirmar com a Adi 
            $table->integer('cod_responsavel');
            $table->string('funcao', 30);
            $table->timestamps();                 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('usuarios');
    }
};

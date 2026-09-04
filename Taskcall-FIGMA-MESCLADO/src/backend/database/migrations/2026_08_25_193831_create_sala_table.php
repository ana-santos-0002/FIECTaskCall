<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('sala', function (Blueprint $table) {
            $table->integer('num_sala')->primary();
            $table->string('predio', 30);
        });
    }
    public function down(): void { Schema::dropIfExists('sala'); }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('computador', function (Blueprint $table) {
            $table->integer('num_computador')->primary();
            $table->string('status', 45);
        });
    }
    public function down(): void { Schema::dropIfExists('computador'); }
};

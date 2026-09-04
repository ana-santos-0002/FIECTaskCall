<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('usuarios', 'nome')) {
            Schema::table('usuarios', function (Blueprint $table): void {
                $table->string('nome', 100)->nullable()->after('iuid_usuario');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('usuarios', 'nome')) {
            Schema::table('usuarios', function (Blueprint $table): void {
                $table->dropColumn('nome');
            });
        }
    }
};

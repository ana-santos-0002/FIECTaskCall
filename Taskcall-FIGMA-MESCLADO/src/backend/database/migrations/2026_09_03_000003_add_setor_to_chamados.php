<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('chamados', 'setor')) {
            Schema::table('chamados', function (Blueprint $table): void {
                $table->string('setor', 100)->nullable()->after('num_equipamento');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('chamados', 'setor')) {
            Schema::table('chamados', function (Blueprint $table): void {
                $table->dropColumn('setor');
            });
        }
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('chamados', function (Blueprint $table): void {
            if (!Schema::hasColumn('chamados', 'titulo')) {
                $table->string('titulo', 100)->nullable()->after('cod_chamado');
            }
            if (!Schema::hasColumn('chamados', 'prioridade')) {
                $table->string('prioridade', 15)->default('Média')->after('categoria');
            }
            if (!Schema::hasColumn('chamados', 'descricao_detalhada')) {
                $table->text('descricao_detalhada')->nullable()->after('descricao');
            }
        });
    }

    public function down(): void
    {
        $columns = array_filter(['titulo', 'prioridade', 'descricao_detalhada'], static fn (string $column): bool => Schema::hasColumn('chamados', $column));

        if ($columns) {
            Schema::table('chamados', function (Blueprint $table) use ($columns): void {
                $table->dropColumn($columns);
            });
        }
    }
};

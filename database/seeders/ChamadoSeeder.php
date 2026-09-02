<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ChamadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chamados')->insert([
            ['cod_chamado' => 101, 'descricao' => 'Computador não liga após queda de energia', 'categoria' => 'Hardware', 'status' => 'Aberto',       'data' => '2026-08-10 09:30:00', 'id_usuario' => 1, 'num_equipamento' => 1],
            ['cod_chamado' => 102, 'descricao' => 'Lentidão ao abrir o sistema interno',        'categoria' => 'Software', 'status' => 'Em Andamento', 'data' => '2026-08-10 11:15:00', 'id_usuario' => 2, 'num_equipamento' => 2],
            ['cod_chamado' => 103, 'descricao' => 'Tela azul recorrente durante uso',           'categoria' => 'Hardware', 'status' => 'Pendente',     'data' => '2026-08-11 08:00:00', 'id_usuario' => 1, 'num_equipamento' => 3],
            ['cod_chamado' => 104, 'descricao' => 'Solicitação de instalação de software de design', 'categoria' => 'Software', 'status' => 'Concluído',  'data' => '2026-08-11 14:20:00', 'id_usuario' => 3, 'num_equipamento' => 4],
            ['cod_chamado' => 105, 'descricao' => 'Projetor com imagem piscando constantemente','categoria' => 'Hardware', 'status' => 'Aberto',       'data' => '2026-08-18 10:15:00', 'id_usuario' => 1, 'num_equipamento' => 5],
        ]);
    }
}

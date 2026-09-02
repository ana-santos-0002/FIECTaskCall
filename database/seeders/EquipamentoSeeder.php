<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('equipamentos')->insert([
            ['num_equipamentos' => 1, 'num_sala' => 101, 'num_computador' => 1001, 'status' => 'Em Uso',     'data' => '2026-08-11 19:46:04', 'equipamentos_col' => 'Desktop Dell'],
            ['num_equipamentos' => 2, 'num_sala' => 101, 'num_computador' => 1002, 'status' => 'Em Uso',     'data' => '2026-08-11 19:46:04', 'equipamentos_col' => 'Desktop HP'],
            ['num_equipamentos' => 3, 'num_sala' => 102, 'num_computador' => 1003, 'status' => 'Manutenção','data' => '2026-08-11 19:46:04', 'equipamentos_col' => 'Notebook Lenovo'],
            ['num_equipamentos' => 4, 'num_sala' => 201, 'num_computador' => 1004, 'status' => 'Reserva',   'data' => '2026-08-11 19:46:04', 'equipamentos_col' => 'Desktop Dell'],
            ['num_equipamentos' => 5, 'num_sala' => 30,  'num_computador' => 1001, 'status' => 'Em Uso',     'data' => '2026-08-18 10:00:00', 'equipamentos_col' => 'Projetor Epsom'],
            ['num_equipamentos' => 6, 'num_sala' => 39,  'num_computador' => 1002, 'status' => 'Em Uso',     'data' => '2026-08-18 10:00:00', 'equipamentos_col' => 'Switch 24 portas'],
            ['num_equipamentos' => 7, 'num_sala' => 40,  'num_computador' => 1003, 'status' => 'Manutenção','data' => '2026-08-18 10:00:00', 'equipamentos_col' => 'Desktop Lenovo'],
            ['num_equipamentos' => 8, 'num_sala' => 45,  'num_computador' => 1004, 'status' => 'Em Uso',     'data' => '2026-08-18 10:00:00', 'equipamentos_col' => 'Impressora HP Laser'],
        ]);
    }
}

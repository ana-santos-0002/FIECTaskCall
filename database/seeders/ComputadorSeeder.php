<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComputadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('computador')->insert([
            ['num_computador' => 1001, 'status' => 'Ativo'],
            ['num_computador' => 1002, 'status' => 'Ativo'],
            ['num_computador' => 1003, 'status' => 'Em Manutenção'],
            ['num_computador' => 1004, 'status' => 'Inativo'],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sala')->insert([
            ['num_sala' => 30,  'predio' => 'Bloco A'],
            ['num_sala' => 39,  'predio' => 'Bloco A'],
            ['num_sala' => 40,  'predio' => 'Bloco B'],
            ['num_sala' => 45,  'predio' => 'Bloco B'],
            ['num_sala' => 101, 'predio' => 'Bloco A'],
            ['num_sala' => 102, 'predio' => 'Bloco A'],
            ['num_sala' => 201, 'predio' => 'Bloco B'],
        ]);
    }
}

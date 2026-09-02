<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            ['id_usuario' => 1, 'iuid_usuario' => 5001, 'nome' => 'João Silva',  'email' => 'joao.silva@fiec.edu.br',  'cod_responsavel' => 10, 'funcao' => 'Professor'],
            ['id_usuario' => 2, 'iuid_usuario' => 5002, 'nome' => 'Maria Souza', 'email' => 'maria.souza@fiec.edu.br', 'cod_responsavel' => 10, 'funcao' => 'Coordenador'],
            ['id_usuario' => 3, 'iuid_usuario' => 5003, 'nome' => 'Carlos Lima', 'email' => 'carlos.lima@fiec.edu.br', 'cod_responsavel' => 11, 'funcao' => 'Diretor'],
            ['id_usuario' => 4, 'iuid_usuario' => 5004, 'nome' => 'Ana Costa',   'email' => 'ana.costa@fiec.edu.br',   'cod_responsavel' => 12, 'funcao' => 'Analista de TI'],
            ['id_usuario' => 5, 'iuid_usuario' => 5005, 'nome' => 'Pedro Nunes', 'email' => 'pedro.nunes@fiec.edu.br', 'cod_responsavel' => 10, 'funcao' => 'Professor'],
        ]);
    }
}

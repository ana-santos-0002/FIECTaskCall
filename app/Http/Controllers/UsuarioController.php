<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function criar()
    {
        return view('usuario');
    }

    public function salvar(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        Usuario::create([
            'nome' => $request->nome,
            'iuid_usuario' => 1,
            'email' => 'teste' . time() . '@teste.com',
            'cod_responsavel' => 1,
            'funcao' => 'Teste',
        ]);

        return redirect('/teste-usuario');
    }
}

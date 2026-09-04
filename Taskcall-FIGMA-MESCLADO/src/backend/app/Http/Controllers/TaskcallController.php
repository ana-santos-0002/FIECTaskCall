<?php

namespace App\Http\Controllers;

use App\Models\Chamado;
use App\Models\Equipamento;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

//Função de login -> valida o cadastro para o usuário poder acessar
class TaskcallController extends Controller
{
    public function login(Request $request): JsonResponse  //a resposta deve ser em json para passar para o front
    {
    //validando o campo usuário -> texto de tamanho máximo 100 caracteres
    //validando o campo senha -> texto de tamanho máximo 100 caracteres

        $data = $request->validate([
            'usuario' => ['required', 'string', 'max:100'],
            'senha' => ['required', 'string', 'max:100'],
        ]);

        //consulta com o banco de dados
        $usuario = Usuario::query() // query = consulta
            ->where('email', $data['usuario']) //aonde o email é exatamente como digitado na table usuarios
            ->orWhere('iuid_usuario', is_numeric($data['usuario']) ? (int) $data['usuario'] : -1)
            //ou consulta o iuid_usuarop -> é número?(true) -> vai pegar o int que está no bd
            //se o usuario digital o email o is_numero vai ser false, e por isso vai mostrar o email e atribuir o código -1
            ->first();  //mostre o primeiro usuário que encontrar

        if (!$usuario || !hash_equals((string) $usuario->senha, (string) $data['senha'])) {
            return response()->json(['message' => 'Usuário ou senha inválidos.'], 401);
        }

        return response()->json([
            'message' => 'Login realizado com sucesso.',
            'usuario' => [
                'id_usuario' => $usuario->id_usuario,
                'iuid_usuario' => $usuario->iuid_usuario,
                'nome' => $usuario->nome ?: $usuario->email,
                'email' => $usuario->email,
                'funcao' => $usuario->funcao,
            ],
        ]);
    }

    public function painel(Request $request): JsonResponse
    {
        $idUsuario = $request->input('id_usuario');

        $query = Chamado::with([
            'usuario:id_usuario,iuid_usuario,nome,email,funcao',
            'equipamento:num_equipamentos,num_sala,num_computador,status,equipamentos_col',
        ])->orderByDesc('data');

        if ($idUsuario) {
            $query->where('id_usuario', (int) $idUsuario);
        }

        $chamados = $query->get()->map(fn (Chamado $chamado): array => $this->serializeChamado($chamado))->values();

        return response()->json([
            'chamados' => $chamados,
            'metricas' => [
                'total' => $chamados->count(),
                'abertos' => $chamados->where('status', 'Aberto')->count(),
                'andamento' => $chamados->where('status', 'Em progresso')->count(),
                'pendentes' => $chamados->where('status', 'Aguardando')->count(),
                'concluidos' => $chamados->where('status', 'Resolvido')->count(),
            ],
        ]);
    }

    public function equipamentos(): JsonResponse
    {
        return response()->json(Equipamento::query()->orderBy('num_sala')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'titulo' => ['required', 'string', 'max:100'],
            'descricao' => ['required', 'string', 'max:5000'],
            'categoria' => ['required', 'string', 'max:15'],
            'prioridade' => ['nullable', 'string', 'in:Baixa,Média,Alta,Urgente'],
            'id_usuario' => ['nullable', 'integer', 'exists:usuarios,id_usuario'],
            'num_equipamento' => ['required', 'integer', 'exists:equipamentos,num_equipamentos'],
            'setor' => ['nullable', 'string', 'max:100'],
        ]);

        $idUsuario = $data['id_usuario'] ?? null;
        if (!$idUsuario) {
            return response()->json(['message' => 'Faça login antes de abrir um chamado.'], 401);
        }

        $chamado = DB::transaction(function () use ($data, $idUsuario): Chamado {
            $next = ((int) Chamado::query()->lockForUpdate()->max('cod_chamado')) + 1;
            $descricao = trim($data['descricao']);

            return Chamado::create([
                'cod_chamado' => $next,
                'titulo' => trim($data['titulo']),
                'descricao' => Str::limit($descricao, 150, ''),
                'descricao_detalhada' => $descricao,
                'categoria' => $data['categoria'],
                'prioridade' => $data['prioridade'] ?? 'Média',
                'status' => 'Aberto',
                'data' => now(),
                'id_usuario' => $idUsuario,
                'num_equipamento' => $data['num_equipamento'],
                'setor' => trim((string) ($data['setor'] ?? '')) ?: null,
            ]);
        });

        return response()->json([
            'message' => 'Chamado criado com sucesso.',
            'chamado' => $this->serializeChamado($chamado->load(['usuario', 'equipamento'])),
        ], 201);
    }

    public function updateStatus(Request $request, int $codChamado): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:Aberto,Em progresso,Aguardando,Resolvido'],
        ]);

        $chamado = Chamado::findOrFail($codChamado);
        $chamado->update(['status' => $this->statusToDatabase($data['status'])]);

        return response()->json([
            'message' => 'Status atualizado com sucesso.',
            'chamado' => $this->serializeChamado($chamado->load(['usuario', 'equipamento'])),
        ]);
    }

    public function destroy(int $codChamado): JsonResponse
    {
        $chamado = Chamado::findOrFail($codChamado);
        $chamado->delete();

        return response()->json(['message' => 'Chamado excluído com sucesso.']);
    }

    private function serializeChamado(Chamado $chamado): array
    {
        $titulo = $chamado->titulo ?: Str::before((string) $chamado->descricao, ' — ');
        $descricao = $chamado->descricao_detalhada ?: (string) $chamado->descricao;

        return [
            'id' => (string) $chamado->cod_chamado,
            'cod_chamado' => $chamado->cod_chamado,
            'titulo' => $titulo ?: 'Chamado sem título',
            'descricao' => $descricao,
            'categoria' => $chamado->categoria,
            'prioridade' => $chamado->prioridade ?: 'Média',
            'status' => $this->statusToUi((string) $chamado->status),
            'data' => optional($chamado->data)->format('d/m/Y · H:i'),
            'id_usuario' => $chamado->id_usuario,
            'solicitante' => $chamado->usuario?->nome ?: $chamado->usuario?->email ?: 'Usuário',
            'setor' => $chamado->setor ?: ($chamado->equipamento ? 'Sala ' . $chamado->equipamento->num_sala : 'Não informado'),
            'num_equipamento' => $chamado->num_equipamento,
        ];
    }

    private function statusToUi(string $status): string
    {
        return match ($status) {
            'Em Andamento', 'Em andamento', 'Em progresso' => 'Em progresso',
            'Pendente', 'Aguardando' => 'Aguardando',
            'Concluído', 'Concluido', 'Resolvido' => 'Resolvido',
            default => 'Aberto',
        };
    }

    private function statusToDatabase(string $status): string
    {
        return match ($status) {
            'Em progresso' => 'Em Andamento',
            'Aguardando' => 'Pendente',
            'Resolvido' => 'Concluído',
            default => 'Aberto',
        };
    }
}

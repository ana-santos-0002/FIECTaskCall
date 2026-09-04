<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chamado extends Model
{
    protected $table = 'chamados';
    protected $primaryKey = 'cod_chamado';
    public $incrementing = false;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'cod_chamado',
        'titulo',
        'descricao',
        'descricao_detalhada',
        'categoria',
        'prioridade',
        'status',
        'data',
        'id_usuario',
        'num_equipamento',
        'setor',
    ];
    protected $casts = ['data' => 'datetime'];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function equipamento(): BelongsTo
    {
        return $this->belongsTo(Equipamento::class, 'num_equipamento', 'num_equipamentos');
    }
}

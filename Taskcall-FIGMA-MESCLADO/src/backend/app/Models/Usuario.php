<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public $timestamps = false;
    protected $fillable = ['iuid_usuario', 'nome', 'email', 'senha', 'cod_responsavel', 'funcao'];
    protected $hidden = ['senha'];

    public function chamados(): HasMany
    {
        return $this->hasMany(Chamado::class, 'id_usuario', 'id_usuario');
    }
}

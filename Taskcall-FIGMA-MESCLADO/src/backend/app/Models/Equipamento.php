<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equipamento extends Model
{
    protected $table = 'equipamentos';
    protected $primaryKey = 'num_equipamentos';
    public $timestamps = false;
    protected $fillable = ['num_sala', 'num_computador', 'status', 'data', 'equipamentos_col'];
    protected $casts = ['data' => 'datetime'];

    public function chamados(): HasMany { return $this->hasMany(Chamado::class, 'num_equipamento', 'num_equipamentos'); }
}

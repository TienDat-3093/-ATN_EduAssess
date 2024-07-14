<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topics extends Model
{
    use HasFactory;
    protected $table = 'topics';
    use SoftDeletes;
    protected $fillable = [
        'name',
        'deleted_at',
        'created_at',
        'updated_at',
    ];

    public function tests()
    {
        return $this->hasMany(Tests::class,'topic_data');
    }
}

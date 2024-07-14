<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tags extends Model
{
    use HasFactory;
    protected $table = 'tags';
    use SoftDeletes;
    protected $fillable = [
        'name',
        'deleted_at',
        'created_at',
        'updated_at',
    ];
}

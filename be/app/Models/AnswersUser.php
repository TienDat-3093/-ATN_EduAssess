<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnswersUser extends Model
{
    use HasFactory;
    protected $table = 'answer_users';
    use SoftDeletes;
}

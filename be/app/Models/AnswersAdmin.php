<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnswersAdmin extends Model
{
    use HasFactory;
    protected $table ='answer_admins';
    use SoftDeletes;
    protected $fillable = [
        'answer_data',
        'deleted_at',
        'created_at',
        'updated_at',
        'question_admin_id',
    ];
    public function question_admin()
    {
        return $this->belongsTo(QuestionsAdmin::class);
    }
}

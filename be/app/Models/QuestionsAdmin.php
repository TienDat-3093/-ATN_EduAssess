<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionsAdmin extends Model
{
    use HasFactory;
    protected $table = 'question_admins';
    protected $fillable = [
        'question_text',
        'question_img',
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'question_type_id',
        'level_id',
        'topic_id',
    ];
    use SoftDeletes;
    public static function isTopicUsedInQuestionAdmins($topicId)
    {
        $question = self::where('topic_id', $topicId)->withTrashed()->get();
        if ($question->isNotEmpty()) {
            return true;
        }
        return false;
    }
    public function user()
    {
        return $this->belongsTo(Users::class);
    }
    public function level()
    {
        return $this->belongsTo(Levels::class);
    }
    public function topic()
    {
        return $this->belongsTo(Topics::class);
    }
    public function question_type()
    {
        return $this->belongsTo(QuestionTypes::class);
    }
}

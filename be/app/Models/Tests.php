<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tests extends Model
{
    use HasFactory;
    protected $table = 'tests';
    use SoftDeletes;
    protected $fillable = [
        'question_admin',
        'question_user',
        'name',
        'test_img',
        'password',
        'topic_data',
        'tag_data',
        'done_count',
        'privacy',
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
    ];
    public static function isTagUsedInTests($tagId)
    {
        $tests = self::select('tag_data')->get();
        foreach ($tests as $test) {
            if (in_array($tagId, json_decode($test->tag_data))) {
                return true;
            }
        }
        return false;
    }
    public static function isQuestionUsedInTests($questionId)
    {
        $tests = self::select('question_admin')->get();
        foreach ($tests as $test) {
            if (in_array($questionId, json_decode($test->question_admin))) {
                return true;
            }
        }
        return false;
    }

    public function user()
    {
        return $this->belongsTo(Users::class);
    }
    public function topic()
    {
        return $this->belongsTo(Topics::class, 'id');
    }
}

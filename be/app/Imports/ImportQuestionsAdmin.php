<?php

namespace App\Imports;

use App\Models\QuestionsAdmin;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportQuestionsAdmin implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new QuestionsAdmin([
            'question_text' => $row['question_text'],
            'question_img' => $row['question_img'],
            'deleted_at' => $row['deleted_at'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at'],
            'user_id' => $row['user_id'],
            'question_type_id' => $row['question_type_id'],
            'level_id' => $row['level_id'],
            'topic_id' => $row['topic_id'],
        ]);
    }
}

<?php

namespace App\Imports;

use App\Models\AnswersAdmin;
use App\Models\QuestionsAdmin;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportAnswersAdmin implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new AnswersAdmin([
            'answer_data' => $row['answer_data'],
            'deleted_at' => $row['deleted_at'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at'],
            'question_admin_id' => $row['question_admin_id'],
        ]);
    }
}

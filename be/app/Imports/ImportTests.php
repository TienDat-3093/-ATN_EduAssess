<?php

namespace App\Imports;

use App\Models\Tests;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ImportTests implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Tests([
            'question_data' => $row['question_admin'],
            'question_data' => $row['question_user'],
            'name' => $row['name'],
            'test_img' => $row['test_img'],
            'password' => $row['password'],
            'topic_data' => $row['topic_data'],
            'tag_data' => $row['tag_data'],
            'done_count' => $row['done_count'],
            'privacy' => $row['privacy'],
            'deleted_at' => $row['deleted_at'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at'],
            'user_id' => $row['user_id'],
        ]);
    }
}

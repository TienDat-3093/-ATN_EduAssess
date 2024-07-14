<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\QuestionTypes;

class QuestionTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listTypes = ['many answers','one answer','true false'];
        foreach($listTypes as $type)
        {
            QuestionTypes::create([
                'name' => $type,
            ]);
        }
    }
}

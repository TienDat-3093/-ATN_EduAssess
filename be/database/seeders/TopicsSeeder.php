<?php

namespace Database\Seeders;

use App\Models\Topics;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listTopic = ['php','c++','python','math','frontend'];
        foreach($listTopic as $topic)
        {
            Topics::create([
                'name' => $topic,
            ]);
        }
    }
}

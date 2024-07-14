<?php

namespace Database\Seeders;

use App\Models\QuestionTypes;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LevelsSeeder::class,
            // TopicsSeeder::class,
            QuestionTypesSeeder::class,
            UsersSeeder::class,
            // QuestionsAdminSeeder::class,
            TagsSeeder::class,
        ]);
    }
}

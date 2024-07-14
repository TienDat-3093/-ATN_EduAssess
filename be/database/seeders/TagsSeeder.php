<?php

namespace Database\Seeders;

use App\Models\Tags;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $listTag = ['IT','Math','Science','History','Literature','Geography','Language'];
        foreach($listTag as $tag)
        {
            Tags::create([
                'name' => $tag,
            ]);
        }
    }
}

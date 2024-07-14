<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuestionsAdmin>
 */
class QuestionsAdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageDirectory = public_path('assets/images/products');
        $images = glob($imageDirectory . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
        $randomImage = $images[array_rand($images)];
        $randomImageName = basename($randomImage);
        return [
            'question_text' => $this->faker->sentence,
            'question_img' => 'assets/images/products/'.$randomImageName,
            'user_id' => $this->faker->numberBetween(1,10),
            'question_type_id' => $this->faker->numberBetween(1,3),
            'level_id' => $this->faker->numberBetween(1,3),
            'topic_id' => $this->faker->numberBetween(1,3),
        ];
    }
}

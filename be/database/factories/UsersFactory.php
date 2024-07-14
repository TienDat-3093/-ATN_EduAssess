<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Users>
 */
class UsersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'displayname' => $this->faker->userName,
            'email' => $this->faker->email,
            'password' => Hash::make('123456'),
            'date_of_birth' => $this->faker->date(),
            'admin_role' => $this->faker->numberBetween(0,2),
            'status' => $this->faker->numberBetween(0,1),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\QaLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<QaLog>
 */
class QaLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id' => Property::factory(),
            'question' => fake()->sentence().'?',
            'answer' => fake()->paragraph(),
        ];
    }
}

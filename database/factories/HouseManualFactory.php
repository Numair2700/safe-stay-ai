<?php

namespace Database\Factories;

use App\Models\HouseManual;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<HouseManual>
 */
class HouseManualFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id' => Property::factory(),
            'filename' => fake()->word().'.txt',
            'content' => fake()->paragraphs(3, true),
        ];
    }
}

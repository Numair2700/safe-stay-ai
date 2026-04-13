<?php

namespace Database\Factories;

use App\Models\MaintenanceIssue;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MaintenanceIssue>
 */
class MaintenanceIssueFactory extends Factory
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
            'description' => fake()->sentence(),
            'status' => 'open',
        ];
    }
}

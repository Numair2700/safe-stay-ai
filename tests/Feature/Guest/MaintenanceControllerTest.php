<?php

namespace Tests\Feature\Guest;

use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MaintenanceControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_a_maintenance_issue(): void
    {
        // Given a property
        $property = Property::factory()->create();

        // When guest submits a maintenance issue
        $response = $this->post(route('guest.maintenance.store', $property), [
            'description' => 'The kitchen tap is leaking.',
        ]);

        // Then it is saved and a success response is returned
        $response->assertOk();
        $this->assertDatabaseHas('maintenance_issues', [
            'property_id' => $property->id,
            'description' => 'The kitchen tap is leaking.',
            'status' => 'open',
        ]);
    }

    public function test_maintenance_issue_requires_a_description(): void
    {
        $property = Property::factory()->create();

        $response = $this->post(route('guest.maintenance.store', $property), [
            'description' => '',
        ]);

        $response->assertSessionHasErrors('description');
        $this->assertDatabaseCount('maintenance_issues', 0);
    }

    public function test_description_cannot_exceed_1000_characters(): void
    {
        $property = Property::factory()->create();

        $response = $this->post(route('guest.maintenance.store', $property), [
            'description' => str_repeat('a', 1001),
        ]);

        $response->assertSessionHasErrors('description');
    }

    public function test_maintenance_issue_returns_404_for_non_existent_property(): void
    {
        $response = $this->post(route('guest.maintenance.store', 9999), [
            'description' => 'Something is broken.',
        ]);

        $response->assertNotFound();
    }

    public function test_issue_is_created_with_open_status_by_default(): void
    {
        $property = Property::factory()->create();

        $this->post(route('guest.maintenance.store', $property), [
            'description' => 'Broken window.',
        ]);

        $this->assertDatabaseHas('maintenance_issues', [
            'property_id' => $property->id,
            'status' => 'open',
        ]);
    }
}

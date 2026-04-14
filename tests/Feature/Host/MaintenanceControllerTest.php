<?php

namespace Tests\Feature\Host;

use App\Models\MaintenanceIssue;
use App\Models\Property;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MaintenanceControllerTest extends TestCase
{
    use RefreshDatabase;

    // --- index ---

    public function test_host_can_view_maintenance_issues_for_their_property(): void
    {
        // Given a host with a property and maintenance issues
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);
        MaintenanceIssue::factory()->count(2)->create(['property_id' => $property->id, 'status' => 'open']);
        MaintenanceIssue::factory()->create(['property_id' => $property->id, 'status' => 'resolved']);

        // When host visits the maintenance index
        $response = $this->actingAs($host)->get(route('host.properties.maintenance.index', $property));

        // Then they see all issues
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/Maintenance/Index')
            ->has('openIssues', 2)
            ->has('resolvedIssues', 1)
        );
    }

    public function test_host_cannot_view_maintenance_issues_for_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $response = $this->actingAs($host)->get(route('host.properties.maintenance.index', $otherProperty));

        $response->assertForbidden();
    }

    // --- resolve ---

    public function test_host_can_resolve_an_open_issue(): void
    {
        // Given a host with an open issue
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);
        $issue = MaintenanceIssue::factory()->create(['property_id' => $property->id, 'status' => 'open']);

        // When host resolves it
        $response = $this->actingAs($host)->patch(
            route('host.properties.maintenance.resolve', [$property, $issue])
        );

        // Then status is updated
        $response->assertRedirect(route('host.properties.maintenance.index', $property));
        $this->assertDatabaseHas('maintenance_issues', [
            'id' => $issue->id,
            'status' => 'resolved',
        ]);
    }

    public function test_host_cannot_resolve_issue_for_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();
        $issue = MaintenanceIssue::factory()->create(['property_id' => $otherProperty->id, 'status' => 'open']);

        $response = $this->actingAs($host)->patch(
            route('host.properties.maintenance.resolve', [$otherProperty, $issue])
        );

        $response->assertForbidden();
        $this->assertDatabaseHas('maintenance_issues', ['id' => $issue->id, 'status' => 'open']);
    }

    public function test_unauthenticated_user_cannot_access_maintenance_routes(): void
    {
        $property = Property::factory()->create();

        $response = $this->get(route('host.properties.maintenance.index', $property));

        $response->assertRedirect(route('login'));
    }
}

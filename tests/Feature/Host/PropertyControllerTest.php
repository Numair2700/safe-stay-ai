<?php

namespace Tests\Feature\Host;

use App\Models\Property;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PropertyControllerTest extends TestCase
{
    use RefreshDatabase;

    // --- index ---

    public function test_host_can_view_their_properties_on_dashboard(): void
    {
        // Given a host with two properties
        $host = User::factory()->host()->create();
        $properties = Property::factory()->count(2)->create(['user_id' => $host->id]);

        // When they visit the host dashboard
        $response = $this->actingAs($host)->get(route('host.properties.index'));

        // Then they see their properties rendered via Inertia
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/Dashboard')
            ->has('properties', 2)
        );
    }

    public function test_host_cannot_see_other_hosts_properties(): void
    {
        // Given two hosts, each with a property
        $host = User::factory()->host()->create();
        $otherHost = User::factory()->host()->create();
        Property::factory()->create(['user_id' => $otherHost->id]);

        // When host visits dashboard
        $response = $this->actingAs($host)->get(route('host.properties.index'));

        // Then they see zero properties (only their own)
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/Dashboard')
            ->has('properties', 0)
        );
    }

    public function test_unauthenticated_user_is_redirected_from_host_routes(): void
    {
        $response = $this->get(route('host.properties.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_guest_role_user_cannot_access_host_routes(): void
    {
        $guest = User::factory()->guest()->create();
        $response = $this->actingAs($guest)->get(route('host.properties.index'));
        $response->assertForbidden();
    }

    // --- create ---

    public function test_host_can_access_create_property_page(): void
    {
        $host = User::factory()->host()->create();

        $response = $this->actingAs($host)->get(route('host.properties.create'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('Host/Properties/Create'));
    }

    // --- store ---

    public function test_host_can_create_a_property(): void
    {
        // Given a host is logged in
        $host = User::factory()->host()->create();

        // When they submit a new property
        $response = $this->actingAs($host)->post(route('host.properties.store'), [
            'name' => 'Beach House',
            'address' => '123 Ocean Drive, Miami, FL',
            'description' => 'A lovely beachfront property.',
        ]);

        // Then the property is stored and they are redirected
        $response->assertRedirect(route('host.properties.index'));
        $this->assertDatabaseHas('properties', [
            'user_id' => $host->id,
            'name' => 'Beach House',
            'address' => '123 Ocean Drive, Miami, FL',
        ]);
    }

    public function test_property_requires_name_and_address_to_create(): void
    {
        $host = User::factory()->host()->create();

        $response = $this->actingAs($host)->post(route('host.properties.store'), [
            'name' => '',
            'address' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'address']);
    }

    // --- edit ---

    public function test_host_can_access_edit_page_for_their_property(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        $response = $this->actingAs($host)->get(route('host.properties.edit', $property));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/Properties/Edit')
            ->has('property')
        );
    }

    public function test_host_cannot_access_edit_page_for_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $response = $this->actingAs($host)->get(route('host.properties.edit', $otherProperty));

        $response->assertForbidden();
    }

    // --- update ---

    public function test_host_can_update_their_property(): void
    {
        // Given a host owns a property
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        // When they update it
        $response = $this->actingAs($host)->put(route('host.properties.update', $property), [
            'name' => 'Updated Name',
            'address' => 'Updated Address',
            'description' => 'Updated description.',
        ]);

        // Then the property is updated
        $response->assertRedirect(route('host.properties.index'));
        $this->assertDatabaseHas('properties', [
            'id' => $property->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_host_cannot_update_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $response = $this->actingAs($host)->put(route('host.properties.update', $otherProperty), [
            'name' => 'Hijacked Name',
            'address' => '123 Fake St',
        ]);

        $response->assertForbidden();
    }

    // --- destroy ---

    public function test_host_can_delete_their_property(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        $response = $this->actingAs($host)->delete(route('host.properties.destroy', $property));

        $response->assertRedirect(route('host.properties.index'));
        $this->assertModelMissing($property);
    }

    public function test_host_cannot_delete_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $response = $this->actingAs($host)->delete(route('host.properties.destroy', $otherProperty));

        $response->assertForbidden();
        $this->assertModelExists($otherProperty);
    }
}

<?php

namespace Tests\Feature\Guest;

use App\Models\HouseManual;
use App\Models\Property;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortalControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_access_property_portal_without_logging_in(): void
    {
        // Given a property exists
        $property = Property::factory()->create();

        // When an unauthenticated visitor accesses the portal URL
        $response = $this->get(route('guest.portal', $property));

        // Then the portal page renders publicly
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Guest/Portal')
            ->has('property')
            ->has('manuals')
        );
    }

    public function test_portal_returns_404_for_non_existent_property(): void
    {
        $response = $this->get(route('guest.portal', 9999));

        $response->assertNotFound();
    }

    public function test_portal_exposes_correct_property_data(): void
    {
        // Given a property with a known name
        $property = Property::factory()->create([
            'name' => 'Sunset Villa',
            'address' => '99 Palm Street, Miami, FL',
        ]);

        $response = $this->get(route('guest.portal', $property));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Guest/Portal')
            ->where('property.name', 'Sunset Villa')
            ->where('property.address', '99 Palm Street, Miami, FL')
        );
    }

    public function test_portal_exposes_manuals_linked_to_the_property(): void
    {
        // Given a property with two manuals
        $property = Property::factory()->create();
        HouseManual::factory()->count(2)->create(['property_id' => $property->id]);

        $response = $this->get(route('guest.portal', $property));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Guest/Portal')
            ->has('manuals', 2)
        );
    }

    public function test_portal_does_not_expose_other_properties_manuals(): void
    {
        // Given two properties, only one has a manual
        $property = Property::factory()->create();
        $otherProperty = Property::factory()->create();
        HouseManual::factory()->create(['property_id' => $otherProperty->id]);

        $response = $this->get(route('guest.portal', $property));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('manuals', 0)
        );
    }

    public function test_portal_is_accessible_even_when_logged_in_as_host(): void
    {
        // A logged-in host can also preview the guest portal
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        $response = $this->actingAs($host)->get(route('guest.portal', $property));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page->component('Guest/Portal'));
    }

    public function test_portal_page_includes_csrf_meta_token_for_chat_post_requests(): void
    {
        $property = Property::factory()->create();

        $response = $this->get(route('guest.portal', $property));

        $response->assertOk();
        $response->assertSee('meta name="csrf-token"', false);
    }
}

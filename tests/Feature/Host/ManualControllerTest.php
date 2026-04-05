<?php

namespace Tests\Feature\Host;

use App\Models\HouseManual;
use App\Models\Property;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ManualControllerTest extends TestCase
{
    use RefreshDatabase;

    // --- show (property detail with manual) ---

    public function test_host_can_view_property_detail_page(): void
    {
        // Given a host with a property
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        // When they visit the property detail page
        $response = $this->actingAs($host)->get(route('host.properties.show', $property));

        // Then it renders with the property and its manuals
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/Properties/Show')
            ->has('property')
            ->has('manuals')
        );
    }

    public function test_host_cannot_view_another_hosts_property_detail(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $response = $this->actingAs($host)->get(route('host.properties.show', $otherProperty));

        $response->assertForbidden();
    }

    // --- store manual ---

    public function test_host_can_upload_a_text_file_as_house_manual(): void
    {
        // Given a host owns a property
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        // When they upload a text file
        $file = UploadedFile::fake()->createWithContent('manual.txt', 'Welcome to the property. WiFi password is 12345.');

        $response = $this->actingAs($host)->post(route('host.properties.manuals.store', $property), [
            'manual' => $file,
        ]);

        // Then the manual is stored in the database
        $response->assertRedirect(route('host.properties.show', $property));
        $this->assertDatabaseHas('house_manuals', [
            'property_id' => $property->id,
            'filename' => 'manual.txt',
        ]);
    }

    public function test_manual_upload_requires_a_file(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        $response = $this->actingAs($host)->post(route('host.properties.manuals.store', $property), [
            'manual' => null,
        ]);

        $response->assertSessionHasErrors('manual');
    }

    public function test_manual_upload_only_accepts_text_files(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);

        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($host)->post(route('host.properties.manuals.store', $property), [
            'manual' => $file,
        ]);

        $response->assertSessionHasErrors('manual');
    }

    public function test_host_cannot_upload_manual_to_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();

        $file = UploadedFile::fake()->createWithContent('manual.txt', 'Some content.');

        $response = $this->actingAs($host)->post(route('host.properties.manuals.store', $otherProperty), [
            'manual' => $file,
        ]);

        $response->assertForbidden();
    }

    // --- destroy manual ---

    public function test_host_can_delete_a_manual(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);
        $manual = HouseManual::factory()->create(['property_id' => $property->id]);

        $response = $this->actingAs($host)->delete(route('host.properties.manuals.destroy', [$property, $manual]));

        $response->assertRedirect(route('host.properties.show', $property));
        $this->assertModelMissing($manual);
    }

    public function test_host_cannot_delete_a_manual_from_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();
        $manual = HouseManual::factory()->create(['property_id' => $otherProperty->id]);

        $response = $this->actingAs($host)->delete(route('host.properties.manuals.destroy', [$otherProperty, $manual]));

        $response->assertForbidden();
        $this->assertModelExists($manual);
    }
}

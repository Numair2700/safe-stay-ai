<?php

namespace Tests\Feature\Host;

use App\Models\Property;
use App\Models\QaLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QaLogControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_host_can_view_qa_logs_for_their_property(): void
    {
        // Given a host with a property and Q&A logs
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);
        QaLog::factory()->count(3)->create(['property_id' => $property->id]);

        // When host visits the Q&A log page
        $response = $this->actingAs($host)->get(route('host.properties.qa-logs.index', $property));

        // Then they see all logs
        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Host/QaLogs/Index')
            ->has('qaLogs', 3)
        );
    }

    public function test_host_cannot_view_qa_logs_for_another_hosts_property(): void
    {
        $host = User::factory()->host()->create();
        $otherProperty = Property::factory()->create();
        QaLog::factory()->count(2)->create(['property_id' => $otherProperty->id]);

        $response = $this->actingAs($host)->get(route('host.properties.qa-logs.index', $otherProperty));

        $response->assertForbidden();
    }

    public function test_host_sees_only_their_propertys_logs(): void
    {
        $host = User::factory()->host()->create();
        $property = Property::factory()->create(['user_id' => $host->id]);
        $otherProperty = Property::factory()->create();

        QaLog::factory()->count(2)->create(['property_id' => $property->id]);
        QaLog::factory()->count(5)->create(['property_id' => $otherProperty->id]);

        $response = $this->actingAs($host)->get(route('host.properties.qa-logs.index', $property));

        $response->assertInertia(fn ($page) => $page->has('qaLogs', 2));
    }

    public function test_unauthenticated_user_cannot_access_qa_logs(): void
    {
        $property = Property::factory()->create();

        $response = $this->get(route('host.properties.qa-logs.index', $property));

        $response->assertRedirect(route('login'));
    }
}

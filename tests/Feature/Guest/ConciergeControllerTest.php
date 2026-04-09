<?php

namespace Tests\Feature\Guest;

use App\Models\HouseManual;
use App\Models\Property;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ConciergeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_ask_a_question_about_property(): void
    {
        // Given a property with a house manual
        $property = Property::factory()->create();
        HouseManual::factory()->create([
            'property_id' => $property->id,
            'filename' => 'manual.txt',
            'content' => 'WiFi password is 12345. Checkout time is 11am.',
        ]);

        // Mock Groq API
        Http::fake([
            'api.groq.com/*' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'The WiFi password is 12345.',
                        ],
                    ],
                ],
            ]),
        ]);

        // When guest posts a question
        $response = $this->post(route('guest.concierge.ask', $property), [
            'question' => 'What is the WiFi password?',
        ]);

        // Then answer is logged and returned
        $response->assertOk();
        $response->assertJsonStructure(['question', 'answer', 'created_at']);

        $this->assertDatabaseHas('qa_logs', [
            'property_id' => $property->id,
            'question' => 'What is the WiFi password?',
            'answer' => 'The WiFi password is 12345.',
        ]);
    }

    public function test_concierge_returns_404_for_non_existent_property(): void
    {
        $response = $this->post(route('guest.concierge.ask', 9999), [
            'question' => 'Hello?',
        ]);

        $response->assertNotFound();
    }

    public function test_concierge_returns_fallback_when_property_has_no_manuals(): void
    {
        // Given a property with NO manuals
        $property = Property::factory()->create();

        // When guest asks a question
        $response = $this->post(route('guest.concierge.ask', $property), [
            'question' => 'What should I do?',
        ]);

        // Then fallback is returned
        $response->assertOk();
        $response->assertJson([
            'question' => 'What should I do?',
            'answer' => 'No property information available. Please contact the owner.',
        ]);

        // And NO log entry created
        $this->assertDatabaseMissing('qa_logs', [
            'property_id' => $property->id,
        ]);
    }

    public function test_concierge_returns_fallback_on_api_failure(): void
    {
        // Given a property with a manual
        $property = Property::factory()->create();
        HouseManual::factory()->create([
            'property_id' => $property->id,
            'content' => 'Some content',
        ]);

        // Mock Groq API to fail
        Http::fake([
            'api.groq.com/*' => Http::response([], 500),
        ]);

        // When guest asks a question
        $response = $this->post(route('guest.concierge.ask', $property), [
            'question' => 'How do I turn on the heating?',
        ]);

        // Then fallback is returned
        $response->assertOk();
        $response->assertJson([
            'question' => 'How do I turn on the heating?',
            'answer' => 'I\'m sorry, I couldn\'t process your question. Please try again.',
        ]);
    }

    public function test_question_is_required(): void
    {
        $property = Property::factory()->create();

        $response = $this->post(route('guest.concierge.ask', $property), [
            'question' => '',
        ]);

        $response->assertSessionHasErrors('question');
    }

    public function test_question_cannot_exceed_1000_characters(): void
    {
        $property = Property::factory()->create();

        $response = $this->post(route('guest.concierge.ask', $property), [
            'question' => str_repeat('a', 1001),
        ]);

        $response->assertSessionHasErrors('question');
    }

    public function test_logged_in_host_can_ask_questions_on_public_portal(): void
    {
        // Given a logged-in host
        $host = User::factory()->host()->create();

        // And a property (not theirs) with a manual
        $property = Property::factory()->create();
        HouseManual::factory()->create([
            'property_id' => $property->id,
            'content' => 'House rules: no smoking',
        ]);

        Http::fake([
            'api.groq.com/*' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'No smoking is allowed.',
                        ],
                    ],
                ],
            ]),
        ]);

        // When host posts a question to public portal
        $response = $this->actingAs($host)->post(route('guest.concierge.ask', $property), [
            'question' => 'Can I smoke?',
        ]);

        // Then it works same as guest
        $response->assertOk();
        $this->assertDatabaseHas('qa_logs', [
            'property_id' => $property->id,
            'question' => 'Can I smoke?',
        ]);
    }
}

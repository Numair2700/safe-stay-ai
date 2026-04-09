<?php

namespace App\Services;

use App\Models\Property;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class ConciergeService
{
    public function generateAnswer(Property $property, string $question): string
    {
        // Check if property has any manuals
        if ($property->houseManuals()->count() === 0) {
            return 'No property information available. Please contact the owner.';
        }

        // Gather manual content for context
        $manualContent = $property->houseManuals()
            ->get()
            ->map(fn ($manual) => "File: {$manual->filename}\n{$manual->content}")
            ->join("\n\n---\n\n");

        $systemPrompt = "You are a property concierge assistant. Answer guest questions ONLY based on the provided property manual content below. If the manual doesn't contain information to answer the question, respond with: 'I don't have information about that. Please contact the property owner.'\n\nProperty Manual Content:\n\n{$manualContent}";
        $apiKey = config('services.groq.api_key');

        if (blank($apiKey)) {
            Log::warning('Concierge request failed: GROQ_API_KEY is not configured.');

            return 'I\'m sorry, I couldn\'t process your question. Please try again.';
        }

        $modelsToTry = array_values(array_unique(array_filter([
            config('services.groq.model'),
            'llama-3.3-70b-versatile',
            'llama-3.1-8b-instant',
            'groq/compound',
        ])));

        try {
            foreach ($modelsToTry as $model) {
                $response = Http::timeout(20)
                    ->acceptJson()
                    ->withToken($apiKey)
                    ->post('https://api.groq.com/openai/v1/chat/completions', [
                        'model' => $model,
                        'messages' => [
                            ['role' => 'system', 'content' => $systemPrompt],
                            ['role' => 'user', 'content' => $question],
                        ],
                    ]);

                if ($response->successful()) {
                    $answer = $response->json('choices.0.message.content');

                    if (filled($answer)) {
                        return trim($answer);
                    }
                }

                if ($this->shouldTryNextModel($response)) {
                    continue;
                }

                Log::warning('Concierge request failed with Groq API error.', [
                    'status' => $response->status(),
                    'model' => $model,
                    'body' => $response->json() ?: $response->body(),
                ]);

                break;
            }

            return 'I\'m sorry, I couldn\'t process your question. Please try again.';
        } catch (Throwable $e) {
            Log::error('Concierge request threw an exception.', [
                'message' => $e->getMessage(),
            ]);

            return 'I\'m sorry, I couldn\'t process your question. Please try again.';
        }
    }

    private function shouldTryNextModel(Response $response): bool
    {
        if (! in_array($response->status(), [400, 404], true)) {
            return false;
        }

        $errorPayload = $response->json('error') ?? $response->json();
        $errorText = strtolower(json_encode($errorPayload) ?: $response->body());

        return str_contains($errorText, 'model')
            || str_contains($errorText, 'not found')
            || str_contains($errorText, 'does not exist')
            || str_contains($errorText, 'deprecated');
    }
}

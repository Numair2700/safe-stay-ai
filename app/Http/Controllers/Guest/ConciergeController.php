<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\StoreQuestionRequest;
use App\Models\Property;
use App\Services\ConciergeService;
use Illuminate\Http\JsonResponse;

class ConciergeController extends Controller
{
    public function __construct(public ConciergeService $conciergeService) {}

    public function ask(StoreQuestionRequest $request, Property $property): JsonResponse
    {
        $question = $request->validated('question');
        $answer = $this->conciergeService->generateAnswer($property, $question);

        // Log the Q&A only if property has manuals (not for fallback case)
        if ($property->houseManuals()->count() > 0) {
            $property->qaLogs()->create([
                'question' => $question,
                'answer' => $answer,
            ]);
        }

        return response()->json([
            'question' => $question,
            'answer' => $answer,
            'created_at' => now(),
        ]);
    }
}

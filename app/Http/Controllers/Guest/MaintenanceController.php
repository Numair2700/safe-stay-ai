<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceIssue;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function store(Request $request, Property $property): JsonResponse
    {
        $validated = $request->validate([
            'description' => ['required', 'string', 'max:1000'],
        ]);

        $issue = MaintenanceIssue::create([
            'property_id' => $property->id,
            'description' => $validated['description'],
            'status' => 'open',
        ]);

        return response()->json([
            'id' => $issue->id,
            'description' => $issue->description,
            'status' => $issue->status,
            'created_at' => $issue->created_at,
        ]);
    }
}

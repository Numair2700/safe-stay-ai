<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class QaLogController extends Controller
{
    public function index(Property $property): Response
    {
        if ($property->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Host/QaLogs/Index', [
            'property' => $property,
            'qaLogs' => $property->qaLogs()->latest()->get(),
        ]);
    }
}

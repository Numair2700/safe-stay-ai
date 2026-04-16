<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QaLogController extends Controller
{
    public function overview(): Response
    {
        $properties = Property::where('user_id', Auth::id())
            ->with(['qaLogs' => fn ($q) => $q->latest()])
            ->get();

        return Inertia::render('Host/QaLogs/Overview', [
            'properties' => $properties,
            'totalCount' => $properties->sum(fn ($p) => $p->qa_logs->count()),
        ]);
    }

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

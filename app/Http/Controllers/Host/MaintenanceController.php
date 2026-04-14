<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceIssue;
use App\Models\Property;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function index(Property $property): Response
    {
        if ($property->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Host/Maintenance/Index', [
            'property' => $property,
            'openIssues' => $property->maintenanceIssues()->where('status', 'open')->latest()->get(),
            'resolvedIssues' => $property->maintenanceIssues()->where('status', 'resolved')->latest()->get(),
        ]);
    }

    public function resolve(Property $property, MaintenanceIssue $issue): RedirectResponse
    {
        if ($property->user_id !== auth()->id()) {
            abort(403);
        }

        $issue->update(['status' => 'resolved']);

        return redirect()->route('host.properties.maintenance.index', $property);
    }
}

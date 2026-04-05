<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Http\Requests\Host\StoreManualRequest;
use App\Models\HouseManual;
use App\Models\Property;
use App\Services\ManualService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;

class ManualController extends Controller
{
    public function __construct(public ManualService $manualService) {}

    public function store(StoreManualRequest $request, Property $property): RedirectResponse
    {
        Gate::authorize('update', $property);

        $this->manualService->storeManual($property, $request->file('manual'));

        return redirect()->route('host.properties.show', $property)
            ->with('success', 'House manual uploaded successfully.');
    }

    public function destroy(Property $property, HouseManual $manual): RedirectResponse
    {
        Gate::authorize('update', $property);

        $this->manualService->deleteManual($manual);

        return redirect()->route('host.properties.show', $property)
            ->with('success', 'Manual deleted.');
    }
}

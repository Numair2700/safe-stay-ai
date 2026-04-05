<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Http\Requests\Host\StorePropertyRequest;
use App\Http\Requests\Host\UpdatePropertyRequest;
use App\Models\Property;
use App\Services\PropertyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    public function __construct(public PropertyService $propertyService) {}

    public function index(): Response
    {
        return Inertia::render('Host/Dashboard', [
            'properties' => $this->propertyService->getPropertiesForHost(auth()->user()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Host/Properties/Create');
    }

    public function store(StorePropertyRequest $request): RedirectResponse
    {
        $this->propertyService->createProperty(auth()->user(), $request->validated());

        return redirect()->route('host.properties.index')
            ->with('success', 'Property created successfully.');
    }

    public function show(Property $property): Response
    {
        Gate::authorize('update', $property);

        return Inertia::render('Host/Properties/Show', [
            'property' => $property,
            'manuals' => $property->houseManuals()->latest()->get(),
        ]);
    }

    public function edit(Property $property): Response
    {
        Gate::authorize('update', $property);

        return Inertia::render('Host/Properties/Edit', [
            'property' => $property,
        ]);
    }

    public function update(UpdatePropertyRequest $request, Property $property): RedirectResponse
    {
        Gate::authorize('update', $property);

        $this->propertyService->updateProperty($property, $request->validated());

        return redirect()->route('host.properties.index')
            ->with('success', 'Property updated successfully.');
    }

    public function destroy(Property $property): RedirectResponse
    {
        Gate::authorize('delete', $property);

        $this->propertyService->deleteProperty($property);

        return redirect()->route('host.properties.index')
            ->with('success', 'Property deleted successfully.');
    }
}

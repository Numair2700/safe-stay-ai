<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Inertia\Inertia;
use Inertia\Response;

class PortalController extends Controller
{
    public function show(Property $property): Response
    {
        return Inertia::render('Guest/Portal', [
            'property' => $property->only('id', 'name', 'address', 'description'),
            'manuals' => $property->houseManuals()->latest()->get(['id', 'filename', 'content']),
        ]);
    }
}

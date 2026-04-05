<?php

namespace App\Services;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class PropertyService
{
    public function getPropertiesForHost(User $user): Collection
    {
        return $user->properties()->latest()->get();
    }

    public function createProperty(User $user, array $data): Property
    {
        return $user->properties()->create($data);
    }

    public function updateProperty(Property $property, array $data): Property
    {
        $property->update($data);

        return $property;
    }

    public function deleteProperty(Property $property): void
    {
        $property->delete();
    }
}

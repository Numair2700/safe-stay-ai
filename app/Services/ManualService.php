<?php

namespace App\Services;

use App\Models\HouseManual;
use App\Models\Property;
use Illuminate\Http\UploadedFile;

class ManualService
{
    public function storeManual(Property $property, UploadedFile $file): HouseManual
    {
        $content = $file->getContent();

        return $property->houseManuals()->create([
            'filename' => $file->getClientOriginalName(),
            'content' => $content,
        ]);
    }

    public function deleteManual(HouseManual $manual): void
    {
        $manual->delete();
    }
}

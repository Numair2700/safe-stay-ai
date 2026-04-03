<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HouseManual extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'content',
        'filename',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}

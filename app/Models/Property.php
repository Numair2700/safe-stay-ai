<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function houseManuals(): HasMany
    {
        return $this->hasMany(HouseManual::class);
    }

    public function qaLogs(): HasMany
    {
        return $this->hasMany(QaLog::class);
    }

    public function maintenanceIssues(): HasMany
    {
        return $this->hasMany(MaintenanceIssue::class);
    }
}

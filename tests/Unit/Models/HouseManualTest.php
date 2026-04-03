<?php

namespace Tests\Unit\Models;

use App\Models\HouseManual;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class HouseManualTest extends TestCase
{
    // Given a HouseManual model exists
    // When we inspect its fillable attributes
    // Then they match the schema definition
    public function test_house_manual_has_correct_fillable_attributes(): void
    {
        $manual = new HouseManual();

        $this->assertEquals(['property_id', 'content', 'filename'], $manual->getFillable());
    }

    // Given a HouseManual model exists
    // When we call the property() relationship
    // Then it returns a BelongsTo relation
    public function test_house_manual_belongs_to_property(): void
    {
        $manual = new HouseManual();

        $this->assertInstanceOf(BelongsTo::class, $manual->property());
    }
}

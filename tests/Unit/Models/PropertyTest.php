<?php

namespace Tests\Unit\Models;

use App\Models\HouseManual;
use App\Models\MaintenanceIssue;
use App\Models\Property;
use App\Models\QaLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class PropertyTest extends TestCase
{
    // Given a Property model exists
    // When we inspect its fillable attributes
    // Then they match the schema definition
    public function test_property_has_correct_fillable_attributes(): void
    {
        $property = new Property();

        $this->assertEquals(['user_id', 'name', 'address', 'description'], $property->getFillable());
    }

    // Given a Property model exists
    // When we call the user() relationship
    // Then it returns a BelongsTo relation
    public function test_property_belongs_to_user(): void
    {
        $property = new Property();

        $this->assertInstanceOf(BelongsTo::class, $property->user());
    }

    // Given a Property model exists
    // When we call the houseManuals() relationship
    // Then it returns a HasMany relation
    public function test_property_has_many_house_manuals(): void
    {
        $property = new Property();

        $this->assertInstanceOf(HasMany::class, $property->houseManuals());
    }

    // Given a Property model exists
    // When we call the qaLogs() relationship
    // Then it returns a HasMany relation
    public function test_property_has_many_qa_logs(): void
    {
        $property = new Property();

        $this->assertInstanceOf(HasMany::class, $property->qaLogs());
    }

    // Given a Property model exists
    // When we call the maintenanceIssues() relationship
    // Then it returns a HasMany relation
    public function test_property_has_many_maintenance_issues(): void
    {
        $property = new Property();

        $this->assertInstanceOf(HasMany::class, $property->maintenanceIssues());
    }
}

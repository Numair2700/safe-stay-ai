<?php

namespace Tests\Unit\Models;

use App\Models\MaintenanceIssue;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class MaintenanceIssueTest extends TestCase
{
    // Given a MaintenanceIssue model exists
    // When we inspect its fillable attributes
    // Then they match the schema definition
    public function test_maintenance_issue_has_correct_fillable_attributes(): void
    {
        $issue = new MaintenanceIssue();

        $this->assertEquals(['property_id', 'description', 'status'], $issue->getFillable());
    }

    // Given a MaintenanceIssue model exists
    // When we call the property() relationship
    // Then it returns a BelongsTo relation
    public function test_maintenance_issue_belongs_to_property(): void
    {
        $issue = new MaintenanceIssue();

        $this->assertInstanceOf(BelongsTo::class, $issue->property());
    }
}

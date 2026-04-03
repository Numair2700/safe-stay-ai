<?php

namespace Tests\Unit\Models;

use App\Models\QaLog;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

class QaLogTest extends TestCase
{
    // Given a QaLog model exists
    // When we inspect its fillable attributes
    // Then they match the schema definition
    public function test_qa_log_has_correct_fillable_attributes(): void
    {
        $log = new QaLog();

        $this->assertEquals(['property_id', 'question', 'answer'], $log->getFillable());
    }

    // Given a QaLog model exists
    // When we call the property() relationship
    // Then it returns a BelongsTo relation
    public function test_qa_log_belongs_to_property(): void
    {
        $log = new QaLog();

        $this->assertInstanceOf(BelongsTo::class, $log->property());
    }
}

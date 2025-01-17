<?php

namespace App\Models\Task;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubTask extends Model
{
    protected $table = 'SubTasks';
    protected $primaryKey = 'S_Id';
    protected $guarded = ['S_Id'];
    public const CREATED_AT = 'S_CreatedAt';
    public const UPDATED_AT = 'S_UpdatedAt';

    /**
     * @return BelongsTo
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'S_TaskId', 'T_Id');
    }

}

<?php

namespace App\Models\Task;

use App\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $table = 'Tasks';
    protected $primaryKey = 'T_Id';
    public const CREATED_AT = 'T_CreatedAt';
    public const UPDATED_AT = 'T_UpdatedAt';
    protected $guarded = ['T_Id'];

    /**
     * @return BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'T_ProjectId', 'P_Id');
    }
}

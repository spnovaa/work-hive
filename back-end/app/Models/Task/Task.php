<?php

namespace App\Models\Task;

use App\Models\Project\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * @return HasMany
     */
    public function sub_tasks(): HasMany
    {
        return $this->hasMany(SubTask::class, 'S_TaskId', 'T_Id');
    }

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, UsersTasks::class, 'U_TaskId', 'U_UserId');
    }
}

<?php

namespace App\Models\Project;

use App\Models\Task\Task;
use App\Models\Team\Team;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $table = 'Projects';
    protected $primaryKey = 'P_Id';
    public const CREATED_AT = 'P_CreatedAt';
    const UPDATED_AT = 'P_UpdatedAt';
    protected $guarded = ['P_Id'];

    /**
     * @return BelongsTo
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'P_TeamId', 'T_Id');
    }

    /**
     * @return HasMany
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'T_ProjectId', 'P_Id');
    }
}

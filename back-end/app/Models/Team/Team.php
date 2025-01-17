<?php

namespace App\Models\Team;

use App\Models\Project\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    protected $table = 'Teams';
    protected $primaryKey = 'T_Id';
    protected $guarded = ['T_Id'];
    public const CREATED_AT = 'T_CreatedAt';
    public const UPDATED_AT = 'T_UpdatedAt';

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, TeamsUsers::class, 'T_TeamId', 'T_UserId');
    }

    /**
     * @return HasMany
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'P_TeamId', 'T_Id');
    }

    /**
     * @return BelongsTo
     */
    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'T_AdminId', 'U_Id');
    }
}

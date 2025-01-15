<?php

namespace App\Models\Team;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
}

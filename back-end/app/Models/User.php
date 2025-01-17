<?php

namespace App\Models;

use App\Models\Task\Task;
use App\Models\Task\UsersTasks;
use App\Models\Team\Team;
use App\Models\Team\TeamsUsers;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $table = 'Users';
    protected $primaryKey = 'U_Id';
    protected $guarded = ['U_Id'];
    const CREATED_AT = 'U_CreatedAt';
    const UPDATED_AT = 'U_UpdatedAt';

    public function getAuthPassword()
    {
        return $this->U_Password;
    }

    public function username()
    {
        return 'U_Email';
    }

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * @return BelongsToMany
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, TeamsUsers::class, 'T_UserId', 'T_TeamId');
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, UsersTasks::class, 'U_UserId', 'U_TaskId');
    }

    /**
     * @return HasMany
     */
    public function admin_of_teams(): HasMany
    {
        return $this->hasMany(Team::class, 'T_AdminId', 'T_Id');
    }

}

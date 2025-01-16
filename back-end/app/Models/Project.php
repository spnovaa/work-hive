<?php

namespace App\Models;

use App\Models\Team\Team;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $table = 'Projects';
    protected $primaryKey='P_Id';
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
}

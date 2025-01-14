<?php

namespace App\Models\Team;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'Teams';
    protected $primaryKey = 'T_Id';
    public const CREATED_AT = 'T_CreatedAt';
    public const UPDATED_AT = 'T_UpdatedAt';
}

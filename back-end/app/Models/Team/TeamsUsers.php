<?php

namespace App\Models\Team;

use Illuminate\Database\Eloquent\Relations\Pivot;

class TeamsUsers extends Pivot
{
    protected $table = 'TeamUsers';
    protected $primaryKey = 'T_Id';
    public $timestamps = false;
}

<?php

namespace App\Models\Task;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UsersTasks extends Pivot
{
    protected $table = 'UsersTasks';
    protected $primaryKey = 'U_Id';
    protected $guarded = ['U_Id'];
    public $timestamps = false;
}

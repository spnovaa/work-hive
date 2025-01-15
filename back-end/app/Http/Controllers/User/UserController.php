<?php

namespace App\Http\Controllers\User;

use Illuminate\Routing\Controller;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }


    public function store()
    {

    }
}

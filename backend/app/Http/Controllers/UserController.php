<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CrudTrait;

class UserController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return User::class;
    }
}


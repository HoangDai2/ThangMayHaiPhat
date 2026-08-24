<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Traits\CrudTrait;

class RoleController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Role::class;
    }
}


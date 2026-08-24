<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Traits\CrudTrait;

class ServiceController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Service::class;
    }
}


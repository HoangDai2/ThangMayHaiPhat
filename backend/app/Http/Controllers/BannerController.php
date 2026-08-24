<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Traits\CrudTrait;

class BannerController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Banner::class;
    }
}


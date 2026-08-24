<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Traits\CrudTrait;

class ReviewController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Review::class;
    }
}


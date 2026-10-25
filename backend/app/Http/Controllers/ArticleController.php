<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Traits\CrudTrait;

class ArticleController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Article::class;
    }
}


<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Traits\CrudTrait;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Product::class;
    }

    protected function getValidationRules(Request $request): array
    {
        return [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'is_published' => 'boolean',
        ];
    }
}

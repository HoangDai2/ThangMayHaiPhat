<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Traits\CrudTrait;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Project::class;
    }

    protected function getValidationRules(Request $request): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $request->route('project'),
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'floors' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
        ];
    }
}

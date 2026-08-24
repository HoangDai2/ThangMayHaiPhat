<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

trait CrudTrait
{
    /**
     * Define the model class (e.g. \App\Models\Project::class)
     */
    abstract protected function getModelClass(): string;

    public function index(Request $request)
    {
        $modelClass = $this->getModelClass();
        $query = $modelClass::query();

        // Support sorting (e.g. sort_by=created_at&sort_dir=desc)
        if ($request->has('sort_by')) {
            $query->orderBy($request->sort_by, $request->input('sort_dir', 'asc'));
        } else {
            $query->latest();
        }

        return response()->json($query->get());
    }

    /**
     * Define the validation rules for the model.
     * Can be overridden by the controller.
     */
    protected function getValidationRules(Request $request): array
    {
        return [];
    }

    public function store(Request $request)
    {
        $rules = $this->getValidationRules($request);
        if (!empty($rules)) {
            $request->validate($rules);
        }

        $modelClass = $this->getModelClass();
        
        // Use Str::uuid() if ID is not auto-increment
        $data = $request->all();
        if (empty($data['id'])) {
            $data['id'] = (string) Str::uuid();
        }

        $item = $modelClass::create($data);
        return response()->json($item, 201);
    }

    public function show($id)
    {
        $modelClass = $this->getModelClass();
        $item = $modelClass::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $rules = $this->getValidationRules($request);
        if (!empty($rules)) {
            $request->validate($rules);
        }

        $modelClass = $this->getModelClass();
        $item = $modelClass::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id)
    {
        $modelClass = $this->getModelClass();
        $item = $modelClass::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}

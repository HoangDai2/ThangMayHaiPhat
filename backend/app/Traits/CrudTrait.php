<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

trait CrudTrait
{
    /**
     * Define the model class (e.g. \App\Models\Project::class)
     */
    abstract protected function getModelClass(): string;

    /**
     * Get the current cache version for the model
     */
    protected function getCacheVersion(): int
    {
        $modelName = class_basename($this->getModelClass());
        return Cache::get("{$modelName}_cache_version", 1);
    }

    /**
     * Increment the cache version to invalidate old caches
     */
    protected function incrementCacheVersion()
    {
        $modelName = class_basename($this->getModelClass());
        if (!Cache::has("{$modelName}_cache_version")) {
            Cache::put("{$modelName}_cache_version", 1);
        }
        Cache::increment("{$modelName}_cache_version");
    }

    public function index(Request $request)
    {
        $modelClass = $this->getModelClass();
        $modelName = class_basename($modelClass);

        // Generate a cache key that includes the version
        $cacheVersion = $this->getCacheVersion();
        $cacheKey = "{$modelName}_index_v{$cacheVersion}_" . md5(json_encode($request->all()));

        // Cache for 60 minutes
        $data = Cache::remember($cacheKey, 60 * 60, function () use ($modelClass, $request) {
            $query = $modelClass::query();

            // Support sorting (e.g. sort_by=created_at&sort_dir=desc)
            if ($request->has('sort_by')) {
                $query->orderBy($request->sort_by, $request->input('sort_dir', 'asc'));
            } else {
                $query->latest();
            }

            return $query->get()->toArray();
        });

        return response()->json($data);
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
        
        // Invalidate cache
        $this->incrementCacheVersion();

        return response()->json($item, 201);
    }

    public function show($id)
    {
        $modelClass = $this->getModelClass();
        
        $modelName = class_basename($modelClass);
        $cacheVersion = $this->getCacheVersion();
        $cacheKey = "{$modelName}_show_{$id}_v{$cacheVersion}";

        $item = Cache::remember($cacheKey, 60 * 60, function () use ($modelClass, $id) {
            return $modelClass::findOrFail($id)->toArray();
        });

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
        
        // Invalidate cache
        $this->incrementCacheVersion();

        return response()->json($item);
    }

    public function destroy($id)
    {
        $modelClass = $this->getModelClass();
        $item = $modelClass::findOrFail($id);
        $item->delete();
        
        // Invalidate cache
        $this->incrementCacheVersion();

        return response()->json(null, 204);
    }
}

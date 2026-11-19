<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Traits\CrudTrait;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    use CrudTrait;

    protected function getModelClass(): string
    {
        return Faq::class;
    }

    protected function getValidationRules(Request $request): array
    {
        return [
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'category' => 'nullable|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_published' => 'nullable|boolean',
        ];
    }

    /**
     * Public endpoint to fetch active FAQs
     */
    public function publicIndex(Request $request)
    {
        $query = Faq::where('is_published', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc');

        if ($request->has('category') && !empty($request->category) && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json($query->get());
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index()
    {
        return response()->json(Promotion::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'discount_text' => 'nullable|string',
            'image_url' => 'nullable|string',
            'link_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['is_active']) && $validated['is_active']) {
            Promotion::where('is_active', true)->update(['is_active' => false]);
        }

        $promotion = Promotion::create($validated);
        return response()->json($promotion, 201);
    }

    public function show($id)
    {
        return response()->json(Promotion::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $validated = $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'discount_text' => 'nullable|string',
            'image_url' => 'nullable|string',
            'link_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['is_active']) && $validated['is_active'] && !$promotion->is_active) {
            Promotion::where('is_active', true)->update(['is_active' => false]);
        }

        $promotion->update($validated);
        return response()->json($promotion);
    }

    public function destroy($id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->delete();
        return response()->json(null, 204);
    }

    public function getActive()
    {
        $promotion = Promotion::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->first();

        return response()->json($promotion);
    }
}

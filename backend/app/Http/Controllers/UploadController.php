<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UploadController extends Controller
{
    // List all uploaded images (for Admin Image Library)
    public function index(Request $request)
    {
        $folder = $request->input('folder', 'uploads');
        $files = Storage::disk('public')->files($folder);
        
        $images = [];
        foreach ($files as $file) {
            $images[] = [
                'name' => basename($file),
                'url' => asset('storage/' . $file),
                'size' => Storage::disk('public')->size($file),
                'lastModified' => Carbon::createFromTimestamp(Storage::disk('public')->lastModified($file))->toIso8601String(),
                'path' => $file
            ];
        }
        
        return response()->json($images);
    }

    // Upload an image
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|mimes:jpeg,png,jpg,webp,svg,gif|max:10240', // max 10MB strictly images
            'folder' => 'nullable|string|regex:/^[a-zA-Z0-9_\-]+$/'
        ]);

        $folder = preg_replace('/[^a-zA-Z0-9_\-]/', '', $request->input('folder', 'uploads')) ?: 'uploads';
        $path = $request->file('file')->store($folder, 'public');

        return response()->json([
            'url' => asset('storage/' . $path),
            'path' => $path
        ]);
    }

    // Delete an image
    public function destroy(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'folder' => 'nullable|string|regex:/^[a-zA-Z0-9_\-]+$/'
        ]);

        $folder = preg_replace('/[^a-zA-Z0-9_\-]/', '', $request->input('folder', 'uploads')) ?: 'uploads';
        $safeName = basename($request->name);
        $path = $folder . '/' . $safeName;

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'File not found'], 404);
    }
}

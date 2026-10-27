<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\Project;
use App\Models\Product;
use App\Models\Service;
use App\Models\Article;
use App\Models\Banner;
use App\Models\Promotion;
use App\Models\Review;

class UploadController extends Controller
{
    // List all images across the website (Projects, Products, Services, Articles, Banners, Promotions, Reviews, Uploads)
    public function index(Request $request)
    {
        $imagesMap = [];

        $helper = function ($url, $category, $source, $type, $modelId, $field) use (&$imagesMap) {
            if (empty($url) || !is_string($url)) return;
            $url = trim($url);
            if ($url === '' || (!filter_var($url, FILTER_VALIDATE_URL) && !str_starts_with($url, '/'))) return;

            if (!isset($imagesMap[$url])) {
                $rawPath = parse_url($url, PHP_URL_PATH) ?: $url;
                $name = basename($rawPath);
                if (empty($name) || strlen($name) < 3) {
                    $name = strtolower($type) . '-' . substr(md5($url), 0, 8) . '.jpg';
                }
                $imagesMap[$url] = [
                    'id' => md5($url),
                    'name' => urldecode($name),
                    'url' => $url,
                    'size' => 0,
                    'lastModified' => Carbon::now()->toIso8601String(),
                    'source' => $source,
                    'category' => $category,
                    'model_type' => $type,
                    'model_id' => $modelId,
                    'path' => null,
                    'usage_count' => 0,
                    'usages' => [],
                ];
            }
            $imagesMap[$url]['usages'][] = [
                'type' => $type,
                'id' => $modelId,
                'source' => $source,
                'field' => $field,
                'label' => $source . ' (' . $field . ')'
            ];
            $imagesMap[$url]['usage_count']++;
        };

        // 1. Storage files in public disk (uploads, promotions, images, banners)
        $folders = ['uploads', 'promotions', 'images', 'banners'];
        foreach ($folders as $folder) {
            if (Storage::disk('public')->exists($folder)) {
                $files = Storage::disk('public')->allFiles($folder);
                foreach ($files as $file) {
                    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'])) continue;
                    $url = asset('storage/' . $file);
                    $imagesMap[$url] = [
                        'id' => md5($url),
                        'name' => basename($file),
                        'url' => $url,
                        'size' => Storage::disk('public')->size($file),
                        'lastModified' => Carbon::createFromTimestamp(Storage::disk('public')->lastModified($file))->toIso8601String(),
                        'source' => 'Tải lên: ' . $folder,
                        'category' => 'Tải lên',
                        'model_type' => 'storage',
                        'model_id' => null,
                        'path' => $file,
                        'usage_count' => 0,
                        'usages' => [],
                    ];
                }
            }
        }

        // 2. Projects (Main image & Gallery)
        try {
            foreach (Project::all() as $p) {
                $helper($p->image, 'Dự án', 'Dự án: ' . $p->title, 'project', $p->id, 'Ảnh chính');
                if (!empty($p->gallery) && is_array($p->gallery)) {
                    foreach ($p->gallery as $g) {
                        $helper($g, 'Dự án', 'Dự án: ' . $p->title, 'project', $p->id, 'Bộ sưu tập');
                    }
                }
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading project images: ' . $e->getMessage());
        }

        // 3. Products (Main image & Gallery)
        try {
            foreach (Product::all() as $pr) {
                $helper($pr->image, 'Sản phẩm', 'Sản phẩm: ' . $pr->title, 'product', $pr->id, 'Ảnh chính');
                if (!empty($pr->gallery) && is_array($pr->gallery)) {
                    foreach ($pr->gallery as $g) {
                        $helper($g, 'Sản phẩm', 'Sản phẩm: ' . $pr->title, 'product', $pr->id, 'Bộ sưu tập');
                    }
                }
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading product images: ' . $e->getMessage());
        }

        // 4. Services
        try {
            foreach (Service::all() as $s) {
                $helper($s->image, 'Dịch vụ', 'Dịch vụ: ' . $s->title, 'service', $s->id, 'Ảnh chính');
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading service images: ' . $e->getMessage());
        }

        // 5. Articles
        try {
            foreach (Article::all() as $a) {
                $img = $a->cover_image ?: $a->image;
                $helper($img, 'Bài viết', 'Bài viết: ' . $a->title, 'article', $a->id, 'Ảnh đại diện');
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading article images: ' . $e->getMessage());
        }

        // 6. Banners
        try {
            foreach (Banner::all() as $b) {
                $helper($b->image_url, 'Banner', 'Banner: ' . $b->title, 'banner', $b->id, 'Ảnh banner');
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading banner images: ' . $e->getMessage());
        }

        // 7. Promotions
        try {
            foreach (Promotion::all() as $pm) {
                $helper($pm->image_url, 'Khuyến mãi', 'Khuyến mãi: ' . $pm->title, 'promotion', $pm->id, 'Ảnh khuyến mãi');
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading promotion images: ' . $e->getMessage());
        }

        // 8. Reviews
        try {
            foreach (Review::all() as $r) {
                $helper($r->avatar, 'Đánh giá', 'Đánh giá: ' . $r->name, 'review', $r->id, 'Avatar');
            }
        } catch (\Throwable $e) {
            \Log::warning('Error loading review images: ' . $e->getMessage());
        }

        // 9. Static assets in frontend/public (Logos, Brand images)
        $frontendPublic = base_path('../frontend/public');
        if (is_dir($frontendPublic)) {
            $files = @scandir($frontendPublic);
            if ($files) {
                foreach ($files as $file) {
                    if ($file === '.' || $file === '..') continue;
                    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'])) continue;
                    $url = '/' . $file;
                    $fullPath = $frontendPublic . DIRECTORY_SEPARATOR . $file;
                    if (!isset($imagesMap[$url])) {
                        $imagesMap[$url] = [
                            'id' => md5($url),
                            'name' => $file,
                            'url' => $url,
                            'size' => file_exists($fullPath) ? filesize($fullPath) : 0,
                            'lastModified' => file_exists($fullPath) ? Carbon::createFromTimestamp(filemtime($fullPath))->toIso8601String() : Carbon::now()->toIso8601String(),
                            'source' => 'Ảnh hệ thống (public/' . $file . ')',
                            'category' => 'Hệ thống',
                            'model_type' => 'static',
                            'model_id' => null,
                            'path' => null,
                            'usage_count' => 1,
                            'usages' => [
                                ['type' => 'static', 'id' => null, 'source' => 'Thư mục public/', 'field' => 'static', 'label' => 'Ảnh logo & hệ thống: ' . $file]
                            ],
                        ];
                    }
                }
            }
        }

        $images = array_values($imagesMap);

        // Sort by last modified descending
        usort($images, function ($a, $b) {
            return strcmp($b['lastModified'] ?? '', $a['lastModified'] ?? '');
        });

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
            'path' => $path,
            'name' => basename($path),
            'size' => Storage::disk('public')->size($path),
            'lastModified' => Carbon::now()->toIso8601String(),
            'category' => 'Tải lên',
            'source' => 'Tải lên: ' . $folder,
        ]);
    }

    // Delete an image
    public function destroy(Request $request)
    {
        $request->validate([
            'url' => 'nullable|string',
            'name' => 'nullable|string',
            'path' => 'nullable|string',
            'folder' => 'nullable|string|regex:/^[a-zA-Z0-9_\-]+$/'
        ]);

        $url = $request->input('url');
        $path = $request->input('path');
        $name = $request->input('name');
        $folder = preg_replace('/[^a-zA-Z0-9_\-]/', '', $request->input('folder', 'uploads')) ?: 'uploads';

        $deletedFromStorage = false;

        // 1. Delete from storage if path exists
        if (!empty($path) && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            $deletedFromStorage = true;
        } elseif (!empty($name)) {
            $safeName = basename($name);
            $checkPath = $folder . '/' . $safeName;
            if (Storage::disk('public')->exists($checkPath)) {
                Storage::disk('public')->delete($checkPath);
                $deletedFromStorage = true;
            }
        }

        // 2. If URL provided, detach/clean from database models
        if (!empty($url)) {
            // Projects
            try {
                foreach (Project::all() as $p) {
                    $dirty = false;
                    if ($p->image === $url) {
                        $p->image = '';
                        $dirty = true;
                    }
                    if (is_array($p->gallery) && in_array($url, $p->gallery)) {
                        $p->gallery = array_values(array_filter($p->gallery, fn($g) => $g !== $url));
                        $dirty = true;
                    }
                    if ($dirty) $p->save();
                }
            } catch (\Throwable $e) {}

            // Products
            try {
                foreach (Product::all() as $pr) {
                    $dirty = false;
                    if ($pr->image === $url) {
                        $pr->image = '';
                        $dirty = true;
                    }
                    if (is_array($pr->gallery) && in_array($url, $pr->gallery)) {
                        $pr->gallery = array_values(array_filter($pr->gallery, fn($g) => $g !== $url));
                        $dirty = true;
                    }
                    if ($dirty) $pr->save();
                }
            } catch (\Throwable $e) {}

            // Services
            try {
                foreach (Service::all() as $s) {
                    if ($s->image === $url) {
                        $s->image = '';
                        $s->save();
                    }
                }
            } catch (\Throwable $e) {}

            // Articles
            try {
                foreach (Article::all() as $a) {
                    $dirty = false;
                    if ($a->cover_image === $url) {
                        $a->cover_image = '';
                        $dirty = true;
                    }
                    if ($a->image === $url) {
                        $a->image = '';
                        $dirty = true;
                    }
                    if ($dirty) $a->save();
                }
            } catch (\Throwable $e) {}

            // Banners
            try {
                foreach (Banner::all() as $b) {
                    if ($b->image_url === $url) {
                        $b->image_url = '';
                        $b->save();
                    }
                }
            } catch (\Throwable $e) {}

            // Promotions
            try {
                foreach (Promotion::all() as $pm) {
                    if ($pm->image_url === $url) {
                        $pm->image_url = '';
                        $pm->save();
                    }
                }
            } catch (\Throwable $e) {}

            // Reviews
            try {
                foreach (Review::all() as $r) {
                    if ($r->avatar === $url) {
                        $r->avatar = '';
                        $r->save();
                    }
                }
            } catch (\Throwable $e) {}
        }

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa hoặc gỡ liên kết hình ảnh thành công'
        ]);
    }
}

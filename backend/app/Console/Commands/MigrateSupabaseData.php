<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Product;
use App\Models\Project;
use App\Models\Banner;
use App\Models\Article;
use App\Models\Review;

use App\Models\Promotion;
use Illuminate\Support\Facades\Storage;

class MigrateSupabaseData extends Command
{
    protected $signature = 'app:migrate-supabase {--download-images : Tải toàn bộ ảnh từ Supabase Storage về local public storage}';
    protected $description = 'Migrate data from Supabase to local MySQL';

    // Copy from frontend/.env
    private $supabaseUrl = 'https://lfwsvizmqinwbarxhddr.supabase.co';
    private $anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmd3N2aXptcWlud2JhcnhoZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODA5MzIsImV4cCI6MjA5OTc1NjkzMn0.DDtwn_wIHzUIaovumUrkCBrQJD8-ehbTHb-Ly7ssbkc';

    public function handle()
    {
        $downloadImages = $this->option('download-images');
        $this->info('Bắt đầu migrate dữ liệu từ Supabase...');
        if ($downloadImages) {
            $this->info('Chế độ tải ảnh về local: BẬT');
        }

        $tables = [
            'products' => Product::class,
            'projects' => Project::class,
            'banners' => Banner::class,
            'articles' => Article::class,
            'reviews' => Review::class,
            'promotions' => Promotion::class,
        ];

        foreach ($tables as $table => $modelClass) {
            $this->info("Đang xử lý bảng: {$table}");
            
            $response = Http::withHeaders([
                'apikey' => $this->anonKey,
                'Authorization' => "Bearer {$this->anonKey}",
            ])->get("{$this->supabaseUrl}/rest/v1/{$table}");

            if ($response->successful()) {
                $data = $response->json();
                $count = 0;
                
                foreach ($data as $item) {
                    // Cột slug không còn được sử dụng trong bảng products
                    if ($table === 'products' && isset($item['slug'])) {
                        unset($item['slug']);
                    }

                    // Tải ảnh về local nếu có cờ --download-images
                    if ($downloadImages) {
                        $item = $this->localizeImages($item);
                    }
                    
                    if ($table === 'promotions') {
                        // Bảng promotions dùng id tự tăng, map button_link sang link_url
                        $title = $item['title'] ?? 'Khuyến mãi';
                        unset($item['id']);
                        if (isset($item['button_link']) && !isset($item['link_url'])) {
                            $item['link_url'] = $item['button_link'];
                        }
                        unset($item['button_text'], $item['button_link']);
                        $modelClass::updateOrCreate(['title' => $title], $item);
                    } else {
                        // Update or create based on ID
                        $modelClass::updateOrCreate(['id' => $item['id']], $item);
                    }
                    $count++;
                }
                $this->info(" Đã import {$count} bản ghi vào bảng {$table}.");
            } else {
                $this->error(" Lỗi khi gọi API Supabase cho bảng {$table}: " . $response->body());
            }
        }

        $this->info(' Hoàn thành migrate toàn bộ dữ liệu!');
    }

    private function localizeImages(array $item): array
    {
        foreach ($item as $key => $val) {
            if (is_string($val) && str_contains($val, 'supabase.co/storage/')) {
                $item[$key] = $this->downloadAndSaveLocal($val);
            } elseif (is_array($val)) {
                $item[$key] = $this->localizeArray($val);
            }
        }
        return $item;
    }

    private function localizeArray(array $arr): array
    {
        foreach ($arr as $k => $v) {
            if (is_string($v) && str_contains($v, 'supabase.co/storage/')) {
                $arr[$k] = $this->downloadAndSaveLocal($v);
            } elseif (is_array($v)) {
                $arr[$k] = $this->localizeArray($v);
            }
        }
        return $arr;
    }

    private function downloadAndSaveLocal(string $url): string
    {
        $filename = basename(parse_url($url, PHP_URL_PATH));
        if (!$filename) {
            return $url;
        }

        $path = "uploads/{$filename}";
        if (!Storage::disk('public')->exists($path)) {
            try {
                $content = @file_get_contents($url);
                if ($content !== false) {
                    Storage::disk('public')->put($path, $content);
                    $this->line("   Đã tải: {$filename}");
                }
            } catch (\Exception $e) {
                $this->warn("   Không thể tải {$url}: " . $e->getMessage());
                return $url;
            }
        }

        return asset("storage/{$path}");
    }
}

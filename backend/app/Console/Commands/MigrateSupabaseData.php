<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Product;
use App\Models\Project;
use App\Models\Banner;
use App\Models\Article;
use App\Models\Review;

class MigrateSupabaseData extends Command
{
    protected $signature = 'app:migrate-supabase';
    protected $description = 'Migrate data from Supabase to local MySQL';

    // Copy from frontend/.env
    private $supabaseUrl = 'https://lfwsvizmqinwbarxhddr.supabase.co';
    private $anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmd3N2aXptcWlud2JhcnhoZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODA5MzIsImV4cCI6MjA5OTc1NjkzMn0.DDtwn_wIHzUIaovumUrkCBrQJD8-ehbTHb-Ly7ssbkc';

    public function handle()
    {
        $this->info('Bắt đầu migrate dữ liệu từ Supabase...');

        $tables = [
            'products' => Product::class,
            'projects' => Project::class,
            'banners' => Banner::class,
            'articles' => Article::class,
            'reviews' => Review::class,
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
                    
                    // Update or create based on ID
                    $modelClass::updateOrCreate(['id' => $item['id']], $item);
                    $count++;
                }
                $this->info(" Đã import {$count} bản ghi vào bảng {$table}.");
            } else {
                $this->error(" Lỗi khi gọi API Supabase cho bảng {$table}: " . $response->body());
            }
        }

        $this->info(' Hoàn thành migrate toàn bộ dữ liệu!');
    }
}

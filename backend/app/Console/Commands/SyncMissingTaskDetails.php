<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\BitrixTask;
use App\Services\BitrixService;
use App\Jobs\SyncBitrixTaskDetailsJob;

class SyncMissingTaskDetails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bitrix:sync-missing-details {--limit=0 : Giới hạn số lượng tác vụ cần đồng bộ (0 = tất cả)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Đồng bộ bình luận và hình ảnh cho các tác vụ chưa có dữ liệu (có kiểm soát tốc độ tránh rate limit)';

    /**
     * Execute the console command.
     */
    public function handle(BitrixService $bitrixService)
    {
        $this->info('Đang tìm các tác vụ chưa đồng bộ bình luận hoặc hình ảnh...');

        $query = BitrixTask::doesntHave('comments')->orderBy('id', 'desc');

        $limit = (int) $this->option('limit');
        if ($limit > 0) {
            $query->limit($limit);
        }

        $tasks = $query->get();
        $total = $tasks->count();

        if ($total === 0) {
            $this->info('Tất cả các tác vụ đều đã có dữ liệu hoặc không có tác vụ nào cần đồng bộ!');
            return 0;
        }

        $this->info("Tìm thấy {$total} tác vụ cần đồng bộ. Bắt đầu xử lý với cơ chế rate limit (tối đa 2 req/giây)...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($tasks as $task) {
            try {
                (new SyncBitrixTaskDetailsJob($task->id, $task->bitrix_id))->handle($bitrixService);
            } catch (\Exception $e) {
                // Tiếp tục với task kế tiếp
            }

            $bar->advance();
            // Tạm dừng 500ms để tuân thủ giới hạn 2 requests / giây của Bitrix
            usleep(500000);
        }

        $bar->finish();
        $this->newLine();
        $this->info('Hoàn tất đồng bộ các tác vụ còn thiếu!');
        return 0;
    }
}

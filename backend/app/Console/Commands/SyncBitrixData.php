<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\BitrixService;
use App\Models\BitrixUser;
use App\Models\BitrixCustomer;
use App\Models\BitrixProject;
use App\Models\BitrixTask;
use App\Models\BitrixTaskComment;
use Illuminate\Support\Facades\Log;

class SyncBitrixData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bitrix:sync-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kéo và đồng bộ toàn bộ dữ liệu từ Bitrix24 (Users, Projects, Tasks, Comments)';

    /**
     * Execute the console command.
     */
    public function handle(BitrixService $bitrixService)
    {
        $this->info('Bắt đầu quá trình đồng bộ dữ liệu từ Bitrix24...');

        // 1. Sync Users
        $this->info('Đang kéo thông tin Nhân viên (Users)...');
        $users = $bitrixService->getUsers();
        foreach ($users as $user) {
            BitrixUser::updateOrCreate(
                ['bitrix_id' => $user['ID']],
                [
                    'name' => trim(($user['NAME'] ?? '') . ' ' . ($user['LAST_NAME'] ?? '')),
                    'email' => $user['EMAIL'] ?? null,
                    'position' => $user['WORK_POSITION'] ?? null,
                    'raw_data' => json_encode($user)
                ]
            );
        }
        
        // 2. Sync Customers
        $this->info('Đang kéo thông tin Khách hàng (Contacts) từ API...');
        $customers = $bitrixService->getCustomers(function($page, $count, $totalLoaded, $total) {
            $this->info("   -> API Trang {$page}: Đã tải {$totalLoaded}" . ($total ? "/{$total}" : "") . " khách hàng");
        });
        
        $this->info('Đang lưu Khách hàng vào DB...');
        $bar = $this->output->createProgressBar(count($customers));
        $bar->start();
        foreach ($customers as $customer) {
            BitrixCustomer::updateOrCreate(
                ['bitrix_id' => $customer['ID']],
                [
                    'type' => 'contact',
                    'name' => trim(($customer['NAME'] ?? '') . ' ' . ($customer['LAST_NAME'] ?? '')),
                    'phone' => $customer['PHONE'][0]['VALUE'] ?? null,
                    'email' => $customer['EMAIL'][0]['VALUE'] ?? null,
                    'raw_data' => json_encode($customer)
                ]
            );
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        // 3. Sync Projects
        $this->info('Đang kéo thông tin Dự án (Workgroups) từ API...');
        $projects = $bitrixService->getProjects(function($page, $count, $totalLoaded, $total) {
            $this->info("   -> API Trang {$page}: Đã tải {$totalLoaded}" . ($total ? "/{$total}" : "") . " dự án");
        });
        
        $this->info('Đang lưu Dự án vào DB...');
        $bar = $this->output->createProgressBar(count($projects));
        $bar->start();
        foreach ($projects as $project) {
            BitrixProject::updateOrCreate(
                ['bitrix_id' => $project['ID']],
                [
                    'name' => $project['NAME'] ?? null,
                    'description' => $project['DESCRIPTION'] ?? null,
                    'raw_data' => json_encode($project)
                ]
            );
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        // 4. Sync Tasks
        $this->info('Đang kéo thông tin Tác vụ (Tasks) từ API...');
        $tasks = $bitrixService->getTasks(function($page, $count, $totalLoaded, $total) {
            $this->info("   -> API Trang {$page}: Đã tải {$totalLoaded}" . ($total ? "/{$total}" : "") . " tác vụ");
        });
        
        $this->info('Đang lưu Tác vụ vào DB...');
        $bar = $this->output->createProgressBar(count($tasks));
        $bar->start();
        foreach ($tasks as $task) {
            // Tìm Project ID trong database nếu task thuộc group
            $localProjectId = null;
            if (!empty($task['groupId'])) {
                $localProject = BitrixProject::where('bitrix_id', $task['groupId'])->first();
                if ($localProject) $localProjectId = $localProject->id;
            }

            $localTask = BitrixTask::updateOrCreate(
                ['bitrix_id' => $task['id']],
                [
                    'project_id' => $localProjectId,
                    'title' => $task['title'] ?? null,
                    'description' => $task['description'] ?? null,
                    'status' => $task['status'] ?? null,
                    'created_by' => $task['createdBy'] ?? null,
                    'responsible_id' => $task['responsibleId'] ?? null,
                    'deadline' => !empty($task['deadline']) ? date('Y-m-d H:i:s', strtotime($task['deadline'])) : null,
                    'raw_data' => json_encode($task)
                ]
            );

            // 5. Đẩy công việc tải Comment và Hình ảnh vào Queue
            \App\Jobs\SyncBitrixTaskDetailsJob::dispatch($localTask->id, $task['id']);
            
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        $this->info('Đồng bộ hoàn tất! Xin vui lòng chạy `php artisan queue:work` để hệ thống tải ảnh và comment ẩn dưới nền.');
    }
}

<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class BitrixService
{
    protected $webhookUrl;

    public function __construct()
    {
        $this->webhookUrl = config('services.bitrix.inbound_webhook');
    }

    /**
     * Gọi API Bitrix
     */
    public function call($method, $params = [])
    {
        if (!$this->webhookUrl) {
            Log::error('Bitrix Inbound Webhook URL chưa được cấu hình.');
            return null;
        }

        $url = rtrim($this->webhookUrl, '/') . '/' . $method . '.json';
        
        try {
            $response = Http::post($url, $params);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("Lỗi gọi API Bitrix: {$method}", ['response' => $response->body()]);
            return null;
        } catch (\Exception $e) {
            Log::error("Exception khi gọi API Bitrix: {$method}", ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Gọi API Bitrix và lấy toàn bộ dữ liệu (xử lý Pagination tự động)
     */
    public function callPaginated($method, $params = [], $resultKey = 'result', $progressCallback = null)
    {
        $allData = [];
        $start = 0;
        $page = 1;

        do {
            $currentParams = array_merge($params, ['start' => $start]);
            $response = $this->call($method, $currentParams);

            if (!$response) {
                break;
            }

            // Dữ liệu trả về có thể nằm ở 'result' hoặc lồng bên trong (như tasks.task.list)
            $data = $response['result'] ?? [];
            if ($resultKey !== 'result' && isset($response['result'][$resultKey])) {
                $data = $response['result'][$resultKey];
            }

            if (!is_array($data) || empty($data)) {
                break;
            }

            // Gộp dữ liệu mới vào mảng tổng
            foreach ($data as $item) {
                $allData[] = $item;
            }

            // Gọi callback để báo tiến trình
            if (is_callable($progressCallback)) {
                $progressCallback($page, count($data), count($allData), $response['total'] ?? null);
            }

            // Bitrix trả về 'next' nếu còn trang tiếp theo
            if (isset($response['next'])) {
                $start = $response['next'];
                $page++;
            } else {
                $start = null; // Hết trang
            }
        } while ($start !== null);

        return $allData;
    }

    public function getUsers($callback = null)
    {
        return $this->callPaginated('user.get', [], 'result', $callback);
    }

    public function getCustomers($callback = null)
    {
        // Example for CRM Contacts
        return $this->callPaginated('crm.contact.list', [
            'select' => ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
        ], 'result', $callback);
    }

    public function getProjects($callback = null)
    {
        return $this->callPaginated('sonet_group.get', [], 'result', $callback);
    }

    public function getTasks($callback = null)
    {
        return $this->callPaginated('tasks.task.list', [
            'select' => ['ID', 'TITLE', 'DESCRIPTION', 'STATUS', 'CREATED_BY', 'RESPONSIBLE_ID', 'DEADLINE', 'GROUP_ID']
        ], 'tasks', $callback);
    }

    public function getTaskComments($taskId)
    {
        // Comments might not have many pages, but we can safely paginate or just call once. 
        // Bitrix task.commentitem.getlist does not use 'start' standard pagination, it uses its own. We just call it normally for now.
        $response = $this->call('task.commentitem.getlist', [
            'TASKID' => $taskId
        ]);
        return $response['result'] ?? [];
    }

    public function getTaskChatMessages($chatId)
    {
        // Get messages from IM dialog
        $response = $this->call('im.dialog.messages.get', [
            'DIALOG_ID' => 'chat' . $chatId
        ]);
        return $response['result'] ?? [];
    }

    public function getTaskFullDetails($taskId)
    {
        $response = $this->call('tasks.task.get', [
            'taskId' => $taskId,
            'select' => ['*', 'UF_*']
        ]);
        return $response['result']['task'] ?? null;
    }

    /**
     * Tải file từ Bitrix, chuyển thành chuẩn WebP để giảm dung lượng và lưu vào Storage
     *
     * @param string $url Link download file của Bitrix
     * @return string|null Đường dẫn tương đối trong storage
     */
    public function downloadAndConvertImageToWebP($url)
    {
        if (empty($url)) return null;

        // Xử lý trường hợp URL bị thiếu host (Bitrix trả về relative URL)
        if (!preg_match('/^https?:\/\//i', $url)) {
            $parsedUrl = parse_url($this->webhookUrl);
            $host = ($parsedUrl['scheme'] ?? 'https') . '://' . ($parsedUrl['host'] ?? 'thangmayhaiphat.bitrix24.vn');
            $url = $host . (str_starts_with($url, '/') ? '' : '/') . $url;
        }

        try {
            // Tải nội dung file ảnh từ Bitrix
            $response = Http::get($url);
            if (!$response->successful()) {
                Log::error("Không thể tải ảnh từ Bitrix", ['url' => $url, 'status' => $response->status()]);
                return null;
            }

            $fileContents = $response->body();

            // Khởi tạo Intervention Image
            $manager = new ImageManager(new Driver());
            $image = $manager->decode($fileContents);
            
            // Chuyển sang định dạng WebP với chất lượng 80%
            $encoded = $image->encode(new \Intervention\Image\Encoders\WebpEncoder(quality: 80));

            // Tạo tên file ngẫu nhiên
            $fileName = 'bitrix/images/' . uniqid('bx_img_') . '.webp';
            
            // Lưu vào storage public
            Storage::disk('public')->put($fileName, $encoded->toString());

            return $fileName;
        } catch (\Exception $e) {
            Log::error("Lỗi khi tải hoặc convert ảnh Bitrix", ['url' => $url, 'error' => $e->getMessage()]);
            return null;
        }
    }
}

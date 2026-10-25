<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\BitrixService;
use App\Models\BitrixTask;
use App\Models\BitrixTaskComment;
use App\Models\BitrixProject;

class BitrixWebhookController extends Controller
{
    /**
     * Nhận sự kiện từ Bitrix Outbound Webhook
     */
    public function handle(Request $request, BitrixService $bitrixService)
    {
        $event = $request->input('event');
        $data = $request->input('data');
        
        Log::info('Bitrix Webhook Received:', ['event' => $event, 'data' => $data]);

        // Xử lý các event phổ biến
        // Ví dụ: ONTASKADD, ONTASKUPDATE
        if (in_array($event, ['ONTASKADD', 'ONTASKUPDATE']) && isset($data['FIELDS']['ID'])) {
            $taskId = $data['FIELDS']['ID'];
            
            // Gọi lại Bitrix để lấy data mới nhất thay vì dùng data trực tiếp (an toàn & đầy đủ hơn)
            $response = $bitrixService->call('tasks.task.get', ['taskId' => $taskId]);
            
            if (!empty($response['result']['task'])) {
                $task = $response['result']['task'];
                
                $localProjectId = null;
                if (!empty($task['groupId'])) {
                    $localProject = BitrixProject::where('bitrix_id', $task['groupId'])->first();
                    if ($localProject) $localProjectId = $localProject->id;
                }

                BitrixTask::updateOrCreate(
                    ['bitrix_id' => $task['id']],
                    [
                        'project_id' => $localProjectId,
                        'title' => $task['title'] ?? null,
                        'description' => $task['description'] ?? null,
                        'status' => $task['status'] ?? null,
                        'created_by' => $task['createdBy'] ?? null,
                        'responsible_id' => $task['responsibleId'] ?? null,
                        'deadline' => $task['deadline'] ? date('Y-m-d H:i:s', strtotime($task['deadline'])) : null,
                        'raw_data' => json_encode($task)
                    ]
                );
            }
        }

        return response()->json(['status' => 'success']);
    }
}

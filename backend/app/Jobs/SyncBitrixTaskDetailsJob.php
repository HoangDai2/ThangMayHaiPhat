<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Models\BitrixTask;
use App\Models\BitrixTaskComment;
use App\Models\BitrixTaskFile;
use App\Services\BitrixService;
use Illuminate\Support\Facades\Log;

class SyncBitrixTaskDetailsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $localTaskId;
    protected $bitrixTaskId;

    public $timeout = 120; // 2 minutes max
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct($localTaskId, $bitrixTaskId)
    {
        $this->localTaskId = $localTaskId;
        $this->bitrixTaskId = $bitrixTaskId;
    }

    /**
     * Execute the job.
     */
    public function handle(BitrixService $bitrixService): void
    {
        try {
            // Get comments from API
            $comments = $bitrixService->getTaskComments($this->bitrixTaskId);
            
            foreach ($comments as $comment) {
                $localComment = BitrixTaskComment::updateOrCreate(
                    ['bitrix_id' => $comment['ID']],
                    [
                        'task_id' => $this->localTaskId,
                        'post_message' => $comment['POST_MESSAGE'] ?? null,
                        'author_id' => $comment['AUTHOR_ID'] ?? null,
                        'author_name' => $comment['AUTHOR_NAME'] ?? null,
                        'created_at' => !empty($comment['POST_DATE']) ? date('Y-m-d H:i:s', strtotime($comment['POST_DATE'])) : null,
                        'raw_data' => json_encode($comment)
                    ]
                );

                // Handle file attachments inside comments
                if (!empty($comment['ATTACHED_OBJECTS'])) {
                    foreach ($comment['ATTACHED_OBJECTS'] as $fileId => $fileInfo) {
                        $existingFile = BitrixTaskFile::where('bitrix_id', $fileId)->first();
                        
                        if (!$existingFile && !empty($fileInfo['DOWNLOAD_URL'])) {
                            $localPath = $bitrixService->downloadAndConvertImageToWebP($fileInfo['DOWNLOAD_URL']);
                            
                            if ($localPath) {
                                BitrixTaskFile::create([
                                    'bitrix_id' => $fileId,
                                    'task_id' => $this->localTaskId,
                                    'comment_id' => $localComment->id,
                                    'file_name' => $fileInfo['NAME'] ?? "file_{$fileId}.webp",
                                    'url' => $fileInfo['DOWNLOAD_URL'],
                                    'local_path' => $localPath,
                                    'raw_data' => json_encode($fileInfo)
                                ]);
                            }
                        }
                    }
                }
            }

            // Sync IM Chat Messages
            $taskInfo = $bitrixService->getTaskFullDetails($this->bitrixTaskId);
            if (!empty($taskInfo['chatId'])) {
                $chatData = $bitrixService->getTaskChatMessages($taskInfo['chatId']);
                $messages = $chatData['messages'] ?? [];
                $users = $chatData['users'] ?? [];
                $files = $chatData['files'] ?? [];

                // Map users for author_name
                $userMap = [];
                foreach ($users as $u) {
                    $userMap[$u['id']] = $u['name'];
                }

                // Map files
                $fileMap = [];
                foreach ($files as $f) {
                    $fileMap[$f['id']] = $f;
                }

                foreach ($messages as $msg) {
                    $authorId = $msg['author_id'] ?? null;
                    $authorName = $authorId && isset($userMap[$authorId]) ? $userMap[$authorId] : null;
                    if ($authorId == 0) $authorName = 'System'; // System messages

                    $localComment = BitrixTaskComment::updateOrCreate(
                        ['bitrix_id' => 'im_' . $msg['id']],
                        [
                            'task_id' => $this->localTaskId,
                            'post_message' => $msg['text'] ?? null,
                            'author_id' => $authorId,
                            'author_name' => $authorName,
                            'created_at' => !empty($msg['date']) ? date('Y-m-d H:i:s', strtotime($msg['date'])) : null,
                            'raw_data' => json_encode($msg)
                        ]
                    );

                    // Handle files in IM message (usually in params[FILE_ID])
                    if (!empty($msg['params']['FILE_ID'])) {
                        foreach ($msg['params']['FILE_ID'] as $fileId) {
                            $existingFile = BitrixTaskFile::where('bitrix_id', $fileId)->first();
                            if (!$existingFile && isset($fileMap[$fileId])) {
                                $fInfo = $fileMap[$fileId];
                                
                                // Fetch authenticated download URL via disk.file.get
                                $diskInfo = $bitrixService->call('disk.file.get', ['id' => $fileId]);
                                $downloadUrl = $diskInfo['result']['DOWNLOAD_URL'] ?? null;
                                
                                if ($downloadUrl) {
                                    $localPath = $bitrixService->downloadAndConvertImageToWebP($downloadUrl);
                                    if ($localPath) {
                                        BitrixTaskFile::create([
                                            'bitrix_id' => $fileId,
                                            'task_id' => $this->localTaskId,
                                            'comment_id' => $localComment->id,
                                            'file_name' => $fInfo['name'] ?? "file_{$fileId}.webp",
                                            'file_url' => $downloadUrl,
                                            'local_path' => $localPath,
                                            'file_type' => $fInfo['extension'] ?? 'webp',
                                            'file_size' => $fInfo['size'] ?? 0
                                        ]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error("Failed to sync details for task {$this->bitrixTaskId}: " . $e->getMessage());
            throw $e;
        }
    }
}

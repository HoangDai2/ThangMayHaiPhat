<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BitrixProject;
use App\Models\BitrixTask;
use App\Models\BitrixUser;
use App\Models\BitrixCustomer;
use App\Services\BitrixService;

class BitrixDataController extends Controller
{
    /**
     * Lấy danh sách Dự án từ Bitrix
     */
    public function getProjects(Request $request)
    {
        $query = BitrixProject::with('customer')->orderBy('id', 'desc');

        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $projects = $query->paginate(20);
        
        $totalProjects = BitrixProject::count();
        $totalTasks = BitrixTask::count();

        $response = $projects->toArray();
        $response['total_projects_count'] = $totalProjects;
        $response['total_tasks_count'] = $totalTasks;

        return response()->json($response);
    }

    /**
     * Lấy danh sách Tác vụ (hỗ trợ lọc theo Dự án)
     */
    public function getTasks(Request $request)
    {
        $query = BitrixTask::with(['project', 'creator', 'responsible'])->withCount(['comments', 'files']);
        
        if ($request->has('project_id')) {
            $projectId = $request->project_id;
            $query->where('project_id', $projectId);

            // Kiểm tra nếu các tác vụ trong dự án này chưa có activity_date thì tự động đồng bộ nhanh từ Bitrix
            $hasMissingActivity = BitrixTask::where('project_id', $projectId)->whereNull('activity_date')->exists();
            if ($hasMissingActivity) {
                try {
                    $project = BitrixProject::find($projectId);
                    if ($project && $project->bitrix_id) {
                        $bitrix = app(BitrixService::class);
                        $res = $bitrix->call('tasks.task.list', [
                            'filter' => ['GROUP_ID' => $project->bitrix_id],
                            'select' => [
                                'ID', 'TITLE', 'STATUS', 'CREATED_BY', 'RESPONSIBLE_ID', 'DEADLINE', 'GROUP_ID',
                                'ACTIVITY_DATE', 'CHANGED_DATE', 'CREATED_DATE', 'CLOSED_DATE', 'COMMENTS_COUNT',
                                'NEW_COMMENTS_COUNT', 'REPLICATE', 'FORKED_BY_TEMPLATE_ID', 'UF_TASK_WEBDAV_FILES'
                            ]
                        ]);
                        if (!empty($res['result']['tasks'])) {
                            foreach ($res['result']['tasks'] as $t) {
                                BitrixTask::where('bitrix_id', $t['id'])->update([
                                    'activity_date' => !empty($t['activityDate']) ? date('Y-m-d H:i:s', strtotime($t['activityDate'])) : (!empty($t['changedDate']) ? date('Y-m-d H:i:s', strtotime($t['changedDate'])) : null),
                                    'new_comments_count' => $t['newCommentsCount'] ?? 0,
                                    'raw_data' => json_encode($t)
                                ]);
                            }
                        }
                    }
                } catch (\Exception $e) {
                    \Log::warning('Auto sync task activity fields failed: ' . $e->getMessage());
                }
            }
        }

        $perPage = (int) $request->get('per_page', 50);
        $tasks = $query->orderBy('deadline', 'desc')->paginate($perPage);
        return response()->json($tasks);
    }

    /**
     * Lấy chi tiết Tác vụ (kèm Comments và Files)
     */
    public function getTaskDetails($id)
    {
        $task = BitrixTask::with([
            'project.customer',
            'comments' => function($q) {
                $q->orderBy('created_at', 'asc')->with('files');
            },
            'files',
            'creator',
            'responsible'
        ])->findOrFail($id);

        $forceSync = request()->boolean('force_sync');

        // Tự động đồng bộ chi tiết và bình luận từ Bitrix nếu chưa có hoặc khi yêu cầu force_sync
        if ($forceSync || $task->comments->isEmpty()) {
            try {
                (new \App\Jobs\SyncBitrixTaskDetailsJob($task->id, $task->bitrix_id))->handle(app(BitrixService::class));
                $task->refresh();
                $task->load([
                    'project.customer',
                    'comments' => function($q) {
                        $q->orderBy('created_at', 'asc')->with('files');
                    },
                    'files',
                    'creator',
                    'responsible'
                ]);
            } catch (\Exception $e) {
                \Log::warning("Could not sync details on-demand for task {$task->bitrix_id}: " . $e->getMessage());
            }
        }

        // Auto-link project customer if null but task has ufCrmTask
        $raw = is_array($task->raw_data) ? $task->raw_data : json_decode($task->raw_data ?? '[]', true);
        if ($task->project && !$task->project->customer_id) {
            if (!empty($raw['ufCrmTask'])) {
                foreach ($raw['ufCrmTask'] as $crmItem) {
                    if (str_starts_with($crmItem, 'C_')) {
                        $contact = BitrixCustomer::where('bitrix_id', substr($crmItem, 2))->first();
                        if ($contact) {
                            $task->project->update(['customer_id' => $contact->id]);
                            $task->project->setRelation('customer', $contact);
                            break;
                        }
                    }
                }
            }
        }

        // Fetch auditorsData if not yet saved in raw_data
        if (empty($raw['auditorsData'])) {
            try {
                $bitrix = app(BitrixService::class);
                $full = $bitrix->getTaskFullDetails($task->bitrix_id);
                if (!empty($full['auditorsData'])) {
                    $raw['auditorsData'] = $full['auditorsData'];
                    $task->update(['raw_data' => json_encode($raw)]);
                }
            } catch (\Exception $e) {
                // ignore
            }
        }

        // Auto-match unassigned task files to "đã thêm một tập tin" comments if comment files is empty
        $unassignedFiles = $task->files->whereNull('comment_id')->values();
        if ($unassignedFiles->count() > 0) {
            $fileComments = $task->comments->filter(function($c) {
                return str_contains($c->post_message, 'thêm một tập tin') && $c->files->isEmpty();
            })->values();

            $updatedAny = false;
            foreach ($unassignedFiles as $idx => $file) {
                if (isset($fileComments[$idx])) {
                    $file->update(['comment_id' => $fileComments[$idx]->id]);
                    $updatedAny = true;
                }
            }
            if ($updatedAny) {
                $task->load([
                    'comments' => function($q) {
                        $q->orderBy('created_at', 'asc')->with('files');
                    },
                    'files'
                ]);
            }
        }

        return response()->json($task);
    }

    /**
     * Lấy danh sách Nhân viên
     */
    public function getUsers()
    {
        $users = BitrixUser::orderBy('name', 'asc')->get();
        return response()->json($users);
    }

    /**
     * Lấy danh sách Khách hàng
     */
    public function getCustomers()
    {
        $customers = BitrixCustomer::orderBy('name', 'asc')->get();
        return response()->json($customers);
    }
}

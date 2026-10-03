<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BitrixProject;
use App\Models\BitrixTask;
use App\Models\BitrixUser;
use App\Models\BitrixCustomer;

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
        $query = BitrixTask::with(['project']);
        
        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $tasks = $query->orderBy('id', 'desc')->paginate(20);
        return response()->json($tasks);
    }

    /**
     * Lấy chi tiết Tác vụ (kèm Comments và Files)
     */
    public function getTaskDetails($id)
    {
        $task = BitrixTask::with(['project', 'comments.files', 'files', 'creator', 'responsible'])->findOrFail($id);
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
        $customers = BitrixCustomer::orderBy('name', 'asc')->paginate(20);
        return response()->json($customers);
    }
}

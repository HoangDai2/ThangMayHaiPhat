"use client";
import { useState, useEffect } from 'react';
import { Search, Loader2, Folder, Briefcase, Eye, User, Calendar, MessageSquare, Paperclip, ChevronLeft, X } from 'lucide-react';
import api from '../../lib/api';

interface BitrixCustomer {
  id: number;
  bitrix_id: string;
  name: string;
}

interface BitrixProject {
  id: number;
  bitrix_id: string;
  name: string;
  description: string;
  owner_id: string;
  project_date_start: string | null;
  project_date_finish: string | null;
  customer?: BitrixCustomer;
}

interface BitrixTaskFile {
  id: number;
  bitrix_id: string;
  file_name: string;
  url: string;
  local_path: string;
}

interface BitrixTaskComment {
  id: number;
  bitrix_id: string;
  post_message: string;
  author_id: string;
  author_name: string;
  created_at: string;
  files?: BitrixTaskFile[];
}

interface BitrixUser {
  id: number;
  bitrix_id: string;
  name: string;
}

interface BitrixTask {
  id: number;
  bitrix_id: string;
  project_id: number | null;
  title: string;
  description: string;
  status: string;
  created_by: string;
  responsible_id: string;
  deadline: string | null;
  comments?: BitrixTaskComment[];
  files?: BitrixTaskFile[];
  creator?: BitrixUser;
  responsible?: BitrixUser;
}

export default function AdminBitrix() {
  // States cho danh sách Dự án
  const [projects, setProjects] = useState<BitrixProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination cho Dự án
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [totalTasksCount, setTotalTasksCount] = useState(0);

  // States cho luồng xem chi tiết
  const [modalOpen, setModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'project' | 'task'>('project');
  
  const [selectedProject, setSelectedProject] = useState<BitrixProject | null>(null);
  const [projectTasks, setProjectTasks] = useState<BitrixTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  
  const [selectedTask, setSelectedTask] = useState<BitrixTask | null>(null);
  const [loadingTaskDetail, setLoadingTaskDetail] = useState(false);

  // Lọc debounce
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset về trang 1 khi search thay đổi
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchProjects(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);

  const fetchProjects = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/bitrix/projects?page=${page}&search=${encodeURIComponent(search)}`);
      setProjects(response.data.data || []);
      setTotalPages(response.data.last_page || 1);
      if (response.data.total_projects_count !== undefined) {
        setTotalProjectsCount(response.data.total_projects_count);
      }
      if (response.data.total_tasks_count !== undefined) {
        setTotalTasksCount(response.data.total_tasks_count);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openProjectDetail = async (project: BitrixProject) => {
    setSelectedProject(project);
    setCurrentView('project');
    setModalOpen(true);
    setLoadingTasks(true);
    try {
      const response = await api.get(`/admin/bitrix/tasks?project_id=${project.id}`); // Lấy theo local project_id
      setProjectTasks(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoadingTasks(false);
  };

  const openTaskDetail = async (id: number) => {
    setCurrentView('task');
    setLoadingTaskDetail(true);
    try {
      const response = await api.get(`/admin/bitrix/tasks/${id}`);
      setSelectedTask(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoadingTaskDetail(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setSelectedTask(null);
  };

  const filteredProjects = projects;

  const getStatusColor = (status: string) => {
    switch (String(status)) {
      case '1':
      case '2': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '3': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '4': return 'bg-purple-100 text-purple-800 border-purple-200';
      case '5': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '6': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (String(status)) {
      case '1': return 'Mới';
      case '2': return 'Chờ thực hiện';
      case '3': return 'Đang tiến hành';
      case '4': return 'Chờ xác nhận';
      case '5': return 'Đã hoàn thành';
      case '6': return 'Đã hoãn';
      default: return `Trạng thái ${status}`;
    }
  };

  const getBackendUrl = (path: string) => {
    if (!path) return '';
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    return `${baseUrl}/storage/${path}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Folder className="w-7 h-7 text-[#285c9a]" />
            Dữ liệu Dự án Bitrix24
          </h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý và theo dõi các dự án đồng bộ từ Bitrix24</p>
        </div>
        {!loading && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
              <span className="text-xs text-blue-600 font-medium">Tổng dự án</span>
              <span className="text-xl font-bold text-blue-700">{totalProjectsCount}</span>
            </div>
            <div className="flex flex-col items-end px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-xs text-emerald-600 font-medium">Tổng tác vụ</span>
              <span className="text-xl font-bold text-emerald-700">{totalTasksCount}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285c9a]/20 focus:border-[#285c9a] transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-[#285c9a] animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 whitespace-nowrap">
                <tr>
                  <th className="px-6 py-4">Tên Dự án</th>
                  <th className="px-6 py-4 w-40">Ngày bắt đầu</th>
                  <th className="px-6 py-4 w-40">Ngày kết thúc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                      Không tìm thấy dự án nào.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      onClick={() => openProjectDetail(project)}
                      className="hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 whitespace-normal leading-relaxed group-hover:text-blue-700 transition-colors">
                          {project.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {project.project_date_start ? new Date(project.project_date_start).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {project.project_date_finish ? new Date(project.project_date_finish).toLocaleDateString('vi-VN') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination UI */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 gap-4">
            <span className="text-sm text-slate-500">
              Trang <strong className="font-medium text-slate-700">{currentPage}</strong> trên <strong className="font-medium text-slate-700">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Trước
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal XEM DỰ ÁN VÀ TÁC VỤ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[95vw] max-w-[1600px] h-[95vh] max-h-[95vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                {currentView === 'task' && (
                  <button 
                    onClick={() => setCurrentView('project')} 
                    className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-[#285c9a] hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-all"
                    title="Quay lại danh sách tác vụ"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  {currentView === 'project' ? (
                    <><Folder className="w-5 h-5 text-[#285c9a]" /> Chi tiết Dự án</>
                  ) : (
                    <><Briefcase className="w-5 h-5 text-emerald-600" /> Chi tiết Tác vụ</>
                  )}
                </h3>
              </div>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`flex-1 relative ${currentView === 'task' ? 'p-0 overflow-hidden bg-white' : 'p-6 overflow-y-auto bg-slate-50/50 custom-scrollbar'}`}>
              
              {/* VIEW: PROJECT DETAILS & TASKS LIST */}
              {currentView === 'project' && selectedProject && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedProject.name}</h2>
                    {selectedProject.description && (
                      <div className="text-sm text-slate-600 mb-4 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: selectedProject.description }} />
                    )}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {selectedProject.customer && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg font-medium">
                          <User className="w-4 h-4" />
                          KH: {selectedProject.customer.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        Bắt đầu: {selectedProject.project_date_start ? new Date(selectedProject.project_date_start).toLocaleDateString('vi-VN') : '-'}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        Kết thúc: {selectedProject.project_date_finish ? new Date(selectedProject.project_date_finish).toLocaleDateString('vi-VN') : '-'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#285c9a]" />
                      Danh sách Tác vụ trong dự án
                    </h3>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                      {loadingTasks ? (
                        <div className="p-8 flex justify-center items-center">
                          <Loader2 className="w-6 h-6 text-[#285c9a] animate-spin" />
                        </div>
                      ) : projectTasks.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">
                          Dự án này chưa có tác vụ nào.
                        </div>
                      ) : (
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                            <tr>
                              <th className="px-4 py-3">Tác vụ</th>
                              <th className="px-4 py-3">Trạng thái</th>
                              <th className="px-4 py-3">Hạn chót</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {projectTasks.map(task => (
                              <tr 
                                key={task.id} 
                                className="hover:bg-blue-50 transition-colors cursor-pointer group"
                                onClick={() => openTaskDetail(task.id)}
                              >
                                <td className="px-4 py-3 font-medium text-slate-800 group-hover:text-blue-700 transition-colors">{task.title}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                                    {getStatusText(task.status)}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-slate-500">
                                  {task.deadline ? new Date(task.deadline).toLocaleDateString('vi-VN') : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW: TASK DETAILS (COMMENTS & FILES) */}
              {currentView === 'task' && (
                <div className="flex w-full h-full bg-white">
                  {loadingTaskDetail ? (
                    <div className="w-full flex justify-center items-center">
                      <Loader2 className="w-8 h-8 text-[#285c9a] animate-spin" />
                    </div>
                  ) : selectedTask && (
                    <>
                      {/* CỘT TRÁI: THÔNG TIN TÁC VỤ */}
                      <div className="w-1/3 min-w-[320px] max-w-[400px] bg-slate-50 border-r border-slate-200 overflow-y-auto custom-scrollbar flex flex-col p-4 gap-4">
                        {/* Box 1: Header & Description */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                          <h2 className="text-[17px] font-bold text-slate-900 leading-tight mb-3">
                            {selectedTask.title}
                          </h2>
                          {selectedTask.description && (
                            <div className="text-[13px] text-slate-700 whitespace-pre-wrap leading-relaxed">
                              {selectedTask.description}
                            </div>
                          )}
                        </div>

                        {/* Box 2: Attributes */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                          <table className="w-full text-[13px]">
                            <tbody className="divide-y divide-slate-100">
                              <tr>
                                <td className="py-2 text-slate-500 w-2/5 align-top">Chủ sở hữu:</td>
                                <td className="py-2 text-slate-800 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]"><User className="w-3 h-3"/></div>
                                    {selectedTask.creator ? selectedTask.creator.name : selectedTask.created_by}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 align-top">Người được phân công:</td>
                                <td className="py-2 text-slate-800 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px]"><User className="w-3 h-3"/></div>
                                    {selectedTask.responsible ? selectedTask.responsible.name : (selectedTask.responsible_id || 'Chưa phân công')}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 align-top">Hạn chót:</td>
                                <td className="py-2 text-slate-800 font-medium">
                                  <div className="flex items-center gap-2 text-blue-600">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {selectedTask.deadline ? new Date(selectedTask.deadline).toLocaleString('vi-VN') : '-'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 align-top">Trạng thái:</td>
                                <td className="py-2 font-medium">
                                  <span className={`flex items-center gap-1`}>
                                    {getStatusText(selectedTask.status)}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 align-top">ID:</td>
                                <td className="py-2 text-slate-500 text-xs">#TASK_{selectedTask.bitrix_id}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Box 3: Project Info */}
                        {selectedProject && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                            <table className="w-full text-[13px]">
                              <tbody>
                                <tr>
                                  <td className="py-1 text-slate-500 w-2/5">Dự án:</td>
                                  <td className="py-1 font-medium text-slate-800 line-clamp-2">
                                    <div className="flex items-start gap-2">
                                      <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                                        <Folder className="w-3 h-3"/>
                                      </div>
                                      {selectedProject.name}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        
                        {/* Hình ảnh */}
                        {selectedTask.files && selectedTask.files.length > 0 && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3 text-[13px]">
                              <Paperclip className="w-4 h-4 text-emerald-500" />
                              Tệp đính kèm ({selectedTask.files.length})
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                              {selectedTask.files.map(file => (
                                <a 
                                  key={file.id} 
                                  href={getBackendUrl(file.local_path)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="block aspect-square rounded-lg overflow-hidden border border-slate-200 hover:opacity-80 transition-all"
                                >
                                  <img 
                                    src={getBackendUrl(file.local_path)} 
                                    alt={file.file_name}
                                    className="w-full h-full object-cover"
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CỘT PHẢI: CHAT / BÌNH LUẬN */}
                      <div className="flex-1 flex flex-col relative bg-[#e5f0fa]">
                        {/* Chat Pattern Overlay */}
                        <div 
                          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
                          style={{
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                            backgroundSize: '120px'
                          }}
                        ></div>

                        {/* Chat Header */}
                        <div className="h-[60px] bg-white/90 backdrop-blur-md border-b border-slate-200/70 z-10 flex items-center justify-between px-6 flex-shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-[15px] text-slate-800 leading-tight">Cuộc trò chuyện tác vụ</h3>
                              <p className="text-[12px] text-slate-500">
                                {selectedTask.comments ? selectedTask.comments.length : 0} bình luận
                              </p>
                            </div>
                          </div>

                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-6 z-10 custom-scrollbar flex flex-col gap-5">
                          <div className="flex justify-center my-2">
                            <span className="px-3 py-1 bg-[#d5e6f5] rounded-full text-[11px] font-semibold text-slate-600 shadow-sm">
                              {selectedTask.deadline ? new Date(selectedTask.deadline).toLocaleDateString('vi-VN', {weekday: 'long', day: 'numeric', month: 'long'}) : 'Bắt đầu'}
                            </span>
                          </div>
                          
                          <div className="flex justify-center mb-4">
                            <div className="px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-[13px] text-slate-700 shadow-sm border border-white/50 max-w-md text-center">
                              <strong className="text-blue-600">{selectedTask.creator ? selectedTask.creator.name : selectedTask.created_by}</strong> đã tạo tác vụ này.
                            </div>
                          </div>

                          {(!selectedTask.comments || selectedTask.comments.length === 0) ? (
                            <div className="flex justify-center mt-10">
                              <span className="px-4 py-2 bg-[#d5e6f5]/50 rounded-full text-xs text-slate-500">Chưa có cuộc hội thoại nào</span>
                            </div>
                          ) : (
                            selectedTask.comments.map((comment, idx) => {
                              return (
                                <div key={comment.id} className="flex gap-3 max-w-[85%] items-end group">
                                  <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm mb-1 overflow-hidden border-2 border-white">
                                    {comment.author_name ? comment.author_name.charAt(0).toUpperCase() : 'U'}
                                  </div>
                                  <div className="flex flex-col relative">
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100/50">
                                      <div className="flex justify-between items-baseline gap-4 mb-1">
                                        <span className="text-[13px] font-bold text-blue-600">{comment.author_name || 'Người dùng'}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">{new Date(comment.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
                                      </div>
                                      <div 
                                        className="text-[14px] text-slate-800 prose prose-sm max-w-none break-words leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: comment.post_message }}
                                      />
                                      {/* Hiển thị hình ảnh đính kèm trong comment */}
                                      {comment.files && comment.files.length > 0 && (
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                          {comment.files.map(file => (
                                            <a 
                                              key={file.id} 
                                              href={getBackendUrl(file.local_path)} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="block rounded-lg overflow-hidden border border-slate-200 hover:opacity-80 transition-all"
                                            >
                                              <img 
                                                src={getBackendUrl(file.local_path)} 
                                                alt={file.file_name}
                                                className="w-full h-auto max-h-48 object-cover"
                                              />
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>


                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

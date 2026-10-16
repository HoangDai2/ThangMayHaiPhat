"use client";
import { useState, useEffect } from 'react';
import { 
  Search, Loader2, Folder, Briefcase, Eye, User, Calendar, MessageSquare, 
  Paperclip, ChevronLeft, X, ChevronDown, Settings, Menu, RefreshCw, Phone,
  Mail, Users, CheckCircle2, Clock, Check, Copy, ExternalLink, Download, ZoomIn
} from 'lucide-react';
import api from '../../lib/api';

interface BitrixCustomer {
  id: number;
  bitrix_id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
}

interface BitrixProject {
  id: number;
  bitrix_id: string;
  name: string;
  description: string;
  owner_id: string;
  start_date?: string | null;
  end_date?: string | null;
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
  file_size?: number;
  file_type?: string;
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

interface BitrixTaskUserData {
  id?: string | number;
  name?: string;
  icon?: string;
}

interface BitrixCustomerData {
  id?: number;
  bitrix_id?: string;
  name?: string;
  phone?: string | null;
  email?: string | null;
}

interface BitrixAuditorData {
  id?: string | number;
  name?: string;
  icon?: string;
  workPosition?: string;
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
  created_at?: string;
  created_date?: string | null;
  activity_date?: string | null;
  new_comments_count?: number;
  creator_data?: BitrixTaskUserData;
  responsible_data?: BitrixTaskUserData;
  customer_data?: BitrixCustomerData;
  auditors_data?: BitrixAuditorData[];
  comments_count?: number;
  files_count?: number;
  is_recurrent?: boolean;
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
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [taskRecordsPerPage, setTaskRecordsPerPage] = useState(50);
  
  const [selectedTask, setSelectedTask] = useState<BitrixTask | null>(null);
  const [loadingTaskDetail, setLoadingTaskDetail] = useState(false);
  const [syncingTaskDetail, setSyncingTaskDetail] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedTaskId, setCopiedTaskId] = useState(false);

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
    setSelectedTaskIds([]);
    try {
      const response = await api.get(`/admin/bitrix/tasks?project_id=${project.id}&per_page=50`); // Lấy theo local project_id
      setProjectTasks(response.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoadingTasks(false);
  };

  const openTaskDetail = async (id: number, forceSync = false) => {
    setCurrentView('task');
    if (forceSync) {
      setSyncingTaskDetail(true);
    } else {
      setLoadingTaskDetail(true);
    }
    try {
      const url = forceSync ? `/admin/bitrix/tasks/${id}?force_sync=1` : `/admin/bitrix/tasks/${id}`;
      const response = await api.get(url);
      setSelectedTask(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoadingTaskDetail(false);
    setSyncingTaskDetail(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setSelectedTask(null);
    setSelectedTaskIds([]);
  };

  const toggleSelectAllTasks = () => {
    if (selectedTaskIds.length === projectTasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(projectTasks.map(t => t.id));
    }
  };

  const toggleSelectTask = (id: number, e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setSelectedTaskIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const formatBitrixActivityDate = (dateStr?: string | null) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const h12 = (hours % 12 || 12).toString().padStart(2, '0');
    
    const currentYear = new Date().getFullYear();
    if (year === currentYear) {
      return `${day} tháng ${month}, ${h12}:${minutes} ${ampm}`;
    }
    return `${day} tháng ${month} năm ${year}, ${h12}:${minutes} ${ampm}`;
  };

  const getAvatarUrl = (icon?: string | null) => {
    if (!icon) return null;
    if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
    if (icon.startsWith('/')) return `https://thangmayhaiphat.bitrix24.vn${icon}`;
    return icon;
  };

  const formatBbcode = (content?: string | null): string => {
    if (!content) return '';
    let str = content;

    // Replace [USER=123]Name[/USER] or [USER="123"]Name[/USER] with styled bold name
    str = str.replace(/\[USER=[^\]]+\](.*?)\[\/USER\]/gi, '<strong class="text-blue-600 font-semibold">$1</strong>');

    // Replace [URL=url]text[/URL]
    str = str.replace(/\[URL=[^\]]+\](.*?)\[\/URL\]/gi, '<span class="text-blue-600 font-medium hover:underline cursor-pointer">$1</span>');

    // Replace [URL]url[/URL]
    str = str.replace(/\[URL\](.*?)\[\/URL\]/gi, '<span class="text-blue-600 font-medium hover:underline cursor-pointer">$1</span>');

    // Replace [B]text[/B]
    str = str.replace(/\[B\](.*?)\[\/B\]/gi, '<strong class="font-bold text-slate-900">$1</strong>');

    // Replace [I]text[/I]
    str = str.replace(/\[I\](.*?)\[\/I\]/gi, '<em class="italic">$1</em>');

    // Replace [TIMESTAMP=1772316060 FORMAT=...] with formatted date
    str = str.replace(/\[TIMESTAMP=(\d+)[^\]]*\]/gi, (_, ts) => {
      try {
        const val = parseInt(ts, 10);
        if (!isNaN(val)) {
          const dt = new Date(val * 1000);
          return dt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + dt.toLocaleDateString('vi-VN');
        }
      } catch {
        // ignore
      }
      return '';
    });

    // Replace [P]text[/P]
    str = str.replace(/\[P\](.*?)\[\/P\]/gi, '<p class="my-1">$1</p>');

    // Clean Bitrix internal file tags
    str = str.replace(/\[(?:DISK\s+FILE\s+ID|ATTACH|FILE)[^\]]*\]/gi, '');

    // Clean any remaining unclosed or unrecognized BBCode tags
    str = str.replace(/\[\/?(?:USER|URL|B|I|P|ATTACH|FILE|IMG|COLOR|SIZE)[^\]]*\]/gi, '');

    // Convert newlines to break line
    str = str.replace(/\r\n|\r|\n/g, '<br />');

    return str;
  };

  const getCommentDateLabel = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return '';
    const label = d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const formatCommentTime = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return '';
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const h12 = (hours % 12 || 12).toString().padStart(2, '0');
    return `${h12}:${minutes} ${ampm}`;
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
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    const cleanPath = path.replace(/^\/+/, '').replace(/^storage\//, '');
    return `${baseUrl}/storage/${cleanPath}`;
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
                        {(project.project_date_start || project.start_date) ? new Date(project.project_date_start || project.start_date!).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {(project.project_date_finish || project.end_date) ? new Date(project.project_date_finish || project.end_date!).toLocaleDateString('vi-VN') : '-'}
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
              <div className="flex items-center gap-2">
                {currentView === 'task' && selectedTask && (
                  <button
                    onClick={() => openTaskDetail(selectedTask.id, true)}
                    disabled={syncingTaskDetail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition-colors border border-blue-200 shadow-2xs"
                    title="Đồng bộ lại bình luận và hình ảnh từ Bitrix24"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingTaskDetail ? 'animate-spin' : ''}`} />
                    {syncingTaskDetail ? 'Đang đồng bộ...' : 'Đồng bộ từ Bitrix'}
                  </button>
                )}
                <button onClick={closeModal} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                        Bắt đầu: {(selectedProject.project_date_start || selectedProject.start_date) ? new Date(selectedProject.project_date_start || selectedProject.start_date!).toLocaleDateString('vi-VN') : '-'}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        Kết thúc: {(selectedProject.project_date_finish || selectedProject.end_date) ? new Date(selectedProject.project_date_finish || selectedProject.end_date!).toLocaleDateString('vi-VN') : '-'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#285c9a]" />
                      Danh sách Tác vụ trong dự án
                    </h3>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                      {loadingTasks ? (
                        <div className="p-8 flex justify-center items-center">
                          <Loader2 className="w-6 h-6 text-[#285c9a] animate-spin" />
                        </div>
                      ) : projectTasks.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">
                          Dự án này chưa có tác vụ nào.
                        </div>
                      ) : (
                        <div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead className="bg-[#fcfdfe] border-b border-slate-200 text-slate-600 font-semibold text-xs tracking-normal">
                                <tr>
                                  <th className="px-4 py-3 min-w-[340px]">
                                    <div className="flex items-center gap-2.5">
                                      <input 
                                        type="checkbox" 
                                        checked={selectedTaskIds.length === projectTasks.length && projectTasks.length > 0} 
                                        onChange={toggleSelectAllTasks} 
                                        className="rounded border-slate-300 text-[#285c9a] focus:ring-0 cursor-pointer w-3.5 h-3.5" 
                                      />
                                      <Settings className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                                      <span>Tên</span>
                                    </div>
                                  </th>
                                  <th className="px-4 py-3 whitespace-nowrap min-w-[170px]">
                                    <div className="flex items-center gap-1 cursor-pointer select-none group">
                                      <span>Hoạt động</span>
                                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                                    </div>
                                  </th>
                                  <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Hạn chót</th>
                                  <th className="px-4 py-3 whitespace-nowrap min-w-[190px]">Người tạo</th>
                                  <th className="px-4 py-3 whitespace-nowrap min-w-[190px]">Người được phân công</th>
                                  <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Trạng thái</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {projectTasks.map(task => {
                                  const creator = task.creator_data || (task.creator ? { name: task.creator.name, icon: '' } : { name: task.created_by, icon: '' });
                                  const resp = task.responsible_data || (task.responsible ? { name: task.responsible.name, icon: '' } : { name: task.responsible_id, icon: '' });
                                  const creatorAvatar = getAvatarUrl(creator.icon);
                                  const respAvatar = getAvatarUrl(resp.icon);
                                  const isSelected = selectedTaskIds.includes(task.id);
                                  const isCompleted = String(task.status) === '5';

                                  return (
                                    <tr 
                                      key={task.id} 
                                      className={`hover:bg-[#eef7fd] transition-colors cursor-pointer group ${isSelected ? 'bg-sky-50/60' : ''}`}
                                      onClick={() => openTaskDetail(task.id)}
                                    >
                                      <td className="px-4 py-3">
                                        <div className="flex items-start gap-2.5">
                                          <div className="pt-0.5 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <input 
                                              type="checkbox" 
                                              checked={isSelected} 
                                              onChange={(e) => toggleSelectTask(task.id, e)} 
                                              className="rounded border-slate-300 text-[#285c9a] focus:ring-0 cursor-pointer w-3.5 h-3.5" 
                                            />
                                            <Menu className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 cursor-grab" />
                                          </div>
                                          <div className="flex flex-col min-w-0">
                                            <span className={`text-xs md:text-sm leading-snug break-words ${isCompleted ? 'line-through text-slate-400 group-hover:text-slate-500 font-normal' : 'text-slate-700 group-hover:text-blue-700 font-medium'}`}>
                                              {task.title}
                                            </span>
                                            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-medium">
                                              {(task.comments_count !== undefined && task.comments_count > 0) && (
                                                <span className="inline-flex items-center gap-1 hover:text-slate-600">
                                                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                                  {task.comments_count}
                                                </span>
                                              )}
                                              {(task.files_count !== undefined && task.files_count > 0) && (
                                                <span className="inline-flex items-center gap-1 hover:text-slate-600">
                                                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                                                  {task.files_count}
                                                </span>
                                              )}
                                              {task.is_recurrent && (
                                                <span title="Tác vụ lặp lại định kỳ" className="inline-flex items-center">
                                                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center text-xs text-slate-600">
                                          {task.new_comments_count && task.new_comments_count > 0 ? (
                                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#75b73d] text-white text-[10px] font-bold mr-1.5 flex-shrink-0">
                                              {task.new_comments_count}
                                            </span>
                                          ) : null}
                                          <span>{formatBitrixActivityDate(task.activity_date)}</span>
                                        </div>
                                      </td>

                                      <td className="px-4 py-3 whitespace-nowrap">
                                        {isCompleted ? (
                                          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-normal text-slate-600 bg-white border border-slate-200 shadow-2xs">
                                            Đã hoàn thành
                                          </span>
                                        ) : (
                                          <span className="text-xs text-slate-600">
                                            {task.deadline ? new Date(task.deadline).toLocaleDateString('vi-VN') : '-'}
                                          </span>
                                        )}
                                      </td>

                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                          {creatorAvatar ? (
                                            <img 
                                              src={creatorAvatar} 
                                              alt={creator.name || ''} 
                                              className="w-5 h-5 rounded-full object-cover border border-slate-200 flex-shrink-0" 
                                              onError={(e) => {
                                                (e.target as HTMLElement).style.display = 'none';
                                                if ((e.target as HTMLElement).nextElementSibling) {
                                                  ((e.target as HTMLElement).nextElementSibling as HTMLElement).style.display = 'flex';
                                                }
                                              }}
                                            />
                                          ) : null}
                                          <div className={`w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 ${creatorAvatar ? 'hidden' : 'flex'}`}>
                                            <User className="w-3 h-3" />
                                          </div>
                                          <span className="text-xs text-slate-700 truncate max-w-[150px]" title={creator.name || ''}>
                                            {creator.name || '-'}
                                          </span>
                                        </div>
                                      </td>

                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                          {respAvatar ? (
                                            <img 
                                              src={respAvatar} 
                                              alt={resp.name || ''} 
                                              className="w-5 h-5 rounded-full object-cover border border-slate-200 flex-shrink-0" 
                                              onError={(e) => {
                                                (e.target as HTMLElement).style.display = 'none';
                                                if ((e.target as HTMLElement).nextElementSibling) {
                                                  ((e.target as HTMLElement).nextElementSibling as HTMLElement).style.display = 'flex';
                                                }
                                              }}
                                            />
                                          ) : null}
                                          <div className={`w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 ${respAvatar ? 'hidden' : 'flex'}`}>
                                            <User className="w-3 h-3" />
                                          </div>
                                          <span className="text-xs text-slate-700 font-medium truncate max-w-[150px]" title={resp.name || ''}>
                                            {resp.name || '-'}
                                          </span>
                                        </div>
                                      </td>

                                      <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-700">
                                        {getStatusText(task.status)}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* FOOTER BAR (GIỐNG HÌNH 2) */}
                          <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
                            <div className="space-y-3">
                              <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <span>ĐÃ CHỌN: {selectedTaskIds.length}/{projectTasks.length}</span>
                                <span>TỔNG: HIỂN THỊ</span>
                                <span>TRANG: 1</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <select className="appearance-none bg-white border border-slate-300 rounded px-3 py-1.5 pr-8 text-xs text-slate-700 focus:outline-none focus:border-sky-500 uppercase font-semibold cursor-pointer">
                                    <option value="">CHỌN HÀNH ĐỘNG</option>
                                    <option value="complete">Hoàn thành</option>
                                    <option value="delete">Xóa</option>
                                  </select>
                                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                <button 
                                  type="button"
                                  className="px-4 py-1.5 bg-[#3bc8f5] hover:bg-[#2bb2dd] text-white rounded text-xs font-bold uppercase transition-colors shadow-xs cursor-pointer"
                                  onClick={() => {}}
                                >
                                  ÁP DỤNG
                                </button>
                                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold uppercase cursor-pointer">
                                  <input type="checkbox" className="rounded border-slate-300 text-sky-500 focus:ring-0 cursor-pointer" />
                                  <span>DÀNH CHO TẤT CẢ</span>
                                </label>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase">
                              <span>BẢN GHI:</span>
                              <div className="relative">
                                <select 
                                  value={taskRecordsPerPage}
                                  onChange={(e) => setTaskRecordsPerPage(Number(e.target.value))}
                                  className="appearance-none bg-white border border-slate-300 rounded px-3 py-1 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
                                >
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
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
                          <h2 className="text-[17px] font-bold text-slate-900 leading-tight mb-2">
                            {selectedTask.title}
                          </h2>
                          {selectedTask.description && (
                            <div className="text-[13px] text-slate-700 whitespace-pre-wrap leading-relaxed mt-2 pt-2 border-t border-slate-100">
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
                                    <span className="truncate">{selectedTask.creator_data?.name || (selectedTask.creator ? selectedTask.creator.name : selectedTask.created_by)}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 text-slate-500 align-top">Người được phân công:</td>
                                <td className="py-2 text-slate-800 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px]"><User className="w-3 h-3"/></div>
                                    <span className="truncate">{selectedTask.responsible_data?.name || (selectedTask.responsible ? selectedTask.responsible.name : (selectedTask.responsible_id || 'Chưa phân công'))}</span>
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
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    String(selectedTask.status) === '5' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    {String(selectedTask.status) === '5' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                                    {getStatusText(selectedTask.status)}
                                  </span>
                                </td>
                              </tr>
                              {(selectedTask.created_date || selectedTask.created_at) && (
                                <tr>
                                  <td className="py-2 text-slate-500 align-top">Ngày tạo:</td>
                                  <td className="py-2 text-slate-700 text-xs font-medium">
                                    {new Date(selectedTask.created_date || selectedTask.created_at!).toLocaleString('vi-VN')}
                                  </td>
                                </tr>
                              )}
                              {selectedTask.is_recurrent && (
                                <tr>
                                  <td className="py-2 text-slate-500 align-top">Lặp lại:</td>
                                  <td className="py-2 text-slate-700 text-xs font-medium">
                                    <span className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-semibold">
                                      <RefreshCw className="w-3 h-3" /> Tác vụ định kỳ
                                    </span>
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td className="py-2 text-slate-500 align-top">Mã ID:</td>
                                <td className="py-2">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                    <span className="font-mono font-medium">#TASK_{selectedTask.bitrix_id}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        navigator.clipboard.writeText(selectedTask.bitrix_id);
                                        setCopiedTaskId(true);
                                        setTimeout(() => setCopiedTaskId(false), 2000);
                                      }}
                                      className="p-1 hover:text-slate-800 rounded transition-colors text-slate-400 hover:text-slate-600"
                                      title="Sao chép ID"
                                    >
                                      {copiedTaskId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Box 3: THÔNG TIN KHÁCH HÀNG (YÊU CẦU NGƯỜI DÙNG) */}
                        {(() => {
                          const customer = selectedTask.customer_data || selectedProject?.customer;
                          return (
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-[13px]">
                                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <User className="w-3.5 h-3.5" />
                                  </div>
                                  Thông tin khách hàng
                                </h3>
                                {customer?.bitrix_id && (
                                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-500">
                                    CRM #{customer.bitrix_id}
                                  </span>
                                )}
                              </div>

                              {customer ? (
                                <div className="space-y-2.5 text-[13px]">
                                  <div>
                                    <span className="text-slate-400 text-xs block mb-0.5">Khách hàng / Liên lạc:</span>
                                    <span className="font-semibold text-slate-900 leading-snug block">
                                      {customer.name}
                                    </span>
                                  </div>

                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-slate-400 text-xs">Số điện thoại:</span>
                                    {customer.phone ? (
                                      <a 
                                        href={`tel:${customer.phone}`} 
                                        className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 hover:underline"
                                      >
                                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                        {customer.phone}
                                      </a>
                                    ) : (
                                      <span className="text-slate-400 text-xs italic">Chưa có SĐT</span>
                                    )}
                                  </div>

                                  {customer.email && (
                                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                                      <span className="text-slate-400 text-xs">Email:</span>
                                      <a 
                                        href={`mailto:${customer.email}`} 
                                        className="font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1.5 hover:underline truncate max-w-[190px]"
                                      >
                                        <Mail className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                                        <span className="truncate">{customer.email}</span>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-xs text-slate-400 italic">Chưa có thông tin khách hàng gắn với tác vụ này</p>
                              )}
                            </div>
                          );
                        })()}

                        {/* Box 4: Dự án liên quan */}
                        {selectedProject && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2 text-[13px]">
                              <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Folder className="w-3.5 h-3.5" />
                              </div>
                              Dự án
                            </h3>
                            <p className="text-[13px] font-medium text-slate-800 leading-snug">
                              {selectedProject.name}
                            </p>
                          </div>
                        )}

                        {/* Box 5: Người quan sát */}
                        {selectedTask.auditors_data && selectedTask.auditors_data.length > 0 && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-[13px]">
                              <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <Users className="w-3.5 h-3.5" />
                              </div>
                              Người quan sát ({selectedTask.auditors_data.length})
                            </h3>
                            <div className="space-y-2.5">
                              {selectedTask.auditors_data.map((auditor, idx) => (
                                <div key={idx} className="flex items-center gap-2.5">
                                  {auditor.icon ? (
                                    <img 
                                      src={getAvatarUrl(auditor.icon)!} 
                                      alt={auditor.name} 
                                      className="w-7 h-7 rounded-full object-cover border border-slate-200 flex-shrink-0" 
                                    />
                                  ) : (
                                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {auditor.name?.charAt(0) || 'U'}
                                    </div>
                                  )}
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13px] font-semibold text-slate-800 truncate">{auditor.name}</span>
                                    {auditor.workPosition && (
                                      <span className="text-[11px] text-slate-400 truncate">{auditor.workPosition}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Box 6: Hình ảnh / Tập tin ở cột trái */}
                        {selectedTask.files && selectedTask.files.length > 0 && (
                          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-[13px]">
                                <Paperclip className="w-4 h-4 text-emerald-500" />
                                Tập tin: {selectedTask.files.length}
                              </h3>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {selectedTask.files.length} ảnh/tập tin
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedTask.files.map(file => (
                                <div 
                                  key={file.id} 
                                  onClick={() => setPreviewImage(getBackendUrl(file.local_path))}
                                  className="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all"
                                >
                                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                    <img 
                                      src={getBackendUrl(file.local_path)} 
                                      alt={file.file_name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="p-1.5 bg-white text-[11px] truncate text-slate-700 font-medium border-t border-slate-100">
                                    {file.file_name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CỘT PHẢI: CHAT / BÌNH LUẬN & ẢNH BẢO TRÌ */}
                      <div className="flex-1 flex flex-col relative bg-gradient-to-b from-[#bce0fd]/30 via-[#e5f0fa] to-[#eef6fc]">
                        {/* Chat Pattern Overlay */}
                        <div 
                          className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none" 
                          style={{
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                            backgroundSize: '120px'
                          }}
                        ></div>

                        {/* Chat Header */}
                        <div className="h-[60px] bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-10 flex items-center justify-between px-6 flex-shrink-0 shadow-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-xs">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-[15px] text-slate-900 leading-tight">Cuộc trò chuyện tác vụ</h3>
                              <p className="text-[12px] text-slate-500 font-medium">
                                {selectedTask.comments ? selectedTask.comments.length : 0} bình luận & trao đổi
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-6 z-10 custom-scrollbar flex flex-col gap-4">
                          {/* Top Task Summary Card (Thiết kế xanh lá giống Bitrix) */}
                          <div className="flex flex-col items-center my-2 w-full">
                            <span className="px-3.5 py-1 bg-[#d5e6f5] rounded-full text-[11px] font-semibold text-slate-600 shadow-xs mb-3 border border-white/50">
                              {(selectedTask.created_date || selectedTask.created_at) ? getCommentDateLabel(selectedTask.created_date || selectedTask.created_at) : 'Khởi tạo tác vụ'}
                            </span>

                            <div className="w-full max-w-2xl bg-[#edf7ee] border border-[#c3e6cb] rounded-2xl p-4 shadow-xs">
                              <div className="text-[13px] text-slate-700 mb-3 font-medium">
                                <strong className="text-blue-600 font-bold">
                                  {selectedTask.creator_data?.name || (selectedTask.creator ? selectedTask.creator.name : selectedTask.created_by)}
                                </strong> đã tạo tác vụ này.
                              </div>
                              <div className="bg-white/90 rounded-xl p-3.5 border border-[#b7e4c7]/60 space-y-2.5">
                                <div className="flex items-start gap-2.5 text-blue-600 font-bold text-[14px]">
                                  <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                                    <User className="w-3 h-3" />
                                  </div>
                                  <span className="leading-snug">{selectedTask.title}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px] pt-2 border-t border-slate-100">
                                  <div>
                                    <span className="text-slate-400">Trạng thái: </span>
                                    <span className="font-bold text-emerald-700">{getStatusText(selectedTask.status)}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Chủ sở hữu: </span>
                                    <span className="font-semibold text-slate-800">
                                      {selectedTask.creator_data?.name || (selectedTask.creator ? selectedTask.creator.name : selectedTask.created_by)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Người thực hiện: </span>
                                    <span className="font-semibold text-slate-800">
                                      {selectedTask.responsible_data?.name || (selectedTask.responsible ? selectedTask.responsible.name : selectedTask.responsible_id)}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Hạn chót: </span>
                                    <span className="font-medium text-slate-800">
                                      {selectedTask.deadline ? new Date(selectedTask.deadline).toLocaleString('vi-VN') : '-'}
                                    </span>
                                  </div>
                                  {selectedProject && (
                                    <div className="col-span-2 pt-1 border-t border-slate-50 truncate">
                                      <span className="text-slate-400">Dự án: </span>
                                      <span className="font-semibold text-slate-700">{selectedProject.name}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Danh sách bình luận & Ảnh đính kèm */}
                          {(!selectedTask.comments || selectedTask.comments.length === 0) ? (
                            <div className="flex justify-center mt-8">
                              <span className="px-4 py-2 bg-[#d5e6f5]/60 rounded-full text-xs text-slate-500 font-medium">Chưa có bình luận nào khác</span>
                            </div>
                          ) : (
                            (() => {
                              let lastDate = '';
                              return selectedTask.comments.map((comment) => {
                                const commentDate = getCommentDateLabel(comment.created_at);
                                const showDate = commentDate && commentDate !== lastDate;
                                if (showDate) {
                                  lastDate = commentDate;
                                }

                                // Trích xuất tên người dùng hiển thị nếu author_name là System
                                let displayName = comment.author_name || 'Người dùng';
                                if (displayName.toLowerCase() === 'system' || displayName.toLowerCase() === 'hệ thống') {
                                  const match = comment.post_message?.match(/\[USER=[^\]]+\](.*?)\[\/USER\]/i);
                                  if (match && match[1]) {
                                    displayName = match[1];
                                  }
                                }

                                const isApproval = comment.post_message?.includes('phê duyệt và đóng tác vụ');

                                return (
                                  <div key={comment.id} className="flex flex-col gap-2">
                                    {showDate && (
                                      <div className="flex justify-center my-2">
                                        <span className="px-3.5 py-1 bg-[#d5e6f5] rounded-full text-[11px] font-semibold text-slate-600 shadow-xs border border-white/50">
                                          {commentDate}
                                        </span>
                                      </div>
                                    )}

                                    <div className="flex gap-3 max-w-[92%] items-start group">
                                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm mt-0.5 overflow-hidden border-2 border-white">
                                        {displayName.charAt(0).toUpperCase()}
                                      </div>

                                      <div className="flex flex-col flex-1 min-w-0">
                                        <div className={`bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-xs border transition-all ${
                                          isApproval ? 'border-emerald-300 bg-emerald-50/40 shadow-sm' : 'border-slate-100'
                                        }`}>
                                          <div className="flex justify-between items-baseline gap-4 mb-2">
                                            <span className="text-[13px] font-bold text-blue-600 truncate">
                                              {displayName}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                              {formatCommentTime(comment.created_at)}
                                            </span>
                                          </div>

                                          {/* HIỂN THỊ HÌNH ẢNH BẢO TRÌ TRONG CHAT */}
                                          {comment.files && comment.files.length > 0 && (
                                            <div className="space-y-3 mb-2.5">
                                              {comment.files.map(file => (
                                                <div 
                                                  key={file.id} 
                                                  className="group/img relative overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50 shadow-sm hover:shadow-md transition-all"
                                                >
                                                  <div 
                                                    className="cursor-zoom-in bg-slate-100 flex items-center justify-center overflow-hidden max-h-[520px]"
                                                    onClick={() => setPreviewImage(getBackendUrl(file.local_path))}
                                                    title="Nhấn để phóng to ảnh"
                                                  >
                                                    <img 
                                                      src={getBackendUrl(file.local_path)} 
                                                      alt={file.file_name}
                                                      className="w-full h-auto max-h-[520px] object-contain transition-transform duration-200 group-hover/img:scale-[1.01]"
                                                      loading="lazy"
                                                    />
                                                  </div>
                                                  <div className="px-3.5 py-2 bg-white flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                                                    <span className="truncate font-semibold text-slate-800" title={file.file_name}>
                                                      {file.file_name}
                                                    </span>
                                                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                                      <button
                                                        type="button"
                                                        onClick={() => setPreviewImage(getBackendUrl(file.local_path))}
                                                        className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold flex items-center gap-1 transition-colors text-[11px]"
                                                      >
                                                        <ZoomIn className="w-3.5 h-3.5" /> Phóng to
                                                      </button>
                                                      <a 
                                                        href={getBackendUrl(file.local_path)} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 font-semibold flex items-center gap-1 transition-colors text-[11px]"
                                                      >
                                                        <ExternalLink className="w-3.5 h-3.5" /> Mở tab mới
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                          {/* NỘI DUNG BÌNH LUẬN ĐÃ FORMAT BBCODE */}
                                          <div 
                                            className="text-[13.5px] text-slate-800 leading-relaxed break-words"
                                            dangerouslySetInnerHTML={{ __html: formatBbcode(comment.post_message) }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              });
                            })()
                          )}

                          {/* Hiển thị tệp tác vụ nếu chưa có trong bình luận nào để không sót ảnh */}
                          {(() => {
                            const commentFileIds = new Set(
                              (selectedTask.comments || []).flatMap(c => (c.files || []).map(f => f.id))
                            );
                            const unassignedTaskFiles = (selectedTask.files || []).filter(f => !commentFileIds.has(f.id));
                            
                            if (unassignedTaskFiles.length === 0) return null;
                            return (
                              <div className="flex gap-3 max-w-[92%] items-start my-2">
                                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm mt-0.5 border-2 border-white">
                                  <Paperclip className="w-4 h-4" />
                                </div>
                                <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-xs border border-slate-100 flex-1">
                                  <div className="text-[13px] font-bold text-emerald-700 mb-2.5 flex items-center gap-1.5">
                                    <Paperclip className="w-4 h-4" />
                                    Tệp đính kèm tác vụ ({unassignedTaskFiles.length})
                                  </div>
                                  <div className="space-y-3">
                                    {unassignedTaskFiles.map(file => (
                                      <div key={file.id} className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50">
                                        <div 
                                          className="cursor-zoom-in bg-slate-100 flex items-center justify-center overflow-hidden max-h-[500px]"
                                          onClick={() => setPreviewImage(getBackendUrl(file.local_path))}
                                        >
                                          <img 
                                            src={getBackendUrl(file.local_path)} 
                                            alt={file.file_name} 
                                            className="w-full h-auto max-h-[500px] object-contain"
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="px-3.5 py-2 bg-white flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                                          <span className="truncate font-semibold text-slate-800">{file.file_name}</span>
                                          <button
                                            type="button"
                                            onClick={() => setPreviewImage(getBackendUrl(file.local_path))}
                                            className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold flex items-center gap-1 text-[11px]"
                                          >
                                            <ZoomIn className="w-3.5 h-3.5" /> Phóng to
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
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

      {/* MODAL PHÓNG TO ẢNH (LIGHTBOX) */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 flex items-center gap-2 z-20">
              <a
                href={previewImage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white shadow-lg transition-colors"
                title="Mở ảnh gốc trong tab mới"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-2.5 rounded-full bg-slate-800/80 hover:bg-rose-600 text-white shadow-lg transition-colors"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img 
              src={previewImage} 
              alt="Ảnh bảo trì phóng to" 
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20 bg-slate-900/50"
            />
          </div>
        </div>
      )}
    </div>
  );
}

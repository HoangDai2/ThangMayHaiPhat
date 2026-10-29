"use client";
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import api from '../../../lib/api';
import { Plus, Pencil, Trash2, Shield, Search, X } from 'lucide-react';
import { usePermissions } from '../../../hooks/usePermissions';

export default function UsersManagement() {
  const { isAdmin } = usePermissions();
  const [users, setUsers] = useState<any[]>([]);
  const [permissionsList, setPermissionsList] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [] as string[]
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, permsRes] = await Promise.all([
        api.get('/users'),
        api.get('/permissions')
      ]);
      setUsers(usersRes.data);
      setPermissionsList(permsRes.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const openModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        permissions: user.permissions?.map((p: any) => p.id) || []
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        permissions: []
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handlePermissionChange = (permId: string) => {
    setFormData(prev => {
      const perms = [...prev.permissions];
      if (perms.includes(permId)) {
        return { ...prev, permissions: perms.filter(id => id !== permId) };
      } else {
        return { ...prev, permissions: [...perms, permId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
      } else {
        await api.post('/users', formData);
      }
      await fetchData();
      closeModal();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        await api.delete(`/users/${id}`);
        await fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-slate-500">
        Bạn không có quyền quản lý tài khoản.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Tài Khoản & Phân Quyền</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý danh sách nhân viên và các chức năng họ được phép sử dụng.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-[#285c9a] hover:bg-[#1e4a80] text-white px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Thêm Nhân Viên
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Quyền hạn (Chức năng)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => {
                const isUserAdmin = user.roles?.some((r: any) => r.name === 'Admin');
                return (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isUserAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                          <Shield className="w-3.5 h-3.5" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          Nhân viên
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isUserAdmin ? (
                        <span className="text-sm text-slate-500 italic">Toàn quyền</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {user.permissions?.map((p: any) => (
                            <span key={p.id} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                              {p.description}
                            </span>
                          ))}
                          {(!user.permissions || user.permissions.length === 0) && (
                            <span className="text-sm text-slate-400 italic">Chưa cấp quyền</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {!isUserAdmin && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa & Cấp quyền"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-slate-800">
                {editingUser ? 'Chỉnh sửa & Phân quyền' : 'Thêm Nhân Viên Mới'}
              </h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Thông tin cơ bản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Họ tên *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#285c9a] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#285c9a] outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Mật khẩu {editingUser && '(Để trống nếu không muốn đổi)'} {!editingUser && '*'}
                    </label>
                    <input
                      type="password"
                      required={!editingUser}
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#285c9a] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Cấp quyền (Chức năng)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {permissionsList.map(perm => (
                    <label key={perm.id} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm.id)}
                        onChange={() => handlePermissionChange(perm.id)}
                        className="w-4 h-4 text-[#285c9a] border-slate-300 rounded focus:ring-[#285c9a]"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-800">{perm.description}</div>
                        <div className="text-xs text-slate-500">{perm.name}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#285c9a] hover:bg-[#1e4a80] text-white font-medium rounded-xl transition-colors shadow-sm disabled:opacity-70"
                >
                  {loading ? 'Đang lưu...' : 'Lưu lại'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
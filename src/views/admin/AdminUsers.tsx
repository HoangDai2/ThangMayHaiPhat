"use client";
import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Search, Loader2, X } from 'lucide-react';
import api from '../../lib/api';

interface DbUser {
  id: number;
  name: string;
  email: string;
  roles?: { name: string }[];
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<DbUser[]>([]);
  const [rolesList, setRolesList] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    roles: [] as string[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/roles')
      ]);
      setUsers(usersRes.data);
      setRolesList(rolesRes.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setForm({ id: 0, name: '', email: '', password: '', roles: [] });
    setIsEditing(false);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (user: DbUser) => {
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      roles: user.roles ? user.roles.map(r => r.name) : [],
    });
    setIsEditing(true);
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Tên và Email là bắt buộc');
      return;
    }
    if (!isEditing && !form.password) {
      setError('Mật khẩu là bắt buộc khi tạo mới');
      return;
    }

    setSaving(true);
    setError('');

    const payload = { ...form };
    if (!payload.password) delete (payload as any).password; // Don't send empty password

    try {
      if (isEditing) {
        await api.put(`/admin/users/${form.id}`, payload);
      } else {
        await api.post('/admin/users', payload);
      }
      await fetchData();
      setModalOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Xóa người dùng "${name}"?`)) return;
    try {
      await api.delete(`/admin/users/${id}`);
      await fetchData();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const toggleRole = (roleName: string) => {
    setForm(prev => {
      const roles = prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName];
      return { ...prev, roles };
    });
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-8 h-8 text-orange-500" />
            Quản lý Tài khoản
          </h1>
          <p className="text-slate-500 mt-1">{users.length} tài khoản</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <th className="p-4 font-medium">Tên</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Vai trò</th>
                <th className="p-4 font-medium">Ngày tạo</th>
                <th className="p-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.map(r => (
                        <span key={r.name} className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                          {r.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="p-2 text-slate-400 hover:text-blue-500 bg-white hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="p-2 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-slate-200 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Không tìm thấy tài khoản nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tên hiển thị</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email (Tên đăng nhập)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="VD: nhanvien@haiphat.vn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mật khẩu {isEditing && '(Bỏ trống nếu không đổi)'}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Tối thiểu 6 ký tự"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vai trò (Role)</label>
                  <div className="flex flex-wrap gap-2">
                    {rolesList.map(role => (
                      <button
                        key={role.name}
                        onClick={() => toggleRole(role.name)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          form.roles.includes(role.name)
                            ? 'bg-orange-50 border-orange-200 text-orange-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {role.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

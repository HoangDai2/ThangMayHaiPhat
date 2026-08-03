"use client";
import { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Trash2, Search, Loader2, X } from 'lucide-react';
import api from '../../lib/api';

interface DbRole {
  id: number;
  name: string;
  permissions?: { name: string }[];
}

export default function AdminRoles() {
  const [roles, setRoles] = useState<DbRole[]>([]);
  const [permissionsList, setPermissionsList] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    id: 0,
    name: '',
    permissions: [] as string[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permsRes] = await Promise.all([
        api.get('/admin/roles'),
        api.get('/admin/permissions')
      ]);
      setRoles(rolesRes.data);
      setPermissionsList(permsRes.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setForm({ id: 0, name: '', permissions: [] });
    setIsEditing(false);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (role: DbRole) => {
    setForm({
      id: role.id,
      name: role.name,
      permissions: role.permissions ? role.permissions.map(p => p.name) : [],
    });
    setIsEditing(true);
    setError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Tên vai trò là bắt buộc');
      return;
    }

    setSaving(true);
    setError('');

    try {
      if (isEditing) {
        await api.put(`/admin/roles/${form.id}`, form);
      } else {
        await api.post('/admin/roles', form);
      }
      await fetchData();
      setModalOpen(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (name === 'Super Admin') {
      alert('Không thể xóa Super Admin');
      return;
    }
    if (!window.confirm(`Xóa vai trò "${name}"?`)) return;
    try {
      await api.delete(`/admin/roles/${id}`);
      await fetchData();
    } catch (e) {
      console.error(e);
      alert('Xóa thất bại');
    }
  };

  const togglePermission = (permName: string) => {
    setForm(prev => {
      const permissions = prev.permissions.includes(permName)
        ? prev.permissions.filter(p => p !== permName)
        : [...prev.permissions, permName];
      return { ...prev, permissions };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-8 h-8 text-orange-500" />
            Quản lý Vai trò (Roles)
          </h1>
          <p className="text-slate-500 mt-1">Phân quyền truy cập hệ thống</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm vai trò
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-lg text-slate-800">{role.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(role)}
                    className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {role.name !== 'Super Admin' && (
                    <button
                      onClick={() => handleDelete(role.id, role.name)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 bg-white">
                <p className="text-sm font-medium text-slate-500 mb-3">Quyền hạn ({role.permissions?.length || 0}):</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions?.map(p => (
                    <span key={p.name} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                      {p.name}
                    </span>
                  ))}
                  {(!role.permissions || role.permissions.length === 0) && (
                    <span className="text-sm text-slate-400 italic">Chưa có quyền nào</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? 'Sửa vai trò' : 'Thêm vai trò mới'}
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

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tên vai trò</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="VD: Content Editor"
                    disabled={isEditing && form.name === 'Super Admin'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Phân quyền (Permissions)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {permissionsList.map(perm => (
                      <label key={perm.name} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                          checked={form.permissions.includes(perm.name)}
                          onChange={() => togglePermission(perm.name)}
                          disabled={isEditing && form.name === 'Super Admin'} // Super admin should have all
                        />
                        <span className="text-sm font-medium text-slate-700">{perm.name}</span>
                      </label>
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

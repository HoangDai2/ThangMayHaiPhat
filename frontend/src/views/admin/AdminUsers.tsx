"use client";
import { useState, useEffect } from 'react';
import { DbRole } from '../../lib/types';
import api from '../../lib/api';
import { Users, Plus, Trash2 } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useRouter } from 'next/navigation';

interface AppUser {
  id: string;
  name: string;
  email: string;
  roles?: { id: string; name: string }[];
  permissions?: { id: string; name: string }[];
}

export default function AdminUsers() {
  const { hasPermission, loading: permissionsLoading } = usePermissions();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [roles, setRoles] = useState<DbRole[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!permissionsLoading && !hasPermission('manage-users')) {
      router.replace('/admin');
    }
  }, [hasPermission, permissionsLoading, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/users'),
        api.get('/roles')
      ]);

      if (usersRes.data) setUsers(usersRes.data);
      if (rolesRes.data) setRoles(rolesRes.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (permissionsLoading || !hasPermission('manage-users')) return null;

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}"?`)) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Có lỗi xảy ra khi xóa tài khoản.');
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#285c9a]" />
          Quản Lý Tài Khoản (Phân Quyền)
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#1e4a80] shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Gán Vai Trò
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-6 py-4">Họ và tên</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{u.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{u.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {u.roles && u.roles.length > 0 ? (
                        u.roles.map(r => (
                          <span key={r.id} className="bg-blue-50 text-[#285c9a] border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                            {r.name}
                          </span>
                        ))
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs">
                          Nhân viên
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa tài khoản"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Chưa có tài khoản nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

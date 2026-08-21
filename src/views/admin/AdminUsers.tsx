"use client";
import { useState, useEffect } from 'react';
import { supabase, DbRole, DbUserRole } from '../../lib/supabase';
import { Users, Plus, Trash2 } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useRouter } from 'next/navigation';

interface UserRoleWithDetails extends DbUserRole {
  role_name?: string;
}

export default function AdminUsers() {
  const { hasPermission, loading: permissionsLoading } = usePermissions();
  const [userRoles, setUserRoles] = useState<UserRoleWithDetails[]>([]);
  const [roles, setRoles] = useState<DbRole[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [newRoleId, setNewRoleId] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (!permissionsLoading && !hasPermission('manage_all')) {
      router.replace('/admin');
    }
  }, [hasPermission, permissionsLoading, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, userRolesRes] = await Promise.all([
        supabase.from('roles').select('*'),
        supabase.from('user_roles').select('*')
      ]);

      if (rolesRes.data) setRoles(rolesRes.data);
      
      if (userRolesRes.data && rolesRes.data) {
        const enriched = userRolesRes.data.map(ur => ({
          ...ur,
          role_name: rolesRes.data.find(r => r.id === ur.role_id)?.name
        }));
        setUserRoles(enriched);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (permissionsLoading || !hasPermission('manage_all')) return null;



  const handleAddUserRole = async () => {
    if (!newUserId || !newRoleId) return;
    try {
      // Check if user already has a role
      const existing = userRoles.find(ur => ur.user_id === newUserId);
      if (existing) {
        // Update
        const { error } = await supabase
          .from('user_roles')
          .update({ role_id: newRoleId })
          .eq('user_id', newUserId);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('user_roles')
          .insert([{ user_id: newUserId, role_id: newRoleId }]);
        if (error) throw error;
      }
      
      await fetchData();
      setIsAdding(false);
      setNewUserId('');
      setNewRoleId('');
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Có lỗi xảy ra (kiểm tra lại UUID của user xem có tồn tại không).');
    }
  };

  const handleDeleteUserRole = async (userId: string) => {
    if (!confirm('Bạn có chắc chắn muốn gỡ vai trò của user này?')) return;
    try {
      const { error } = await supabase.from('user_roles').delete().eq('user_id', userId);
      if (error) throw error;
      setUserRoles(userRoles.filter(ur => ur.user_id !== userId));
    } catch (error) {
      console.error('Error deleting user role:', error);
      alert('Có lỗi xảy ra khi gỡ vai trò.');
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

      <div className="bg-blue-50 border border-blue-200/80 text-blue-900 px-4 py-3 rounded-xl text-xs font-medium">
        <strong>Lưu ý:</strong> Vì lý do bảo mật, hệ thống chỉ lưu `User ID` (UUID). 
        Để thêm nhân viên mới, tạo tài khoản trong <strong>Authentication</strong> trên bảng điều khiển Supabase, sau đó dán <strong>User UID</strong> vào đây để cấp quyền.
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-base font-bold text-slate-800 mb-4">Gán Vai Trò Cho Nhân Viên</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">User ID (UUID từ Supabase Auth)</label>
              <input
                type="text"
                value={newUserId}
                onChange={e => setNewUserId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                placeholder="VD: 123e4567-e89b-12d3-a456-426614174000"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Chọn Vai Trò</label>
              <select
                value={newRoleId}
                onChange={e => setNewRoleId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
              >
                <option value="">-- Chọn vai trò --</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddUserRole} className="bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all">Lưu</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-xs font-semibold transition-all">Hủy</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {userRoles.map((ur) => (
                <tr key={ur.user_id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-slate-600 font-medium">{ur.user_id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-[#285c9a] border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                      {ur.role_name || 'Không xác định'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleDeleteUserRole(ur.user_id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa phân quyền"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {userRoles.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Chưa có user nào được phân quyền
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

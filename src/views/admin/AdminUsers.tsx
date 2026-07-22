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
  const { hasPermission } = usePermissions();
  const [userRoles, setUserRoles] = useState<UserRoleWithDetails[]>([]);
  const [roles, setRoles] = useState<DbRole[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [newRoleId, setNewRoleId] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (!hasPermission('manage_all')) {
      router.replace('/admin');
    }
  }, [hasPermission, router]);

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

  if (!hasPermission('manage_all')) return null;



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
          <Users className="w-6 h-6 text-orange-500" />
          Quản lý Tài khoản (Gán quyền)
        </h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Gán Vai trò
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm">
        <strong>Lưu ý:</strong> Vì lý do bảo mật, hệ thống chỉ lưu `User ID` (UUID). 
        Để thêm một nhân viên mới, hãy tạo tài khoản cho họ trong mục <strong>Authentication</strong> trên bảng điều khiển Supabase, sau đó copy <strong>User UID</strong> dán vào đây để phân quyền.
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Gán Vai trò cho User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">User ID (UUID từ Supabase Auth)</label>
              <input
                type="text"
                value={newUserId}
                onChange={e => setNewUserId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="VD: 123e4567-e89b-12d3-a456-426614174000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Chọn Vai trò</label>
              <select
                value={newRoleId}
                onChange={e => setNewRoleId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">-- Chọn vai trò --</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddUserRole} className="bg-orange-500 text-white px-4 py-2 rounded-lg">Lưu</button>
            <button onClick={() => setIsAdding(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg">Hủy</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Vai trò</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {userRoles.map((ur) => (
                <tr key={ur.user_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm text-slate-600">{ur.user_id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
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

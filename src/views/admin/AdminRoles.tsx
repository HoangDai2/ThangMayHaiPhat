"use client";
import { useState, useEffect } from 'react';
import { supabase, DbRole, DbPermission } from '../../lib/supabase';
import { Shield, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useRouter } from 'next/navigation';

export default function AdminRoles() {
  const { hasPermission, loading: permissionsLoading } = usePermissions();
  const [roles, setRoles] = useState<DbRole[]>([]);
  const [permissions, setPermissions] = useState<DbPermission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  const [editingRole, setEditingRole] = useState<string | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permsRes, rolePermsRes] = await Promise.all([
        supabase.from('roles').select('*').order('created_at'),
        supabase.from('permissions').select('*').order('name'),
        supabase.from('role_permissions').select('*')
      ]);

      if (rolesRes.data) setRoles(rolesRes.data);
      if (permsRes.data) setPermissions(permsRes.data);
      
      if (rolePermsRes.data) {
        const rpMap: Record<string, string[]> = {};
        rolePermsRes.data.forEach((rp: { role_id: string; permission_id: string }) => {
          if (!rpMap[rp.role_id]) rpMap[rp.role_id] = [];
          rpMap[rp.role_id].push(rp.permission_id);
        });
        setRolePermissions(rpMap);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!permissionsLoading && !hasPermission('manage_all')) {
      router.replace('/admin');
    }
  }, [hasPermission, permissionsLoading, router]);

  useEffect(() => {
    fetchData();
  }, []);

  if (permissionsLoading || !hasPermission('manage_all')) return null;

  const handleAddRole = async () => {
    if (!newRoleName) return;
    try {
      const { data, error } = await supabase
        .from('roles')
        .insert([{ name: newRoleName, description: newRoleDescription }])
        .select()
        .single();

      if (error) throw error;
      setRoles([...roles, data]);
      setIsAddingRole(false);
      setNewRoleName('');
      setNewRoleDescription('');
    } catch (error) {
      console.error('Error adding role:', error);
      alert('Có lỗi xảy ra khi thêm vai trò.');
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa vai trò này?')) return;
    try {
      const { error } = await supabase.from('roles').delete().eq('id', roleId);
      if (error) throw error;
      setRoles(roles.filter(r => r.id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Có lỗi xảy ra khi xóa vai trò.');
    }
  };

  const handleTogglePermission = async (roleId: string, permissionId: string, hasPerm: boolean) => {
    try {
      if (hasPerm) {
        // Xóa permission
        await supabase
          .from('role_permissions')
          .delete()
          .match({ role_id: roleId, permission_id: permissionId });
        
        setRolePermissions(prev => ({
          ...prev,
          [roleId]: (prev[roleId] || []).filter(id => id !== permissionId)
        }));
      } else {
        // Thêm permission
        await supabase
          .from('role_permissions')
          .insert([{ role_id: roleId, permission_id: permissionId }]);
        
        setRolePermissions(prev => ({
          ...prev,
          [roleId]: [...(prev[roleId] || []), permissionId]
        }));
      }
    } catch (error) {
      console.error('Error toggling permission:', error);
      alert('Có lỗi xảy ra khi cập nhật quyền.');
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-500" />
          Quản lý Phân quyền
        </h1>
        <button
          onClick={() => setIsAddingRole(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm Vai trò
        </button>
      </div>

      {isAddingRole && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Thêm Vai trò mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên Vai trò</label>
              <input
                type="text"
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="VD: Biên tập viên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
              <input
                type="text"
                value={newRoleDescription}
                onChange={e => setNewRoleDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="VD: Quản lý nội dung bài viết"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddRole} className="bg-orange-500 text-white px-4 py-2 rounded-lg">Lưu</button>
            <button onClick={() => setIsAddingRole(false)} className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg">Hủy</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Vai trò</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Mô tả</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{role.name}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {role.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Cấu hình quyền"
                      >
                        <Shield className="w-5 h-5" />
                      </button>
                      {role.name !== 'Quản lý' && (
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingRole && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Cấu hình quyền: <span className="text-orange-500">{roles.find(r => r.id === editingRole)?.name}</span>
            </h2>
            <button onClick={() => setEditingRole(null)}><X className="w-5 h-5 text-slate-500" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissions.map(permission => {
              const hasPerm = (rolePermissions[editingRole] || []).includes(permission.id);
              return (
                <div 
                  key={permission.id} 
                  className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer transition-colors ${hasPerm ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => handleTogglePermission(editingRole, permission.id, hasPerm)}
                >
                  <div>
                    <div className={`font-medium ${hasPerm ? 'text-orange-700' : 'text-slate-700'}`}>{permission.name}</div>
                    <div className="text-xs text-slate-500">{permission.description}</div>
                  </div>
                  {hasPerm && <Check className="w-5 h-5 text-orange-500" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

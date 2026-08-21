"use client";
import { useState, useEffect } from 'react';
import { supabase, DbRole, DbPermission } from '../../lib/supabase';
import { Shield, Plus, Trash2, Check, X } from 'lucide-react';
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
          <Shield className="w-6 h-6 text-[#285c9a]" />
          Quản Lý Phân Quyền
        </h1>
        <button
          onClick={() => setIsAddingRole(true)}
          className="bg-[#285c9a] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#1e4a80] shadow-md shadow-blue-900/10 transition-all"
        >
          <Plus className="w-4 h-4" />
          Thêm Vai Trò
        </button>
      </div>

      {isAddingRole && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-base font-bold text-slate-800 mb-4">Thêm Vai Trò Mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tên Vai Trò</label>
              <input
                type="text"
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                placeholder="VD: Biên tập viên"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mô tả</label>
              <input
                type="text"
                value={newRoleDescription}
                onChange={e => setNewRoleDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#285c9a] outline-none transition-all"
                placeholder="VD: Quản lý nội dung bài viết"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddRole} className="bg-[#285c9a] hover:bg-[#1e4a80] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all">Lưu</button>
            <button onClick={() => setIsAddingRole(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-xs font-semibold transition-all">Hủy</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{role.name}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">
                    {role.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingRole(editingRole === role.id ? null : role.id)}
                        className="p-2 text-[#285c9a] hover:bg-blue-50 rounded-xl transition-colors"
                        title="Cấu hình quyền"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      {role.name !== 'Quản lý' && (
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-800">
              Cấu hình quyền: <span className="text-[#285c9a]">{roles.find(r => r.id === editingRole)?.name}</span>
            </h2>
            <button onClick={() => setEditingRole(null)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissions.map(permission => {
              const hasPerm = (rolePermissions[editingRole] || []).includes(permission.id);
              return (
                <div 
                  key={permission.id} 
                  className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${hasPerm ? 'border-[#285c9a] bg-blue-50/60 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'}`}
                  onClick={() => handleTogglePermission(editingRole, permission.id, hasPerm)}
                >
                  <div>
                    <div className={`font-semibold text-xs ${hasPerm ? 'text-[#285c9a]' : 'text-slate-700'}`}>{permission.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{permission.description}</div>
                  </div>
                  {hasPerm && <Check className="w-4 h-4 text-[#285c9a] flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

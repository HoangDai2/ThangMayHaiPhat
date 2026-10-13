import { useState, useEffect } from 'react';
import api from '../lib/api';
import Cookies from 'js-cookie';

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        const user = response.data;
        
        const hasAdminRole = user.roles?.some((r: any) => r.name === 'Admin');
        setIsAdmin(hasAdminRole);
        
        if (hasAdminRole) {
            setRole('Admin');
        } else {
            setRole('Nhân viên');
        }

        const userPermissions = user.permissions?.map((p: any) => p.name) || [];
        setPermissions(userPermissions);
      } catch (error: any) {
        if (error.response?.status !== 401) {
          console.error("Lỗi khi tải thông tin user:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const hasPermission = (permission: string) => {
    if (isAdmin) return true;
    return permissions.includes(permission);
  };

  return { permissions, role, isAdmin, hasPermission, loading };
}

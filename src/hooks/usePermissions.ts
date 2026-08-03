import { useState, useEffect } from 'react';
import api from '../lib/api';
import Cookies from 'js-cookie';

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('admin_token');
      if (!token) {
        setPermissions([]);
        setRole(null);
        return;
      }
      
      const { data } = await api.get('/admin/user');
      
      if (data) {
        setPermissions(data.permissions || []);
        setRole(data.roles?.[0] || null);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setPermissions([]);
      setRole(null);
      Cookies.remove('admin_token');
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: string) => {
    return permissions.includes('manage_all') || permissions.includes(permission);
  };

  return { permissions, role, hasPermission, loading };
}

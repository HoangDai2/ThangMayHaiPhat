import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermissions();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchPermissions();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        setPermissions([]);
        setRole(null);
        return;
      }

      // Lấy quyền từ user_permissions_view
      const { data, error } = await supabase
        .from('user_permissions_view')
        .select('permission_name, role_name')
        .eq('user_id', sessionData.session.user.id);

      if (error) throw error;

      if (data && data.length > 0) {
        setPermissions(data.map(p => p.permission_name));
        setRole(data[0].role_name); // Giả sử user có 1 role, lấy role name đầu tiên
      } else {
        setPermissions([]);
        setRole(null);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: string) => {
    return permissions.includes('manage_all') || permissions.includes(permission);
  };

  return { permissions, role, hasPermission, loading };
}

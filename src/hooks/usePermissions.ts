import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPermissions = async (showLoading = true) => {
      try {
        if (showLoading) setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session?.user) {
          if (mounted) {
            setPermissions([]);
            setRole(null);
          }
          return;
        }

        // Lấy quyền từ user_permissions_view
        const { data, error } = await supabase
          .from('user_permissions_view')
          .select('permission_name, role_name')
          .eq('user_id', sessionData.session.user.id);

        if (error) throw error;

        if (mounted) {
          if (data && data.length > 0) {
            const newPerms = data.map(p => p.permission_name);
            setPermissions(prev => JSON.stringify(prev) === JSON.stringify(newPerms) ? prev : newPerms);
            setRole(prev => prev === data[0].role_name ? prev : data[0].role_name); // Giả sử user có 1 role, lấy role name đầu tiên
          } else {
            setPermissions(prev => prev.length === 0 ? prev : []);
            setRole(null);
          }
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
        if (mounted) setPermissions([]);
      } finally {
        if (mounted && showLoading) {
          setLoading(false);
        }
      }
    };

    fetchPermissions(true);

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        if (mounted) {
          setPermissions([]);
          setRole(null);
          setLoading(false);
        }
      } else {
        fetchPermissions(false);
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const hasPermission = (permission: string) => {
    return permissions.includes('manage_all') || permissions.includes(permission);
  };

  return { permissions, role, hasPermission, loading };
}

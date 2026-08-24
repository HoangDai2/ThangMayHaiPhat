import { useState, useEffect } from 'react';

export function usePermissions() {
  const [permissions, setPermissions] = useState<string[]>(['manage_all']);
  const [role, setRole] = useState<string | null>('admin');
  const [loading, setLoading] = useState(false);

  const hasPermission = (permission: string) => {
    return true; // Tạm thời cho phép tất cả để test API Laravel
  };

  return { permissions, role, hasPermission, loading };
}

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapService } from '../lib/mappers';
import { ServiceItem } from '../data/services';
import { serviceItems as staticServices } from '../data/services';

export function useServicesData() {
  const [services, setServices] = useState<ServiceItem[]>(staticServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setServices(data.map(mapService));
      }
      setLoading(false);
    })();
  }, []);

  const getById = (id: string) => services.find((s) => s.id === id);

  return { services, loading, getById };
}

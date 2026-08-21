import { useState } from 'react';
import { ServiceItem } from '../data/services';
import { serviceItems as staticServices } from '../data/services';

export function useServicesData() {
  const [services] = useState<ServiceItem[]>(staticServices);
  
  const getById = (id: string) => services.find((s) => s.id === id);

  return { services, loading: false, getById };
}

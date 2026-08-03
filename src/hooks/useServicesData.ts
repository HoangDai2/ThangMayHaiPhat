import useSWR from 'swr';
import api from '../lib/api';
import { mapService } from '../lib/mappers';
import { Service } from '../data/services';
import { serviceItems as staticServices } from '../data/services';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useServicesData() {
  const { data, error, isLoading } = useSWR('/services', fetcher);

  const services: Service[] = data && data.length > 0 
    ? data.map(mapService) 
    : staticServices;

  const loading = isLoading;

  const getById = (id: string) => services.find((s) => s.id === id);

  return { services, loading, getById };
}

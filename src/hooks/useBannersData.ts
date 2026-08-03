import useSWR from 'swr';
import api from '../lib/api';
import { DbBanner } from '../lib/types';

export type Banner = DbBanner;

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useBannersData() {
  const { data, error, isLoading } = useSWR('/banners', fetcher);

  const banners: Banner[] = data || [];
  const loading = isLoading;

  return { banners, loading };
}

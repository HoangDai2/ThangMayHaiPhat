import useSWR from 'swr';
import api from '../lib/api';
import { mapProduct } from '../lib/mappers';
import { Product } from '../data/products';
import { products as staticProducts } from '../data/products';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useProductsData() {
  const { data, error, isLoading } = useSWR('/products', fetcher);

  const products: Product[] = data && data.length > 0 
    ? data.map(mapProduct) 
    : staticProducts;

  const loading = isLoading;

  const getById = (id: string) => products.find((p) => p.id === id);
  const getRelated = (currentId: string, limit = 3) =>
    products.filter((p) => p.id !== currentId).slice(0, limit);

  return { products, loading, getById, getRelated };
}

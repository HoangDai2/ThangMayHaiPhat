import useSWR from 'swr';
import api from '../lib/api';
import { mapProduct } from '../lib/mappers';
import { Product } from '../data/products';
import { products as staticProducts } from '../data/products';

const fetchProducts = async () => {
  try {
    const response = await api.get('/public/products');
    let data = response.data || [];
    // Only return published products for frontend
    data = data.filter((p: any) => p.is_published !== false);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function useProductsData() {
  const { data, error, isLoading } = useSWR('laravel-products', fetchProducts);

  const products: Product[] = data && data.length > 0 
    ? data.map(mapProduct) 
    : staticProducts;

  const loading = isLoading;

  const getById = (id: string) => products.find((p) => p.id === id);
  const getRelated = (currentId: string, limit = 3) =>
    products.filter((p) => p.id !== currentId).slice(0, limit);

  return { products, loading, getById, getRelated };
}

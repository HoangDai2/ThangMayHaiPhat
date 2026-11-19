import useSWR from 'swr';
import api from '../lib/api';
import { mapProduct } from '../lib/mappers';
import { Product } from '../data/products';
import { products as staticProducts } from '../data/products';

const fetchProducts = async () => {
  try {
    const response = await api.get('/public/products?sort_by=sort_order&sort_dir=asc');
    let data = response.data || [];
    // Only return published products for frontend
    data = data.filter((p: any) => p.is_published !== false);
    data.sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    return data;
  } catch (error: any) {
    console.warn('API /public/products không khả dụng, sử dụng staticProducts dự phòng:', error?.message || error);
    return [];
  }
};

export function useProductsData() {
  const { data, error, isLoading } = useSWR('laravel-products', fetchProducts);

  const products: Product[] = data && data.length > 0
    ? data.map(mapProduct)
    : staticProducts;

  const loading = isLoading;

  const getById = (id: string) => {
    if (!id) return undefined;
    const cleanId = decodeURIComponent(id).trim().toLowerCase();
    return products.find(
      (p) =>
        String(p.id).toLowerCase() === cleanId ||
        String(p.id).toLowerCase() === id.toLowerCase()
    );
  };
  const getRelated = (currentId: string, limit = 3) => {
    const cleanId = decodeURIComponent(currentId || '').trim().toLowerCase();
    return products
      .filter((p) => String(p.id).toLowerCase() !== cleanId)
      .slice(0, limit);
  };

  return { products, loading, getById, getRelated };
}

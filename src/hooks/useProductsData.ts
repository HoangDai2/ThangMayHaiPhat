import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapProduct } from '../lib/mappers';
import { Product } from '../data/products';
import { products as staticProducts } from '../data/products';

export function useProductsData() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (!error && data && data.length > 0) {
        setProducts(data.map(mapProduct));
      }
      setLoading(false);
    })();
  }, []);

  const getById = (id: string) => products.find((p) => p.id === id);
  const getRelated = (currentId: string, limit = 3) =>
    products.filter((p) => p.id !== currentId).slice(0, limit);

  return { products, loading, getById, getRelated };
}

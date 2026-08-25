"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

import { Banner, FALLBACK_BANNERS } from '../data/banners';

export function useBannersData() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      if (data.length < 2) {
        const combined = [...data];
        FALLBACK_BANNERS.forEach((fb) => {
          if (combined.length < 2 && !combined.some(b => b.title === fb.title)) {
            combined.push({ ...fb, sort_order: combined.length + 1 });
          }
        });
        setBanners(combined);
      } else {
        setBanners(data);
      }
    } else {
      setBanners(FALLBACK_BANNERS);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return { banners, loading, refetch: fetchBanners };
}

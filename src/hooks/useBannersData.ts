import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link_url?: string;
  position?: string;
  sort_order?: number;
  is_active?: boolean;
  media_type?: string;
  video_url?: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  template_type?: 'standard' | 'centered' | 'split' | 'accent' | string;
  features?: string[];
  highlight_tag?: string;
}

export const FALLBACK_BANNERS: Banner[] = [
  {
    id: 'fallback-1',
    title: 'Giải Pháp Thang Máy Hiện Đại & Uy Tín',
    subtitle: 'Chất lượng khẳng định thương hiệu',
    description: 'Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Chúng tôi mang đến sự an toàn, sang trọng và đẳng cấp cho ngôi nhà của bạn.',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    primary_button_text: 'Tư vấn miễn phí',
    primary_button_link: '#contact',
    secondary_button_text: 'Xem dự án',
    secondary_button_link: '#projects',
    template_type: 'standard',
    highlight_tag: 'Tiêu chuẩn Châu Âu',
    features: ['An toàn tuyệt đối', 'Thiết kế tinh tế', 'Vận hành êm ái']
  },

  {
    id: 'fallback-5',
    title: 'Cam Kết Chất Lượng Dịch Vụ',
    subtitle: 'Đồng Hành Cùng Bạn',
    description: 'Chúng tôi tự hào mang đến sự an tâm tuyệt đối và dịch vụ hoàn hảo cho mọi khách hàng với các tiêu chuẩn khắt khe nhất.',
    image_url: 'https://images.unsplash.com/photo-1541888086-218a59400ad6?auto=format&fit=crop&w=1920&q=80',
    template_type: 'features'
  }
];

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

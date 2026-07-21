import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DbReview } from '../lib/supabase';

export type Review = DbReview;

const fallback: DbReview[] = [
  {
    id: 'static-1',
    name: 'Nguyễn Văn Minh',
    role: 'Chủ hộ, Biệt thự Ecopark',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Hải Phát đã lắp đặt thang máy gia đình cho biệt thự của tôi rất chuyên nghiệp. Đội thợ làm việc gọn gàng, đúng tiến độ. Thang máy hoạt động êm ái, thiết kế cabin kính rất đẹp. Tôi rất hài lòng và sẽ giới thiệu cho bạn bè.',
    project: 'Thang máy gia đình · 5 tầng',
    is_published: true,
    sort_order: 0,
    created_at: '',
  },
  {
    id: 'static-2',
    name: 'Trần Thị Hoa',
    role: 'Giám đốc, Khách sạn Mường Thanh',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Chúng tôi đã tin tưởng Hải Phát lắp đặt 4 thang máy tải khách cho khách sạn 12 tầng. Chất lượng vượt kỳ vọng, hệ thống hoạt động ổn định sau 2 năm không có sự cố. Dịch vụ bảo trì định kỳ rất chu đáo.',
    project: 'Thang máy tải khách · 12 tầng',
    is_published: true,
    sort_order: 1,
    created_at: '',
  },
  {
    id: 'static-3',
    name: 'Lê Hoàng Nam',
    role: 'Kiến trúc sư, Studio NAM',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Tôi thường xuyên hợp tác với Hải Phát trong các dự án thiết kế nội thất cao cấp. Họ luôn tư vấn giải pháp phù hợp nhất với không gian, đảm bảo thẩm mỹ và tính năng. Đây là đối tác tin cậy của tôi.',
    project: 'Thang máy gia đình · Nhiều dự án',
    is_published: true,
    sort_order: 2,
    created_at: '',
  },
  {
    id: 'static-4',
    name: 'Phạm Thị Lan',
    role: 'Chủ nhà, Quận 7, TP.HCM',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 5,
    text: 'Nhà tôi 4 tầng, lắp thang máy Hải Phát đã hơn 3 năm. Ba mẹ tôi cao tuổi đi lại rất thuận tiện. Khi có sự cố nhỏ, gọi là có thợ đến ngay trong vòng 1-2 giờ. Rất yên tâm khi sử dụng.',
    project: 'Thang máy gia đình · 4 tầng',
    is_published: true,
    sort_order: 3,
    created_at: '',
  },
];

export function useReviewsData() {
  const [reviews, setReviews] = useState<DbReview[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        setReviews(data);
      }
      setLoading(false);
    })();
  }, []);

  return { reviews, loading };
}

export async function submitReview(payload: {
  name: string;
  role: string;
  rating: number;
  text: string;
  project: string;
}) {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      name: payload.name,
      role: payload.role,
      rating: payload.rating,
      text: payload.text,
      project: payload.project,
      avatar: '',
      is_published: false,
      sort_order: 0,
    })
    .select()
    .maybeSingle();
  return { data, error };
}

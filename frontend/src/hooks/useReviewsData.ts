import useSWR from 'swr';
import api from '../lib/api';
import { DbReview } from '../lib/types';

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
    name: 'Phạm Thu Trang',
    role: 'Chủ chuỗi nhà hàng',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    rating: 4,
    text: 'Tôi lắp thang máy thực phẩm cho 3 chi nhánh nhà hàng. Thiết kế inox 304 sạch sẽ, dễ vệ sinh, đáp ứng tốt tiêu chuẩn an toàn thực phẩm. Sẽ tiếp tục ủng hộ trong các dự án tới.',
    project: 'Thang thực phẩm · Inox 304',
    is_published: true,
    sort_order: 3,
    created_at: '',
  },
];

const fetchReviews = async () => {
  try {
    const response = await api.get('/public/reviews');
    let data = response.data || [];
    data = data.filter((r: any) => r.is_published !== false);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function useReviewsData() {
  const { data, error, isLoading } = useSWR('laravel-reviews', fetchReviews);

  const reviews: Review[] = data && data.length > 0 ? data : fallback;
  const loading = isLoading;

  const averageRating = reviews.length
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return { reviews, loading, averageRating };
}

export async function submitReview(payload: {
  name: string;
  role: string;
  rating: number;
  text: string;
  project: string;
}) {
  try {
    const response = await api.post('/public/reviews', {
      ...payload,
      avatar: '',
      is_published: false,
      sort_order: 0,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

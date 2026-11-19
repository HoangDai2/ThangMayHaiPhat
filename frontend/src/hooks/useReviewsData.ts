import useSWR from 'swr';
import api from '../lib/api';
import { DbReview } from '../lib/types';

export type Review = DbReview;

const fallback: DbReview[] = [
  {
    id: 'static-1',
    name: 'Anh Dũng',
    role: 'Kiến Hưng - Hà Đông',
    avatar: '',
    rating: 5,
    text: 'Qua nhiều tiêu chí cân nhắc và cũng đã hỏi qua vài đơn vị tư vấn nhưng anh lựa chọn Hải Phát. Các bạn tư vấn và phục vụ nhiệt tình, hướng dẫn rõ ràng. Thang sau khi nghiệm thu anh thấy rất hài lòng, chạy êm. Không chỉ gia đình anh có được cái thang máy ưng ý mà anh cũng đã giới thiệu thêm cho người quen lắp bên mình.',
    project: 'Thang máy gia đình · 5 tầng',
    is_published: true,
    sort_order: 0,
    created_at: '',
  },
  {
    id: 'static-2',
    name: 'Chị Hương',
    role: 'Yên Hòa - Cầu Giấy',
    avatar: '',
    rating: 5,
    text: 'Nhà mình cải tạo lại để lắp thêm thang cho bố mẹ lớn tuổi đi lại cho đỡ vất vả. Lúc đầu cũng ngại đục đẽo bụi bặm nhưng đội thợ Hải Phát làm khá gọn gàng, đúng lịch hẹn. Đến giờ dùng hơn một năm rồi chưa thấy trục trặc gì, cứ đến kỳ là bên kỹ thuật chủ động gọi hẹn qua bảo dưỡng.',
    project: 'Thang máy gia đình · 4 tầng',
    is_published: true,
    sort_order: 1,
    created_at: '',
  },
  {
    id: 'static-3',
    name: 'Anh Tuấn',
    role: 'Việt Hưng - Long Biên',
    avatar: '',
    rating: 5,
    text: 'Mình làm nhà 5 tầng nên lắp thang gia đình 450kg của Hải Phát. Ấn tượng nhất là khâu khảo sát và lên bản vẽ khá kỹ, hố thang hơi hẹp nhưng các bạn vẫn bố trí được cabin rộng rãi, sáng sủa. Giá cả chốt ngay từ đầu trong hợp đồng nên đến lúc bàn giao không bị phát sinh thêm.',
    project: 'Thang máy gia đình · 450kg',
    is_published: true,
    sort_order: 2,
    created_at: '',
  },
  {
    id: 'static-4',
    name: 'Chú Hòa',
    role: 'Khương Trung - Thanh Xuân',
    avatar: '',
    rating: 5,
    text: 'Tôi lớn tuổi rồi nên chọn đơn vị nào làm ăn chắc chắn, giấy tờ rõ ràng thì mới yên tâm. Bên Hải Phát bàn giao đầy đủ CO, CQ máy móc, kiểm định an toàn xong xuôi mới nghiệm thu. Có lần mất điện lưới đột ngột, bộ cứu hộ tự động đưa thang về tầng mở cửa ngay nên gia đình rất an tâm.',
    project: 'Thang Homelift · 4 tầng',
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
  } catch (error: any) {
    console.warn('API /public/reviews không khả dụng, sử dụng static fallback reviews:', error?.message || error);
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

export interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image_url: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  template_type?: 'standard' | 'centered' | 'split' | 'accent' | 'features';
  features?: string[];
  highlight_tag?: string;
}

/**
 * DANH SÁCH SLIDE / BANNER TRANG CHỦ MẶC ĐỊNH
 * Bạn có thể trực tiếp thêm, sửa hoặc xóa các slide tại đây.
 */
export const DEFAULT_BANNERS: BannerSlide[] = [
  {
    id: 'slide-1',
    title: 'Giải Pháp Thang Máy Hiện Đại & Đẳng Cấp',
    subtitle: 'Chất lượng khẳng định thương hiệu Hải Phát',
    description: 'Chuyên cung cấp, thiết kế và lắp đặt thang máy gia đình, thang máy tải khách cao cấp với công nghệ tiên tiến, an toàn tuyệt đối và thẩm mỹ tinh tế.',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    primary_button_text: 'Tư vấn báo giá miễn phí',
    primary_button_link: '#contact',
    secondary_button_text: 'Xem dự án tiêu biểu',
    secondary_button_link: '#projects',
    template_type: 'standard',
    highlight_tag: 'Tiêu chuẩn Châu Âu',
    features: ['An toàn tuyệt đối', 'Thiết kế tinh xảo', 'Vận hành êm ái']
  },
  {
    id: 'slide-2',
    title: 'Thang Máy Kính Panorama Toàn Cảnh',
    subtitle: 'Kiến trúc sang trọng cho biệt thự & nhà phố',
    description: 'Nâng tầm không gian sống với thiết kế kính cường lực trong suốt, tối ưu ánh sáng tự nhiên và mở rộng tầm nhìn toàn cảnh ngôi nhà của bạn.',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80',
    primary_button_text: 'Khám phá sản phẩm',
    primary_button_link: '#products',
    secondary_button_text: 'Liên hệ khảo sát',
    secondary_button_link: '#contact',
    template_type: 'split',
    highlight_tag: 'Thiết Kế 360°',
    features: ['Kính cường lực an toàn', 'Tiết kiệm diện tích', 'Khung hợp kim cao cấp']
  },
  {
    id: 'slide-3',
    title: 'Dịch Vụ Bảo Trì & Cứu Hộ 24/7',
    subtitle: 'Đồng hành tin cậy trọn đời',
    description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm trực 24/7, sẵn sàng hỗ trợ nhanh chóng trong vòng 30 phút, đảm bảo thang máy luôn vận hành an toàn và bền bỉ.',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
    primary_button_text: 'Gọi cứu hộ khẩn cấp',
    primary_button_link: 'tel:0989898989',
    secondary_button_text: 'Dịch vụ bảo dưỡng',
    secondary_button_link: '#services',
    template_type: 'accent',
    highlight_tag: 'Phản hồi 30 phút'
  },
  {
    id: 'slide-4',
    title: 'Cam Kết Chất Lượng Vượt Trội',
    subtitle: 'Giá trị cốt lõi Hải Phát',
    description: 'Chúng tôi tự hào mang đến sự an tâm tuyệt đối và dịch vụ hoàn hảo cho mọi khách hàng — từ tư vấn, thiết kế, lắp đặt đến bảo trì định kỳ, với các tiêu chuẩn chất lượng khắt khe nhất trong ngành.',
    image_url: 'https://images.unsplash.com/photo-1541888086-218a59400ad6?auto=format&fit=crop&w=1920&q=80',
    template_type: 'features'
  }
];

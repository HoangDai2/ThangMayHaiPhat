export type ProjectCategory = 'Gia đình' | 'Tải khách' | 'Thương mại' | 'Tải hàng';

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  image: string;
  specs: string;
  description: string;
  details: {
    floors: number;
    capacity: string;
    speed: string;
    brand: string;
    completionDate: string;
    warranty: string;
  };
  gallery: string[];
  features: string[];
  testimonial?: {
    name: string;
    role: string;
    text: string;
    avatar: string;
  };
}

export const projects: Project[] = [
  {
    id: 'villa-ecopark',
    title: 'Biệt thự Vinhomes Ocean Park',
    location: 'Gia Lâm, Hà Nội',
    category: 'Gia đình',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang máy gia đình · 4 tầng',
    description: 'Dự án biệt thự cao cấp tại Ocean Park với giải pháp thang máy gia đình cabin kính toàn phần, thiết kế sang trọng phù hợp với kiến trúc hiện đại của ngôi nhà. Thang máy được lắp đặt trong giếng trời, tận dụng ánh sáng tự nhiên và tạo điểm nhấn kiến trúc ấn tượng.',
    details: {
      floors: 4,
      capacity: '320 kg (4-5 người)',
      speed: '0.5 m/s',
      brand: 'Mitsubishi Electric',
      completionDate: 'Tháng 3/2024',
      warranty: '5 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['Cabin kính cường lực trong suốt', 'Hệ thống cửa tự động êm ái', 'Đèn LED tiết kiệm điện', 'Màn hình hiển thị tầng số', 'Hệ thống an toàn đa điểm', 'Vận hành siêu êm'],
    testimonial: {
      name: 'Nguyễn Văn Minh',
      role: 'Chủ hộ',
      text: 'Hải Phát đã làm việc rất chuyên nghiệp. Thang máy không chỉ tiện ích mà còn là điểm nhấn kiến trúc của ngôi nhà. Cả gia đình tôi đều rất hài lòng.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    },
  },
  {
    id: 'landmark-office',
    title: 'Tòa nhà văn phòng Landmark 81',
    location: 'Bình Thạnh, TP.HCM',
    category: 'Tải khách',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang máy tải khách · 20 tầng',
    description: 'Hệ thống thang máy tải khách cao tốc cho tòa nhà văn phòng hạng A tại Landmark 81. Được thiết kế để phục vụ lưu lượng khách lớn trong giờ cao điểm, với hệ thống điều khiển thông minh phân bổ luồng người tối ưu.',
    details: {
      floors: 20,
      capacity: '1000 kg (13-15 người)',
      speed: '2.5 m/s',
      brand: 'Otis',
      completionDate: 'Tháng 8/2023',
      warranty: '5 năm + Bảo trì 2 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['Tốc độ cao 2.5 m/s', 'Hệ thống nhóm thông minh', 'Màn hình LCD 10"', 'Cabin nội thất gỗ cao cấp', 'Hệ thống dự báo tầng', 'Chống rung êm ái'],
    testimonial: {
      name: 'Trần Thị Hoa',
      role: 'Quản lý tòa nhà',
      text: 'Hệ thống thang máy hoạt động rất ổn định, đáp ứng tốt nhu cầu của 500 nhân viên trong tòa nhà. Đặc biệt là hệ thống phân bổ thông minh giúp giảm thời gian chờ đợi đáng kể.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    },
  },
  {
    id: 'sheraton-da-nang',
    title: 'Khách sạn Sheraton Đà Nẵng',
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    category: 'Thương mại',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang máy khách sạn · 15 tầng',
    description: 'Dự án trang bị hệ thống thang máy cao cấp cho khách sạn 5 sao Sheraton Đà Nẵng. Với thiết kế nội thất sang trọng, vận hành êm ái đáp ứng tiêu chuẩn quốc tế của thương hiệu khách sạn hạng sang.',
    details: {
      floors: 15,
      capacity: '800 kg (10-11 người)',
      speed: '1.75 m/s',
      brand: 'Schindler',
      completionDate: 'Tháng 1/2024',
      warranty: '5 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/3225530/pexels-photo-3225530.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['Nội thất da Ý cao cấp', 'Hệ thống âm thanh nhẹ nhàng', 'Điều hòa tích hợp', 'Hệ thống key card', 'Chế độ VIP riêng biệt', 'Tiêu chuẩn EN 81-20/50'],
  },
  {
    id: 'house-thao-dien',
    title: 'Nhà phố Thảo Điền',
    location: 'Quận 2, TP.HCM',
    category: 'Gia đình',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang máy gia đình · 5 tầng',
    description: 'Giải pháp thang máy gia đình mini cho nhà phố liền kề tại khu vực Thảo Điền cao cấp. Thiết kế nhỏ gọn, tiết kiệm diện tích nhưng vẫn đảm bảo công năng và thẩm mỹ.',
    details: {
      floors: 5,
      capacity: '250 kg (3 người)',
      speed: '0.4 m/s',
      brand: 'Nissan',
      completionDate: 'Tháng 6/2024',
      warranty: '5 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['Cabin inox mờ cao cấp', 'Kích thước nhỏ gọn 1.2m x 1.2m', 'Cửa mở tay thông minh', 'Tiết kiệm diện tích', 'Vận hành êm ái', 'Phù hợp nhà phố'],
    testimonial: {
      name: 'Phạm Thị Lan',
      role: 'Chủ hộ',
      text: 'Nhà tôi diện tích nhỏ nhưng Hải Phát vẫn tìm được giải pháp thang máy phù hợp. Ba mẹ già di chuyển dễ dàng hơn rất nhiều.',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    },
  },
  {
    id: 'aeon-long-bien',
    title: 'Trung tâm thương mại AEON',
    location: 'Long Biên, Hà Nội',
    category: 'Thương mại',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang cuốn & thang máy · 3 tầng',
    description: 'Hệ thống thang cuốn và thang máy cho trung tâm thương mại AEON Long Biên. Được thiết kế để phục vụ lượng khách lớn trong giờ cao điểm cuối tuần với độ bền cao và vận hành liên tục.',
    details: {
      floors: 3,
      capacity: '2000 kg / thang',
      speed: '0.5 m/s (thang cuốn)',
      brand: 'Kone',
      completionDate: 'Tháng 11/2023',
      warranty: '3 năm + Bảo trì 5 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['6 thang cuốn song song', '4 thang máy tải khách', 'Hệ thống an toàn tối đa', 'Chạy liên tục 14h/ngày', 'Dễ dàng bảo dưỡng', 'Tiết kiệm điện năng'],
  },
  {
    id: 'vinmec-times-city',
    title: 'Bệnh viện Vinmec Times City',
    location: 'Hai Bà Trưng, Hà Nội',
    category: 'Tải khách',
    image: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    specs: 'Thang máy bệnh viện · 8 tầng',
    description: 'Hệ thống thang máy chuyên dụng cho bệnh viện với khả năng chở giường bệnh, kích thước cabin lớn, vận hành êm ái. Trang bị hệ thống ưu tiên cho cấp cứu và xe cứu thương.',
    details: {
      floors: 8,
      capacity: '1600 kg (giường bệnh + 6 người)',
      speed: '1.0 m/s',
      brand: 'ThyssenKrupp',
      completionDate: 'Tháng 9/2023',
      warranty: '5 năm + Bảo trì 3 năm',
    },
    gallery: [
      'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
      'https://images.pexels.com/photos/3557590/pexels-photo-3557590.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    ],
    features: ['Cabin lớn 2.0m x 2.5m', 'Chở được giường bệnh', 'Chế độ ưu tiên cấp cứu', 'Vận hành êm không rung', 'Hệ thống báo sự cố', 'Dễ vệ sinh kháng khuẩn'],
    testimonial: {
      name: 'BS. Lê Hoàng Nam',
      role: 'Giám đốc điều hành',
      text: 'Hệ thống thang máy hoạt động rất tin cậy trong môi trường bệnh viện. Chế độ ưu tiên cấp cứu đã giúp cứu sống nhiều bệnh nhân trong tình huống khẩn cấp.',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
    },
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getRelatedProjects(currentId: string, limit: number = 3): Project[] {
  return projects.filter((p) => p.id !== currentId).slice(0, limit);
}

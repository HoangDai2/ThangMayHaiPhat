export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  image: string;
}

export const companyInfo = {
  name: 'Hải Phát',
  fullName: 'Công Ty TNHH Thang Máy Hải Phát',
  founded: 2020,
  yearsExperience: 5,
  slogan: 'Chất lượng khẳng định thương hiệu',
  description: `Thang Máy Hải Phát là đơn vị chuyên lắp đặt, bảo trì và cung cấp giải pháp thang máy hàng đầu Việt Nam với hơn 5 năm kinh nghiệm. Chúng tôi tự hào đã hoàn thành hơn 1000 công trình trên toàn quốc, từ biệt thự gia đình đến các tòa nhà văn phòng.

Với đội ngũ kỹ sư giàu kinh nghiệm, được đào tạo bài bản từ các nhà sản xuất thang máy hàng đầu thế giới, Hải Phát cam kết mang đến sản phẩm chất lượng cao với dịch vụ hậu mãi chuyên nghiệp 24/7.`,
  mission: 'Cung cấp giải pháp thang máy an toàn, hiện đại và tiện nghi, nâng tầm chất lượng sống cho khách hàng.',
  vision: 'Trở thành thương hiệu thang máy uy tín nhất Việt Nam, Top 5 doanh nghiệp hàng đầu trong ngành thang máy Đông Nam Á vào năm 2030.',
  stats: [
    { label: 'Năm kinh nghiệm', value: '5+' },
    { label: 'Công trình hoàn thành', value: '1000+' },
    { label: 'Tỉnh thành phủ sóng', value: '34' },
    { label: 'Khách hàng hài lòng', value: '98%' },
  ],
  headquarters: {
    address: 'Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa, Hà Nội, Việt Nam',
    phone: '0898 424 666',
    hotline: '0987 603 588',
    email: 'haiphatthangmay@gmail.com',
    workingHours: 'Thứ 2 - Thứ 7: 7:30 - 17:30',
  },
  branches: [
    {
      city: 'Hà Nội',
      address: 'Tầng 11, Tòa Nhà Đa Năng, 169 Đ. Nguyễn Ngọc Vũ, Yên Hòa',
      phone: '0987 603 588',
      type: 'Trụ sở chính',
    }
  ],
};

export const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Khởi đầu',
    description: 'Lên ý tưởng và đặt nền móng đầu tiên cho sự ra đời của Hải Phát với đội ngũ kỹ sư nòng cốt.',
  },
  {
    year: '2021',
    title: 'Thành lập',
    description: 'Chính thức thành lập Công Ty TNHH Thang Máy Hải Phát. Hoàn thành những dự án thang máy gia đình đầu tiên.',
  },
  {
    year: '2022',
    title: 'Mở rộng',
    description: 'Trở thành đối tác của các thương hiệu lớn như Mitsubishi, Fuji. Triển khai công nghệ giám sát thang máy thông minh.',
  },
  {
    year: '2023',
    title: 'Bứt phá',
    description: 'Hoàn thành công trình thứ 500. Mở rộng mạng lưới đối tác và dịch vụ bảo trì chuyên nghiệp trên toàn quốc.',
  },
  {
    year: '2024',
    title: 'Vươn xa',
    description: 'Đạt mốc 1000+ công trình. Tối ưu hóa quy trình quản lý và nâng cao chất lượng dịch vụ đạt chuẩn quốc tế.',
  },
];

export const coreValues: Value[] = [
  {
    title: 'An toàn trên hết',
    description: 'An toàn là ưu tiên số một trong mọi sản phẩm và dịch vụ. Tuân thủ tuyệt đối các tiêu chuẩn QCVN và EN 81.',
    icon: 'shield',
  },
  {
    title: 'Chất lượng quốc tế',
    description: 'Sử dụng công nghệ và linh kiện từ các thương hiệu hàng đầu thế giới, đảm bảo chất lượng lâu dài.',
    icon: 'award',
  },
  {
    title: 'Dịch vụ tận tâm',
    description: 'Hỗ trợ khách hàng 24/7 với đội ngũ chuyên nghiệp, phản ứng nhanh, giải quyết triệt để.',
    icon: 'heart',
  },
  {
    title: 'Sáng tạo không ngừng',
    description: 'Liên tục cập nhật công nghệ mới, cải tiến quy trình để nâng cao chất lượng sản phẩm và dịch vụ.',
    icon: 'lightbulb',
  },
  {
    title: 'Trách nhiệm cộng đồng',
    description: 'Cam kết phát triển bền vững, bảo vệ môi trường và đóng góp tích cực cho cộng đồng.',
    icon: 'users',
  },
  {
    title: 'Minh bạch uy tín',
    description: 'Báo giá rõ ràng, thi công đúng cam kết, bảo hành đầy đủ. Xây dựng niềm tin dài hạn.',
    icon: 'check',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'hoang-le-quang-hoa',
    name: 'Hoàng Lê Quang Hòa',
    role: 'CEO & Founder',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    experience: '10+ năm',
  },
  {
    id: 'nguyen-thi-huong',
    name: 'Nguyễn Thị Hường',
    role: 'Phó Giám đốc',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    experience: '18 năm',
  },
  {
    id: 'tran-cong-tinh',
    name: 'Trần Công Tình',
    role: 'Giám đốc Kinh doanh',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    experience: '15 năm',
  },
  {
    id: 'nguyen-huy-tuyen',
    name: 'Nguyễn Huy Tuyên',
    role: 'Giám đốc Dịch vụ',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    experience: '12 năm',
  },
];

export const certificates: Certificate[] = [
  {
    name: 'Chứng nhận Hợp chuẩn QCVN 06:2022',
    issuer: 'Bộ Xây dựng',
    image: 'https://images.pexels.com/photos/5900/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&q=80',
  },
  {
    name: 'Chứng nhận Hợp chuẩn QCVN 13:2021',
    issuer: 'Bộ Xây dựng',
    image: 'https://images.pexels.com/photos/5900/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&q=80',
  },
  {
    name: 'Đối tác Otis',
    issuer: 'Otis Elevator Company',
    image: 'https://images.pexels.com/photos/5900/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&q=80',
  },
];

export const partners = [
  { name: 'Mitsubishi Electric', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Mitsubishi' },
  { name: 'Otis', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Otis' },
  { name: 'Schindler', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Schindler' },
  { name: 'KONE', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=KONE' },
  { name: 'ThyssenKrupp', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=ThyssenKrupp' },
  { name: 'Nissan', logo: 'https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Nissan' },
];

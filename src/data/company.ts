export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
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
  founded: 2009,
  yearsExperience: 15,
  slogan: 'Chất lượng khẳng định thương hiệu',
  description: `Thang Máy Hải Phát là đơn vị chuyên lắp đặt, bảo trì và cung cấp giải pháp thang máy hàng đầu Việt Nam với hơn 15 năm kinh nghiệm. Chúng tôi tự hào đã hoàn thành hơn 500 công trình trên toàn quốc, từ biệt thự gia đình đến các tòa nhà văn phòng cao tầng, trung tâm thương mại lớn.

Với đội ngũ kỹ sư giàu kinh nghiệm, được đào tạo bài bản từ các nhà sản xuất thang máy hàng đầu thế giới, Hải Phát cam kết mang đến sản phẩm chất lượng cao với dịch vụ hậu mãi chuyên nghiệp 24/7.`,
  mission: 'Cung cấp giải pháp thang máy an toàn, hiện đại và tiện nghi, nâng tầm chất lượng sống cho khách hàng.',
  vision: 'Trở thành thương hiệu thang máy uy tín nhất Việt Nam, Top 5 doanh nghiệp hàng đầu trong ngành thang máy Đông Nam Á vào năm 2030.',
  stats: [
    { label: 'Năm kinh nghiệm', value: '15+' },
    { label: 'Công trình hoàn thành', value: '500+' },
    { label: 'Tỉnh thành phủ sóng', value: '63' },
    { label: 'Khách hàng hài lòng', value: '98%' },
  ],
  headquarters: {
    address: '123 Đường Láng, Quận Đống Đa, Hà Nội',
    phone: '024 1234 5678',
    hotline: '0800 123 456',
    email: 'info@haiphat.vn',
    workingHours: 'Thứ 2 - Thứ 7: 7:30 - 17:30',
  },
  branches: [
    {
      city: 'Hà Nội',
      address: '123 Đường Láng, Đống Đa',
      phone: '024 1234 5678',
      type: 'Trụ sở chính',
    },
    {
      city: 'TP. Hồ Chí Minh',
      address: '456 Nguyễn Văn Linh, Quận 7',
      phone: '028 1234 5678',
      type: 'Văn phòng',
    },
    {
      city: 'Đà Nẵng',
      address: '78 Nguyễn Văn Linh, Thanh Khê',
      phone: '0236 1234 567',
      type: 'Văn phòng',
    },
    {
      city: 'Cần Thơ',
      address: '90 Nguyễn Văn Cừ, Ninh Kiều',
      phone: '0292 1234 567',
      type: 'Văn phòng',
    },
  ],
};

export const milestones: Milestone[] = [
  {
    year: '2009',
    title: 'Khởi đầu',
    description: 'Thành lập công ty với đội ngũ 5 kỹ sư thang máy, tập trung vào lắp đặt thang gia đình.',
  },
  {
    year: '2012',
    title: 'Mở rộng',
    description: 'Trở thành đối tác chính thức của Mitsubishi Electric tại Việt Nam. Mở văn phòng tại TP.HCM.',
  },
  {
    year: '2015',
    title: 'Phát triển',
    description: 'Hoàn thành dự án thang máy đầu tiên cho tòa nhà cao tầng 25 tầng. Đạt chứng nhận ISO 9001.',
  },
  {
    year: '2018',
    title: 'Bứt phá',
    description: 'Trở thành đối tác của Otis và Schindler. Phủ sóng 30 tỉnh thành trên toàn quốc.',
  },
  {
    year: '2020',
    title: 'Công nghệ mới',
    description: 'Triển khai hệ thống giám sát thang máy từ xa. Ra mắt dịch vụ bảo trì dự đoán.',
  },
  {
    year: '2023',
    title: 'Milestone',
    description: 'Hoàn thành công trình thứ 500. Mở văn phòng tại Đà Nẵng và Cần Thơ. Phủ sóng 63 tỉnh thành.',
  },
  {
    year: '2024',
    title: 'Tiếp tục',
    description: 'Kỷ niệm 15 năm thành lập. Công bố chiến lược phát triển đến 2030.',
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
    id: 'nguyen-van-hung',
    name: 'Nguyễn Văn Hùng',
    role: 'CEO & Founder',
    bio: 'Với hơn 20 năm kinh nghiệm trong ngành thang máy, ông Hùng đã sáng lập Hải Phát với tầm nhìn đưa thang máy chất lượng cao đại trà cho các gia đình Việt.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    linkedin: '#',
    experience: '20+ năm',
  },
  {
    id: 'tran-thi-mai',
    name: 'Trần Thị Mai',
    role: 'Giám đốc Kỹ thuật',
    bio: 'Bà Mai là chuyên gia kỹ thuật với chứng chỉ từ Mitsubishi, Otis và Schindler. Đã trực tiếp giám sát hơn 300 công trình thang máy.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    linkedin: '#',
    experience: '18 năm',
  },
  {
    id: 'le-van-tuan',
    name: 'Lê Văn Tuấn',
    role: 'Giám đốc Kinh doanh',
    bio: 'Ông Tuấn có 15 năm kinh nghiệm trong lĩnh vực B2B, đã mở rộng mạng lưới khách hàng của Hải Phát trên 63 tỉnh thành.',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    linkedin: '#',
    experience: '15 năm',
  },
  {
    id: 'pham-thi-hoa',
    name: 'Phạm Thị Hoa',
    role: 'Giám đốc Dịch vụ',
    bio: 'Bà Hoa phụ trách mảng bảo hành và hậu mãi, đảm bảo khách hàng luôn được hỗ trợ tốt nhất 24/7.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&q=80',
    linkedin: '#',
    experience: '12 năm',
  },
];

export const certificates: Certificate[] = [
  {
    name: 'ISO 9001:2015',
    issuer: 'TÜV Rheinland',
    image: 'https://images.pexels.com/photos/5900/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&q=80',
  },
  {
    name: 'Chứng nhận QCVN 06:2022',
    issuer: 'Bộ Xây dựng',
    image: 'https://images.pexels.com/photos/5900/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&q=80',
  },
  {
    name: 'Đối tác Mitsubishi Electric',
    issuer: 'Mitsubishi Electric',
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

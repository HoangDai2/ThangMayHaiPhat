export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
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
  description: `Công ty TNHH Thang Máy Hải Phát được thành lập năm 2020, là đơn vị chuyên sản xuất, lắp ráp, cung cấp và bảo trì thang máy hàng đầu tại Việt Nam. Tính đến hết năm 2024, Thang Máy Hải Phát đã bàn giao gần 1.000 công trình trên khắp cả nước và vươn sang nước bạn Lào, đáp ứng nghiêm ngặt các quy chuẩn an toàn lao động và kỹ thuật quốc tế.`,
  mission: 'Tạo ra giá trị đích thực trong cộng đồng và hỗ trợ cho sự phát triển toàn diện của xã hội. Cung cấp các dòng thang máy chất lượng hàng đầu với chi phí tối ưu, đảm bảo nguồn an toàn và tin cậy tuyệt đối cho mọi gia đình và công trình.',
  vision: 'Trở thành đơn vị tiên phong hàng đầu trong lĩnh vực cung cấp, lắp đặt và bảo trì thang máy tại Việt Nam với năng lực cạnh tranh toàn cầu, không ngừng đổi mới công nghệ thông minh, an toàn và bền vững.',
  stats: [
    { label: 'Công trình bàn giao', value: '1.000+' },
    { label: 'Cứu hộ khẩn cấp', value: '1-2h HN / 2-6h Tỉnh' },
    { label: 'Tỉnh thành phủ sóng', value: '35+' },
    { label: 'Khách hàng hài lòng', value: '98%+' },
  ],
  headquarters: {
    address: 'Tòa nhà đa năng - Số 169 Nguyễn Ngọc Vũ, P. Trung Hòa, Q. Cầu Giấy, TP. Hà Nội',
    phone: '0898 424 666',
    hotline: '0898 424 666',
    emergency: '0987 603 588',
    email: 'haiphatthangmay@gmail.com',
    website: 'www.thangmayhaiphat.com',
    workingHours: 'Trực kỹ thuật 24/7/365',
  },
  branches: [
    {
      city: 'Hà Nội',
      address: 'Tòa nhà đa năng - Số 169 Nguyễn Ngọc Vũ, P. Trung Hòa, Q. Cầu Giấy',
      phone: '0898 424 666',
      type: 'Văn phòng điều hành',
    }
  ],
};

export const milestones: Milestone[] = [
  {
    year: '2020',
    title: 'Khởi đầu giữa thách thức COVID-19',
    description: 'Thành lập Công ty TNHH Thang Máy Hải Phát. Vượt qua khó khăn chuỗi cung ứng, lấy tôn chỉ "An toàn - Chất lượng - Hiệu quả" làm kim chỉ nam, đặt nền móng kỹ thuật vững chắc.',
  },
  {
    year: '2021 - 2022',
    title: 'Phục hồi & Mở rộng đối tác toàn cầu',
    description: 'Chính thức hợp tác cùng các nhà sản xuất linh kiện, động cơ uy tín quốc tế; đầu tư công nghệ hiện đại và đạt chứng nhận quản lý chất lượng tiêu chuẩn ISO.',
  },
  {
    year: '2023',
    title: 'Đổi mới công nghệ thang máy thông minh',
    description: 'Ra mắt các giải pháp thang máy thông minh tiết kiệm năng lượng; hoàn thiện hệ thống tiếp nhận và xử lý kỹ thuật cứu hộ 24/7 trên toàn quốc.',
  },
  {
    year: '2024',
    title: 'Phát triển bền vững & Cột mốc 1.000 công trình',
    description: 'Bàn giao gần 1.000 công trình trên toàn quốc từ dân dụng, công nghiệp, bệnh viện đến Phú Quốc, Bình Phước và vươn sang nước bạn Lào. Thúc đẩy sản phẩm xanh, thân thiện môi trường.',
  },
  {
    year: '2025+',
    title: 'Bứt phá và vươn xa thị trường',
    description: 'Tiếp tục đầu tư R&D các dòng thang máy thông minh thế hệ mới, tối ưu hóa quy trình sản xuất cơ khí chính xác và nâng cao vị thế trên thị trường trong và ngoài nước.',
  },
];

export const coreValues: Value[] = [
  {
    title: 'Chất Lượng Vượt Trội',
    description: 'Cam kết cung cấp sản phẩm thang máy chất lượng cao, vận hành êm ái, đáp ứng các tiêu chuẩn khắt khe nhất của Việt Nam (QCVN/TCVN) và quốc tế về an toàn và hiệu suất.',
    icon: 'award',
  },
  {
    title: 'Trách Nhiệm Toàn Diện',
    description: 'Đồng hành cùng khách hàng trong suốt vòng đời dự án: từ tư vấn, khảo sát, may đo thiết kế hố thang đến thi công lắp đặt và dịch vụ bảo trì định kỳ trọn đời.',
    icon: 'shield',
  },
  {
    title: 'Sáng Tạo Và Đổi Mới',
    description: 'Ứng dụng công nghệ thang máy thông minh, giải pháp hố pit nông, không phòng máy, tối ưu hóa diện tích kiến trúc và giảm thiểu tiêu hao điện năng.',
    icon: 'lightbulb',
  },
  {
    title: 'Tinh Thần Đoàn Kết',
    description: 'Đội ngũ kỹ sư, chuyên viên kỹ thuật tay nghề cao, chung một mục tiêu phụng sự an toàn của khách hàng, tạo nên sức mạnh tập thể vững chắc và bền bỉ.',
    icon: 'users',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'hoang-le-quang-hoa',
    name: 'Hoàng Lê Quang Hòa',
    role: 'Giám đốc Điều hành',
    image: '/HUAN9016.jpg',
  },
  {
    id: 'nguyen-thi-huong',
    name: 'Nguyễn Thị Hường',
    role: 'Phó Giám đốc Điều hành',
    image: '491251241_9696454253740362_974582290995260425_n.jpg',
  },
  {
    id: 'tran-cong-tinh',
    name: 'Trần Công Tình',
    role: 'Giám đốc Kinh doanh',
    image: 'HUAN9169.jpg',
  },
  {
    id: 'nguyen-huy-tuyen',
    name: 'Nguyễn Huy Tuyên',
    role: 'Trưởng phòng Kinh doanh',
    image: '707329201_4259183531064219_330036999536634658_n.jpg',
  },
];

export const certificates: Certificate[] = [
  {
    name: 'QCVN 02:2019/BLĐTBXH',
    issuer: 'Bộ Lao động - Thương binh & Xã hội',
    image: '/images/qcvn-02.jpg',
  },
  {
    name: 'QCVN 32:2018/BLĐTBXH (Thang máy gia đình)',
    issuer: 'Bộ Lao động - Thương binh & Xã hội',
    image: '/images/qcvn-32.jpg',
  },
  {
    name: 'TCVN 6395:2008 & TCVN 6396-20/50:2017',
    issuer: 'Tổng cục Tiêu chuẩn Đo lường Chất lượng',
    image: '/images/tcvn-6395.jpg',
  },
];

export const partners = [
  { name: 'Mitsubishi Electric', logo: '/partners/mitsubishi.svg' },
  { name: 'KONE', logo: '/partners/kone.svg' },
  { name: 'Fuji International', logo: '/partners/fuji.svg' },
  { name: 'Schindler', logo: '/partners/schindler.svg' },
  { name: 'Otis', logo: '/partners/otis.svg' },
  { name: 'Thyssenkrupp', logo: '/partners/thyssenkrupp.svg' },
];

import fs from 'fs';
import path from 'path';

const routes = [
  // public routes
  { path: 'src/app/(public)/page.tsx', content: `import HomePage from '../../views/HomePage';\nexport default function Page() { return <HomePage />; }` },
  { path: 'src/app/(public)/du-an/page.tsx', content: `import { ProjectsList } from '../../../views/ProjectDetail';\nexport default function Page() { return <ProjectsList />; }` },
  { path: 'src/app/(public)/du-an/[id]/page.tsx', content: `import { ProjectDetail } from '../../../../views/ProjectDetail';\nexport default function Page() { return <ProjectDetail />; }` },
  { path: 'src/app/(public)/dich-vu/page.tsx', content: `import { ServicesList } from '../../../views/ServicesPage';\nexport default function Page() { return <ServicesList />; }` },
  { path: 'src/app/(public)/san-pham/page.tsx', content: `import { ProductsList } from '../../../views/ProductsPage';\nexport default function Page() { return <ProductsList />; }` },
  { path: 'src/app/(public)/san-pham/[id]/page.tsx', content: `import { ProductDetail } from '../../../../views/ProductsPage';\nexport default function Page() { return <ProductDetail />; }` },
  { path: 'src/app/(public)/bai-viet/page.tsx', content: `import { ArticlesList } from '../../../views/ArticlesPage';\nexport default function Page() { return <ArticlesList />; }` },
  { path: 'src/app/(public)/bai-viet/[slug]/page.tsx', content: `import { ArticleDetail } from '../../../../views/ArticlesPage';\nexport default function Page() { return <ArticleDetail />; }` },
  { path: 'src/app/(public)/ve-chung-toi/page.tsx', content: `import AboutPage from '../../../views/AboutPage';\nexport default function Page() { return <AboutPage />; }` },
  { path: 'src/app/(public)/lien-he/page.tsx', content: `import ContactPage from '../../../views/ContactPage';\nexport default function Page() { return <ContactPage />; }` },
  { path: 'src/app/(public)/chinh-sach-bao-mat/page.tsx', content: `import PrivacyPolicyPage from '../../../views/PrivacyPolicyPage';\nexport default function Page() { return <PrivacyPolicyPage />; }` },
  { path: 'src/app/(public)/dieu-khoan-su-dung/page.tsx', content: `import TermsOfUsePage from '../../../views/TermsOfUsePage';\nexport default function Page() { return <TermsOfUsePage />; }` },

  // admin routes
  { path: 'src/app/admin/page.tsx', content: `import AdminDashboard from '../../views/admin/AdminDashboard';\nexport default function Page() { return <AdminDashboard />; }` },
  { path: 'src/app/admin/projects/page.tsx', content: `import AdminProjects from '../../../views/admin/AdminProjects';\nexport default function Page() { return <AdminProjects />; }` },
  { path: 'src/app/admin/products/page.tsx', content: `import AdminProducts from '../../../views/admin/AdminProducts';\nexport default function Page() { return <AdminProducts />; }` },
  { path: 'src/app/admin/services/page.tsx', content: `import AdminServices from '../../../views/admin/AdminServices';\nexport default function Page() { return <AdminServices />; }` },
  { path: 'src/app/admin/banners/page.tsx', content: `import AdminBanners from '../../../views/admin/AdminBanners';\nexport default function Page() { return <AdminBanners />; }` },
  { path: 'src/app/admin/articles/page.tsx', content: `import AdminArticles from '../../../views/admin/AdminArticles';\nexport default function Page() { return <AdminArticles />; }` },
  { path: 'src/app/admin/reviews/page.tsx', content: `import AdminReviews from '../../../views/admin/AdminReviews';\nexport default function Page() { return <AdminReviews />; }` },
  { path: 'src/app/admin/images/page.tsx', content: `import AdminImages from '../../../views/admin/AdminImages';\nexport default function Page() { return <AdminImages />; }` },
  { path: 'src/app/admin/users/page.tsx', content: `import AdminUsers from '../../../views/admin/AdminUsers';\nexport default function Page() { return <AdminUsers />; }` },
  { path: 'src/app/admin/roles/page.tsx', content: `import AdminRoles from '../../../views/admin/AdminRoles';\nexport default function Page() { return <AdminRoles />; }` },
  
  // admin login
  { path: 'src/app/(admin-auth)/admin/login/page.tsx', content: `import AdminLogin from '../../../../views/admin/AdminLogin';\nexport default function Page() { return <AdminLogin />; }` }
];

for (const route of routes) {
  const dir = path.dirname(route.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(route.path, route.content, 'utf-8');
}

console.log('Routes generated');

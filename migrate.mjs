import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has "use client"
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = '"use client";\n' + content;
  }

  // Replace react-router-dom imports
  if (content.includes('react-router-dom')) {
    // Basic Link replacement
    content = content.replace(/import\s+{\s*Link\s*}\s+from\s+['"]react-router-dom['"];/, "import Link from 'next/link';");
    
    // useParams and Link
    content = content.replace(/import\s+{\s*useParams\s*,\s*Link\s*}\s+from\s+['"]react-router-dom['"];/, "import Link from 'next/link';\nimport { useParams } from 'next/navigation';");
    
    // Link and useLocation
    content = content.replace(/import\s+{\s*Link\s*,\s*useLocation\s*}\s+from\s+['"]react-router-dom['"];/, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");

    // Link and useOutletContext
    content = content.replace(/import\s+{\s*Link\s*,\s*useOutletContext\s*}\s+from\s+['"]react-router-dom['"];/, "import Link from 'next/link';\nimport { usePermissions } from '../../hooks/usePermissions';");

    // useOutletContext and Navigate
    content = content.replace(/import\s+{\s*useOutletContext\s*,\s*Navigate\s*}\s+from\s+['"]react-router-dom['"];/, "import { usePermissions } from '../../hooks/usePermissions';\nimport { useRouter } from 'next/navigation';");

    // useNavigate and Navigate
    content = content.replace(/import\s+{\s*useNavigate\s*,\s*Navigate\s*}\s+from\s+['"]react-router-dom['"];/, "import { useRouter } from 'next/navigation';");
  }

  // Replace hooks
  content = content.replace(/useLocation\(\)/g, "usePathname()");
  content = content.replace(/useNavigate\(\)/g, "useRouter()");
  content = content.replace(/useOutletContext<any>\(\)/g, "usePermissions()");

  // Replace <Link to="..."> with <Link href="...">
  content = content.replace(/<Link\s+to=/g, "<Link href=");

  fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src/pages');
walkDir('./src/components');
console.log('Done migrating imports and adding use client');

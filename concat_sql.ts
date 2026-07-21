import fs from 'fs';
import path from 'path';

const filesToConcat = [
  'supabase/migrations/20260706090619_create_cms_tables.sql',
  'supabase/migrations/20260707014118_20260707000000_create_cms_admin_tables.sql.sql',
  'C:\\Users\\PC\\.gemini\\antigravity-ide\\brain\\66d9a535-606c-4def-97b6-e699bc9377de\\supabase_rbac_migration.sql',
  'supabase_seed.sql'
];

let finalSql = '-- HẢI PHÁT THANG MÁY - COMPLETE DATABASE SETUP & SEED\n\n';

for (const file of filesToConcat) {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    finalSql += `-- ==================================================================\n`;
    finalSql += `-- FROM: ${path.basename(file)}\n`;
    finalSql += `-- ==================================================================\n\n`;
    finalSql += content + '\n\n';
  } catch (err) {
    console.error(`Error reading ${file}:`, (err as Error).message);
  }
}

fs.writeFileSync('complete_setup.sql', finalSql);
console.log('Successfully generated complete_setup.sql');

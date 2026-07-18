import fs from 'fs';
import { projects } from './src/data/projects';
import { products } from './src/data/products';
import { serviceItems } from './src/data/services';

const escapeSql = (str: string | undefined | null) => {
  if (str === undefined || str === null) return "''";
  return "'" + str.replace(/'/g, "''") + "'";
};

const jsonSql = (obj: any) => {
  if (!obj) return "'[]'::jsonb";
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";
};

let sql = `-- Supabase Seed Data generated automatically
-- ===============================================

`;

// PROJECTS
sql += `-- ==================== PROJECTS ====================\n`;
for (const p of projects) {
  const features = p.features || [];
  const gallery = p.gallery || [];
  const testimonial = p.testimonial ? jsonSql(p.testimonial) : 'NULL';
  
  sql += `INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.title)},
    ${escapeSql(p.location)},
    ${escapeSql(p.category)},
    ${escapeSql(p.image)},
    ${escapeSql(p.specs)},
    ${escapeSql(p.description)},
    ${p.details?.floors || 0},
    ${escapeSql(p.details?.capacity)},
    ${escapeSql(p.details?.speed)},
    ${escapeSql(p.details?.brand)},
    ${escapeSql(p.details?.completionDate)},
    ${escapeSql(p.details?.warranty)},
    ${jsonSql(features)},
    ${jsonSql(gallery)},
    ${testimonial}
  ) ON CONFLICT (slug) DO NOTHING;\n`;
}

// PRODUCTS
sql += `\n-- ==================== PRODUCTS ====================\n`;
for (const p of products) {
  sql += `INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.title)},
    ${escapeSql(p.subtitle)},
    ${escapeSql(p.image)},
    ${escapeSql(p.shortDescription)},
    ${escapeSql(p.fullDescription)},
    ${jsonSql(p.features || [])},
    ${jsonSql(p.specifications || [])},
    ${jsonSql(p.benefits || [])},
    ${jsonSql(p.faqs || [])},
    ${jsonSql(p.relatedProjects || [])}
  ) ON CONFLICT (slug) DO NOTHING;\n`;
}

// SERVICES
sql += `\n-- ==================== SERVICES ====================\n`;
for (const s of serviceItems) {
  sql += `INSERT INTO services (slug, title, subtitle, short_description, full_description, highlights, process) VALUES (
    ${escapeSql(s.id)},
    ${escapeSql(s.title)},
    ${escapeSql(s.subtitle)},
    ${escapeSql(s.shortDescription)},
    ${escapeSql(s.fullDescription)},
    ${jsonSql(s.highlights || [])},
    ${jsonSql(s.process || [])}
  ) ON CONFLICT (slug) DO NOTHING;\n`;
}

// Write to seed file
const seedFile = 'supabase_seed.sql';
fs.writeFileSync(seedFile, sql);
console.log('Successfully generated ' + seedFile);

import { Project, ProjectCategory } from '../data/projects';
import { Product } from '../data/products';
import { ServiceItem } from '../data/services';
import { DbProject, DbProduct, DbService } from './supabase';

export function mapProject(db: DbProject): Project {
  return {
    id: db.slug,
    title: db.title,
    location: db.location,
    category: db.category as ProjectCategory,
    image: db.image,
    specs: db.specs,
    description: db.description,
    details: {
      floors: db.floors,
      capacity: db.capacity,
      speed: db.speed,
      brand: db.brand,
      completionDate: db.completion_date,
      warranty: db.warranty,
    },
    gallery: db.gallery || [],
    features: db.features || [],
    testimonial: db.testimonial ?? undefined,
  };
}

export function mapProduct(db: DbProduct): Product {
  return {
    id: db.id,
    title: db.title,
    subtitle: db.subtitle,
    icon: db.icon,
    image: db.image,
    shortDescription: db.short_description,
    fullDescription: db.full_description,
    features: db.features || [],
    specifications: db.specifications || [],
    benefits: db.benefits || [],
    process: (db as any).process || [],
    faqs: db.faqs || [],
    relatedProjects: db.related_projects || [],
  };
}

export function mapService(db: DbService): ServiceItem {
  return {
    id: db.id,
    title: db.title,
    subtitle: db.subtitle,
    icon: db.icon,
    shortDescription: db.short_description,
    fullDescription: db.full_description,
    highlights: db.highlights || [],
    process: db.process || [],
  };
}

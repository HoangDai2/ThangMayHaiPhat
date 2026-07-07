import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  specs: string;
  description: string;
  floors: number;
  capacity: string;
  speed: string;
  brand: string;
  completion_date: string;
  warranty: string;
  features: string[];
  gallery: string[];
  testimonial: { name: string; role: string; text: string; avatar: string } | null;
  created_at: string;
}

export interface DbProduct {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  short_description: string;
  full_description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  related_projects: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface DbService {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  short_description: string;
  full_description: string;
  highlights: string[];
  process: { step: number; title: string; description: string }[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

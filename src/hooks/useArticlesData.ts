import { useState, useEffect } from 'react';
import { supabase, DbArticle } from '../lib/supabase';

export type Article = DbArticle;

export function useArticlesData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    })();
  }, []);

  const getBySlug = (slug: string) => articles.find((a) => a.slug === slug);
  const getRelated = (slug: string, limit = 3) =>
    articles.filter((a) => a.slug !== slug).slice(0, limit);

  return { articles, loading, getBySlug, getRelated };
}

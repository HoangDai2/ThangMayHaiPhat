import useSWR from 'swr';
import api from '../lib/api';
import { DbArticle } from '../lib/types';

export type Article = DbArticle;

const fetchArticles = async () => {
  try {
    const response = await api.get('/public/articles');
    let data = response.data || [];
    // Only published articles
    data = data.filter((a: any) => a.is_published !== false);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function useArticlesData() {
  const { data, error, isLoading } = useSWR('laravel-articles', fetchArticles);

  const articles: Article[] = data || [];
  const loading = isLoading;

  const getBySlug = (slug: string) => articles.find((a) => a.slug === slug);
  const getRelated = (slug: string, limit = 3) =>
    articles.filter((a) => a.slug !== slug).slice(0, limit);

  return { articles, loading, getBySlug, getRelated };
}

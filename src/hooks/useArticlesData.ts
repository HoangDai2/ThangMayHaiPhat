import useSWR from 'swr';
import api from '../lib/api';
import { DbArticle } from '../lib/types';

export type Article = DbArticle;

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function useArticlesData() {
  const { data, error, isLoading } = useSWR('/articles', fetcher);

  const articles: Article[] = data || [];
  const loading = isLoading;

  const getBySlug = (slug: string) => articles.find((a) => a.slug === slug);
  const getRelated = (slug: string, limit = 3) =>
    articles.filter((a) => a.slug !== slug).slice(0, limit);

  return { articles, loading, getBySlug, getRelated };
}

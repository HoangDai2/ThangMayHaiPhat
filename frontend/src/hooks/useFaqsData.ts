import useSWR from 'swr';
import api from '../lib/api';
import { DbFaq } from '../lib/types';
import { fallbackFaqs } from '../data/faqs';

export type Faq = DbFaq;

const fetchFaqs = async () => {
  try {
    const response = await api.get('/public/faqs');
    let data = response.data || [];
    data = data.filter((f: DbFaq) => f.is_published !== false);
    return data;
  } catch (error: any) {
    console.warn('API /public/faqs không khả dụng, sử dụng static fallback faqs:', error?.message || error);
    return [];
  }
};

export function useFaqsData() {
  const { data, error, isLoading, mutate } = useSWR('laravel-faqs', fetchFaqs);

  const faqs: Faq[] = data && data.length > 0 ? data : fallbackFaqs;
  const loading = isLoading;

  return { faqs, loading, error, mutate };
}

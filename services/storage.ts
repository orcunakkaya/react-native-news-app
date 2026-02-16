import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { Article } from '@/types/news';
const SAVED_QUERY_KEY = 'SAVED_ARTICLES';

export const getSavedArticles = async () => {
  const data = await AsyncStorage.getItem(SAVED_QUERY_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveArticles = async (articles: Article[]) => {
  await AsyncStorage.setItem(SAVED_QUERY_KEY, JSON.stringify(articles));
};


export function useSaveActions() {
  const queryClient = useQueryClient();

  const toggleSave = async (article: Article) => {
    const current: Article[] = queryClient.getQueryData([SAVED_QUERY_KEY]) || [];

    const exists = current.find(a => a.url === article.url);

    let updated;

    if (exists) {
      updated = current.filter(a => a.url !== article.url);
    } else {
      updated = [article, ...current];
    }

    await AsyncStorage.setItem(
      SAVED_QUERY_KEY,
      JSON.stringify(updated)
    );

    queryClient.setQueryData([SAVED_QUERY_KEY], updated);
  };

  const isSaved = (url: string) => {
    const current = queryClient.getQueryData<Article[]>([SAVED_QUERY_KEY]) || [];

    return current.some(a => a.url === url);
  };

  return { toggleSave, isSaved };
}
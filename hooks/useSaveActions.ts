import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Article } from '@/types/news';
import { getSavedArticles } from '../services/storage';

const SAVED_QUERY_KEY = 'SAVED_ARTICLES';

export function useSavedArticles() {
  return useQuery({
    queryKey: [SAVED_QUERY_KEY],
    queryFn: getSavedArticles,
  });
}

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

    queryClient.setQueryData([SAVED_QUERY_KEY], () => [...updated]);
  };

  return { toggleSave };
}
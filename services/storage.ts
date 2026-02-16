import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_KEY = 'SAVED_ARTICLES';

export const getSavedArticles = async () => {
  const data = await AsyncStorage.getItem(SAVED_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveArticles = async (articles: any[]) => {
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(articles));
};
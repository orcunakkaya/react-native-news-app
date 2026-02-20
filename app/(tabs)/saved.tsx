import {
  View,
  Text,
  FlatList,
  Pressable
} from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import {
  useSavedArticles,
  useSaveActions,
} from '../../hooks/useSaveActions';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../../components/Loading';
import EmptyState from '../../components/EmptyState';

export default function SavedScreen() {
  const { data: savedArticles = [], isLoading } = useSavedArticles();

  const { toggleSave } = useSaveActions();

  const router = useRouter();

  if (isLoading) {
    return (
      <Loading text="Kaydedilen haberler yükleniyor..." />
    );
  }

  if (savedArticles.length === 0) {
    return (
      <EmptyState icon="bookmark-outline" title="Kaydedilen Haber Yok" description="Henüz hiçbir haber kaydedilmedi." />
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={savedArticles}
        keyExtractor={(item) => item.url}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className='relative'>
            <ArticleCard
              article={item}
              onPress={() => {
              router.push({
                pathname: '/article/[id]',
                params: { 
                  id: encodeURIComponent(item.url),
                  article: JSON.stringify(item) 
                }
              });
            }}
            />
            <Pressable
              onPress={() => toggleSave(item)}
              className="absolute items-center justify-center w-10 h-10 rounded-full top-3 right-3 bg-white/90 active:opacity-70"
            >
              <Ionicons
                name="bookmark"
                size={22}
                color="#1f2937"
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
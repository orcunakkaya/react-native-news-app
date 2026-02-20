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

export default function SavedScreen() {
  const { data: savedArticles = [], isLoading } = useSavedArticles();

  const { toggleSave } = useSaveActions();

  const router = useRouter();

  if (isLoading) {
    return (
      <Loading text="Kaydedilen haberler yükleniyor..." />
    );
  }

  /* ---------- EMPTY STATE ---------- */

  if (savedArticles.length === 0) {
    return (
      <View className="items-center justify-center flex-1 px-6">
        <Ionicons
          name="bookmark-outline"
          size={64}
          color="#9ca3af"
        />
        <Text className="mt-4 text-lg font-bold text-gray-700">
          Henüz kaydedilen haber yok
        </Text>
        <Text className="mt-2 text-center text-gray-500">
          Haberleri kaydetmek için detay sayfasındaki
          bookmark ikonunu kullan.
        </Text>
      </View>
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
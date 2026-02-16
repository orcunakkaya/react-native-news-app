import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNewsByPublisher } from '../../hooks/useNews';
import ArticleCard from '../../components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Article } from '../../types/news';

export default function PublisherScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const categoryId = params.id as string;
    const categoryName = params.name as string;

    const { data, isLoading, isError, error, refetch } = useNewsByPublisher(categoryId);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    if (isLoading) {
    return (
      <>
        {/* Stack Screen ile başlık ayarla */}
        <Stack.Screen 
          options={{ 
            headerTitle: categoryName,
          }} 
        />
        <View className="flex-1 items-center justify-center bg-gray-50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600 font-medium">
            Haberler yükleniyor...
          </Text>
        </View>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            headerTitle: categoryName,
          }} 
        />
        <View className="flex-1 items-center justify-center bg-gray-50 px-4">
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text className="text-red-500 text-lg font-bold mb-2 mt-4">
            Hata Oluştu!
          </Text>
          <Text className="text-gray-600 text-center">
            {error instanceof Error ? error.message : 'Bir hata oluştu'}
          </Text>
        </View>
      </>
    );
  }

  // Empty
  if (data?.length === 0) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            headerTitle: categoryName,
          }} 
        />
        <View className="flex-1 items-center justify-center bg-gray-50 px-4">
          <Ionicons name="newspaper-outline" size={64} color="#9ca3af" />
          <Text className="text-gray-700 text-lg font-bold mt-4">
            Haber Bulunamadı
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Bu kategoride şu anda haber bulunmuyor.
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
        <Stack.Screen 
        options={{ 
          headerTitle: categoryName,
        }} 
      />
      <View className="flex-1 bg-gray-50">
        <FlatList
          data={data as Article[]}
          keyExtractor={(item: Article, index) => `${item.url}-${index}`}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: Article }) => (
            <ArticleCard
              article={item}
              onPress={() => {
                router.push({
                  pathname: '/article/[id]',
                  params: {
                    id: encodeURIComponent(item.url),
                    article: JSON.stringify(item),
                  },
                });
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#3b82f6"
              colors={['#3b82f6']}
            />
          }
        />
      </View>
    </>
  );
}
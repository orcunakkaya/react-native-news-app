import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNewsByCategory } from '../../hooks/useNews';
import ArticleCard from '../../components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';
import { useState, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Article } from '../../types/news';
import Loading from '../../components/Loading';
export default function CategoriesScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const categoryId = params.id as string;
    const categoryName = params.name as string;

    const { data, isLoading, isError, error, refetch } = useNewsByCategory(categoryId);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    if (isLoading) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            headerTitle: categoryName,
          }} 
        />
        <Loading text="Haberler yükleniyor..." />
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
        <View className="items-center justify-center flex-1 px-4 bg-gray-50">
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text className="mt-4 mb-2 text-lg font-bold text-red-500">
            Hata Oluştu!
          </Text>
          <Text className="text-center text-gray-600">
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
        <View className="items-center justify-center flex-1 px-4 bg-gray-50">
          <Ionicons name="newspaper-outline" size={64} color="#9ca3af" />
          <Text className="mt-4 text-lg font-bold text-gray-700">
            Haber Bulunamadı
          </Text>
          <Text className="mt-2 text-center text-gray-500">
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
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React, { useState } from 'react'
import { useTopHeadlines } from '../../hooks/useNews';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ArticleCard from '../../components/ArticleCard';
const Index = () => {
  const { data, isLoading, isError, error, refetch } = useTopHeadlines('us');
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600 font-medium">Haberler yükleniyor...</Text>
      </View>
    );
  }

if (!data || data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-4">
        <Ionicons name="newspaper-outline" size={64} color="#9ca3af" />
        <Text className="text-gray-700 text-lg font-bold mt-4">Haber Bulunamadı</Text>
        <Text className="text-gray-500 text-center mt-2">Şu anda gösterilecek haber yok.</Text>
      </View>
    );
  }

  return (
     <View className="flex-1 bg-gray-50">
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.url + index}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => {
              // Detay sayfasına git (sonraki adımda yapacağız)
              router.push({
                pathname: '/article/[id]',
                params: { 
                  id: encodeURIComponent(item.url),
                  article: JSON.stringify(item) 
                }
              });
            }}
          />
        )}
        // Pull to refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={['#3b82f6']} // Android için
          />
        }
      />
    </View>
  )
}

export default Index

const styles = {

}
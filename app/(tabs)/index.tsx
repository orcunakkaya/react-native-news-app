import { View, FlatList, Text, RefreshControl } from 'react-native';
import React, { useState } from 'react'
import { useTopHeadlines } from '../../hooks/useNews';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ArticleCard from '../../components/ArticleCard';
import Loading from '../../components/Loading';
import EmptyState from '../../components/EmptyState';
const Index = () => {
  const { data, isLoading, isError, error, refetch } = useTopHeadlines('us');
  const router = useRouter();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <Loading text="Haberler yükleniyor..." />
    );
  }

if (!data || data.length === 0) {
    return (
      <EmptyState icon="newspaper-outline" title="Haber Bulunamadı" description="Şu anda gösterilecek haber yok." />
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
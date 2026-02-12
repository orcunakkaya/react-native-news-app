import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import React from 'react'
import { useTopHeadlines } from '../../hooks/useNews';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Index = () => {
  const { data, isLoading, isError, error, refetch } = useTopHeadlines('us');
  const router = useRouter();

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
    <View>
        <FlatList
            data={data}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => (
                <View className="p-4 border-b border-gray-200">
                    <Text className="text-lg font-semibold">{item.title}</Text>
                    <Text className="text-gray-600 mt-1">{item.description}</Text>
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
        />
    </View>
  )
}

export default Index

const styles = {

}
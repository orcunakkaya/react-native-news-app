import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES } from '../../constants/categories';
import CategoryCard from '../../components/CategoryCard';
import { Ionicons } from '@expo/vector-icons';
import { usePublisher } from '../../hooks/useNews';
import Loading from '../../components/Loading';
export default function Categories() {
  const router = useRouter();
  const { data: publishers, isLoading, isError, error } = usePublisher("us");

  const handleCategoryPress = (id: string, name: string) => {
    router.push({
      pathname: '/category/[id]',
      params: {
        id: id,
        name: name,
      },
    });
  };

  const handlePublisherPress = (id: string, name: string) => {
    router.push({
      pathname: '/publisher/[id]',
      params: {
        id: id,
        name: name,
      },
    });
  };

  if (isLoading) {
      return (
        <Loading text="Kategoriler yükleniyor..." />
      );
    }

  return (
  
        <View className="flex-1 bg-gray-50">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
        {/* Header Açıklama */}
        <View className="gap-2 px-5 py-6 bg-white border-b border-gray-100">
            <Text className="text-2xl font-bold text-gray-900">
                Kategoriler
            </Text>
            <Text className="text-gray-600">
            İlgilendiğiniz kategoriye göre haberleri keşfedin
            </Text>
        </View>

        <View className='gap-2 p-6 bg-white'>
            <Text className='text-xl font-bold '>Yayıncılar</Text>
            <View className="flex-row flex-wrap">
            <FlatList
                data={publishers}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item }) => (
                <Pressable
                    style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    backgroundColor: '#e5e7eb',
                    borderRadius: 20,
                    marginRight: 12,
                    }}
                    onPress={() => handlePublisherPress(item.id, item.name)}
                >
                    <Text style={{ fontWeight: '600' }}>
                    {item.name}
                    </Text>
                </Pressable>
                )}
            />
        </View>
        </View>

        <View className="flex-row flex-wrap items-center justify-center p-4">
            {CATEGORIES.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => handleCategoryPress(category.id, category.name)}
                />
            ))} 
        </View>
        </ScrollView>
        </View>
  
  );
}
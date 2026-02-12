import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES, Category } from '../../constants/categories';
import CategoryCard from '../../components/CategoryCard';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesScreen() {
  const router = useRouter();

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/category/[id]',
      params: {
        id: category.id,
        name: category.name,
      },
    });
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Açıklama */}
      <View className="bg-white px-5 py-6 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Kategoriler
        </Text>
        <Text className="text-gray-600">
          İlgilendiğiniz kategoriye göre haberleri keşfedin
        </Text>
      </View>

      {/* Kategori Grid */}
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => handleCategoryPress(item)}
          />
        )}
      />
    </View>
  );
}
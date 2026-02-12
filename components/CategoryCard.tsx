import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../constants/categories';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 m-2 rounded-2xl overflow-hidden shadow-lg active:opacity-80"
      style={{ minWidth: 150, maxWidth: 180 }}
    >
      <View
        className="p-6 h-32 justify-between"
      >
        {/* Icon */}
        <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
          <Ionicons
            name={category.icon as any}
            size={24}
            color="white"
          />
        </View>

        {/* Kategori Adı */}
        <Text className="text-white font-bold text-lg">
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
}
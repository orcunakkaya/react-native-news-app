import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../constants/categories';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} className="m-1 overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
      <View className="aspect-square flex-col items-center gap-4 p-4">
        <View className={`rounded-full p-3 ${category.color}`}>
          <Ionicons name={category.icon} size={24} color="#fff" />
        </View>
        <Text className="text-lg font-semibold text-gray-900">{category.name}</Text>
      </View>
    </Pressable>
  );
}

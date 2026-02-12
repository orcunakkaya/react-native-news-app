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
      className="m-2 rounded-2xl overflow-hidden shadow-lg bg-slate-200"
    >
        {/* Kategori Adı */}
         <Text className="text-black font-bold text-md p-3">
          {category.name}
        </Text>
     
    </Pressable>
  );
}
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View className="items-center justify-center flex-1 px-6">
      <Ionicons name={icon} size={80} color="#d1d5db" />
      <Text className="mt-6 text-xl font-bold text-center text-gray-700">
        {title}
      </Text>
      <Text className="mt-2 text-base text-center text-gray-500">
        {description}
      </Text>
    </View>
  );
}
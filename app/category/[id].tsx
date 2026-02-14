import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORIES, Category } from '../../constants/categories';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function CategoriesScreen() {

  return (
    <SafeAreaView className="flex-1">
        <View className="flex-1 bg-gray-50">
            <Stack.Screen options={{ title: 'Kategori [id]' }} />
            <Text>Burası category id kısmı</Text>
        </View>
    </SafeAreaView>
  );
}
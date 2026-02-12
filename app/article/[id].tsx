import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Article } from '../../types/news';
import { formatDate } from '@/utils/date';

export default function ArticleDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const article: Article = JSON.parse(params.article as string);

  // Haberi tarayıcıda aç
  const openInBrowser = () => {
    Linking.openURL(article.url);
  };

  // Haberi paylaş
  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Custom Header */}
      <View
        style={{ paddingTop: insets.top }}
        className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-4 py-3"
      >
        {/* Geri Butonu */}
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-lg active:opacity-70"
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </Pressable>

        {/* Paylaş Butonu */}
        <Pressable
          onPress={shareArticle}
          className="w-10 h-10 rounded-full bg-white/90 items-center justify-center shadow-lg active:opacity-70"
        >
          <Ionicons name="share-outline" size={22} color="#1f2937" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ana Resim */}
        <Image
          source={{ uri: article.urlToImage }}
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* İçerik */}
        <View className="px-5 py-6">
          {/* Kaynak ve Tarih */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Ionicons name="newspaper-outline" size={16} color="#3b82f6" />
              <Text className="text-sm font-semibold text-blue-600 ml-1">
                {article.source.name}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#9ca3af" />
              <Text className="text-xs text-gray-500 ml-1">
                {formatDate(article.publishedAt)}
              </Text>
            </View>
          </View>

          {/* Başlık */}
          <Text className="text-2xl font-bold text-gray-900 mb-4 leading-8">
            {article.title}
          </Text>

          {/* Yazar (varsa) */}
          {article.author && (
            <View className="flex-row items-center mb-4">
              <Ionicons name="person-circle-outline" size={20} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-2">
                {article.author}
              </Text>
            </View>
          )}

          {/* Açıklama */}
          {article.description && (
            <Text className="text-base text-gray-700 mb-6 leading-6">
              {article.description}
            </Text>
          )}

          {/* İçerik */}
          {article.content && (
            <Text className="text-base text-gray-800 leading-7 mb-6">
              {/* {article.content.replace(/\[\+\d+ chars\]/, '...')} */}
              {article.content.replace(/\[\+\d+ chars\]/, '...')}
            </Text>
          )}

          {/* Tam Haberi Oku Butonu */}
          <Pressable
            onPress={openInBrowser}
            className="bg-blue-600 rounded-xl py-4 px-6 flex-row items-center justify-center active:opacity-80 shadow-sm"
          >
            <Ionicons name="open-outline" size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Tam Haberi Oku
            </Text>
          </Pressable>

          {/* Alt Bilgi */}
          <View className="mt-6 p-4 bg-gray-50 rounded-xl">
            <Text className="text-xs text-gray-500 text-center leading-5">
              Bu haber {article.source.name} tarafından yayınlanmıştır.
              Tam içeriği okumak için yukarıdaki butona tıklayın.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
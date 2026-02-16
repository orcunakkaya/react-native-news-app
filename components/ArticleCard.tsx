import { View, Text, Image, Pressable } from 'react-native';
import { Article } from "../types/news";
import { formatDate } from '../utils/date';

export default function ArticleCard({ article, onPress }: { article: Article; onPress: () => void }) {

  return (
    <Pressable 
      onPress={onPress}
      className="mb-4 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl active:opacity-70"
    >
      {/* Resim */}
      <Image
        source={{ uri: article.urlToImage }}
        className="w-full h-48"
        resizeMode="cover"
      />

      {/* İçerik */}
      <View className="p-4">
        {/* Kaynak ve Tarih */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-semibold text-blue-600">
            {article.source.name}
          </Text>
          <Text className="text-xs text-gray-400">
            {formatDate(article.publishedAt)}
          </Text>
        </View>

        {/* Başlık */}
        <Text className="mb-2 text-base font-bold text-gray-900" numberOfLines={3}>
          {article.title}
        </Text>

        {/* Açıklama */}
        {article.description && (
          <Text className="text-sm text-gray-600" numberOfLines={2}>
            {article.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
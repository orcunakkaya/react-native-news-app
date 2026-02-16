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
import {
  useSavedArticles,
  useSaveActions,
} from '../../hooks/useSaveActions';

import { useEffect, useState } from 'react';

export default function ArticleDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const { toggleSave } = useSaveActions();
  const { data: savedArticles = [] } = useSavedArticles();

  const [saved, setSaved] = useState<boolean>(false);

  const article: Article = JSON.parse(params.article as string);

  useEffect(() => {
    if(savedArticles.length === 0 || !article) {
      setSaved(false);
      return;
    }
    const isSaved = savedArticles.some((a: Article) => a.url === article.url);
    setSaved(isSaved);
  }, [savedArticles, article]);

  

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
          className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white/90 active:opacity-70"
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </Pressable>

        {/* Paylaş Butonu */}
        {/* <Pressable
          onPress={shareArticle}
          className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white/90 active:opacity-70"
        >
          <Ionicons name="share-outline" size={22} color="#1f2937" />
        </Pressable> */}
        <View className="flex-row items-center gap-3">

  {/* Bookmark */}
  <Pressable
  onPress={() => toggleSave(article)}
  className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white/90"
>
  <Ionicons
    name={saved ? "bookmark" : "bookmark-outline"}
    size={22}
    color="#1f2937"
  />
</Pressable>

  {/* Share */}
  <Pressable
    onPress={shareArticle}
    className="items-center justify-center w-10 h-10 rounded-full shadow-lg bg-white/90 active:opacity-70"
  >
    <Ionicons name="share-outline" size={22} color="#1f2937" />
  </Pressable>

</View>
     
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
              <Text className="ml-1 text-sm font-semibold text-blue-600">
                {article.source.name}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#9ca3af" />
              <Text className="ml-1 text-xs text-gray-500">
                {formatDate(article.publishedAt)}
              </Text>
            </View>
          </View>

          {/* Başlık */}
          <Text className="mb-4 text-2xl font-bold leading-8 text-gray-900">
            {article.title}
          </Text>

          {/* Yazar (varsa) */}
          {article.author && (
            <View className="flex-row items-center mb-4">
              <Ionicons name="person-circle-outline" size={20} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-600">
                {article.author}
              </Text>
            </View>
          )}

          {/* Açıklama */}
          {article.description && (
            <Text className="mb-6 text-base leading-6 text-gray-700">
              {article.description}
            </Text>
          )}

          {/* İçerik */}
          {article.content && (
            <Text className="mb-6 text-base leading-7 text-gray-800">
              {/* {article.content.replace(/\[\+\d+ chars\]/, '...')} */}
              {article.content.replace(/\[\+\d+ chars\]/, '...')}
            </Text>
          )}

          {/* Tam Haberi Oku Butonu */}
          <Pressable
            onPress={openInBrowser}
            className="flex-row items-center justify-center px-6 py-4 bg-blue-600 shadow-sm rounded-xl active:opacity-80"
          >
            <Ionicons name="open-outline" size={20} color="white" />
            <Text className="ml-2 text-base font-bold text-white">
              Tam Haberi Oku
            </Text>
          </Pressable>

          {/* Alt Bilgi */}
          <View className="p-4 mt-6 bg-gray-50 rounded-xl">
            <Text className="text-xs leading-5 text-center text-gray-500">
              Bu haber {article.source.name} tarafından yayınlanmıştır.
              Tam içeriği okumak için yukarıdaki butona tıklayın.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
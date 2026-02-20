import { View, FlatList, Text, Keyboard } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSearchNews } from '../../hooks/useNews';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from '../../components/SearchBar';
import ArticleCard from '../../components/ArticleCard';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import { Article } from '@/types/news';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced search query (500ms delay)
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Search query (3 karakterden fazla ise çalışır)
  const { data, isLoading, isError, error } = useSearchNews(debouncedQuery);

  const articles = data || [];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Haber ara... (örn: teknoloji, spor)"
      />

      {/* Content */}
      {searchQuery.length === 0 ? (
        // Initial State - Henüz arama yapılmadı
        <EmptyState
          icon="search-outline"
          title="Haber Ara"
          description="Aramak istediğiniz konuyu yukarıdaki alana yazın"
        />
      ) : searchQuery.length < 3 ? (
        // Too Short Query
        <EmptyState
          icon="text-outline"
          title="Daha Fazla Karakter"
          description="En az 3 karakter girmelisiniz"
        />
      ) : isLoading ? (
        // Loading State
        <Loading text={`"${debouncedQuery}" aranıyor...`} />
      ) : isError ? (
        // Error State
        <EmptyState
          icon="alert-circle-outline"
          title="Hata Oluştu"
          description={error instanceof Error ? error.message : 'Bir hata oluştu'}
        />
      ) : articles.length === 0 ? (
        // No Results
        <EmptyState
          icon="document-text-outline"
          title="Sonuç Bulunamadı"
          description={`"${debouncedQuery}" için sonuç bulunamadı. Farklı bir kelime deneyin.`}
        />
      ) : (
        // Results
        <View className="flex-1">
          <View className="px-4 py-3 bg-white border-b border-gray-100">
            <Text className="text-sm text-gray-600">
              <Text className="font-bold text-gray-900">{articles.length}</Text> sonuç
              bulundu
            </Text>
          </View>

          {/* Results List */}
          <FlatList
            data={articles}
            keyExtractor={(item: Article, index) => `${item.url}-${index}`}
            contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => Keyboard.dismiss()} // Scroll'da klavyeyi kapat
            renderItem={({ item }: { item: Article }) => (
              <ArticleCard
                article={item}
                onPress={() => {
                  router.push({
                    pathname: '/article/[id]',
                    params: {
                      id: encodeURIComponent(item.url),
                      article: JSON.stringify(item),
                    },
                  });
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const queryClient = new QueryClient();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
      <Stack>
          {/* Tabs - Header yok */}
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false 
            }} 
          />

          {/* Kategori Detay - Header var */}
          <Stack.Screen
            name="category/[id]"
            options={{
              headerShown: true,
              headerTitle: '', // Dinamik olacak
              headerBackTitle: 'Geri',
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerTintColor: '#1f2937',
              headerShadowVisible: true,
            }}
          />

          {/* Article Detay - Header yok (custom header var) */}
          <Stack.Screen
            name="article/[id]"
            options={{
              headerShown: false,
              presentation: 'card', // Slide animasyonu
            }}
          />
        </Stack>
    </QueryClientProvider>
    </SafeAreaProvider>
  )
}
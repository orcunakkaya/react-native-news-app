# 📰 React Native News App

Bu proje, **React Native + Expo Router** ile geliştirilmiş bir haber uygulamasıdır.
Uygulama; güncel manşetleri listeleme, kategoriye göre filtreleme, anahtar kelime ile arama, yayıncı bazlı haber görüntüleme ve haberleri cihaza kaydetme özellikleri sunar.

## 📸 Ekran Görüntüleri

![News App Overview](./assets/news-app-overview.png)

## ✨ Özellikler

- **Top Headlines**: ABD (`us`) odaklı güncel manşet akışı
- **Kategori bazlı haberler**: İş Dünyası, Eğlence, Genel, Sağlık, Bilim, Spor, Teknoloji
- **Yayıncı listesi**: NewsAPI kaynaklarına göre yayıncı bazlı içerik görüntüleme
- **Arama**: Debounce destekli metin arama (en az 3 karakter)
- **Haber detayı**: Karttan detay ekranına yönlenme
- **Kaydet/Sil**: Haberleri yerel depolamaya ekleme ve kaldırma
- **Pull-to-refresh**: Ana akışta aşağı çekerek yenileme

## 🛠️ Teknolojiler

- **Expo (SDK 54)**
- **React Native**
- **Expo Router**
- **TypeScript**
- **TanStack React Query**
- **Axios**
- **NativeWind**
- **AsyncStorage**

## 📁 Proje Yapısı

```text
app/
  (tabs)/
    index.tsx         # Ana sayfa (manşetler)
    categories.tsx    # Kategoriler + yayıncılar
    search.tsx        # Haber arama
    saved.tsx         # Kaydedilen haberler
  article/[id].tsx    # Haber detay ekranı
  category/[id].tsx   # Kategoriye göre liste
  publisher/[id].tsx  # Yayıncıya göre liste

components/           # Tekrar kullanılabilir UI bileşenleri
hooks/                # Veri ve state yönetimi hook'ları
services/             # API ve storage servisleri
constants/            # Sabitler (kategori listesi vb.)
types/                # TypeScript tipleri
```

## ⚙️ Kurulum

### 1) Depoyu klonla

```bash
git clone <repo-url>
cd react-native-news-app
```

### 2) Bağımlılıkları yükle

```bash
npm install
```

### 3) Ortam değişkenlerini ayarla

Kök dizinde bir `.env` dosyası oluştur:

```env
EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
```

> API anahtarı için: https://newsapi.org

### 4) Uygulamayı başlat

```bash
npm run start
```

## 📱 Çalıştırma Komutları

```bash
npm run start      # Expo development server
npm run android    # Android emulator/cihaz
npm run ios        # iOS simulator (macOS)
npm run web        # Web preview
```
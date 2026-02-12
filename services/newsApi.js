import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY
    }
})

// ana sayfa haberleri
export const fetchTopHeadLines = async (country = 'us') => {
    try{
        const response = await newsApi.get('/top-headlines', {
            params: {
                country,
                pageSize: 20
            }
        })
        return response.data.articles
    }catch(error){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Haberler yüklenirken hata oluştu');
    }
}

// kategoriye göre haberler
export const fetchNewsByCategory = async (category) => {
    try{
        const response = await newsApi.get('/top-headlines', {
            params:{
                category,
                country: 'us',
                pageSize: 20
            }
        })
        return response.data.articles
    }catch(error){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Kategori haberleri yüklenirken hata oluştu');
    }
}

export const searchNews = async (query) => {
    try{
        const response = await newsApi.get('/everything', {
        params: {
            q: query,
            pageSize: 20,
            language: 'en',
        }
    })
    return response.data.articles
    }catch(error){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Arama sırasında hata oluştu');
    }
}
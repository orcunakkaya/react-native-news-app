import axios from 'axios';
import { NewsApiResponse, PublisherResponse } from "../types/news";
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const newsApi = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY
    }
})

// ana sayfa haberleri
export const fetchTopHeadLines = async (country: string = 'us') => {
    try{
        const response: { data: NewsApiResponse } = await newsApi.get('/top-headlines', {
            params: {
                country,
                pageSize: 20
            }
        })
        return response.data.articles
    }catch(error: any){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Haberler yüklenirken hata oluştu');
    }
}

// kategoriye göre haberler
export const fetchNewsByCategory = async (category: string) => {
    try{
        const response: { data: NewsApiResponse } = await newsApi.get('/top-headlines', {
            params:{
                category,
                country: 'us',
                pageSize: 20
            }
        })
        return response.data.articles
    }catch(error: any){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Kategori haberleri yüklenirken hata oluştu');
    }
}

export const searchNews = async (query: string) => {
    try{
        const response: { data: NewsApiResponse } = await newsApi.get('/everything', {
        params: {
            q: query,
            pageSize: 20,
            language: 'en',
        }
    })
    return response.data.articles
    }catch(error: any){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Arama sırasında hata oluştu');
    }
}

export const fetchPublisher = async (country: string = 'us') => {
    try{
        const response: { data: PublisherResponse } = await newsApi.get('/top-headlines/sources', {
        params: {
            country,
            language: 'en',
        }
    })
    console.log('Publisher API Response:', response); // API yanıtını kontrol et
    return response.data.sources
    }catch(error: any){
        console.error('API Error:', error.response?.data || error.message);
        throw new Error('Yayıncı bilgileri yüklenirken hata oluştu');
    }
}
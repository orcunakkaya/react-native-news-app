import { useQuery } from "@tanstack/react-query";
import { fetchNewsByCategory, fetchTopHeadLines, searchNews, fetchPublisher } from "../services/newsApi";
import { Article, Publisher } from "../types/news";

export const useTopHeadlines = (country: string = 'us') => {
    return useQuery<Article[]>({
        queryKey: ['news', 'top-headlines', country],
        queryFn: () => fetchTopHeadLines(country),
        staleTime: 1000 * 60 * 5, // 5 dakika
    })
}

export const useNewsByCategory = (category: string) => {
    return useQuery<Article[]>({
        queryKey: ['news', 'category', category],
        queryFn: () => fetchNewsByCategory(category),
        enabled: !!category
    })
}

export const useSearchNews = (query: string) => {
    return useQuery<Article[]>({
        queryKey: ['news', 'search', query],
        queryFn: () => searchNews(query),
        enabled: !!query.trim() && query.trim().length > 2
    })
}

export const usePublisher = (country: string = 'us') => {
    return useQuery<Publisher[]>({
        queryKey: ['news', 'publisher', country],
        queryFn: () => fetchPublisher(country),
        staleTime: 1000 * 60 * 60, // 1 saat
    })
}
import { useQuery } from "@tanstack/react-query";
import { fetchNewsByCategory, fetchTopHeadLines, searchNews } from "../services/newsApi";
import { Article } from "../types/news";

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
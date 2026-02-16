import Ionicons from '@expo/vector-icons/Ionicons';

type IconName = keyof typeof Ionicons.glyphMap;

export interface Category {
  id: string;
  name: string;
  icon: IconName;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'business',
    name: 'İş Dünyası',
    icon: 'business',
    color: '#3b82f6',
  },
  {
    id: 'entertainment',
    name: 'Eğlence',
    icon: 'film',
    color: '#8b5cf6',
  },
  {
    id: 'general',
    name: 'Genel',
    icon: 'newspaper',
    color: '#6b7280',
  },
  {
    id: 'health',
    name: 'Sağlık',
    icon: 'fitness',
    color: '#10b981',
  },
  {
    id: 'science',
    name: 'Bilim',
    icon: 'flask',
    color: '#6366f1',
  },
  {
    id: 'sports',
    name: 'Spor',
    icon: 'football',
    color: '#f97316',
  },
  {
    id: 'technology',
    name: 'Teknoloji',
    icon: 'phone-portrait',
    color: '#06b6d4',
  },
];
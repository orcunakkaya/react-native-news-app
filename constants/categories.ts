export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'business',
    name: 'İş Dünyası',
    icon: 'business',
    color: 'bg-blue-500',
  },
  {
    id: 'entertainment',
    name: 'Eğlence',
    icon: 'film',
    color: 'bg-purple-500',
  },
  {
    id: 'general',
    name: 'Genel',
    icon: 'newspaper',
    color: 'bg-gray-500',
  },
  {
    id: 'health',
    name: 'Sağlık',
    icon: 'fitness',
    color: 'bg-green-500',
  },
  {
    id: 'science',
    name: 'Bilim',
    icon: 'flask',
    color: 'bg-indigo-500',
  },
  {
    id: 'sports',
    name: 'Spor',
    icon: 'football',
    color: 'bg-orange-500',
  },
  {
    id: 'technology',
    name: 'Teknoloji',
    icon: 'phone-portrait',
    color: 'bg-cyan-500',
  },
];
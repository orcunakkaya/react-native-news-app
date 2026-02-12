export interface Category {
  id: string;
  name: string;
  icon: string; // Ionicons icon adı
  color: string; // Tailwind color
  gradient: string[]; // Gradient renkleri
}

export const CATEGORIES: Category[] = [
  {
    id: 'business',
    name: 'İş Dünyası',
    icon: 'business',
    color: 'bg-blue-500',
    gradient: ['#3b82f6', '#1d4ed8'],
  },
  {
    id: 'entertainment',
    name: 'Eğlence',
    icon: 'film',
    color: 'bg-purple-500',
    gradient: ['#a855f7', '#7e22ce'],
  },
  {
    id: 'general',
    name: 'Genel',
    icon: 'newspaper',
    color: 'bg-gray-500',
    gradient: ['#6b7280', '#374151'],
  },
  {
    id: 'health',
    name: 'Sağlık',
    icon: 'fitness',
    color: 'bg-green-500',
    gradient: ['#10b981', '#059669'],
  },
  {
    id: 'science',
    name: 'Bilim',
    icon: 'flask',
    color: 'bg-indigo-500',
    gradient: ['#6366f1', '#4f46e5'],
  },
  {
    id: 'sports',
    name: 'Spor',
    icon: 'football',
    color: 'bg-orange-500',
    gradient: ['#f97316', '#ea580c'],
  },
  {
    id: 'technology',
    name: 'Teknoloji',
    icon: 'phone-portrait',
    color: 'bg-cyan-500',
    gradient: ['#06b6d4', '#0891b2'],
  },
];
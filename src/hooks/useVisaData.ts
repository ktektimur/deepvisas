
import { useQuery } from '@tanstack/react-query';
import { fetchVisaData, VisaApiData } from '@/services/visaApi';

export const useVisaData = () => {
  return useQuery({
    queryKey: ['visaData'],
    queryFn: fetchVisaData,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Fallback data for when API is unavailable
export const getFallbackVisaData = (): VisaApiData[] => [
  {
    id: '1',
    city: 'Ankara',
    country: 'Hollanda',
    flag: '🇳🇱',
    date: '2024-12-20',
    applicationDate: '2024-12-15',
    status: 'available',
    slots: 12,
  },
  {
    id: '2',
    city: 'İstanbul',
    country: 'Fransa',
    flag: '🇫🇷',
    date: '2024-12-25',
    applicationDate: '2024-12-18',
    status: 'full',
    nextAvailable: '2025-01-10',
  },
  {
    id: '3',
    city: 'İstanbul',
    country: 'Almanya',
    flag: '🇩🇪',
    date: '2024-12-22',
    applicationDate: '2024-12-16',
    status: 'available',
    slots: 5,
  },
  {
    id: '4',
    city: 'Ankara',
    country: 'İspanya',
    flag: '🇪🇸',
    date: '2024-12-28',
    applicationDate: '2024-12-20',
    status: 'full',
    nextAvailable: '2025-01-15',
  },
  {
    id: '5',
    city: 'İstanbul',
    country: 'İtalya',
    flag: '🇮🇹',
    date: '2024-12-24',
    applicationDate: '2024-12-17',
    status: 'available',
    slots: 8,
  },
  {
    id: '6',
    city: 'Ankara',
    country: 'İngiltere',
    flag: '🇬🇧',
    date: '2024-12-30',
    applicationDate: '2024-12-22',
    status: 'full',
    nextAvailable: '2025-01-20',
  },
];

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterX, Plus } from 'lucide-react';
import VisaCard from '@/components/VisaCard';

// Define status type
type VisaStatus = 'available' | 'full';

// Interface for visa item
interface VisaItem {
  id: number;
  country: string;
  flag: string;
  city: string;
  date: string;
  status: VisaStatus;
  slots?: number;
  nextAvailable?: string;
}

// Sample visa data with 2025 dates
const visaData: VisaItem[] = [
  {
    id: 1,
    country: 'United States',
    flag: '🇺🇸',
    city: 'Ankara',
    date: '2025-06-15',
    status: 'available',
    slots: 3,
  },
  {
    id: 2,
    country: 'Germany',
    flag: '🇩🇪',
    city: 'Istanbul',
    date: '2025-06-25',
    status: 'full',
    nextAvailable: '2025-07-10',
  },
  {
    id: 3,
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'Izmir',
    date: '2025-06-18',
    status: 'available',
    slots: 1,
  },
  {
    id: 4,
    country: 'France',
    flag: '🇫🇷',
    city: 'Istanbul',
    date: '2025-06-22',
    status: 'available',
    slots: 2,
  },
  {
    id: 5,
    country: 'Italy',
    flag: '🇮🇹',
    city: 'Ankara',
    date: '2025-07-05',
    status: 'full',
    nextAvailable: '2025-07-20',
  },
  {
    id: 6,
    country: 'Spain',
    flag: '🇪🇸',
    city: 'Istanbul',
    date: '2025-06-30',
    status: 'available',
    slots: 5,
  },
];

const Visas = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = React.useState({
    country: '',
    status: '',
  });

  const filteredVisas = visaData.filter((visa) => {
    if (filters.country && !visa.country.includes(filters.country)) {
      return false;
    }
    if (filters.status && visa.status !== filters.status) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setFilters({ country: '', status: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('dashboard.trackedVisas')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearFilters} disabled={!filters.country && !filters.status}>
            <FilterX className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Country</label>
            <select
              className="p-2 border rounded-md"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              <option value="">All Countries</option>
              {Array.from(new Set(visaData.map((v) => v.country))).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              className="p-2 border rounded-md"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="full">Full</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Visa Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisas.map((visa) => (
          <VisaCard
            key={visa.id}
            country={visa.country}
            city={visa.city}
            flag={visa.flag}
            date={visa.date}
            status={visa.status}
            slots={visa.slots}
            nextAvailable={visa.nextAvailable}
          />
        ))}
      </div>

      {filteredVisas.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No visa appointments match your filters.</p>
          <Button variant="link" onClick={clearFilters}>
            Clear filters and show all
          </Button>
        </div>
      )}
    </div>
  );
};

export default Visas;

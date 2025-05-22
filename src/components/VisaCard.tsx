
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface VisaCardProps {
  city: string;
  country: string;
  flag: string;
  date: string;
  status: 'available' | 'full';
  slots?: number;
  nextAvailable?: string;
}

const VisaCard: React.FC<VisaCardProps> = ({
  city,
  country,
  flag,
  date,
  status,
  slots = 0,
  nextAvailable
}) => {
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{flag}</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{city}</h3>
              <p className="text-sm text-gray-600">{country}</p>
            </div>
          </div>
          <Badge
            variant={status === 'available' ? 'default' : 'secondary'}
            className={
              status === 'available'
                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                : 'bg-red-100 text-red-800 hover:bg-red-100'
            }
          >
            {status === 'available' ? t('visa.available') : t('visa.full')}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Date:</span>
            <span className="font-medium text-gray-900">{date}</span>
          </div>
          
          {status === 'available' && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('visa.slots')}:</span>
              <span className="font-medium text-green-600">{slots}</span>
            div>
          )}
          
          {status === 'full' && nextAvailable && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('visa.nextAvailable')}:</span>
              <span className="font-medium text-gray-900">{nextAvailable}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${
              status === 'available' ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse`}></div>
            <span className="ml-2 text-xs text-gray-500">Live Status</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaCard;

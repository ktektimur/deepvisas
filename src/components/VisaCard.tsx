
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
  const { t, language } = useLanguage();
  
  // Get the appropriate status text based on the language
  const statusText = language === 'tr' 
    ? (status === 'available' ? 'Müsait' : 'Dolu')
    : (status === 'available' ? t('visa.available') : t('visa.full'));

  return (
    <Card className={`group transition-all duration-300 overflow-hidden 
      ${status === 'available' 
        ? 'bg-gradient-to-br from-green-50 to-teal-50 border-green-100 hover:border-green-200' 
        : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100 hover:border-red-200'
      } border-2 hover:shadow-lg rounded-xl`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{flag}</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{country}</h3>
              <p className="text-sm text-gray-600">{city}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`
              ${status === 'available'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-red-100 text-red-800 border-red-200'
              } font-medium px-3 py-1`
            }
          >
            {language === 'tr' ? `Durum: ${statusText}` : statusText}
          </Badge>
        </div>

        <div className="space-y-3">
          {language === 'tr' && (
            <div className="text-sm text-gray-600 mb-1">
              Şehir: <span className="font-medium text-gray-800">{city}</span>
            </div>
          )}
          
          {status === 'available' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {language === 'tr' ? 'En yakın tarih:' : t('visa.nextAvailable')}:
                </span>
                <span className="font-medium text-gray-900">{date}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {language === 'tr' ? 'Slot sayısı:' : t('visa.slots')}:
                </span>
                <span className="font-medium text-green-600">{slots}</span>
              </div>
            </>
          )}
          
          {status === 'full' && nextAvailable && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {language === 'tr' ? 'Sonraki müsait:' : t('visa.nextAvailable')}:
              </span>
              <span className="font-medium text-gray-900">{nextAvailable}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${
              status === 'available' ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse mr-2`}></div>
            <span className="text-xs text-gray-500">
              {status === 'available' ? '🟢' : '🔴'} Live Status
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaCard;

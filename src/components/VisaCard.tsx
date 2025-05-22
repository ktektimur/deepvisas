
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { VisaApplication } from '@/types/visa';

interface VisaCardProps {
  visa: VisaApplication;
}

const VisaCard: React.FC<VisaCardProps> = ({ visa }) => {
  const { t, language } = useLanguage();
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US');
  };

  // Determine status styling
  const getStatusStyle = () => {
    switch(visa.status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="group transition-all duration-300 overflow-hidden border-2 rounded-xl hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{visa.country}</h3>
            <p className="text-sm text-gray-600">
              {language === 'tr' ? 'Başvuru Tarihi:' : 'Application Date:'} {formatDate(visa.applicationDate)}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusStyle()} font-medium px-3 py-1`}
          >
            {language === 'tr' ? `Durum: ${visa.status}` : `Status: ${visa.status}`}
          </Badge>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full animate-pulse mr-2 ${
              visa.status.toLowerCase() === 'approved' ? 'bg-green-500' : 
              visa.status.toLowerCase() === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {visa.status.toLowerCase() === 'approved' ? '🟢' : 
               visa.status.toLowerCase() === 'rejected' ? '🔴' : '🟡'} 
              {language === 'tr' ? 'Durum Güncellendi' : 'Status Updated'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaCard;

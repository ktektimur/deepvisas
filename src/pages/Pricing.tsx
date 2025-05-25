
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Clock, CreditCard, Globe } from 'lucide-react';

interface VisaType {
  type: string;
  price: number;
  duration: number;
}

interface CountryPricing {
  country: string;
  flag: string;
  visaTypes: VisaType[];
}

const Pricing = () => {
  const { t, language } = useLanguage();

  const pricingData: CountryPricing[] = [
    {
      country: "Netherlands",
      flag: "🇳🇱",
      visaTypes: [
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 1500, duration: 30 },
        { type: language === 'tr' ? "İş" : "Business", price: 2000, duration: 60 },
      ],
    },
    {
      country: "France",
      flag: "🇫🇷",
      visaTypes: [
        { type: language === 'tr' ? "Öğrenci" : "Student", price: 1800, duration: 90 },
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 1400, duration: 30 },
      ],
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      visaTypes: [
        { type: language === 'tr' ? "İş" : "Business", price: 2200, duration: 90 },
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 1600, duration: 45 },
      ],
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      visaTypes: [
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 1300, duration: 30 },
        { type: language === 'tr' ? "Çalışma" : "Work", price: 2500, duration: 180 },
      ],
    },
    {
      country: "Italy",
      flag: "🇮🇹",
      visaTypes: [
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 1450, duration: 30 },
        { type: language === 'tr' ? "İş" : "Business", price: 1950, duration: 60 },
      ],
    },
    {
      country: "USA",
      flag: "🇺🇸",
      visaTypes: [
        { type: language === 'tr' ? "Turistik" : "Tourist", price: 3500, duration: 90 },
        { type: language === 'tr' ? "İş" : "Business", price: 4200, duration: 120 },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'tr' ? 'Vize Fiyatları' : 'Visa Pricing'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'tr' 
              ? 'Farklı ülkeler için vize türleri ve fiyatları. Hemen abone olun ve takibe başlayın.'
              : 'Visa types and pricing for different countries. Subscribe now and start tracking.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((country, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center border-b dark:border-gray-700">
                <div className="text-4xl mb-2">{country.flag}</div>
                <CardTitle className="text-xl font-bold dark:text-white">{country.country}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {country.visaTypes.map((visa, visaIndex) => (
                    <div key={visaIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{visa.type}</h3>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {visa.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center space-x-1">
                          <CreditCard className="w-4 h-4" />
                          <span className="font-medium">₺{visa.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{visa.duration} {language === 'tr' ? 'gün' : 'days'}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                        <Globe className="w-4 h-4 mr-2" />
                        {language === 'tr' ? 'Abone Ol' : 'Subscribe'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'tr' ? 'Özel Fiyatlandırma' : 'Custom Pricing'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'tr'
                  ? 'Toplu sipariş veya özel ihtiyaçlarınız için bizimle iletişime geçin.'
                  : 'Contact us for bulk orders or custom requirements.'
                }
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20">
                {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;

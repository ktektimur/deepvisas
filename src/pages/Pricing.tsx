
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Clock, CreditCard, Globe, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardLayout>
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {language === 'tr' ? 'Vize Fiyatları' : 'Visa Pricing'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {language === 'tr' 
                  ? 'Farklı ülkeler için vize türleri ve fiyatları. Hemen abone olun ve takibe başlayın.'
                  : 'Visa types and pricing for different countries. Subscribe now and start tracking.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {pricingData.map((country, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl overflow-hidden">
                  <CardHeader className="text-center pb-4 pt-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="text-6xl mb-4">{country.flag}</div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{country.country}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {country.visaTypes.map((visa, visaIndex) => (
                        <div key={visaIndex} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-gray-900">🎯 {visa.type}</h3>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{language === 'tr' ? `${visa.type} vizesi hakkında` : `About ${visa.type} visa`}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                              {visa.type}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="w-5 h-5 text-green-600" />
                              <span className="text-2xl font-bold text-gray-900">💰 ₺{visa.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-blue-600" />
                              <span className="text-gray-700">⏳ {visa.duration} {language === 'tr' ? 'gün' : 'days'}</span>
                            </div>
                          </div>
                          
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg">
                            <Globe className="w-5 h-5 mr-2" />
                            🔘 {language === 'tr' ? 'Abone Ol' : 'Subscribe'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg rounded-2xl">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {language === 'tr' ? 'Özel Fiyatlandırma' : 'Custom Pricing'}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {language === 'tr'
                      ? 'Toplu sipariş veya özel ihtiyaçlarınız için bizimle iletişime geçin.'
                      : 'Contact us for bulk orders or custom requirements.'
                    }
                  </p>
                  <Button variant="outline" className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200">
                    {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </TooltipProvider>
  );
};

export default Pricing;

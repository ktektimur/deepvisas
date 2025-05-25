import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface VisaType {
  type: string;
  price: number;
  duration: number;
}

interface CountryPricing {
  id: string;
  country: string;
  flag: string;
  visaTypes: VisaType[];
}

const AdminPricing = () => {
  const { t, language } = useLanguage();
  const [editingCountry, setEditingCountry] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [pricingData, setPricingData] = useState<CountryPricing[]>([
    {
      id: '1',
      country: "Netherlands",
      flag: "🇳🇱",
      visaTypes: [
        { type: "Tourist", price: 1500, duration: 30 },
        { type: "Business", price: 2000, duration: 60 },
      ],
    },
    {
      id: '2',
      country: "France",
      flag: "🇫🇷",
      visaTypes: [
        { type: "Student", price: 1800, duration: 90 },
        { type: "Tourist", price: 1400, duration: 30 },
      ],
    },
    {
      id: '3',
      country: "Germany",
      flag: "🇩🇪",
      visaTypes: [
        { type: "Business", price: 2200, duration: 90 },
        { type: "Tourist", price: 1600, duration: 45 },
      ],
    },
  ]);

  const [newCountry, setNewCountry] = useState({
    country: '',
    flag: '',
    visaTypes: [{ type: '', price: 0, duration: 0 }]
  });

  const handleAddCountry = () => {
    if (newCountry.country && newCountry.flag) {
      const newCountryData: CountryPricing = {
        id: Date.now().toString(),
        country: newCountry.country,
        flag: newCountry.flag,
        visaTypes: newCountry.visaTypes.filter(visa => visa.type && visa.price > 0)
      };
      
      setPricingData([...pricingData, newCountryData]);
      setNewCountry({ country: '', flag: '', visaTypes: [{ type: '', price: 0, duration: 0 }] });
      setShowAddForm(false);
      toast.success('Country added successfully');
    }
  };

  const handleDeleteCountry = (id: string) => {
    setPricingData(pricingData.filter(country => country.id !== id));
    toast.success('Country deleted successfully');
  };

  const handleEditCountry = (id: string, updatedCountry: CountryPricing) => {
    setPricingData(pricingData.map(country => 
      country.id === id ? updatedCountry : country
    ));
    setEditingCountry(null);
    toast.success('Country updated successfully');
  };

  const addVisaType = () => {
    setNewCountry({
      ...newCountry,
      visaTypes: [...newCountry.visaTypes, { type: '', price: 0, duration: 0 }]
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'tr' ? 'Fiyatlandırma Yönetimi' : 'Pricing Management'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'tr' ? 'Vize fiyatlarını yönetin' : 'Manage visa pricing'}
            </p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'tr' ? 'Ülke Ekle' : 'Add Country'}
          </Button>
        </div>

        {/* Add New Country Form */}
        {showAddForm && (
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="border-b dark:border-gray-700">
              <div className="flex justify-between items-center">
                <CardTitle className="dark:text-white">
                  {language === 'tr' ? 'Yeni Ülke Ekle' : 'Add New Country'}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="country" className="dark:text-white">
                    {language === 'tr' ? 'Ülke Adı' : 'Country Name'}
                  </Label>
                  <Input
                    id="country"
                    value={newCountry.country}
                    onChange={(e) => setNewCountry({...newCountry, country: e.target.value})}
                    placeholder={language === 'tr' ? 'Ülke adını girin' : 'Enter country name'}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="flag" className="dark:text-white">
                    {language === 'tr' ? 'Bayrak Emoji' : 'Flag Emoji'}
                  </Label>
                  <Input
                    id="flag"
                    value={newCountry.flag}
                    onChange={(e) => setNewCountry({...newCountry, flag: e.target.value})}
                    placeholder="🇺🇸"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold dark:text-white">
                  {language === 'tr' ? 'Vize Türleri' : 'Visa Types'}
                </h3>
                {newCountry.visaTypes.map((visa, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <Label className="dark:text-white">
                        {language === 'tr' ? 'Vize Türü' : 'Visa Type'}
                      </Label>
                      <Input
                        value={visa.type}
                        onChange={(e) => {
                          const updatedVisaTypes = [...newCountry.visaTypes];
                          updatedVisaTypes[index].type = e.target.value;
                          setNewCountry({...newCountry, visaTypes: updatedVisaTypes});
                        }}
                        placeholder={language === 'tr' ? 'Turistik' : 'Tourist'}
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="dark:text-white">
                        {language === 'tr' ? 'Fiyat (₺)' : 'Price (₺)'}
                      </Label>
                      <Input
                        type="number"
                        value={visa.price}
                        onChange={(e) => {
                          const updatedVisaTypes = [...newCountry.visaTypes];
                          updatedVisaTypes[index].price = Number(e.target.value);
                          setNewCountry({...newCountry, visaTypes: updatedVisaTypes});
                        }}
                        placeholder="1500"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="dark:text-white">
                        {language === 'tr' ? 'Süre (gün)' : 'Duration (days)'}
                      </Label>
                      <Input
                        type="number"
                        value={visa.duration}
                        onChange={(e) => {
                          const updatedVisaTypes = [...newCountry.visaTypes];
                          updatedVisaTypes[index].duration = Number(e.target.value);
                          setNewCountry({...newCountry, visaTypes: updatedVisaTypes});
                        }}
                        placeholder="30"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={addVisaType}>
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'tr' ? 'Vize Türü Ekle' : 'Add Visa Type'}
                  </Button>
                  <Button onClick={handleAddCountry} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'tr' ? 'Kaydet' : 'Save'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pricingData.map((country) => (
            <Card key={country.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="border-b dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <CardTitle className="dark:text-white">{country.country}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCountry(country.id)}
                      className="dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCountry(country.id)}
                      className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {country.visaTypes.map((visa, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <Badge variant="secondary" className="mb-1">
                          {visa.type}
                        </Badge>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {visa.duration} {language === 'tr' ? 'gün' : 'days'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg dark:text-white">
                          ₺{visa.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPricing;

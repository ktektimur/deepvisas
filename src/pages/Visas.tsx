
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import VisaCard from '@/components/VisaCard';
import AddTrackingModal from '@/components/AddTrackingModal';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VisaApplication } from '@/types/visa';

const visaApplications: VisaApplication[] = [
  {
    id: '1',
    country: 'United Kingdom',
    status: 'In Review',
    applicationDate: '2024-01-20',
  },
  {
    id: '2',
    country: 'United States',
    status: 'Approved',
    applicationDate: '2023-12-15',
  },
  {
    id: '3',
    country: 'Canada',
    status: 'Pending',
    applicationDate: '2024-02-01',
  },
];

const Visas: React.FC = () => {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [applications, setApplications] = useState(visaApplications);

  const handleAddApplication = (data: { country: string; city: string; visaType: string }) => {
    const newApplication: VisaApplication = {
      id: `${Date.now()}`,
      country: data.country,
      status: 'Pending',
      applicationDate: new Date().toISOString().split('T')[0],
      city: data.city,
    };
    setApplications([...applications, newApplication]);
  };
  
  return (
    <DashboardLayout>
      <div className="responsive-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard.trackedVisas')}</h1>
          <p className="text-gray-600">
            {t('dashboard.visaManagement')}
          </p>
        </div>

        {/* Visa Application Links */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Apply for a Visa' : 'Vize Başvurusu Yap'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* UK Visa Application Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'United Kingdom Visa' : 'Birleşik Krallık Vizesi'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' ? 'Apply for a UK visitor, work, or student visa' : 'İngiltere ziyaretçi, çalışma veya öğrenci vizesi başvurusu yapın'}
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/requirements/uk">
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Apply Now' : 'Şimdi Başvur'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Greece Visa Application Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Greece Visa' : 'Yunanistan Vizesi'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' ? 'Apply for a Greece Schengen visa for tourism or business' : 'Turizm veya iş için Yunanistan Schengen vizesi başvurusu yapın'}
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/requirements/greece">
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Apply Now' : 'Şimdi Başvur'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Tracked Visas */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('dashboard.yourApplications')}</h2>
          <Button onClick={() => setIsAddModalOpen(true)}>
            {t('dashboard.addTracking')}
          </Button>
        </div>
        
        {/* Visa Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((visa) => (
            <VisaCard key={visa.id} visa={visa} />
          ))}
        </div>
        
        {/* Add Tracking Modal */}
        <AddTrackingModal 
          open={isAddModalOpen} 
          onOpenChange={setIsAddModalOpen} 
          onSubmit={handleAddApplication}
        />
      </div>
    </DashboardLayout>
  );
};

export default Visas;

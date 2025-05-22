import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import VisaCard from '@/components/VisaCard';
import AddTrackingModal from '@/components/AddTrackingModal';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface VisaApplication {
  id: string;
  country: string;
  status: string;
  applicationDate: string;
}

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
  const { t } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [applications, setApplications] = useState(visaApplications);

  const handleAddApplication = (newApplication: VisaApplication) => {
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
          <h2 className="text-xl font-semibold mb-4">Apply for a Visa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* UK Visa Application Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle>United Kingdom Visa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Apply for a UK visitor, work, or student visa
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/requirements/uk">
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Greece Visa Application Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle>Greece Visa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Apply for a Greece Schengen visa for tourism or business
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/requirements/greece">
                  <Button variant="outline" className="w-full">
                    Apply Now
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
          onClose={() => setIsAddModalOpen(false)} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Visas;

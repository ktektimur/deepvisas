import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import AddTrackingModal from '@/components/AddTrackingModal';
import { 
  CheckCircle,
  X,
  Globe,
  Bell,
  Plus,
  MessageSquare,
  Users
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import VisaCard from '@/components/VisaCard';
import { VisaApplication } from '@/types/visa';

// Helper: Returns today's date + X days with random variation
function getRandomFutureDate(baseDays = 10): string {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 20) + baseDays;
  today.setDate(today.getDate() + randomDays);
  return today.toISOString().slice(0, 10);
}

interface Notification {
  id: number;
  message: string;
  time: string;
  type: string;
}

const Dashboard = () => {
  const { t } = useLanguage();
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackedVisas, setTrackedVisas] = useState<VisaApplication[]>([]);
  
  // Define initial visa data with random future dates
  const initialVisaData: VisaApplication[] = [
    {
      id: '1',
      country: 'United States',
      flag: '🇺🇸',
      city: 'Ankara',
      status: 'available',
      applicationDate: `2 ${t('dashboard.minutesAgo')}`,
      slots: 3,
      date: '',
      nextAvailable: ''
    },
    {
      id: '2',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Istanbul',
      status: 'full',
      applicationDate: `5 ${t('dashboard.minutesAgo')}`,
      date: '',
      nextAvailable: ''
    },
    {
      id: '3',
      country: 'United Kingdom',
      flag: '🇬🇧',
      city: 'Izmir',
      status: 'available',
      applicationDate: `1 ${t('dashboard.minutesAgo')}`,
      slots: 1,
      date: '',
      nextAvailable: ''
    }
  ];

  // Set up visa dates dynamically with random future dates
  useEffect(() => {
    const updatedVisas = initialVisaData.map((visa, idx) => {
      const date = getRandomFutureDate(10 + idx * 5);
      const nextAvailableDate = getRandomFutureDate(20 + idx * 7);
      
      return {
        ...visa,
        date,
        nextAvailable: nextAvailableDate
      };
    });
    
    setTrackedVisas(updatedVisas);
  }, [t]);

  const recentNotifications: Notification[] = [
    {
      id: 1,
      message: t('dashboard.newSlotsAvailable'),
      time: `5 ${t('dashboard.minutesAgo')}`,
      type: 'success'
    },
    {
      id: 2,
      message: t('dashboard.slotsFilledUp'),
      time: `1 ${t('dashboard.hourAgo')}`,
      type: 'warning'
    }
  ];

  const handleAddTracking = (data: any) => {
    toast.success(t('dashboard.newTrackingAdded'), {
      description: `${data.visaType} ${t('dashboard.visaFor')} ${data.city}, ${data.country}`
    });
  };

  const handleRemoveNotification = (id: number) => {
    toast.success(t('dashboard.notificationRemoved'));
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('dashboard.welcomeMessage')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">{t('dashboard.trackedCountries')}</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Globe className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">{t('dashboard.availableSlots')}</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">{t('dashboard.notifications')}</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Bell className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">{t('dashboard.successRate')}</p>
                  <p className="text-2xl font-bold">95%</p>
                </div>
                <Users className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracked Visas */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row items-center justify-between p-6 border-b dark:border-gray-700">
                <h2 className="text-xl font-semibold dark:text-white">{t('dashboard.trackedVisas')}</h2>
                <Button 
                  size="sm" 
                  onClick={() => setIsTrackingModalOpen(true)} 
                  className="dark:bg-primary dark:text-white dark:hover:bg-primary/80"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('dashboard.addTracking')}
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackedVisas.map((visa) => (
                    <VisaCard 
                      key={visa.id}
                      visa={visa}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Telegram Status */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold dark:text-white">{t('dashboard.telegramStatus')}</h2>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${telegramConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm dark:text-gray-300">
                      {telegramConnected ? t('dashboard.connected') : t('dashboard.notConnected')}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    {t('dashboard.followTelegram')}{" "}
                    <a
                      href="https://t.me/deepvisas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline"
                    >
                      @deepvisas
                    </a>
                  </p>
                </div>
                
                {!telegramConnected && (
                  <Button 
                    className="w-full dark:bg-primary dark:text-white dark:hover:bg-primary/80" 
                    onClick={() => {
                      window.open("https://t.me/deepvisas", "_blank");
                      setTelegramConnected(true);
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t('dashboard.connect')}
                  </Button>
                )}
                
                {telegramConnected && (
                  <div className="text-center">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-2">✓ {t('dashboard.connectedTo')} @deepvisas</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTelegramConnected(false)}
                      className="dark:border-gray-700 dark:text-gray-300"
                    >
                      {t('dashboard.disconnect')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold dark:text-white">{t('dashboard.notifications')}</h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {recentNotifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 dark:text-gray-400 dark:hover:bg-gray-600"
                          onClick={() => handleRemoveNotification(notification.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <AddTrackingModal
        open={isTrackingModalOpen}
        onOpenChange={setIsTrackingModalOpen}
        onSubmit={handleAddTracking}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
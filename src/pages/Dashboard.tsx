
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
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

interface TrackingData {
  visaType: string;
  city: string;
  country: string;
}

const Dashboard = () => {
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackedVisas, setTrackedVisas] = useState<VisaApplication[]>([]);
  
  const initialVisaData: VisaApplication[] = [
    {
      id: '1',
      country: 'Amerika Birleşik Devletleri',
      flag: '🇺🇸',
      city: 'Ankara',
      status: 'available',
      applicationDate: '2 dakika önce',
      slots: 3,
      date: '',
      nextAvailable: ''
    },
    {
      id: '2',
      country: 'Almanya',
      flag: '🇩🇪',
      city: 'İstanbul',
      status: 'full',
      applicationDate: '5 dakika önce',
      date: '',
      nextAvailable: ''
    },
    {
      id: '3',
      country: 'Birleşik Krallık',
      flag: '🇬🇧',
      city: 'İzmir',
      status: 'available',
      applicationDate: '1 dakika önce',
      slots: 1,
      date: '',
      nextAvailable: ''
    }
  ];

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
  }, []);

  const recentNotifications: Notification[] = [
    {
      id: 1,
      message: 'Ankara\'da ABD Turist vizesi için yeni slotlar müsait',
      time: '5 dakika önce',
      type: 'success'
    },
    {
      id: 2,
      message: 'İstanbul\'da Schengen vizesi tüm slotlar doldu',
      time: '1 saat önce',
      type: 'warning'
    }
  ];

  const handleAddTracking = (data: TrackingData) => {
    toast.success('Yeni vize takibi başarıyla eklendi!');
  };

  const handleRemoveNotification = (id: number) => {
    toast.success('Bildirim kaldırıldı');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vize Paneli
        </h1>
        <p className="text-gray-600">
          Kişiselleştirilmiş vize takip panelinize hoş geldiniz
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Takip Edilen Ülkeler</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Müsait Slotlar</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Bildirimler</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Başarı Oranı</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tracked Visas */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b gap-4">
              <h2 className="text-xl font-semibold">Takip Edilen Vizeler</h2>
              <Button 
                size="sm" 
                onClick={() => setIsTrackingModalOpen(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Takip Ekle
              </Button>
            </div>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
          <Card>
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg font-semibold">Telegram Entegrasyonu</h2>
            </div>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${telegramConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">
                    {telegramConnected ? 'Bağlı' : 'Bağlı Değil'}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="mb-2 text-sm text-gray-700">
                  Telegram kanalımızı takip edin{" "}
                  <a
                    href="https://t.me/deepvisas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    @deepvisas
                  </a>
                </p>
              </div>
              
              {!telegramConnected && (
                <Button 
                  className="w-full" 
                  onClick={() => {
                    window.open("https://t.me/deepvisas", "_blank");
                    setTelegramConnected(true);
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Telegram'a Bağlan
                </Button>
              )}
              
              {telegramConnected && (
                <div className="text-center">
                  <p className="text-sm text-green-600 mb-2">
                    ✓ @deepvisas'a bağlı
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTelegramConnected(false)}
                    className="w-full"
                  >
                    Bağlantıyı Kes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-lg font-semibold">Son Bildirimler</h2>
            </div>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
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
      
      <AddTrackingModal
        open={isTrackingModalOpen}
        onOpenChange={setIsTrackingModalOpen}
        onSubmit={handleAddTracking}
      />
    </div>
  );
};

export default Dashboard;

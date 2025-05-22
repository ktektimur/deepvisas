
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Settings, 
  Bell, 
  Plus, 
  Users,
  Globe,
  CheckCircle,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useLanguage();
  const [telegramConnected, setTelegramConnected] = useState(false);

  const trackedVisas = [
    {
      id: 1,
      country: 'United States',
      city: 'Ankara',
      visaType: 'Tourist B1/B2',
      status: 'available',
      lastCheck: '2 minutes ago',
      nextDate: '2024-01-15'
    },
    {
      id: 2,
      country: 'Germany',
      city: 'Istanbul',
      visaType: 'Schengen',
      status: 'full',
      lastCheck: '5 minutes ago',
      nextDate: '2024-01-25'
    },
    {
      id: 3,
      country: 'United Kingdom',
      city: 'Izmir',
      visaType: 'Standard Visitor',
      status: 'available',
      lastCheck: '1 minute ago',
      nextDate: '2024-01-20'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      message: 'New slots available in Ankara for US Tourist visa',
      time: '5 minutes ago',
      type: 'success'
    },
    {
      id: 2,
      message: 'Slots filled up in Istanbul for Schengen visa',
      time: '1 hour ago',
      type: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-inter">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DeepVisas</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/50 backdrop-blur-sm min-h-screen border-r border-blue-100">
          <div className="p-6">
            <nav className="space-y-2">
              <Button variant="default" className="w-full justify-start">
                <Home className="w-4 h-4 mr-2" />
                {t('nav.home')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                {t('dashboard.myVisas')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                {t('dashboard.notifications')}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                {t('dashboard.settings')}
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's your visa tracking overview.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Tracked Countries</p>
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
                      <p className="text-green-100">Available Slots</p>
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
                      <p className="text-orange-100">Notifications</p>
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
                      <p className="text-purple-100">Success Rate</p>
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{t('dashboard.myVisas')}</CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      {t('dashboard.addTracking')}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackedVisas.map((visa) => (
                        <div key={visa.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{visa.country}</h3>
                              <p className="text-sm text-gray-600">{visa.city} - {visa.visaType}</p>
                            </div>
                            <Badge
                              variant={visa.status === 'available' ? 'default' : 'secondary'}
                              className={
                                visa.status === 'available'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : 'bg-red-100 text-red-800 hover:bg-red-100'
                              }
                            >
                              {visa.status === 'available' ? t('visa.available') : t('visa.full')}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Last check: {visa.lastCheck}</span>
                            <span>Next date: {visa.nextDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Telegram Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('dashboard.telegramStatus')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${telegramConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm">
                          {telegramConnected ? t('dashboard.connected') : t('dashboard.notConnected')}
                        </span>
                      </div>
                    </div>
                    {!telegramConnected && (
                      <Button 
                        className="w-full" 
                        onClick={() => setTelegramConnected(true)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {t('dashboard.connect')}
                      </Button>
                    )}
                    {telegramConnected && (
                      <div className="text-center">
                        <p className="text-sm text-green-600 mb-2">✓ Connected as @username</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setTelegramConnected(false)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('dashboard.notifications')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentNotifications.map((notification) => (
                        <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

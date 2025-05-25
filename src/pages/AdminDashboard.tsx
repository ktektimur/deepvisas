import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Settings, 
  Bell, 
  BarChart3,
  Search,
  Edit,
  Trash2,
  Send,
  Eye,
  UserCheck,
  UserX
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Ahmed Yılmaz',
      email: 'ahmed.yilmaz@email.com',
      telegramUsername: '@ahmedyil',
      status: 'active',
      lastLogin: '2024-01-10 14:30',
      trackedCountries: ['USA', 'Germany'],
      joinDate: '2023-12-01'
    },
    {
      id: 2,
      name: 'Fatma Demir',
      email: 'fatma.demir@email.com',
      telegramUsername: '@fatmademir',
      status: 'active',
      lastLogin: '2024-01-10 09:15',
      trackedCountries: ['UK', 'Canada'],
      joinDate: '2023-11-15'
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@email.com',
      telegramUsername: '@johnsmith',
      status: 'suspended',
      lastLogin: '2024-01-08 16:45',
      trackedCountries: ['USA'],
      joinDate: '2023-10-20'
    }
  ];

  const slotLogs = [
    {
      id: 1,
      city: 'Ankara',
      country: 'USA',
      visaType: 'Tourist B1/B2',
      slotsAvailable: 12,
      timestamp: '2024-01-10 15:30',
      status: 'available'
    },
    {
      id: 2,
      city: 'Istanbul',
      country: 'Germany',
      visaType: 'Schengen',
      slotsAvailable: 0,
      timestamp: '2024-01-10 15:25',
      status: 'full'
    },
    {
      id: 3,
      city: 'Izmir',
      country: 'UK',
      visaType: 'Standard Visitor',
      slotsAvailable: 8,
      timestamp: '2024-01-10 15:20',
      status: 'available'
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telegramUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <span className="text-xl font-bold text-gray-900">DeepVisas {t('admin.panel')}</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                <Settings className="w-3 h-3 mr-1" />
                {t('admin.panel')}
              </Badge>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  {t('nav.dashboard')}
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
              <Button 
                variant={activeTab === 'users' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('users')}
              >
                <Users className="w-4 h-4 mr-2" />
                {t('admin.users')}
              </Button>
              <Button 
                variant={activeTab === 'slots' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('slots')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {t('admin.slots')}
              </Button>
              <Button 
                variant={activeTab === 'broadcast' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('broadcast')}
              >
                <Send className="w-4 h-4 mr-2" />
                {t('admin.broadcast')}
              </Button>
              <Button 
                variant={activeTab === 'analytics' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {t('admin.analytics')}
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
                {t('admin.title')}
              </h1>
              <p className="text-gray-600">
                {t('admin.userManagement')}, {t('admin.slotManagement')}, ve sistem bildirimlerini yönetin.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">{t('admin.totalUsers')}</p>
                      <p className="text-2xl font-bold">2,847</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">{t('admin.activeSessions')}</p>
                      <p className="text-2xl font-bold">1,203</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">{t('admin.messagesSent')}</p>
                      <p className="text-2xl font-bold">15,624</p>
                    </div>
                    <Send className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">{t('admin.successRate')}</p>
                      <p className="text-2xl font-bold">97.2%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'users' && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{t('admin.userManagement')}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder={t('admin.searchUsers')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.user')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.telegram')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.status')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.trackedCountries')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.lastLogin')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-blue-600">{user.telegramUsername}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                variant={user.status === 'active' ? 'default' : 'secondary'}
                                className={
                                  user.status === 'active'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-wrap gap-1">
                                {user.trackedCountries.map((country, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {country}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">{user.lastLogin}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <UserX className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'slots' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.slotManagement')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.location')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.visaType')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.availableSlots')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.status')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.lastUpdated')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slotLogs.map((slot) => (
                          <tr key={slot.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{slot.city}</p>
                                <p className="text-sm text-gray-600">{slot.country}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-900">{slot.visaType}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-medium text-gray-900">{slot.slotsAvailable}</span>
                            </td>
                            <td className="py-4 px-4">
                              <Badge
                                variant={slot.status === 'available' ? 'default' : 'secondary'}
                                className={
                                  slot.status === 'available'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                                }
                              >
                                {slot.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">{slot.timestamp}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'broadcast' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('admin.broadcastSystem')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('admin.messageContent')}
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder={t('admin.messageContent')}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('admin.targetAudience')}
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>{t('admin.totalUsers')}</option>
                          <option>Premium Users Only</option>
                          <option>Users with Telegram Connected</option>
                          <option>Specific Country Trackers</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('admin.sendMethod')}
                        </label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Telegram Only</option>
                          <option>Email Only</option>
                          <option>Both Telegram & Email</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">
                        {t('admin.previewMessage')}
                      </Button>
                      <Button>
                        <Send className="w-4 h-4 mr-2" />
                        {t('admin.sendBroadcast')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.userGrowth')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - User registration trends
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.notificationSuccessRate')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Message delivery rates
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.popularCountries')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Most tracked countries
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admin.systemPerformance')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - API response times
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

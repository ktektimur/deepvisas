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
  UserX,
  Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  telegramUsername: string;
  status: 'active' | 'suspended';
  lastLogin: string;
  trackedCountries: string[];
  joinDate: string;
}

interface SlotLog {
  id: number;
  city: string;
  country: string;
  visaType: string;
  slotsAvailable: number;
  timestamp: string;
  status: 'available' | 'full';
}

enum AdminTab {
  USERS = 'users',
  SLOTS = 'slots',
  BROADCAST = 'broadcast',
  ANALYTICS = 'analytics'
}

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data
  const users: User[] = [
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
    // ... other users
  ];

  const slotLogs: SlotLog[] = [
    {
      id: 1,
      city: 'Ankara',
      country: 'USA',
      visaType: 'Tourist B1/B2',
      slotsAvailable: 12,
      timestamp: '2024-01-10 15:30',
      status: 'available'
    },
    // ... other slot logs
  ];

  // Tab configuration
  const tabs = [
    { id: AdminTab.USERS, icon: Users, label: t('admin.users') },
    { id: AdminTab.SLOTS, icon: BarChart3, label: t('admin.slots') },
    { id: AdminTab.BROADCAST, icon: Send, label: t('admin.broadcast') },
    { id: AdminTab.ANALYTICS, icon: BarChart3, label: t('admin.analytics') }
  ];

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telegramUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => (
    <Badge
      variant={status === 'active' || status === 'available' ? 'default' : 'secondary'}
      className={
        status === 'active' || status === 'available'
          ? 'bg-green-100 text-green-800 hover:bg-green-100'
          : 'bg-red-100 text-red-800 hover:bg-red-100'
      }
    >
      {status}
    </Badge>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-inter">
      {/* Mobile Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 lg:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">DeepVisas {t('admin.panel')}</span>
          </Link>
          <div className="w-5 h-5" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Desktop Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 hidden lg:block">
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
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/20" 
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-72 bg-white min-h-screen border-r border-blue-100 z-50">
              <div className="p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="w-64 bg-white/50 backdrop-blur-sm min-h-screen border-r border-blue-100 hidden lg:block">
          <div className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                {t('admin.userManagement')}, {t('admin.slotManagement')}, ve sistem bildirimlerini yönetin.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs lg:text-sm">{t('admin.totalUsers')}</p>
                      <p className="text-xl lg:text-2xl font-bold">2,847</p>
                    </div>
                    <Users className="w-6 h-6 lg:w-8 lg:h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Other stat cards... */}
            </div>

            {/* Content based on active tab */}
            {activeTab === AdminTab.USERS && (
              <Card>
                <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <CardTitle className="text-lg lg:text-xl">{t('admin.userManagement')}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative w-full lg:w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder={t('admin.searchUsers')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.user')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.telegram')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.status')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.trackedCountries')}</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">{t('admin.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs lg:text-sm text-gray-600">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-blue-600">{user.telegramUsername}</span>
                            </td>
                            <td className="py-3 px-4">
                              <StatusBadge status={user.status} />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {user.trackedCountries.map((country, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {country}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" title={t('admin.view')}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" title={t('admin.edit')}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  title={user.status === 'active' ? t('admin.suspend') : t('admin.activate')}
                                >
                                  {user.status === 'active' ? (
                                    <UserX className="w-4 h-4" />
                                  ) : (
                                    <UserCheck className="w-4 h-4" />
                                  )}
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

            {/* Other tabs content... */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
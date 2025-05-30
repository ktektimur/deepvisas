
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Bell,
  Globe,
  BarChart3,
  Users,
  LogOut,
  User,
  Menu,
  X,
  CreditCard,
  Shield
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active route check
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Sidebar navigation handler
  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  // User menu items
  const navItems = [
    { id: 'home', icon: Home, label: 'Anasayfa', path: '/dashboard' },
    { id: 'visas', icon: Globe, label: 'Takip Edilen Vizeler', path: '/dashboard/visas' },
    { id: 'pricing', icon: CreditCard, label: 'Fiyatlandırma', path: '/pricing' },
    { id: 'notifications', icon: Bell, label: 'Bildirimler', path: '/dashboard/notifications' },
    { id: 'analytics', icon: BarChart3, label: 'Analitik', path: '/dashboard/analytics' },
    { id: 'profile', icon: User, label: 'Profil', path: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: 'Ayarlar', path: '/dashboard/settings' }
  ];

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-3 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Menüyü aç/kapat"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DV</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DeepVisas</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hidden sm:inline-flex">
                Aktif
              </Badge>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:block">
                  <Button variant="outline" size="sm">
                    Yönetici Paneli
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static z-30 w-64 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm border-r border-blue-100 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={isRouteActive(item.path) ? "default" : "ghost"} 
                  className={`w-full justify-start ${
                    isRouteActive(item.path) 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
              
              {/* Logout Button */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Çıkış Yap
                </Button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

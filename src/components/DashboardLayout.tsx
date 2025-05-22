
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
  LogOut
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation handler for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Define navigation items
  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home'), path: '/dashboard' },
    { id: 'visas', icon: Globe, label: t('dashboard.trackedVisas'), path: '/dashboard/visas' },
    { id: 'notifications', icon: Bell, label: t('dashboard.notifications'), path: '/dashboard/notifications' },
    { id: 'analytics', icon: BarChart3, label: t('dashboard.analytics'), path: '/dashboard/analytics' },
    { id: 'settings', icon: Settings, label: t('dashboard.settings'), path: '/dashboard/settings' }
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
              {navItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={isRouteActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              
              {/* Logout Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DarkModeToggle from '@/components/DarkModeToggle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Bell, 
  Globe,
  BarChart3,
  Users,
  LogOut,
  User
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
    { id: 'profile', icon: User, label: t('profile.title'), path: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: t('dashboard.settings'), path: '/dashboard/settings' }
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white font-inter transition-colors duration-200">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">DeepVisas</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200">
                Active
              </Badge>
              <Link to="/admin">
                <Button variant="outline" size="sm" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm min-h-screen border-r border-blue-100 dark:border-gray-700 transition-colors duration-200">
          <div className="p-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={isRouteActive(item.path) ? "default" : "ghost"} 
                  className={`w-full justify-start ${
                    isRouteActive(item.path) 
                      ? "bg-primary text-white dark:text-white" 
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              
              {/* Logout Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/50 transition-colors duration-200"
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

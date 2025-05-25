
import React, { useState } from 'react';
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
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation handler for sidebar items
  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Define navigation items
  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home'), path: '/dashboard' },
    { id: 'visas', icon: Globe, label: t('dashboard.trackedVisas'), path: '/dashboard/visas' },
    { id: 'pricing', icon: CreditCard, label: t('nav.pricing') || 'Pricing', path: '/pricing' },
    { id: 'notifications', icon: Bell, label: t('dashboard.notifications'), path: '/dashboard/notifications' },
    { id: 'analytics', icon: BarChart3, label: t('dashboard.analytics'), path: '/dashboard/analytics' },
    { id: 'profile', icon: User, label: t('profile.title'), path: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: t('dashboard.settings'), path: '/dashboard/settings' }
  ];

  // Admin navigation items
  const adminNavItems = [
    { id: 'admin-dashboard', icon: Shield, label: 'Admin Panel', path: '/admin' },
    { id: 'admin-users', icon: Users, label: 'User Management', path: '/admin/users' },
    { id: 'admin-pricing', icon: CreditCard, label: 'Pricing Management', path: '/admin/pricing' },
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-inter">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 p-2 rounded-md text-gray-700 hover:bg-gray-100" 
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DV</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DeepVisas</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-100">
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile (off-canvas) */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-40 w-64 h-screen bg-white/50 backdrop-blur-sm border-r border-blue-100 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6">
            <nav className="space-y-2">
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
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              
              {/* Admin Section */}
              {isAdmin && (
                <>
                  <div className="my-4 border-t border-gray-200"></div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Admin
                  </div>
                  {adminNavItems.map((item) => (
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
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </>
              )}
              
              {/* Logout Button */}
              <div className="mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:ml-0 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

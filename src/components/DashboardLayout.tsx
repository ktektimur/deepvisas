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

  // Aktif route kontrolü (alt path'leri de kapsayacak şekilde)
  const isRouteActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Sidebar navigasyon handler
  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Genel kullanıcı menü öğeleri
  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home'), path: '/dashboard' },
    { id: 'visas', icon: Globe, label: t('dashboard.trackedVisas'), path: '/dashboard/visas' },
    { id: 'pricing', icon: CreditCard, label: t('nav.pricing'), path: '/pricing' },
    { id: 'notifications', icon: Bell, label: t('dashboard.notifications'), path: '/dashboard/notifications' },
    { id: 'analytics', icon: BarChart3, label: t('dashboard.analytics'), path: '/dashboard/analytics' },
    { id: 'profile', icon: User, label: t('profile.title'), path: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: t('dashboard.settings'), path: '/dashboard/settings' }
  ];

  // Yönetici paneli menü öğeleri
  const adminNavItems = [
    { id: 'admin-dashboard', icon: Shield, label: t('admin.panel'), path: '/admin' },
    { id: 'admin-users', icon: Users, label: t('admin.users'), path: '/admin/users' },
    { id: 'admin-pricing', icon: CreditCard, label: t('admin.pricing'), path: '/admin/pricing' },
    { id: 'admin-visa-submissions', icon: Globe, label: t('admin.visaSubmissions'), path: '/admin/visa-submissions' },
  ];

  // Çıkış yap
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Sidebar toggle
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
                aria-label={sidebarOpen ? t('nav.closeMenu') : t('nav.openMenu')}
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
                {t('admin.active')}
              </Badge>
              {isAdmin && (
                <Link to="/admin" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-100">
                    {t('admin.panel')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobil (off-canvas) */}
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
                  aria-current={isRouteActive(item.path) ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              
              {/* Admin Bölümü */}
              {isAdmin && (
                <>
                  <div className="my-4 border-t border-gray-200"></div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t('admin.panel')}
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
                      aria-current={isRouteActive(item.path) ? 'page' : undefined}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </>
              )}
              
              {/* Çıkış Butonu */}
              <div className="mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobil sidebar için backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Ana içerik */}
        <main className="flex-1 p-4 sm:p-6 md:ml-0 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

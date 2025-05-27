
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Bell,
  Users,
  LogOut,
  User,
  Menu,
  X,
  CreditCard,
  Shield,
  BarChart3,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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

  // Admin menu items
  const adminNavItems = [
    { id: 'admin-dashboard', icon: Shield, label: 'Yönetici Paneli', path: '/admin' },
    { id: 'admin-users', icon: Users, label: 'Kullanıcı Yönetimi', path: '/admin/users' },
    { id: 'admin-pricing', icon: CreditCard, label: 'Fiyat Yönetimi', path: '/admin/pricing' },
    { id: 'admin-visa-submissions', icon: Globe, label: 'Vize Başvuruları', path: '/admin/visa-submissions' },
    { id: 'admin-analytics', icon: BarChart3, label: 'Analitik', path: '/admin/analytics' },
  ];

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100 sticky top-0 z-40">
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
              <Link to="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DV</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DeepVisas Admin</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hidden sm:inline-flex">
                Yönetici
              </Badge>
              <Link to="/dashboard" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  Kullanıcı Paneli
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static z-30 w-64 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm border-r border-red-100 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-6">
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={isRouteActive(item.path) ? "default" : "ghost"} 
                  className={`w-full justify-start ${
                    isRouteActive(item.path) 
                      ? "bg-red-600 text-white" 
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

export default AdminLayout;

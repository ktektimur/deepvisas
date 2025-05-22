
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LogIn, UserPlus } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white font-inter transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">DeepVisas</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.features')}
              </a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.howItWorks')}
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                {t('nav.contact')}
              </a>
            </div>

            {/* Right side - Language toggle, dark mode toggle, and auth buttons */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
              
              {/* Language Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    language === 'en'
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    language === 'tr'
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  TR
                </button>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {user?.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        {language === 'tr' ? 'Admin Panel' : 'Admin Panel'}
                      </Button>
                    </Link>
                  )}
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      {language === 'tr' ? 'Panel' : 'Dashboard'}
                    </Button>
                  </Link>
                  <Button size="sm" onClick={logout} variant="ghost">
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === 'tr' ? 'Çıkış' : 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      <LogIn className="w-4 h-4 mr-2" />
                      {language === 'tr' ? 'Giriş' : 'Login'}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      {language === 'tr' ? 'Kaydol' : 'Register'}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;

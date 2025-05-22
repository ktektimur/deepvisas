
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-inter">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DeepVisas</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
                {t('nav.features')}
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">
                {t('nav.howItWorks')}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">
                {t('nav.contact')}
              </a>
            </div>

            {/* Right side - Language toggle and auth buttons */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    language === 'en'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    language === 'tr'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TR
                </button>
              </div>

              {isHomePage && (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="sm">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </>
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

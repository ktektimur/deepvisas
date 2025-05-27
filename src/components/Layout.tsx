
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-inter transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 transition-colors">DeepVisas</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                Anasayfa
              </Link>
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">
                Özellikler
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">
                Nasıl Çalışır
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">
                İletişim
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="p-1">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </Button>
            </div>

            {/* Right side - Auth buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {user?.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        Yönetici Paneli
                      </Button>
                    </Link>
                  )}
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      Panel
                    </Button>
                  </Link>
                  <Button size="sm" onClick={logout} variant="ghost">
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      <LogIn className="w-4 h-4 mr-2" />
                      Giriş
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Kaydol
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu - collapsed by default */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 py-4 px-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Anasayfa
              </Link>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-primary transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Özellikler
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-700 hover:text-primary transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Nasıl Çalışır
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-primary transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                İletişim
              </a>
            </div>

            {/* Auth buttons - Mobile */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={toggleMobileMenu}>
                    <Button variant="outline" size="sm" className="w-full justify-center">
                      Yönetici Paneli
                    </Button>
                  </Link>
                )}
                <Link to="/dashboard" onClick={toggleMobileMenu}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Panel
                  </Button>
                </Link>
                <Button size="sm" onClick={logout} variant="ghost" className="w-full justify-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Giriş
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMobileMenu}>
                  <Button size="sm" className="w-full justify-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Kaydol
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;

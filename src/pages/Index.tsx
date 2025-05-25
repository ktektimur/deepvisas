import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VisaCard from '@/components/VisaCard';
import Layout from '@/components/Layout';
import { Globe, Bell, Users, Shield, CheckCircle, Star, ArrowDown, Clock, Zap, Target, Award, Rocket, User, Calculator, Lock, Menu, X } from 'lucide-react';
import { VisaApplication } from '@/types/visa';

const Index = () => {
  const { t, language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync language changes between contexts
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  // Updated visa data for foreign countries from Turkish cities
  const visaData: VisaApplication[] = [
    {
      id: '1',
      city: 'Ankara',
      country: 'Netherlands',
      flag: '🇳🇱',
      date: '2024-12-15',
      applicationDate: '2024-12-15',
      status: 'available',
      slots: 12,
    },
    {
      id: '2',
      city: 'Istanbul',
      country: 'France',
      flag: '🇫🇷',
      date: '2024-01-20',
      applicationDate: '2024-01-20',
      status: 'full',
      nextAvailable: '2024-01-20',
    },
    {
      id: '3',
      city: 'Istanbul',
      country: 'Germany',
      flag: '🇩🇪',
      date: '2024-12-28',
      applicationDate: '2024-12-28',
      status: 'available',
      slots: 5,
    },
    {
      id: '4',
      city: 'Ankara',
      country: 'Spain',
      flag: '🇪🇸',
      date: '2025-02-10',
      applicationDate: '2025-02-10',
      status: 'full',
      nextAvailable: '2025-02-10',
    },
    {
      id: '5',
      city: 'Istanbul',
      country: 'Italy',
      flag: '🇮🇹',
      date: '2025-01-05',
      applicationDate: '2025-01-05',
      status: 'available',
      slots: 8,
    },
    {
      id: '6',
      city: 'Ankara',
      country: 'UK',
      flag: '🇬🇧',
      date: '2025-03-15',
      applicationDate: '2025-03-15',
      status: 'full',
      nextAvailable: '2025-03-15',
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('realTimeUpdates'),
      description: t('realTimeUpdatesDesc'),
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('multiCityTracking'),
      description: t('multiCityTrackingDesc'),
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: t('telegramIntegration'),
      description: t('telegramIntegrationDesc'),
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: t('secureReliable'),
      description: t('secureReliableDesc'),
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
  ];

  const steps = [
    {
      number: "1",
      icon: <User className="w-10 h-10" />,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      number: "2", 
      icon: <Users className="w-10 h-10" />,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: "bg-gradient-to-r from-teal-500 to-teal-600"
    },
    {
      number: "3",
      icon: <Zap className="w-10 h-10" />,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: language === 'en' ? 'Ahmed Al-Rashid' : 'Ahmet Yılmaz',
      comment: {
        en: "Thanks to DeepVisas, I got my Germany visa appointment in just 2 days! The Telegram notifications are instant and accurate.",
        tr: "DeepVisas sayesinde Almanya vize randevumu sadece 2 günde aldım! Telegram bildirimleri anında ve doğru."
      },
      rating: 5,
      flag: '🇩🇪',
      title: language === 'en' ? 'Software Engineer' : 'Yazılım Mühendisi'
    },
    {
      name: language === 'en' ? 'Maria Rodriguez' : 'Merve Özkan',
      comment: {
        en: "I was checking embassy websites manually for months. DeepVisas saved me so much time and stress!",
        tr: "Aylarca elçilik sitelerini manuel kontrol ediyordum. DeepVisas bana çok zaman ve stres kazandırdı!"
      },
      rating: 5,
      flag: '🇪🇸',
      title: language === 'en' ? 'Marketing Manager' : 'Pazarlama Müdürü'
    },
    {
      name: language === 'en' ? 'Sarah Johnson' : 'Selin Yılmaz',
      comment: {
        en: "The real-time tracking feature is amazing. I got notified within minutes when UK visa slots opened up in Istanbul.",
        tr: "Telegram bildirimleri anında ve doğru. Haftalarca bekledikten sonra nihayet Almanya vizemi aldım."
      },
      rating: 5,
      flag: '🇬🇧',
      title: language === 'en' ? 'Business Analyst' : 'İş Analisti'
    }
  ];

  const stats = [
    { number: "50+", label: t('citiesTracked'), icon: <Globe className="w-6 h-6" /> },
    { number: "10K+", label: t('activeUsers'), icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: t('uptime'), icon: <Award className="w-6 h-6" /> },
    { number: "Live", label: t('liveTracking'), icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DeepVisas</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">{t('home')}</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">{t('features')}</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">{t('howItWorks')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t('contact')}</a>
            </div>

            {/* Language Switcher & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'tr' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TR
                </button>
              </div>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700">
                  {t('userLogin')}
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  {t('panel')}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">{t('home')}</a>
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">{t('features')}</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">{t('howItWorks')}</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">{t('contact')}</a>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-2 py-1 rounded text-sm ${language === 'en' ? 'bg-white text-blue-600' : 'text-gray-600'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage('tr')}
                      className={`px-2 py-1 rounded text-sm ${language === 'tr' ? 'bg-white text-blue-600' : 'text-gray-600'}`}
                    >
                      TR
                    </button>
                  </div>
                </div>
                <div className="px-3 py-2 space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="outline" size="sm" className="w-full">{t('userLogin')}</Button>
                  </Link>
                  <Link to="/dashboard" className="block">
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-teal-600">{t('panel')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4 mr-2" />
                  {t('realTimeTracking')}
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('title').split(' ').slice(0, 4).join(' ')}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {t('title').split(' ').slice(4).join('')}
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                {t('description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    {t('startTracking')}
                  </Button>
                </Link>
                <a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-300">
                    {t('joinTelegram')}
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Mock Interface */}
            <div className="lg:pl-12">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{t('liveTracking')}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">{t('online')}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🇳🇱</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Netherlands - Ankara</div>
                        <div className="text-xs text-gray-600">Dec 15, 2024</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {t('available')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🇫🇷</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">France - Istanbul</div>
                        <div className="text-xs text-gray-600">{t('nextAvailable')} Jan 20, 2025</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {t('full')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Visa Availability Section */}
      <section id="visa-availability" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('liveVisaAvailability')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('liveVisaDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaData.map((visa) => (
              <div key={visa.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{visa.flag}</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-base">{visa.country} - {visa.city}</div>
                      <div className="text-sm text-gray-500 mt-1">{visa.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {visa.status === 'available' ? (
                      <div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {t('available')}
                        </span>
                        <div className="text-sm text-green-600 mt-2">🟢 {visa.slots} {t('slots')}</div>
                      </div>
                    ) : (
                      <div>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          {t('full')}
                        </span>
                        <div className="text-sm text-gray-500 mt-2">{t('nextAvailable')} {visa.nextAvailable}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('howItWorksDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: 'calc(100% - 2rem)' }}></div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white`}>
                    {step.icon}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-100">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('whyChoose')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('whyChooseDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg transform hover:-translate-y-2 bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('testimonialsDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg transform hover:-translate-y-2 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.comment[language as 'en' | 'tr']}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">
                      {testimonial.flag}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{testimonial.name}</span>
                        <span className="text-lg">{testimonial.title}</span>
                      </div>
                      <p className="text-gray-600 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          
          <Link to="/dashboard">
            <Button size="lg" className="px-12 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-2xl transition-all duration-300 transform hover:scale-105">
              {t('getStartedNow')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DV</span>
                </div>
                <span className="text-xl font-bold">DeepVisas</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                {t('footerDesc')}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-6 text-lg">{t('quickLinks')}</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('dashboard')}</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">{t('features')}</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">{t('howItWorks')}</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">{t('privacyPolicy')}</Link></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">{t('termsOfUse')}</Link></li>
              </ul>
            </div>
            
            {/* Contact & Support */}
            <div>
              <h3 className="font-bold mb-6 text-lg">{t('contactSupport')}</h3>
              <ul className="space-y-3 text-gray-300">
                <li><span className="hover:text-white transition-colors">📧 support@deepvisas.com</span></li>
                <li><span className="hover:text-white transition-colors">📞 +90 (555) 123-4567</span></li>
                <li><a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💬 Telegram Channel</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">❓ {t('helpCenter')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 DeepVisas. {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

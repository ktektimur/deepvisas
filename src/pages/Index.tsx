
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VisaCard from '@/components/VisaCard';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Bell, 
  Users, 
  Shield, 
  CheckCircle, 
  Star,
  ArrowDown 
} from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  const visaData = [
    {
      city: 'Ankara',
      country: 'Turkey',
      flag: '🇹🇷',
      date: '2024-01-15',
      status: 'available' as const,
      slots: 12,
    },
    {
      city: 'Istanbul',
      country: 'Turkey',
      flag: '🇹🇷',
      date: '2024-01-18',
      status: 'full' as const,
      nextAvailable: '2024-01-25',
    },
    {
      city: 'Izmir',
      country: 'Turkey',
      flag: '🇹🇷',
      date: '2024-01-20',
      status: 'available' as const,
      slots: 8,
    },
    {
      city: 'Bursa',
      country: 'Turkey',
      flag: '🇹🇷',
      date: '2024-01-22',
      status: 'available' as const,
      slots: 5,
    },
    {
      city: 'Gaziantep',
      country: 'Turkey',
      flag: '🇹🇷',
      date: '2024-01-28',
      status: 'full' as const,
      nextAvailable: '2024-02-05',
    },
  ];

  const features = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: t('features.realTime'),
      description: t('features.realTimeDesc'),
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('features.multiCity'),
      description: t('features.multiCityDesc'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.telegram'),
      description: t('features.telegramDesc'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('features.secure'),
      description: t('features.secureDesc'),
    },
  ];

  const testimonials = [
    {
      name: "Ahmed K.",
      comment: "Got my visa appointment within 2 days thanks to DeepVisas notifications!",
      rating: 5,
    },
    {
      name: "Fatma S.",
      comment: "The Telegram bot is incredibly fast. Never missed an opportunity again.",
      rating: 5,
    },
    {
      name: "John D.",
      comment: "Clean interface and reliable service. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                🚀 Real-time Tracking Available
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl text-blue-600 font-medium mb-4">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="px-8 py-3 text-lg">
                  {t('hero.cta')}
                </Button>
              </Link>
              <a href="https://t.me/VisaBotTracker" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Join Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Real-time Visa Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Live Visa Availability
            </h2>
            <p className="text-lg text-gray-600">
              Real-time updates from Turkish consulates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {visaData.map((visa, index) => (
              <VisaCard key={index} {...visa} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Sign Up & Choose Cities</h3>
              <p className="text-gray-600">Create your account and select which cities you want to track</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Connect Telegram</h3>
              <p className="text-gray-600">Link your Telegram account for instant notifications</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Notified</h3>
              <p className="text-gray-600">Receive real-time alerts when slots become available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Badges */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted & Secure
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="font-medium">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span className="font-medium">10,000+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DV</span>
                </div>
                <span className="text-xl font-bold">DeepVisas</span>
              </div>
              <p className="text-gray-400 mb-4">
                Track visa appointments in real-time. Never miss a slot.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://t.me/VisaBotTracker" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  {t('footer.telegram')}
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 DeepVisas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;

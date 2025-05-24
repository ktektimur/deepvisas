
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
  ArrowDown,
  Clock,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { VisaApplication } from '@/types/visa';

const Index = () => {
  const { t } = useLanguage();

  // Updated visa data for foreign countries from Turkish cities
  const visaData: VisaApplication[] = [
    {
      id: '1',
      city: 'Ankara',
      country: 'Netherlands',
      flag: '🇳🇱',
      date: '2024-06-10',
      applicationDate: '2024-06-10',
      status: 'available',
      slots: 12,
    },
    {
      id: '2',
      city: 'Istanbul',
      country: 'France',
      flag: '🇫🇷',
      date: '2024-06-15',
      applicationDate: '2024-06-15',
      status: 'full',
      nextAvailable: '2024-06-28',
    },
    {
      id: '3',
      city: 'Izmir',
      country: 'Belgium',
      flag: '🇧🇪',
      date: '2024-06-05',
      applicationDate: '2024-06-05',
      status: 'available',
      slots: 5,
    },
    {
      id: '4',
      city: 'Antalya',
      country: 'Sweden',
      flag: '🇸🇪',
      date: '2024-05-30',
      applicationDate: '2024-05-30',
      status: 'available',
      slots: 8,
    },
    {
      id: '5',
      city: 'Gaziantep',
      country: 'Norway',
      flag: '🇳🇴',
      date: '2024-06-10',
      applicationDate: '2024-06-10',
      status: 'full',
      nextAvailable: '2024-06-25',
    },
    {
      id: '6',
      city: 'Bursa',
      country: 'Finland',
      flag: '🇫🇮',
      date: '2024-06-12',
      applicationDate: '2024-06-12',
      status: 'available',
      slots: 3,
    },
    {
      id: '7',
      city: 'Istanbul',
      country: 'Ireland',
      flag: '🇮🇪',
      date: '2024-07-03',
      applicationDate: '2024-07-03',
      status: 'full',
      nextAvailable: '2024-07-15',
    },
    {
      id: '8',
      city: 'Ankara',
      country: 'Estonia',
      flag: '🇪🇪',
      date: '2024-06-08',
      applicationDate: '2024-06-08',
      status: 'available',
      slots: 6,
    },
    {
      id: '9',
      city: 'Izmir',
      country: 'Croatia',
      flag: '🇭🇷',
      date: '2024-06-20',
      applicationDate: '2024-06-20',
      status: 'available',
      slots: 4,
    },
    {
      id: '10',
      city: 'Antalya',
      country: 'Luxembourg',
      flag: '🇱🇺',
      date: '2024-06-18',
      applicationDate: '2024-06-18',
      status: 'full',
      nextAvailable: '2024-07-10',
    },
    {
      id: '11',
      city: 'Bursa',
      country: 'Lithuania',
      flag: '🇱🇹',
      date: '2024-06-22',
      applicationDate: '2024-06-22',
      status: 'available',
      slots: 7,
    },
    {
      id: '12',
      city: 'Gaziantep',
      country: 'Slovenia',
      flag: '🇸🇮',
      date: '2024-06-30',
      applicationDate: '2024-06-30',
      status: 'full',
      nextAvailable: '2024-07-20',
    },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.realTime'),
      description: t('features.realTimeDesc'),
      color: 'bg-blue-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('features.multiCity'),
      description: t('features.multiCityDesc'),
      color: 'bg-teal-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.telegram'),
      description: t('features.telegramDesc'),
      color: 'bg-indigo-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.secure'),
      description: t('features.secureDesc'),
      color: 'bg-green-500',
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <Target className="w-10 h-10" />,
      title: "Sign Up & Choose Cities",
      description: "Create your account and select which embassy cities you want to track for visa appointments.",
      color: "bg-blue-500"
    },
    {
      number: "02", 
      icon: <Users className="w-10 h-10" />,
      title: "Connect Telegram",
      description: "Link your Telegram account to receive instant notifications when slots become available.",
      color: "bg-teal-500"
    },
    {
      number: "03",
      icon: <Bell className="w-10 h-10" />,
      title: "Get Real-Time Alerts",
      description: "Receive immediate notifications the moment visa appointment slots open up in your selected cities.",
      color: "bg-indigo-500"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed K.",
      location: "Istanbul",
      comment: "Got my Netherlands visa appointment within 2 days thanks to DeepVisas notifications! The Telegram alerts are lightning fast.",
      rating: 5,
      avatar: "AK",
      country: "🇳🇱"
    },
    {
      name: "Fatma S.",
      location: "Ankara",
      comment: "The Telegram bot is incredibly fast and reliable. Never missed an opportunity again. Highly recommend for anyone tracking visa slots.",
      rating: 5,
      avatar: "FS",
      country: "🇫🇷"
    },
    {
      name: "John D.",
      location: "Izmir",
      comment: "Clean interface, reliable service, and excellent customer support. DeepVisas saved me months of manual checking!",
      rating: 5,
      avatar: "JD",
      country: "🇸🇪"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "25+", label: "Cities Tracked", icon: <Globe className="w-6 h-6" /> },
    { number: "50,000+", label: "Slots Found", icon: <Target className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Award className="w-6 h-6" /> },
  ];

  return (
    <Layout>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white border-0 px-6 py-2 text-sm font-medium">
              🚀 Real-time Visa Tracking Available
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
            Track Visa Appointments
            <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              in Real-Time
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 font-medium mb-6 max-w-3xl mx-auto animate-fade-in">
            Get instant alerts when visa slots open in your preferred Turkish cities
          </p>
          
          <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto animate-fade-in">
            Never miss a visa appointment again with our advanced tracking system and instant Telegram notifications
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Link to="/dashboard">
              <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Start Tracking Now
              </Button>
            </Link>
            <a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-2 border-blue-300 text-blue-100 hover:bg-blue-800/30 hover:border-blue-200 backdrop-blur-sm transition-all duration-300">
                <Users className="w-5 h-5 mr-3" />
                Join Telegram
              </Button>
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-blue-300" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Visa Availability Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 px-4 py-2">
              🟢 Live Updates
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real-Time Visa Availability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor embassy consulates across Turkish cities with live appointment tracking
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visaData.map((visa) => (
              <VisaCard key={visa.id} visa={visa} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps and never miss a visa appointment again
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                
                <div className="relative z-10 text-center">
                  <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{step.icon}</div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-300">{step.number}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose DeepVisas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced features designed to give you the competitive edge in visa appointment tracking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who secured their visa appointments with DeepVisas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{testimonial.name}</span>
                        <span className="text-lg">{testimonial.country}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Never Miss a Visa Slot Again
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of users who successfully secured their visa appointments with real-time tracking and instant notifications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="px-12 py-4 text-lg bg-white text-blue-900 hover:bg-gray-100 shadow-2xl transition-all duration-300 transform hover:scale-105">
                Get Started Now
              </Button>
            </Link>
            <a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300">
                <Users className="w-5 h-5 mr-3" />
                Join Telegram Channel
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Security Badges Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted & Secure Platform
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="font-semibold text-gray-700 text-lg">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <span className="font-semibold text-gray-700 text-lg">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-indigo-600" />
              <span className="font-semibold text-gray-700 text-lg">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-teal-600" />
              <span className="font-semibold text-gray-700 text-lg">10,000+ Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DV</span>
                </div>
                <span className="text-2xl font-bold">DeepVisas</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                The most advanced visa appointment tracking platform. Get real-time notifications and never miss a slot again.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://t.me/schengenvizerandevulari" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-5 h-5 inline mr-2" />
                  Join Telegram
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors hover:underline">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors hover:underline">How it Works</a></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors hover:underline">Dashboard</Link></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover:underline">Contact</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-6">Legal & Support</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover:underline">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 DeepVisas. All rights reserved. Made with ❤️ for visa applicants worldwide.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;

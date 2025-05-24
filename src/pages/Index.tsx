
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
  Award,
  Rocket,
  User,
  Calculator,
  Lock,
  Menu,
  X
} from 'lucide-react';
import { VisaApplication } from '@/types/visa';

const Index = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
      title: 'Real-Time Updates',
      description: 'Get instant notifications the moment visa slots become available. 24/7 monitoring.',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Multi-City Tracking',
      description: 'Monitor multiple cities and embassies simultaneously across Turkey.',
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Telegram Integration',
      description: 'Seamless Telegram bot integration for instant mobile notifications.',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'GDPR compliant with SSL encryption and 99.9% uptime guarantee.',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
  ];

  const steps = [
    {
      number: "1",
      icon: <User className="w-10 h-10" />,
      title: "Sign Up & Choose Cities",
      description: "Create your account and select which embassy cities you want to monitor for visa appointments.",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      number: "2", 
      icon: <Users className="w-10 h-10" />,
      title: "Connect Telegram",
      description: "Link your Telegram account to receive instant notifications when slots become available.",
      color: "bg-gradient-to-r from-teal-500 to-teal-600"
    },
    {
      number: "3",
      icon: <Zap className="w-10 h-10" />,
      title: "Get Real-Time Alerts",
      description: "Receive immediate notifications the moment visa appointment slots open up in your selected cities.",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Software Engineer",
      location: "AY",
      comment: "DeepVisas saved me months of manual checking. Got my Netherlands visa appointment in just 2 days!",
      rating: 5,
      avatar: "AY",
      country: "🇳🇱"
    },
    {
      name: "Sarah Johnson",
      role: "Business Analyst",
      location: "SJ",
      comment: "The Telegram notifications are instant and accurate. Finally got my Germany visa after weeks of waiting.",
      rating: 5,
      avatar: "SJ",
      country: "🇩🇪"
    },
    {
      name: "Mehmet Özkan",
      role: "Student",
      location: "MÖ",
      comment: "Perfect for students like me. The interface is clean and the alerts work flawlessly. Highly recommended!",
      rating: 5,
      avatar: "MÖ",
      country: "🇪🇸"
    },
  ];

  const stats = [
    { number: "50+", label: "Cities Tracked", icon: <Globe className="w-6 h-6" /> },
    { number: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Award className="w-6 h-6" /> },
    { number: "Live", label: "Tracking: Online", icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
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
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
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
                  User Login
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  Panel
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
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
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
                    <Button variant="outline" size="sm" className="w-full">User Login</Button>
                  </Link>
                  <Link to="/dashboard" className="block">
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-teal-600">Panel</Button>
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
                  🚀 Real-time Visa Tracking Available
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Track Visa Appointments in{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Real-Time
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Get instant alerts when visa slots open in your preferred Turkish cities. Never miss an appointment again with our advanced monitoring system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Tracking
                  </Button>
                </Link>
                <a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-300">
                    Join Telegram
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
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Mock Interface */}
            <div className="lg:pl-12">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Live Tracking</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Online</span>
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
                      Available
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🇫🇷</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">France - Istanbul</div>
                        <div className="text-xs text-gray-600">Next: Jan 20, 2025</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Full
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
              Live Visa Availability
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time tracking across all major embassies in Turkey
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visaData.map((visa) => (
              <div key={visa.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{visa.flag}</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{visa.country} - {visa.city}</div>
                      <div className="text-xs text-gray-500">{visa.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {visa.status === 'available' ? (
                      <div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Available
                        </span>
                        <div className="text-xs text-green-600 mt-1">🟢 {visa.slots} slots</div>
                      </div>
                    ) : (
                      <div>
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Full
                        </span>
                        <div className="text-xs text-gray-500 mt-1">Next: {visa.nextAvailable}</div>
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
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in 3 simple steps
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
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white`}>
                    {step.icon}
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-4xl font-bold text-gray-100">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
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
              Why Choose DeepVisas?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced features that make visa tracking effortless
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
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users
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
                  
                  <p className="text-gray-700 mb-4 leading-relaxed italic text-sm">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{testimonial.name}</span>
                        <span className="text-lg">{testimonial.country}</span>
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
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Never Miss a Visa Slot Again
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who successfully secured their visa appointments with DeepVisas
          </p>
          
          <Link to="/dashboard">
            <Button size="lg" className="px-12 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-2xl transition-all duration-300 transform hover:scale-105">
              Get Started Now
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
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DV</span>
                </div>
                <span className="text-xl font-bold">DeepVisas</span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed max-w-md text-sm">
                Real-time visa appointment tracking for Turkish embassies with instant Telegram notifications.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-sm mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
            
            {/* Contact & Support */}
            <div>
              <h3 className="font-bold text-sm mb-4">Contact & Support</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><span className="hover:text-white transition-colors">📧 support@deepvisas.com</span></li>
                <li><span className="hover:text-white transition-colors">📞 +90 (555) 123-4567</span></li>
                <li><a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💬 Telegram Channel</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">❓ Help Center</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 DeepVisas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

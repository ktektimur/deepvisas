import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Bell, Users, Shield, CheckCircle, Star, ArrowDown, Clock, Zap, Target, Award, Rocket, User, Calculator, Lock, Menu, X, RefreshCw } from 'lucide-react';
import { Testimonial } from '@/types/testimonial';
import { useVisaData, getFallbackVisaData } from '@/hooks/useVisaData';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: visaData, isLoading, error, refetch, isRefetching } = useVisaData();

  // Use API data if available, otherwise use fallback data
  const displayData = visaData || getFallbackVisaData();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Gerçek Zamanlı Güncellemeler',
      description: 'Vize slotları müsait olduğu anda anında bildirim alın. 7/24 izleme.',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Çoklu Şehir Takibi',
      description: 'Türkiye genelinde birden fazla şehir ve elçiliği aynı anda izleyin.',
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Telegram Entegrasyonu',
      description: 'Anında mobil bildirimler için sorunsuz Telegram bot entegrasyonu.',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Güvenli ve Güvenilir',
      description: 'GDPR uyumlu SSL şifreleme ve %99.9 çalışma süresi garantisi.',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
  ];

  const steps = [
    {
      number: "1",
      icon: <User className="w-10 h-10" />,
      title: 'Kaydol ve Şehirleri Seç',
      description: 'Hesabınızı oluşturun ve vize randevuları için izlemek istediğiniz elçilik şehirlerini seçin.',
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      number: "2", 
      icon: <Users className="w-10 h-10" />,
      title: 'Telegram\'ı Bağla',
      description: 'Slotlar müsait olduğunda anında bildirim almak için Telegram hesabınızı bağlayın.',
      color: "bg-gradient-to-r from-teal-500 to-teal-600"
    },
    {
      number: "3",
      icon: <Zap className="w-10 h-10" />,
      title: 'Gerçek Zamanlı Uyarılar Al',
      description: 'Seçilen şehirlerinizde vize randevu slotları açıldığı anda anında bildirim alın.',
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Ahmet Yılmaz',
      comment: {
        en: "DeepVisas sayesinde Almanya vize randevumu sadece 2 günde aldım! Telegram bildirimleri anında ve doğru.",
        tr: "DeepVisas sayesinde Almanya vize randevumu sadece 2 günde aldım! Telegram bildirimleri anında ve doğru."
      },
      rating: 5,
      flag: '🇩🇪',
      role: 'Yazılım Mühendisi'
    },
    {
      name: 'Merve Özkan',
      comment: {
        en: "Aylarca elçilik sitelerini manuel kontrol ediyordum. DeepVisas bana çok zaman ve stres kazandırdı!",
        tr: "Aylarca elçilik sitelerini manuel kontrol ediyordum. DeepVisas bana çok zaman ve stres kazandırdı!"
      },
      rating: 5,
      flag: '🇪🇸',
      role: 'Pazarlama Müdürü'
    },
    {
      name: 'Selin Yılmaz',
      comment: {
        en: "The real-time tracking feature is amazing. I got notified within minutes when UK visa slots opened up in Istanbul.",
        tr: "Gerçek zamanlı takip özelliği harika. İstanbul'da İngiltere vize slotları açıldığında dakikalar içinde bildirim aldım."
      },
      rating: 5,
      flag: '🇬🇧',
      role: 'İş Analisti'
    },
    {
      name: 'Mehmet Demir',
      comment: {
        en: "DeepVisas helped me secure my US visa appointment when I thought it was impossible. Highly recommended!",
        tr: "İmkansız olduğunu düşündüğüm ABD vize randevumu DeepVisas sayesinde aldım. Kesinlikle tavsiye ederim!"
      },
      rating: 5,
      flag: '🇺🇸',
      role: 'Doktor'
    },
    {
      name: 'Ayşe Kara',
      comment: {
        en: "The Telegram bot is so convenient. I received my France visa slot notification while having coffee!",
        tr: "Telegram botu çok kullanışlı. Fransa vize slotu bildirimimi kahve içerken aldım!"
      },
      rating: 5,
      flag: '🇫🇷',
      role: 'Öğretmen'
    },
    {
      name: 'Emre Şahin',
      comment: {
        en: "Finally got my Netherlands visa after weeks of waiting. DeepVisas made the process so much easier.",
        tr: "Haftalarca bekledikten sonra nihayet Hollanda vizemi aldım. DeepVisas süreci çok kolaylaştırdı."
      },
      rating: 5,
      flag: '🇳🇱',
      role: 'Mimar'
    },
    {
      name: 'Fatma Arslan',
      comment: {
        en: "The multi-city tracking feature is brilliant. I monitor both Istanbul and Ankara simultaneously.",
        tr: "Çoklu şehir takip özelliği harika. Hem İstanbul hem Ankara'yı aynı anda izliyorum."
      },
      rating: 5,
      flag: '🇮🇹',
      role: 'Hemşire'
    },
    {
      name: 'Burak Çelik',
      comment: {
        en: "DeepVisas notifications are faster than checking the embassy website manually. Saved my vacation plans!",
        tr: "DeepVisas bildirimleri elçilik sitesini manuel kontrol etmekten daha hızlı. Tatil planlarımı kurtardı!"
      },
      rating: 5,
      flag: '🇪🇸',
      role: 'Turist Rehberi'
    },
    {
      name: 'Zeynep Yıldız',
      comment: {
        en: "The interface is user-friendly and the notifications are reliable. Best visa tracking service I've used.",
        tr: "Arayüz kullanıcı dostu ve bildirimler güvenilir. Kullandığım en iyi vize takip servisi."
      },
      rating: 5,
      flag: '🇬🇧',
      role: 'Grafik Tasarımcı'
    },
    {
      name: 'Can Özdemir',
      comment: {
        en: "I was skeptical at first, but DeepVisas proved to be incredibly accurate and fast with notifications.",
        tr: "Başta şüpheliydim ama DeepVisas bildirimlerinde inanılmaz derecede doğru ve hızlı olduğunu kanıtladı."
      },
      rating: 5,
      flag: '🇲🇽',
      role: 'Müzisyen'
    },
    {
      name: 'Deniz Aktaş',
      comment: {
        en: "The 99.9% uptime is real. Never missed an important visa slot notification thanks to DeepVisas.",
        tr: "%99.9 çalışma süresi gerçek. DeepVisas sayesinde hiçbir önemli vize slotu bildirimini kaçırmadım."
      },
      rating: 5,
      flag: '🇸🇪',
      role: 'Avukat'
    },
    {
      name: 'Hakan Polat',
      comment: {
        en: "DeepVisas helped me track multiple visa types across different cities. Excellent service quality.",
        tr: "DeepVisas farklı şehirlerde birden fazla vize türünü takip etmeme yardımcı oldu. Mükemmel hizmet kalitesi."
      },
      rating: 5,
      flag: '🇩🇪',
      role: 'Mühendis'
    },
    {
      name: 'İpek Yılmaz',
      comment: {
        en: "The Telegram integration is seamless. I get instant notifications wherever I am. Highly efficient!",
        tr: "Telegram entegrasyonu kusursuz. Nerede olursam olayım anında bildirim alıyorum. Son derece verimli!"
      },
      rating: 5,
      flag: '🇵🇹',
      role: 'Eczacı'
    },
    {
      name: 'Okan Aydın',
      comment: {
        en: "DeepVisas turned the stressful visa appointment hunting into a breeze. Worth every penny!",
        tr: "DeepVisas stresli vize randevu avcılığını çok kolay hale getirdi. Her kuruşa değer!"
      },
      rating: 5,
      flag: '🇦🇺',
      role: 'Pilot'
    },
    {
      name: 'Sibel Koç',
      comment: {
        en: "Real-time updates and accurate information. DeepVisas is a game-changer for visa applications.",
        tr: "Gerçek zamanlı güncellemeler ve doğru bilgi. DeepVisas vize başvuruları için devrim niteliğinde."
      },
      rating: 5,
      flag: '🇫🇷',
      role: 'Psikolog'
    }
  ];

  const stats = [
    { number: "50+", label: 'Takip Edilen Şehir', icon: <Globe className="w-6 h-6" /> },
    { number: "10K+", label: 'Aktif Kullanıcı', icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: 'Çalışma Süresi', icon: <Award className="w-6 h-6" /> },
    { number: "Canlı", label: 'Canlı Takip', icon: <CheckCircle className="w-6 h-6 text-green-500" /> },
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
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Anasayfa</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Özellikler</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">Nasıl Çalışır</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">İletişim</a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700">
                  Giriş Yap
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
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Anasayfa</a>
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Özellikler</a>
                <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Nasıl Çalışır</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">İletişim</a>
                <div className="px-3 py-2 space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="outline" size="sm" className="w-full">Giriş Yap</Button>
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
                  🚀 Gerçek Zamanlı Vize Takibi Mevcut
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Vize Randevularını{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Gerçek Zamanlı Takip Edin
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Tercih ettiğiniz Türk şehirlerinde vize slotları açıldığında anında uyarı alın. Gelişmiş izleme sistemimizle bir daha asla randevu kaçırmayın.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    Takibe Başla
                  </Button>
                </Link>
                <a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-300">
                    Telegram'a Katıl
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
                  <h3 className="text-lg font-semibold text-gray-900">Canlı Takip</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Çevrimiçi</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🇳🇱</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Hollanda - Ankara</div>
                        <div className="text-xs text-gray-600">15 Aralık 2024</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Müsait
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🇫🇷</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Fransa - İstanbul</div>
                        <div className="text-xs text-gray-600">Sonraki: 20 Ocak 2025</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Dolu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Visa Availability Section with API Data */}
      <section id="visa-availability" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Canlı Vize Durumu
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isRefetching}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
                Yenile
              </Button>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Türkiye'deki tüm büyük elçiliklerde gerçek zamanlı takip
            </p>
            {error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  API geçici olarak erişilemez durumda. Yedek veriler gösteriliyor.
                </p>
              </div>
            )}
            {isLoading && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">Vize verileri yükleniyor...</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((visa) => (
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
                          Müsait
                        </span>
                        {visa.slots && (
                          <div className="text-sm text-green-600 mt-2">🟢 {visa.slots} slot</div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                          Dolu
                        </span>
                        {visa.nextAvailable && (
                          <div className="text-sm text-gray-500 mt-2">Sonraki: {visa.nextAvailable}</div>
                        )}
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
              Nasıl Çalışır
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              3 basit adımda başlayın
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
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
              Neden DeepVisas?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vize takibini zahmetsiz hale getiren gelişmiş özellikler
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

      {/* Enhanced Testimonials Section with Horizontal Scroll */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kullanıcılarımız Ne Diyor
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Binlerce memnun kullanıcıya katılın
            </p>
          </div>
          
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-6 w-max">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 flex-shrink-0"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed italic text-sm min-h-[80px]">
                    "{testimonial.comment.tr}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3 text-white text-xl">
                      {testimonial.flag}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                      <p className="text-gray-600 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">← Daha fazla görüş görmek için kaydırın →</p>
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
            Bir Daha Vize Slotu Kaçırmayın
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            DeepVisas ile vize randevularını başarıyla alan binlerce kullanıcıya katılın
          </p>
          
          <Link to="/dashboard">
            <Button size="lg" className="px-12 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-2xl transition-all duration-300 transform hover:scale-105">
              Hemen Başla
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DV</span>
                </div>
                <span className="text-xl font-bold">DeepVisas</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Türk elçilikleri için anında Telegram bildirimleri ile gerçek zamanlı vize randevu takibi.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg">Hızlı Bağlantılar</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Panel</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Özellikler</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Kullanım Şartları</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg">İletişim ve Destek</h3>
              <ul className="space-y-3 text-gray-300">
                <li><span className="hover:text-white transition-colors">📧 support@deepvisas.com</span></li>
                <li><span className="hover:text-white transition-colors">📞 +90 (555) 123-4567</span></li>
                <li><a href="https://t.me/schengenvizerandevulari" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">💬 Telegram Kanalı</a></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">❓ Yardım Merkezi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 DeepVisas. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

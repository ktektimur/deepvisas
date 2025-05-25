
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'tr';
  setLanguage: (lang: 'en' | 'tr') => void;
  t: (key: string) => string;
}

// Function to detect preferred language from the browser
const getPreferredLanguage = (): 'en' | 'tr' => {
  if (typeof navigator === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  return browserLang?.startsWith('tr') ? 'tr' : 'en';
};

// Function to get stored language preference or use browser language
const getInitialLanguage = (): 'en' | 'tr' => {
  if (typeof window === 'undefined') return 'en';
  
  const storedLanguage = localStorage.getItem('language') as 'en' | 'tr' | null;
  return storedLanguage || getPreferredLanguage();
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.howItWorks': 'How it Works',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    'nav.adminPanel': 'Admin Panel',
    
    // Hero Section
    'hero.title': 'Track visa appointments in real-time',
    'hero.subtitle': 'Never miss a slot.',
    'hero.description': 'Get instant notifications when visa appointments become available in your preferred locations. Connect with our Telegram bot for real-time updates.',
    'hero.cta': 'Start Tracking Now',
    
    // Common labels
    'realTimeTracking': '🚀 Real-time Visa Tracking Available',
    'title': 'Track Visa Appointments in Real-Time',
    'description': 'Get instant alerts when visa slots open in your preferred Turkish cities. Never miss an appointment again with our advanced monitoring system.',
    'startTracking': 'Start Tracking',
    'joinTelegram': 'Join Telegram',
    'citiesTracked': 'Cities Tracked',
    'activeUsers': 'Active Users',
    'uptime': 'Uptime',
    'liveTracking': 'Live Tracking',
    'online': 'Online',
    'available': 'Available',
    'full': 'Full',
    'slots': 'slots',
    'nextAvailable': 'Next:',
    
    // Features
    'howItWorks': 'How It Works',
    'howItWorksDesc': 'Get started in 3 simple steps',
    'step1Title': 'Sign Up & Choose Cities',
    'step1Desc': 'Create your account and select which embassy cities you want to monitor for visa appointments.',
    'step2Title': 'Connect Telegram',
    'step2Desc': 'Link your Telegram account to receive instant notifications when slots become available.',
    'step3Title': 'Get Real-Time Alerts',
    'step3Desc': 'Receive immediate notifications the moment visa appointment slots open up in your selected cities.',
    'whyChoose': 'Why Choose DeepVisas?',
    'whyChooseDesc': 'Advanced features that make visa tracking effortless',
    'realTimeUpdates': 'Real-Time Updates',
    'realTimeUpdatesDesc': 'Get instant notifications the moment visa slots become available. 24/7 monitoring.',
    'multiCityTracking': 'Multi-City Tracking',
    'multiCityTrackingDesc': 'Monitor multiple cities and embassies simultaneously across Turkey.',
    'telegramIntegration': 'Telegram Integration',
    'telegramIntegrationDesc': 'Seamless Telegram bot integration for instant mobile notifications.',
    'secureReliable': 'Secure & Reliable',
    'secureReliableDesc': 'GDPR compliant with SSL encryption and 99.9% uptime guarantee.',
    'testimonials': 'What Our Users Say',
    'testimonialsDesc': 'Join thousands of satisfied users',
    'ctaTitle': 'Never Miss a Visa Slot Again',
    'ctaDesc': 'Join thousands of users who successfully secured their visa appointments with DeepVisas',
    'getStartedNow': 'Get Started Now',
    'footerDesc': 'Real-time visa appointment tracking for Turkish embassies with instant Telegram notifications.',
    'quickLinks': 'Quick Links',
    'contactSupport': 'Contact & Support',
    'allRightsReserved': 'All rights reserved.',
    'liveVisaAvailability': 'Live Visa Availability',
    'liveVisaDesc': 'Real-time tracking across all major embassies in Turkey',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcomeMessage': 'Welcome back! Here\'s your visa tracking overview.',
    'dashboard.trackedCountries': 'Tracked Countries',
    'dashboard.availableSlots': 'Available Slots',
    'dashboard.notifications': 'Notifications',
    'dashboard.successRate': 'Success Rate',
    'dashboard.trackedVisas': 'Tracked Visas',
    'dashboard.addTracking': 'Add New Tracking',
    'dashboard.telegramStatus': 'Telegram Status',
    'dashboard.connected': 'Connected',
    'dashboard.notConnected': 'Not Connected',
    'dashboard.connect': 'Connect',
    'dashboard.visaManagement': 'Manage and track your visa applications',
    'dashboard.yourApplications': 'Your Applications',
    
    // Analytics
    'analytics.title': 'Analytics Dashboard',
    'analytics.totalTrackedVisas': 'Total Tracked Visas',
    'analytics.successRate': 'Success Rate',
    'analytics.appointmentsSecured': 'Appointments Secured',
    'analytics.activeUsers': 'Active Users',
    'analytics.slotsByCountry': 'Slots by Country',
    'analytics.slotsByCountryDesc': 'Distribution of visa appointment slots by country',
    'analytics.availabilityTrend': 'Availability Trend',
    'analytics.availabilityTrendDesc': 'Visa appointment availability over time',
    'analytics.visaTypeDistribution': 'Visa Type Distribution',
    'analytics.visaTypeDistributionDesc': 'Breakdown of tracked visas by type',
    
    // Visa Types
    'visaTypes.tourist': 'Tourist',
    'visaTypes.business': 'Business',
    'visaTypes.student': 'Student',
    'visaTypes.work': 'Work',
    'visaTypes.other': 'Other',
    
    // Visa Status
    'visaStatus.inReview': 'In Review',
    'visaStatus.approved': 'Approved',
    'visaStatus.pending': 'Pending',
    
    // Settings
    'settings.title': 'Settings',
    'settings.notificationPreferences': 'Notification Preferences',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailNotificationsDesc': 'Receive updates via email',
    'settings.telegramNotifications': 'Telegram Notifications',
    'settings.telegramNotificationsDesc': 'Receive updates via Telegram',
    'settings.displaySettings': 'Display Settings',
    'settings.language': 'Language',
    'settings.telegramIntegration': 'Telegram Integration',
    'settings.telegramIntegrationDesc': 'Connect with our DeepVisas Telegram channel for latest updates:',
    'settings.connectTelegram': 'Connect Telegram',
    'settings.accountSettings': 'Account Settings',
    'settings.emailAddress': 'Email Address',
    'settings.changePassword': 'Change Password',
    'settings.saveSettings': 'Save Settings',
    'settings.settingsSaved': 'Settings saved successfully',
    
    // Common
    'home': 'Home',
    'features': 'Features',
    'contact': 'Contact',
    'userLogin': 'User Login',
    'panel': 'Panel',
    'dashboard': 'Dashboard',
    'privacyPolicy': 'Privacy Policy',
    'termsOfUse': 'Terms of Use',
    'helpCenter': 'Help Center',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.features': 'Özellikler',
    'nav.howItWorks': 'Nasıl Çalışır',
    'nav.contact': 'İletişim',
    'nav.login': 'Giriş',
    'nav.signup': 'Kayıt Ol',
    'nav.logout': 'Çıkış Yap',
    'nav.dashboard': 'Panel',
    'nav.adminPanel': 'Yönetici Paneli',
    
    // Hero Section
    'hero.title': 'Vize randevularını gerçek zamanlı takip edin',
    'hero.subtitle': 'Hiçbir fırsatı kaçırmayın.',
    'hero.description': 'Tercih ettiğiniz lokasyonlarda vize randevu slotları müsait olduğunda anında bildirim alın. Gerçek zamanlı güncellemeler için Telegram botumuzla bağlantı kurun.',
    'hero.cta': 'Takibe Başla',
    
    // Common labels
    'realTimeTracking': '🚀 Gerçek Zamanlı Vize Takibi Mevcut',
    'title': 'Vize Randevularını Gerçek Zamanlı Takip Edin',
    'description': 'Tercih ettiğiniz Türk şehirlerinde vize slotları açıldığında anında uyarı alın. Gelişmiş izleme sistemimizle bir daha asla randevu kaçırmayın.',
    'startTracking': 'Takibe Başla',
    'joinTelegram': 'Telegram\'a Katıl',
    'citiesTracked': 'Takip Edilen Şehir',
    'activeUsers': 'Aktif Kullanıcı',
    'uptime': 'Çalışma Süresi',
    'liveTracking': 'Canlı Takip',
    'online': 'Çevrimiçi',
    'available': 'Müsait',
    'full': 'Dolu',
    'slots': 'slot',
    'nextAvailable': 'Sonraki:',
    
    // Features
    'howItWorks': 'Nasıl Çalışır',
    'howItWorksDesc': '3 basit adımda başlayın',
    'step1Title': 'Kaydol ve Şehirleri Seç',
    'step1Desc': 'Hesabınızı oluşturun ve vize randevuları için izlemek istediğiniz elçilik şehirlerini seçin.',
    'step2Title': 'Telegram\'ı Bağla',
    'step2Desc': 'Slotlar müsait olduğunda anında bildirim almak için Telegram hesabınızı bağlayın.',
    'step3Title': 'Gerçek Zamanlı Uyarılar Al',
    'step3Desc': 'Seçilen şehirlerinizde vize randevu slotları açıldığı anda anında bildirim alın.',
    'whyChoose': 'Neden DeepVisas?',
    'whyChooseDesc': 'Vize takibini zahmetsiz hale getiren gelişmiş özellikler',
    'realTimeUpdates': 'Gerçek Zamanlı Güncellemeler',
    'realTimeUpdatesDesc': 'Vize slotları müsait olduğu anda anında bildirim alın. 7/24 izleme.',
    'multiCityTracking': 'Çoklu Şehir Takibi',
    'multiCityTrackingDesc': 'Türkiye genelinde birden fazla şehir ve elçiliği aynı anda izleyin.',
    'telegramIntegration': 'Telegram Entegrasyonu',
    'telegramIntegrationDesc': 'Anında mobil bildirimler için sorunsuz Telegram bot entegrasyonu.',
    'secureReliable': 'Güvenli ve Güvenilir',
    'secureReliableDesc': 'GDPR uyumlu SSL şifreleme ve %99.9 çalışma süresi garantisi.',
    'testimonials': 'Kullanıcılarımız Ne Diyor',
    'testimonialsDesc': 'Binlerce memnun kullanıcıya katılın',
    'ctaTitle': 'Bir Daha Vize Slotu Kaçırmayın',
    'ctaDesc': 'DeepVisas ile vize randevularını başarıyla alan binlerce kullanıcıya katılın',
    'getStartedNow': 'Hemen Başla',
    'footerDesc': 'Türk elçilikleri için anında Telegram bildirimleri ile gerçek zamanlı vize randevu takibi.',
    'quickLinks': 'Hızlı Bağlantılar',
    'contactSupport': 'İletişim ve Destek',
    'allRightsReserved': 'Tüm hakları saklıdır.',
    'liveVisaAvailability': 'Canlı Vize Durumu',
    'liveVisaDesc': 'Türkiye\'deki tüm büyük elçiliklerde gerçek zamanlı takip',
    
    // Dashboard
    'dashboard.title': 'Kontrol Paneli',
    'dashboard.welcomeMessage': 'Tekrar hoş geldiniz! İşte vize takip özetiniz.',
    'dashboard.trackedCountries': 'Takip Edilen Ülkeler',
    'dashboard.availableSlots': 'Müsait Slotlar',
    'dashboard.notifications': 'Bildirimler',
    'dashboard.successRate': 'Başarı Oranı',
    'dashboard.trackedVisas': 'Takip Edilen Vizeler',
    'dashboard.addTracking': 'Yeni Takip Ekle',
    'dashboard.telegramStatus': 'Telegram Durumu',
    'dashboard.connected': 'Bağlı',
    'dashboard.notConnected': 'Bağlı Değil',
    'dashboard.connect': 'Bağlan',
    'dashboard.visaManagement': 'Vize işlemlerinizi yönetin ve takip edin',
    'dashboard.yourApplications': 'Başvurularınız',
    
    // Analytics
    'analytics.title': 'Analitik Paneli',
    'analytics.totalTrackedVisas': 'Toplam Takip Edilen Vize',
    'analytics.successRate': 'Başarı Oranı',
    'analytics.appointmentsSecured': 'Alınan Randevular',
    'analytics.activeUsers': 'Aktif Kullanıcılar',
    'analytics.slotsByCountry': 'Ülkelere Göre Slotlar',
    'analytics.slotsByCountryDesc': 'Ülkelere göre vize randevu slotlarının dağılımı',
    'analytics.availabilityTrend': 'Müsaitlik Trendi',
    'analytics.availabilityTrendDesc': 'Zaman içinde vize randevu müsaitliği',
    'analytics.visaTypeDistribution': 'Vize Türü Dağılımı',
    'analytics.visaTypeDistributionDesc': 'Takip edilen vizelerin türlere göre dökümü',
    
    // Visa Types
    'visaTypes.tourist': 'Turistik',
    'visaTypes.business': 'İş',
    'visaTypes.student': 'Öğrenci',
    'visaTypes.work': 'Çalışma',
    'visaTypes.other': 'Diğer',
    
    // Visa Status
    'visaStatus.inReview': 'İnceleme Aşamasında',
    'visaStatus.approved': 'Onaylandı',
    'visaStatus.pending': 'Beklemede',
    
    // Settings
    'settings.title': 'Ayarlar',
    'settings.notificationPreferences': 'Bildirim Tercihleri',
    'settings.emailNotifications': 'E-posta Bildirimleri',
    'settings.emailNotificationsDesc': 'Güncellemeleri e-posta ile alın',
    'settings.telegramNotifications': 'Telegram Bildirimleri',
    'settings.telegramNotificationsDesc': 'Güncellemeleri Telegram ile alın',
    'settings.displaySettings': 'Görüntü Ayarları',
    'settings.language': 'Dil',
    'settings.telegramIntegration': 'Telegram Entegrasyonu',
    'settings.telegramIntegrationDesc': 'Son güncellemeler için DeepVisas Telegram kanalımızla bağlantı kurun:',
    'settings.connectTelegram': 'Telegram\'a Bağlan',
    'settings.accountSettings': 'Hesap Ayarları',
    'settings.emailAddress': 'E-posta Adresi',
    'settings.changePassword': 'Şifre Değiştir',
    'settings.saveSettings': 'Ayarları Kaydet',
    'settings.settingsSaved': 'Ayarlar başarıyla kaydedildi',
    
    // Common
    'home': 'Ana Sayfa',
    'features': 'Özellikler',
    'contact': 'İletişim',
    'userLogin': 'Kullanıcı Girişi',
    'panel': 'Panel',
    'dashboard': 'Panel',
    'privacyPolicy': 'Gizlilik Politikası',
    'termsOfUse': 'Kullanım Şartları',
    'helpCenter': 'Yardım Merkezi',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'tr'>(getInitialLanguage());
  
  // Update language and store in localStorage
  const setLanguage = (lang: 'en' | 'tr') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Initialize language on mount
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


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
    
    // Visa Cards
    'visa.available': 'Available',
    'visa.full': 'Full',
    'visa.waiting': 'Waiting',
    'visa.slots': 'slots',
    'visa.nextAvailable': 'Next Available',
    'visa.tourist': 'Tourist',
    'visa.business': 'Business',
    'visa.student': 'Student',
    
    // Features
    'features.title': 'Why Choose DeepVisas?',
    'features.realTime': 'Real-time Updates',
    'features.realTimeDesc': 'Get instant notifications when slots open up',
    'features.multiCity': 'Multi-city Tracking',
    'features.multiCityDesc': 'Track appointments across multiple cities simultaneously',
    'features.telegram': 'Telegram Integration',
    'features.telegramDesc': 'Receive updates directly on Telegram',
    'features.secure': 'Secure & Reliable',
    'features.secureDesc': 'Your data is encrypted and protected',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.myVisas': 'My Visas',
    'dashboard.trackedVisas': 'Tracked Visas',
    'dashboard.notifications': 'Notifications',
    'dashboard.analytics': 'Analytics',
    'dashboard.settings': 'Account Settings',
    'dashboard.addTracking': 'Add New Tracking',
    'dashboard.telegramStatus': 'Telegram Connection',
    'dashboard.connected': 'Connected',
    'dashboard.notConnected': 'Not Connected',
    'dashboard.connect': 'Connect',
    
    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.users': 'User Management',
    'admin.slots': 'Slot Management',
    'admin.broadcast': 'Broadcast System',
    'admin.analytics': 'Analytics',
    'admin.userDetails': 'User Details',
    'admin.slotDetails': 'Slot Details',
    'admin.userDetailDescription': 'Complete profile information for this user',
    'admin.trackingActivity': 'Tracking Activity',
    'admin.trackedCountries': 'Tracked Countries',
    'admin.activityLog': 'Activity Log',
    'admin.lastLogin': 'Last Login',
    'admin.lastUpdated': 'Profile Updated',
    'admin.noTrackedCountries': 'No countries are being tracked',
    'admin.backToUsers': 'Back to Users',
    'admin.backToAllUsers': 'Back to All Users',
    'admin.userNotFound': 'User Not Found',
    'admin.userNotFoundDesc': 'The requested user profile could not be found.',
    'admin.visaSubmissions': 'Visa Submissions',
    'admin.visaSubmissionsDesc': 'Review and manage all visa form submissions',
    'admin.allSubmissions': 'All Submissions',
    'admin.allSubmissionsDesc': 'View and process visa submissions from users',

    // Footer
    'footer.contact': 'Contact Us',
    'footer.telegram': 'Telegram Channel',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // NotFound
    'notFound.title': '404',
    'notFound.subtitle': 'Page Not Found',
    'notFound.description': "The page you are looking for doesn't exist or has been moved.",
    'notFound.button': 'Return Home',
    
    // Form labels
    'form.country': 'Country',
    'form.city': 'City',
    'form.visaType': 'Visa Type',
    'form.submit': 'Submit',
    'form.cancel': 'Cancel',
    'form.required': 'This field is required',
    'form.invalidFormat': 'Invalid format',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.createAccount': 'Create Account',
    'auth.loggingIn': 'Logging in...',
    'auth.registering': 'Registering...',
    'auth.loginFailed': 'Login failed',
    'auth.invalidCredentials': 'Invalid email or password. Please try again.',
    'auth.registerSuccess': 'Your account has been successfully created.',
    'auth.emailInUse': 'This email address is already in use.',
    'auth.errorOccurred': 'An error occurred. Please try again.',
    'auth.demoAccounts': 'Demo accounts:',
    'auth.signInToAccount': 'Sign in to your DeepVisas account',
    'auth.createNewAccount': 'Create a new account on DeepVisas',
    
    // User Profile
    'profile.title': 'User Profile',
    'profile.subtitle': 'Manage your personal information',
    'profile.personalInfo': 'Personal Information',
    'profile.contactInfo': 'Contact Information',
    'profile.fullName': 'Full Name',
    'profile.dateOfBirth': 'Date of Birth',
    'profile.nationality': 'Nationality',
    'profile.passportNumber': 'Passport Number',
    'profile.passportExpiry': 'Passport Expiry Date',
    'profile.email': 'Email Address',
    'profile.phone': 'Phone Number',
    'profile.telegram': 'Telegram Username',
    'profile.telegramUsername': 'Telegram Username',
    'profile.city': 'City of Residence',
    'profile.currentCity': 'Current City',
    'profile.visaType': 'Visa Type',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.updateSuccess': 'Your profile has been successfully updated.',
    'profile.updateError': 'An error occurred while updating your profile.',
    'profile.required': 'This field is required',
    'profile.invalidFormat': 'Invalid format',
    'profile.telegramSection': 'Telegram Integration',
    'profile.telegramConnect': 'Connect Telegram',
    'profile.telegramDisconnect': 'Disconnect',
    'profile.telegramConnected': 'Connected as',
    'profile.telegramNotConnected': 'Not connected',
    'profile.telegramWarning': 'Are you sure you want to disconnect your Telegram account? You will stop receiving notifications.',
    'profile.telegramConnectInfo': 'Connect your Telegram account to receive real-time notifications about visa appointments.',
    
    // UK Visa Requirements Form
    'visaUK.title': 'UK Visa Application Form',
    'visaUK.description': 'Complete this form to apply for a UK visa',
    'visaUK.personalInfo': 'Personal Information',
    'visaUK.contactInfo': 'Contact Information',
    'visaUK.travelInfo': 'Travel Information',
    'visaUK.employmentFinancial': 'Employment & Financial',
    'visaUK.travelHistory': 'Travel History',
    'visaUK.additionalInfo': 'Additional Information',
    'visaUK.placeOfBirth': 'Place of Birth',
    'visaUK.passportIssueDate': 'Passport Issue Date',
    'visaUK.currentAddress': 'Current Address',
    'visaUK.plannedArrival': 'Planned Arrival Date',
    'visaUK.plannedDeparture': 'Planned Departure Date',
    'visaUK.purpose': 'Purpose of Visit',
    'visaUK.duration': 'Visit Duration',
    'visaUK.accommodation': 'Accommodation Details',
    'visaUK.employment': 'Employment Status',
    'visaUK.monthlyIncome': 'Monthly Income',
    'visaUK.availableFunds': 'Available Funds for Trip',
    'visaUK.previousVisits': 'Previous UK Visits',
    'visaUK.visaRefusals': 'Previous Visa Refusals',
    'visaUK.otherTravelHistory': 'Other Countries Visited',
    'visaUK.anyOtherInfo': 'Additional Information',
    'visaUK.submissionSuccess': 'Application Submitted Successfully',
    'visaUK.submissionSuccessDesc': 'Your UK visa application has been submitted successfully.',
    'visaUK.submissionError': 'Submission Error',
    'visaUK.submissionErrorDesc': 'There was an error submitting your application. Please try again.',
    'visaUK.applicationSubmitted': 'Application Submitted',
    'visaUK.applicationSubmittedDesc': 'Your UK visa application has been submitted and is now pending review.',
    'visaUK.referenceNumber': 'Reference Number',
    'visaUK.submissionDate': 'Submission Date',
    'visaUK.startNewApplication': 'Start New Application',

    // Visa Types
    'visaType.tourism': 'Tourism',
    'visaType.business': 'Business',
    'visaType.student': 'Student',
    'visaType.family': 'Family',
    'visaType.medical': 'Medical',
    
    // Nationalities (common ones)
    'nationality.turkey': 'Turkey',
    'nationality.germany': 'Germany',
    'nationality.usa': 'United States',
    'nationality.uk': 'United Kingdom',
    'nationality.iraq': 'Iraq',
    'nationality.syria': 'Syria',
    'nationality.iran': 'Iran',
    'nationality.russia': 'Russia',
    'nationality.ukraine': 'Ukraine',
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
    
    // Visa Cards
    'visa.available': 'Müsait',
    'visa.full': 'Dolu',
    'visa.waiting': 'Beklemede',
    'visa.slots': 'slot',
    'visa.nextAvailable': 'Sonraki Müsait',
    'visa.tourist': 'Turistik',
    'visa.business': 'İş',
    'visa.student': 'Öğrenci',
    
    // Features
    'features.title': 'Neden DeepVisas?',
    'features.realTime': 'Gerçek Zamanlı Güncellemeler',
    'features.realTimeDesc': 'Slotlar açıldığında anında bildirim alın',
    'features.multiCity': 'Çoklu Şehir Takibi',
    'features.multiCityDesc': 'Aynı anda birden fazla şehri takip edin',
    'features.telegram': 'Telegram Entegrasyonu',
    'features.telegramDesc': 'Güncellemeleri doğrudan Telegram\'da alın',
    'features.secure': 'Güvenli ve Güvenilir',
    'features.secureDesc': 'Verileriniz şifrelenir ve korunur',
    
    // Dashboard
    'dashboard.title': 'Kontrol Paneli',
    'dashboard.myVisas': 'Vizelerim',
    'dashboard.trackedVisas': 'Takip Edilen Vizeler',
    'dashboard.notifications': 'Bildirimler',
    'dashboard.analytics': 'Analitik',
    'dashboard.settings': 'Hesap Ayarları',
    'dashboard.addTracking': 'Yeni Takip Ekle',
    'dashboard.telegramStatus': 'Telegram Bağlantısı',
    'dashboard.connected': 'Bağlı',
    'dashboard.notConnected': 'Bağlı Değil',
    'dashboard.connect': 'Bağlan',
    
    // Admin Dashboard
    'admin.title': 'Yönetici Paneli',
    'admin.users': 'Kullanıcı Yönetimi',
    'admin.slots': 'Slot Yönetimi',
    'admin.broadcast': 'Yayın Sistemi',
    'admin.analytics': 'Analitik',
    'admin.userDetails': 'Kullanıcı Detayları',
    'admin.slotDetails': 'Slot Detayları',
    'admin.userDetailDescription': 'Bu kullanıcının profil bilgileri',
    'admin.trackingActivity': 'Takip Aktivitesi',
    'admin.trackedCountries': 'Takip Edilen Ülkeler',
    'admin.activityLog': 'Aktivite Kaydı',
    'admin.lastLogin': 'Son Giriş',
    'admin.lastUpdated': 'Profil Güncellendi',
    'admin.noTrackedCountries': 'Takip edilen ülke yok',
    'admin.backToUsers': 'Kullanıcılara Geri Dön',
    'admin.backToAllUsers': 'Tüm Kullanıcılara Geri Dön',
    'admin.userNotFound': 'Kullanıcı Bulunamadı',
    'admin.userNotFoundDesc': 'İstenen kullanıcı profili bulunamadı.',
    'admin.visaSubmissions': 'Vize Başvuruları',
    'admin.visaSubmissionsDesc': 'Tüm vize başvuru formlarını inceleyin ve yönetin',
    'admin.allSubmissions': 'Tüm Başvurular',
    'admin.allSubmissionsDesc': 'Kullanıcılardan gelen vize başvurularını görüntüleyin ve işleyin',
    
    // Footer
    'footer.contact': 'Bize Ulaşın',
    'footer.telegram': 'Telegram Kanalı',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    
    // NotFound
    'notFound.title': '404',
    'notFound.subtitle': 'Sayfa Bulunamadı',
    'notFound.description': 'Aradığınız sayfa mevcut değil veya taşınmış.',
    'notFound.button': 'Ana Sayfaya Dön',
    
    // Form labels
    'form.country': 'Ülke',
    'form.city': 'Şehir',
    'form.visaType': 'Vize Tipi',
    'form.submit': 'Gönder',
    'form.cancel': 'İptal',
    'form.required': 'Bu alan zorunludur',
    'form.invalidFormat': 'Geçersiz format',
    
    // Auth
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kaydol',
    'auth.email': 'E-posta',
    'auth.password': 'Şifre',
    'auth.confirmPassword': 'Şifre Onayı',
    'auth.forgotPassword': 'Şifremi Unuttum?',
    'auth.noAccount': 'Hesabınız yok mu?',
    'auth.haveAccount': 'Zaten hesabınız var mı?',
    'auth.createAccount': 'Hesap Oluştur',
    'auth.loggingIn': 'Giriş yapılıyor...',
    'auth.registering': 'Kaydediliyor...',
    'auth.loginFailed': 'Giriş başarısız',
    'auth.invalidCredentials': 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.',
    'auth.registerSuccess': 'Hesabınız başarıyla oluşturuldu.',
    'auth.emailInUse': 'Bu e-posta adresi zaten kullanılıyor.',
    'auth.errorOccurred': 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'auth.demoAccounts': 'Demo hesap örnekleri:',
    'auth.signInToAccount': 'DeepVisas hesabınıza giriş yapın',
    'auth.createNewAccount': 'DeepVisas\'da yeni bir hesap oluşturun',
    
    // User Profile
    'profile.title': 'Kullanıcı Profili',
    'profile.subtitle': 'Kişisel bilgilerinizi yönetin',
    'profile.personalInfo': 'Kişisel Bilgiler',
    'profile.contactInfo': 'İletişim Bilgileri',
    'profile.fullName': 'Ad Soyad',
    'profile.dateOfBirth': 'Doğum Tarihi',
    'profile.nationality': 'Uyruk',
    'profile.passportNumber': 'Pasaport No',
    'profile.passportExpiry': 'Pasaport Geçerlilik Tarihi',
    'profile.email': 'E-posta',
    'profile.phone': 'Telefon Numarası',
    'profile.telegram': 'Telegram Kullanıcı Adı',
    'profile.telegramUsername': 'Telegram Kullanıcı Adı',
    'profile.city': 'Yaşadığı Şehir',
    'profile.currentCity': 'Şu Anki Şehir',
    'profile.visaType': 'Vize Türü',
    'profile.save': 'Değişiklikleri Kaydet',
    'profile.cancel': 'İptal',
    'profile.updateSuccess': 'Bilgileriniz başarıyla güncellendi.',
    'profile.updateError': 'Profiliniz güncellenirken bir hata oluştu.',
    'profile.required': 'Bu alan zorunludur',
    'profile.invalidFormat': 'Geçersiz format',
    'profile.telegramSection': 'Telegram Entegrasyonu',
    'profile.telegramConnect': 'Telegram\'a Bağlan',
    'profile.telegramDisconnect': 'Bağlantıyı Kes',
    'profile.telegramConnected': 'Bağlı kullanıcı',
    'profile.telegramNotConnected': 'Bağlı değil',
    'profile.telegramWarning': 'Telegram hesabınızın bağlantısını kesmek istediğinizden emin misiniz? Vize randevuları hakkında bildirim almayı durduracaksınız.',
    'profile.telegramConnectInfo': 'Vize randevuları hakkında gerçek zamanlı bildirimler almak için Telegram hesabınızı bağlayın.',
    
    // UK Visa Requirements Form
    'visaUK.title': 'İngiltere Vize Başvuru Formu',
    'visaUK.description': 'İngiltere vizesine başvurmak için bu formu doldurun',
    'visaUK.personalInfo': 'Kişisel Bilgiler',
    'visaUK.contactInfo': 'İletişim Bilgileri',
    'visaUK.travelInfo': 'Seyahat Bilgileri',
    'visaUK.employmentFinancial': 'İstihdam ve Finansal Bilgiler',
    'visaUK.travelHistory': 'Seyahat Geçmişi',
    'visaUK.additionalInfo': 'Ek Bilgiler',
    'visaUK.placeOfBirth': 'Doğum Yeri',
    'visaUK.passportIssueDate': 'Pasaport Veriliş Tarihi',
    'visaUK.currentAddress': 'Şu Anki Adres',
    'visaUK.plannedArrival': 'Planlanan Varış Tarihi',
    'visaUK.plannedDeparture': 'Planlanan Dönüş Tarihi',
    'visaUK.purpose': 'Ziyaret Amacı',
    'visaUK.duration': 'Ziyaret Süresi',
    'visaUK.accommodation': 'Konaklama Detayları',
    'visaUK.employment': 'Çalışma Durumu',
    'visaUK.monthlyIncome': 'Aylık Gelir',
    'visaUK.availableFunds': 'Seyahat İçin Mevcut Fon',
    'visaUK.previousVisits': 'Önceki İngiltere Ziyaretleri',
    'visaUK.visaRefusals': 'Önceki Vize Redleri',
    'visaUK.otherTravelHistory': 'Ziyaret Edilen Diğer Ülkeler',
    'visaUK.anyOtherInfo': 'Ek Bilgiler',
    'visaUK.submissionSuccess': 'Başvuru Başarıyla Gönderildi',
    'visaUK.submissionSuccessDesc': 'İngiltere vize başvurunuz başarıyla gönderildi.',
    'visaUK.submissionError': 'Gönderim Hatası',
    'visaUK.submissionErrorDesc': 'Başvurunuzu gönderirken bir hata oluştu. Lütfen tekrar deneyin.',
    'visaUK.applicationSubmitted': 'Başvuru Gönderildi',
    'visaUK.applicationSubmittedDesc': 'İngiltere vize başvurunuz gönderildi ve inceleme için bekliyor.',
    'visaUK.referenceNumber': 'Referans Numarası',
    'visaUK.submissionDate': 'Gönderim Tarihi',
    'visaUK.startNewApplication': 'Yeni Başvuru Başlat',
    
    // Visa Types
    'visaType.tourism': 'Turizm',
    'visaType.business': 'İş',
    'visaType.student': 'Öğrenci',
    'visaType.family': 'Aile',
    'visaType.medical': 'Sağlık',
    
    // Nationalities (common ones)
    'nationality.turkey': 'Türkiye',
    'nationality.germany': 'Almanya',
    'nationality.usa': 'Amerika Birleşik Devletleri',
    'nationality.uk': 'Birleşik Krallık',
    'nationality.iraq': 'Irak',
    'nationality.syria': 'Suriye',
    'nationality.iran': 'İran',
    'nationality.russia': 'Rusya',
    'nationality.ukraine': 'Ukrayna',
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

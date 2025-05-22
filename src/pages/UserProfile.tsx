
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar as CalendarIcon, User, IdCard, Mail, Phone, MessageCircle, Building, Globe, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileData {
  fullName: string;
  dateOfBirth: Date | null;
  nationality: string;
  passportNumber: string;
  passportExpiry: Date | null;
  email: string;
  phone: string;
  telegram: string;
  city: string;
  visaType: string;
}

const UserProfile = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('@user123');

  const form = useForm<UserProfileData>({
    defaultValues: {
      fullName: '',
      dateOfBirth: null,
      nationality: 'Turkey',
      passportNumber: '',
      passportExpiry: null,
      email: user?.email || '',
      phone: '',
      telegram: '',
      city: '',
      visaType: 'tourism',
    },
  });

  useEffect(() => {
    // Load existing profile data from localStorage if available
    const savedProfile = localStorage.getItem('deepvisas_user_profile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      
      // Convert string dates back to Date objects
      if (profileData.dateOfBirth) {
        profileData.dateOfBirth = new Date(profileData.dateOfBirth);
      }
      if (profileData.passportExpiry) {
        profileData.passportExpiry = new Date(profileData.passportExpiry);
      }
      
      form.reset({
        ...profileData,
        email: user?.email || profileData.email || '',
      });
    } else {
      // Set sample data for demo purposes
      form.reset({
        fullName: user?.name || (language === 'tr' ? 'Ahmet Yılmaz' : 'John Smith'),
        dateOfBirth: new Date(1990, 0, 1),
        nationality: 'Turkey',
        passportNumber: 'U12345678',
        passportExpiry: new Date(new Date().getFullYear() + 5, 5, 15),
        email: user?.email || 'user@deepvisas.com',
        phone: '+90 530 000 00 00',
        telegram: '@visatracker',
        city: language === 'tr' ? 'İstanbul' : 'Istanbul',
        visaType: 'tourism',
      });
    }
    
    // Check for telegram connection status
    const telegramStatus = localStorage.getItem('deepvisas_telegram_status');
    if (telegramStatus === 'connected') {
      setTelegramConnected(true);
      const storedUsername = localStorage.getItem('deepvisas_telegram_username');
      if (storedUsername) {
        setTelegramUsername(storedUsername);
      }
    }
  }, [form, user?.email, user?.name, language]);

  const onSubmit = (data: UserProfileData) => {
    // Save data to localStorage for persistence
    localStorage.setItem('deepvisas_user_profile', JSON.stringify(data));
    
    toast.success(t('profile.updateSuccess'), {
      description: new Date().toLocaleTimeString(),
    });
  };

  const handleTelegramConnect = () => {
    // Open Telegram link in new tab
    window.open('https://t.me/deepvisas', '_blank');
    
    // Simulate connecting to Telegram
    setTelegramConnected(true);
    const username = '@' + form.getValues('fullName').split(' ')[0].toLowerCase() + Math.floor(Math.random() * 1000);
    setTelegramUsername(username);
    localStorage.setItem('deepvisas_telegram_status', 'connected');
    localStorage.setItem('deepvisas_telegram_username', username);
    
    toast.success(language === 'tr' ? 'Telegram bağlantısı kuruldu!' : 'Telegram connection established!');
  };
  
  const handleTelegramDisconnect = () => {
    setTelegramConnected(false);
    localStorage.setItem('deepvisas_telegram_status', 'disconnected');
    localStorage.removeItem('deepvisas_telegram_username');
    
    toast.success(language === 'tr' ? 'Telegram bağlantısı kesildi' : 'Telegram disconnected');
  };

  const formatDate = (date: Date) => {
    if (language === 'tr') {
      return format(date, 'dd.MM.yyyy');
    }
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <DashboardLayout>
      <div className="container max-w-4xl py-10 px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1 text-gray-900 dark:text-white">{t('profile.title')}</h1>
        <p className="text-muted-foreground mb-8">{t('profile.subtitle')}</p>

        <div className="grid grid-cols-1 gap-8">
          <Card className="shadow-lg dark:bg-gray-800 border dark:border-gray-700">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CardHeader>
                  <CardTitle className="text-xl">{t('profile.title')}</CardTitle>
                  <CardDescription>
                    {t('profile.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {t('profile.fullName')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'tr' ? 'Ahmet Yılmaz' : 'John Smith'}
                              {...field}
                              className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {t('profile.dateOfBirth')}
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    formatDate(field.value)
                                  ) : (
                                    <span>01.01.1990</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Nationality */}
                    <FormField
                      control={form.control}
                      name="nationality"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            {t('profile.nationality')}
                          </FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                                <SelectValue placeholder={t('nationality.turkey')} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                                <SelectItem value="Turkey">{t('nationality.turkey')}</SelectItem>
                                <SelectItem value="Germany">{t('nationality.germany')}</SelectItem>
                                <SelectItem value="Iraq">{t('nationality.iraq')}</SelectItem>
                                <SelectItem value="Syria">{t('nationality.syria')}</SelectItem>
                                <SelectItem value="Iran">{t('nationality.iran')}</SelectItem>
                                <SelectItem value="USA">{t('nationality.usa')}</SelectItem>
                                <SelectItem value="UK">{t('nationality.uk')}</SelectItem>
                                <SelectItem value="Russia">{t('nationality.russia')}</SelectItem>
                                <SelectItem value="Ukraine">{t('nationality.ukraine')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Passport Number */}
                    <FormField
                      control={form.control}
                      name="passportNumber"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <IdCard className="h-4 w-4 text-muted-foreground" />
                            {t('profile.passportNumber')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="U12345678"
                              {...field}
                              className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Passport Expiry */}
                    <FormField
                      control={form.control}
                      name="passportExpiry"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {t('profile.passportExpiry')}
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    formatDate(field.value)
                                  ) : (
                                    <span>15.06.2030</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) => date < new Date()}
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {t('profile.email')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              disabled
                              className="bg-muted dark:bg-gray-700 dark:text-gray-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {t('profile.phone')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+90 530 000 00 00"
                              {...field}
                              className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Telegram */}
                    <FormField
                      control={form.control}
                      name="telegram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                            {t('profile.telegram')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="@ahmetbot"
                              {...field}
                              className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* City of Residence */}
                    <FormField
                      control={form.control}
                      name="city"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            {t('profile.city')}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'tr' ? 'İstanbul' : 'Istanbul'}
                              {...field}
                              className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Visa Type */}
                    <FormField
                      control={form.control}
                      name="visaType"
                      rules={{ required: t('profile.required') }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <IdCard className="h-4 w-4 text-muted-foreground" />
                            {t('profile.visaType')}
                          </FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="transition-all hover:border-primary focus-visible:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                                <SelectValue placeholder={t('visaType.tourism')} />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                                <SelectItem value="tourism">{t('visaType.tourism')}</SelectItem>
                                <SelectItem value="business">{t('visaType.business')}</SelectItem>
                                <SelectItem value="student">{t('visaType.student')}</SelectItem>
                                <SelectItem value="family">{t('visaType.family')}</SelectItem>
                                <SelectItem value="medical">{t('visaType.medical')}</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => form.reset()} className="dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                    {t('profile.cancel')}
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
                    {t('profile.save')}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {/* Telegram Integration Section */}
          <Card className="shadow-lg dark:bg-gray-800 border dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-gray-900 dark:text-white">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                {t('profile.telegramSection')}
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                {t('profile.telegramConnectInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${telegramConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="dark:text-white">
                    {telegramConnected 
                      ? `${t('profile.telegramConnected')} ${telegramUsername}` 
                      : t('profile.telegramNotConnected')}
                  </span>
                </div>
                {telegramConnected ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-950/50">
                        {t('profile.telegramDisconnect')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 dark:text-white">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          {t('profile.telegramDisconnect')}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-gray-400">
                          {t('profile.telegramWarning')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">{t('profile.cancel')}</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleTelegramDisconnect}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {t('profile.telegramDisconnect')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button 
                    onClick={handleTelegramConnect}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {t('profile.telegramConnect')}
                  </Button>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Follow our updates on Telegram:{" "}
                  <a
                    href="https://t.me/deepvisas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    @deepvisas
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;

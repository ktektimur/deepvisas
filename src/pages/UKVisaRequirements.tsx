
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Globe, IdCard, CheckCircle, AlertTriangle, FileText, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define schema for UK visa form with i18n support
const createUKVisaSchema = (t: (key: string) => string) => {
  return z.object({
    // Personal Information
    fullName: z.string().min(1, { message: t('form.required') }),
    dateOfBirth: z.date({ required_error: t('form.required') }),
    placeOfBirth: z.string().min(1, { message: t('form.required') }),
    nationality: z.string().min(1, { message: t('form.required') }),
    passportNumber: z.string().min(1, { message: t('form.required') }),
    passportIssueDate: z.date({ required_error: t('form.required') }),
    passportExpiryDate: z.date({ required_error: t('form.required') }),
    
    // Contact Information
    email: z.string().email({ message: t('form.invalidFormat') }),
    phoneNumber: z.string().min(1, { message: t('form.required') }),
    currentAddress: z.string().min(1, { message: t('form.required') }),
    
    // Travel Information
    plannedArrivalDate: z.date({ required_error: t('form.required') }),
    plannedDepartureDate: z.date({ required_error: t('form.required') }),
    purposeOfVisit: z.string().min(1, { message: t('form.required') }),
    visitDuration: z.string().min(1, { message: t('form.required') }),
    accommodationDetails: z.string().min(1, { message: t('form.required') }),
    
    // Employment & Financial Information
    currentEmployment: z.string().min(1, { message: t('form.required') }),
    monthlyIncome: z.string().min(1, { message: t('form.required') }),
    fundsAvailable: z.string().min(1, { message: t('form.required') }),
    
    // Travel History
    previousUKVisits: z.string(),
    previousVisaRefusals: z.string(),
    travelHistory: z.string(),
    
    // Additional Information
    additionalInfo: z.string(),
  });
};

// Define employment options
const employmentOptions = [
  { value: 'employed', labelEn: 'Employed', labelTr: 'Çalışıyor' },
  { value: 'self-employed', labelEn: 'Self-Employed', labelTr: 'Serbest Çalışan' },
  { value: 'student', labelEn: 'Student', labelTr: 'Öğrenci' },
  { value: 'retired', labelEn: 'Retired', labelTr: 'Emekli' },
  { value: 'unemployed', labelEn: 'Unemployed', labelTr: 'İşsiz' },
];

// Define purpose options
const purposeOptions = [
  { value: 'tourism', labelEn: 'Tourism', labelTr: 'Turizm' },
  { value: 'business', labelEn: 'Business', labelTr: 'İş' },
  { value: 'study', labelEn: 'Study', labelTr: 'Eğitim' },
  { value: 'family', labelEn: 'Family Visit', labelTr: 'Aile Ziyareti' },
  { value: 'medical', labelEn: 'Medical Treatment', labelTr: 'Tıbbi Tedavi' },
];

// Define nationality options (major ones)
const nationalityOptions = [
  { value: 'turkey', labelEn: 'Turkey', labelTr: 'Türkiye' },
  { value: 'germany', labelEn: 'Germany', labelTr: 'Almanya' },
  { value: 'iraq', labelEn: 'Iraq', labelTr: 'Irak' },
  { value: 'syria', labelEn: 'Syria', labelTr: 'Suriye' },
  { value: 'iran', labelEn: 'Iran', labelTr: 'İran' },
  { value: 'russia', labelEn: 'Russia', labelTr: 'Rusya' },
  { value: 'ukraine', labelEn: 'Ukraine', labelTr: 'Ukrayna' },
  { value: 'usa', labelEn: 'United States', labelTr: 'Amerika Birleşik Devletleri' },
];

// Define duration options
const durationOptions = [
  { value: 'less-than-1-month', labelEn: 'Less than 1 month', labelTr: '1 aydan az' },
  { value: '1-3-months', labelEn: '1-3 months', labelTr: '1-3 ay' },
  { value: '3-6-months', labelEn: '3-6 months', labelTr: '3-6 ay' },
  { value: '6-months-to-1-year', labelEn: '6 months to 1 year', labelTr: '6 ay - 1 yıl' },
  { value: 'more-than-1-year', labelEn: 'More than 1 year', labelTr: '1 yıldan fazla' },
];

// Main UK Visa Requirements component
const UKVisaRequirements = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  
  // Create dynamic schema based on current language
  const schema = createUKVisaSchema(t);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      // Try to load saved form data from localStorage
      const savedData = localStorage.getItem('uk_visa_form');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          
          // Convert date strings back to Date objects
          if (parsedData.dateOfBirth) parsedData.dateOfBirth = new Date(parsedData.dateOfBirth);
          if (parsedData.passportIssueDate) parsedData.passportIssueDate = new Date(parsedData.passportIssueDate);
          if (parsedData.passportExpiryDate) parsedData.passportExpiryDate = new Date(parsedData.passportExpiryDate);
          if (parsedData.plannedArrivalDate) parsedData.plannedArrivalDate = new Date(parsedData.plannedArrivalDate);
          if (parsedData.plannedDepartureDate) parsedData.plannedDepartureDate = new Date(parsedData.plannedDepartureDate);
          
          return parsedData;
        } catch (error) {
          console.error('Error parsing saved form data:', error);
        }
      }
      
      // Load data from user profile if available
      const profileData = localStorage.getItem('deepvisas_user_profile');
      if (profileData) {
        try {
          const parsedProfile = JSON.parse(profileData);
          
          return {
            fullName: parsedProfile.fullName || '',
            dateOfBirth: parsedProfile.dateOfBirth ? new Date(parsedProfile.dateOfBirth) : undefined,
            nationality: parsedProfile.nationality || '',
            passportNumber: parsedProfile.passportNumber || '',
            passportExpiryDate: parsedProfile.passportExpiry ? new Date(parsedProfile.passportExpiry) : undefined,
            email: parsedProfile.email || '',
            phoneNumber: parsedProfile.phone || '',
            currentAddress: parsedProfile.city || '',
          };
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      return {};
    }
  });
  
  // Save form data as user types (auto-save functionality)
  useEffect(() => {
    const subscription = form.watch((value) => {
      const valuesToSave = { ...value };
      localStorage.setItem('uk_visa_form', JSON.stringify(valuesToSave));
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  // Handle form submission
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the submitted form data with timestamp
      const submissionData = {
        ...data,
        submissionDate: new Date().toISOString(),
        formType: 'UK Visa Application',
        status: 'Submitted'
      };
      
      // Save to localStorage (in real app, would be saved to backend)
      const existingSubmissions = localStorage.getItem('uk_visa_submissions');
      const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : [];
      submissions.push(submissionData);
      localStorage.setItem('uk_visa_submissions', JSON.stringify(submissions));
      
      // Show success toast
      toast({
        title: t('visaUK.submissionSuccess'),
        description: t('visaUK.submissionSuccessDesc'),
        variant: "default",
      });
      
      // Update local state
      setFormData(submissionData);
      
      // Clear form data from autosave
      localStorage.removeItem('uk_visa_form');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: t('visaUK.submissionError'),
        description: t('visaUK.submissionErrorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t('visaUK.title')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t('visaUK.description')}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>UK</span>
            </Badge>
          </div>
          
          {formData ? (
            <Card className="border dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  {t('visaUK.applicationSubmitted')}
                </CardTitle>
                <CardDescription>
                  {t('visaUK.applicationSubmittedDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('visaUK.referenceNumber')}: UK-{Math.floor(Math.random() * 100000).toString().padStart(6, '0')}
                </p>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  {t('visaUK.submissionDate')}: {format(new Date(formData.submissionDate), 'PPP')}
                </p>
                <div className="mt-6">
                  <Button 
                    onClick={() => setFormData(null)}
                    variant="outline"
                  >
                    {t('visaUK.startNewApplication')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="personal-info"
                  className="w-full"
                >
                  {/* Personal Information Section */}
                  <AccordionItem value="personal-info" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <IdCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.personalInfo')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.fullName')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={language === 'en' ? "Full name as in passport" : "Pasaporttaki tam adınız"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t('profile.dateOfBirth')}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>{language === 'en' ? "Select date" : "Tarih seçin"}</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="placeOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.placeOfBirth')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={language === 'en' ? "City and country of birth" : "Doğum yeri (şehir ve ülke)"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.nationality')}</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue 
                                      placeholder={language === 'en' ? "Select your nationality" : "Uyruğunuzu seçin"} 
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {nationalityOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {language === 'en' ? option.labelEn : option.labelTr}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="passportNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.passportNumber')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={language === 'en' ? "Passport number" : "Pasaport numarası"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="passportIssueDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t('visaUK.passportIssueDate')}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>{language === 'en' ? "Select date" : "Tarih seçin"}</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() 
                                    }
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="passportExpiryDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t('profile.passportExpiry')}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>{language === 'en' ? "Select date" : "Tarih seçin"}</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date()
                                    }
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Contact Information Section */}
                  <AccordionItem value="contact-info" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.contactInfo')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.email')}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder={language === 'en' ? "Email address" : "E-posta adresi"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.phone')}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder={language === 'en' ? "+1 234 567 8900" : "+90 530 123 4567"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="currentAddress"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>{t('visaUK.currentAddress')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={language === 'en' ? "Your current residential address" : "Şu anki ikamet adresiniz"}
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Travel Information Section */}
                  <AccordionItem value="travel-info" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.travelInfo')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="plannedArrivalDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t('visaUK.plannedArrival')}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>{language === 'en' ? "Select date" : "Tarih seçin"}</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="plannedDepartureDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t('visaUK.plannedDeparture')}</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>{language === 'en' ? "Select date" : "Tarih seçin"}</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => 
                                      date < (form.watch('plannedArrivalDate') || new Date())
                                    }
                                    initialFocus
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="purposeOfVisit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.purpose')}</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue 
                                      placeholder={language === 'en' ? "Select purpose" : "Ziyaret amacını seçin"} 
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {purposeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {language === 'en' ? option.labelEn : option.labelTr}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="visitDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.duration')}</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue 
                                      placeholder={language === 'en' ? "Select duration" : "Süre seçin"} 
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {durationOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {language === 'en' ? option.labelEn : option.labelTr}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="accommodationDetails"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>{t('visaUK.accommodation')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={language === 'en' ? "Where will you stay in the UK?" : "İngiltere'de nerede kalacaksınız?"}
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Employment & Financial Section */}
                  <AccordionItem value="employment-info" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.employmentFinancial')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="currentEmployment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.employment')}</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue 
                                      placeholder={language === 'en' ? "Select employment status" : "Çalışma durumunu seçin"} 
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {employmentOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {language === 'en' ? option.labelEn : option.labelTr}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="monthlyIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.monthlyIncome')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={language === 'en' ? "e.g. 2,500 USD" : "örn. 25.000 TL"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="fundsAvailable"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>{t('visaUK.availableFunds')}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={language === 'en' ? "Total funds available for this trip" : "Bu seyahat için uygun toplam fon"}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                {language === 'en' 
                                  ? "Provide an estimate of funds available for your UK visit" 
                                  : "İngiltere ziyaretiniz için uygun fon miktarını belirtin"
                                }
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Travel History Section */}
                  <AccordionItem value="travel-history" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.travelHistory')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="previousUKVisits"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.previousVisits')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={language === 'en' ? "Details of any previous visits to the UK in the last 10 years" : "Son 10 yılda İngiltere'ye yaptığınız ziyaretlerin detayları"}
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                {language === 'en' 
                                  ? "Include dates, duration and purpose of visits" 
                                  : "Tarih, süre ve ziyaret amacını belirtin"
                                }
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="previousVisaRefusals"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.visaRefusals')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={language === 'en' ? "Have you ever been refused a visa for any country?" : "Herhangi bir ülke için vize başvurunuz reddedildi mi?"}
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                {language === 'en' 
                                  ? "If yes, provide details including country, date, and reason if known" 
                                  : "Evetse, ülke, tarih ve biliniyorsa nedeni dahil olmak üzere detayları belirtin"
                                }
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="travelHistory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('visaUK.otherTravelHistory')}</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder={language === 'en' ? "List countries visited in the last 10 years" : "Son 10 yılda ziyaret ettiğiniz ülkeleri listeleyin"}
                                  className="resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                {language === 'en' 
                                  ? "Include approximate dates of travel" 
                                  : "Yaklaşık seyahat tarihlerini belirtin"
                                }
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Additional Information */}
                  <AccordionItem value="additional-info" className="border dark:border-gray-700">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{t('visaUK.additionalInfo')}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('visaUK.anyOtherInfo')}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={language === 'en' ? "Any other information you wish to provide in support of your application" : "Başvurunuzu desteklemek için sağlamak istediğiniz başka bilgi"}
                                className="resize-none min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              {language === 'en' 
                                ? "Optional: Include any relevant details that may support your application" 
                                : "İsteğe bağlı: Başvurunuzu destekleyebilecek ilgili detayları ekleyin"
                              }
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => form.reset()}
                    className="order-1 sm:order-none"
                  >
                    {t('profile.cancel')}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={isSubmitting ? "opacity-80" : ""}
                  >
                    {isSubmitting 
                      ? (language === 'en' ? "Submitting..." : "Gönderiliyor...")
                      : (language === 'en' ? "Submit Application" : "Başvuruyu Gönder")
                    }
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UKVisaRequirements;

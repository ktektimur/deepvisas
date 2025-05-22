
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Calendar, Globe, IdCard, Mail, Phone, MessageSquare, MapPin, FileText, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const VisaSubmissionView = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    // Fetch submission data from localStorage or API
    const fetchSubmission = () => {
      setLoading(true);
      
      // Get all UK visa submissions from localStorage
      const submissionsData = localStorage.getItem('uk_visa_submissions');
      if (submissionsData) {
        try {
          const allSubmissions = JSON.parse(submissionsData);
          // Find the specific submission by ID
          const found = allSubmissions.find((sub: any, index: number) => 
            index.toString() === submissionId || sub.id === submissionId
          );
          
          if (found) {
            setSubmission(found);
          }
        } catch (error) {
          console.error('Error parsing submissions:', error);
        }
      }
      
      setLoading(false);
    };

    fetchSubmission();
  }, [submissionId]);

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return String(dateString) || 'N/A';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-6">
            <Card className="dark:bg-gray-800 border dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 animate-pulse"></div>
                  <div className="mt-4 w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="mt-2 w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!submission) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <Card className="dark:bg-gray-800 border dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  {language === 'en' ? 'Submission Not Found' : 'Başvuru Bulunamadı'}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'The requested visa submission could not be found.' 
                    : 'İstenen vize başvurusu bulunamadı.'}
                </p>
                <Button 
                  className="mt-6" 
                  onClick={() => navigate('/admin/visa-submissions')}
                >
                  {language === 'en' ? 'Back to Submissions' : 'Başvurulara Geri Dön'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Back button and header */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/visa-submissions')}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === 'en' ? 'Back to All Submissions' : 'Tüm Başvurulara Geri Dön'}
            </Button>
            
            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              {submission.status || (language === 'en' ? 'Submitted' : 'Gönderildi')}
            </Badge>
          </div>
          
          {/* Submission Overview Card */}
          <Card className="dark:bg-gray-800 border dark:border-gray-700">
            <CardHeader className="border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    {submission.fullName}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'UK Visa Application' : 'İngiltere Vize Başvurusu'} - 
                    {submission.submissionDate && ` ${formatDate(submission.submissionDate)}`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {language === 'en' ? 'Submitted' : 'Gönderildi'}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {language === 'en' ? 'Personal Information' : 'Kişisel Bilgiler'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Full Name' : 'Ad Soyad'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.fullName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Date of Birth' : 'Doğum Tarihi'}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {submission.dateOfBirth && formatDate(submission.dateOfBirth)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Place of Birth' : 'Doğum Yeri'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.placeOfBirth}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Nationality' : 'Uyruk'}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {submission.nationality}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <IdCard className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Passport Number' : 'Pasaport Numarası'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.passportNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Passport Expiry' : 'Pasaport Geçerlilik Tarihi'}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {submission.passportExpiryDate && formatDate(submission.passportExpiryDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact & Travel Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {language === 'en' ? 'Contact Information' : 'İletişim Bilgileri'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Email' : 'E-posta'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Phone Number' : 'Telefon Numarası'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.phoneNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Current Address' : 'Mevcut Adres'}
                          </p>
                          <p className="text-gray-900 dark:text-white">{submission.currentAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {language === 'en' ? 'Travel Details' : 'Seyahat Detayları'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Planned Arrival' : 'Planlanan Varış'}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {submission.plannedArrivalDate && formatDate(submission.plannedArrivalDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Planned Departure' : 'Planlanan Dönüş'}
                          </p>
                          <p className="text-gray-900 dark:text-white">
                            {submission.plannedDepartureDate && formatDate(submission.plannedDepartureDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Purpose of Visit' : 'Ziyaret Amacı'}
                          </p>
                          <p className="text-gray-900 dark:text-white capitalize">{submission.purposeOfVisit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Employment & Financial Information */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {language === 'en' ? 'Employment & Financial Information' : 'İstihdam ve Finansal Bilgiler'}
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Employment Status' : 'Çalışma Durumu'}
                        </p>
                        <p className="text-gray-900 dark:text-white capitalize">{submission.currentEmployment}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Monthly Income' : 'Aylık Gelir'}
                        </p>
                        <p className="text-gray-900 dark:text-white">{submission.monthlyIncome}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Available Funds' : 'Mevcut Fonlar'}
                        </p>
                        <p className="text-gray-900 dark:text-white">{submission.fundsAvailable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Travel History */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {language === 'en' ? 'Travel History' : 'Seyahat Geçmişi'}
                </h3>
                <div className="mt-4 space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Previous UK Visits' : 'Önceki İngiltere Ziyaretleri'}
                    </p>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">
                      {submission.previousUKVisits || (language === 'en' ? 'None reported' : 'Belirtilmedi')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Visa Refusals' : 'Vize Redleri'}
                    </p>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">
                      {submission.previousVisaRefusals || (language === 'en' ? 'None reported' : 'Belirtilmedi')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Other Travel History' : 'Diğer Seyahat Geçmişi'}
                    </p>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">
                      {submission.travelHistory || (language === 'en' ? 'None reported' : 'Belirtilmedi')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Additional Information' : 'Ek Bilgi'}
                    </p>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">
                      {submission.additionalInfo || (language === 'en' ? 'None provided' : 'Belirtilmedi')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t dark:border-gray-700 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/visa-submissions')}
                className="text-gray-700 dark:text-gray-300"
              >
                {language === 'en' ? 'Back' : 'Geri'}
              </Button>
              
              <div className="space-x-2">
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20">
                  {language === 'en' ? 'Approve' : 'Onayla'}
                </Button>
                <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20">
                  {language === 'en' ? 'Request More Info' : 'Daha Fazla Bilgi İste'}
                </Button>
                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                  {language === 'en' ? 'Reject' : 'Reddet'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VisaSubmissionView;

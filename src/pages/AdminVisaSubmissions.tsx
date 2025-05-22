
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  ArrowUpDown, 
  ChevronRight,
  FileText,
  Globe
} from 'lucide-react';

interface VisaSubmission {
  id?: string | number;
  fullName: string;
  nationality: string;
  email: string;
  purposeOfVisit: string;
  submissionDate: string;
  status: string;
  formType: string;
}

const AdminVisaSubmissions = () => {
  const [submissions, setSubmissions] = useState<VisaSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<VisaSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visaType, setVisaType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Fetch submissions on component mount
  useEffect(() => {
    const fetchSubmissions = () => {
      setIsLoading(true);
      
      // In a real app, we'd fetch from an API, but for now, we'll use localStorage
      const savedSubmissions = localStorage.getItem('uk_visa_submissions');
      
      setTimeout(() => {
        let allSubmissions: VisaSubmission[] = [];
        
        if (savedSubmissions) {
          try {
            const parsedSubmissions = JSON.parse(savedSubmissions);
            // Add ids to submissions if they don't have them
            allSubmissions = parsedSubmissions.map((sub: any, index: number) => ({
              ...sub,
              id: sub.id || index
            }));
          } catch (error) {
            console.error('Error parsing submissions:', error);
          }
        }
        
        setSubmissions(allSubmissions);
        setFilteredSubmissions(allSubmissions);
        setIsLoading(false);
      }, 500);
    };

    fetchSubmissions();
  }, []);
  
  // Filter and sort submissions when search term, visa type or sort order changes
  useEffect(() => {
    const filterSubmissions = () => {
      let filtered = [...submissions];
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(sub => 
          sub.fullName.toLowerCase().includes(term) || 
          sub.email.toLowerCase().includes(term) || 
          (sub.nationality && sub.nationality.toLowerCase().includes(term))
        );
      }
      
      // Filter by visa type
      if (visaType !== 'all') {
        filtered = filtered.filter(sub => sub.formType.includes(visaType));
      }
      
      // Sort by submission date
      filtered.sort((a, b) => {
        const dateA = new Date(a.submissionDate).getTime();
        const dateB = new Date(b.submissionDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      
      setFilteredSubmissions(filtered);
    };
    
    filterSubmissions();
  }, [searchTerm, visaType, sortOrder, submissions]);

  // Handle click on submission row
  const handleSubmissionClick = (submissionId: string | number) => {
    navigate(`/admin/visa-submissions/${submissionId}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t('admin.visaSubmissions') || 'Visa Submissions'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t('admin.visaSubmissionsDesc') || 'Review and manage visa form submissions'}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="self-start sm:self-auto flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{filteredSubmissions.length} {language === 'en' ? 'Submission' : 'Başvuru'}{filteredSubmissions.length !== 1 ? 's' : ''}</span>
            </Badge>
          </div>
          
          <Card className="dark:bg-gray-800 border dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                {t('admin.allSubmissions') || 'All Submissions'}
              </CardTitle>
              <CardDescription>
                {t('admin.allSubmissionsDesc') || 'View and manage all visa submissions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={language === 'en' ? "Search by name, email or nationality..." : "İsim, e-posta veya uyruk ile arama yap..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white dark:bg-gray-900"
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={visaType}
                    onValueChange={setVisaType}
                  >
                    <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900">
                      <SelectValue placeholder={language === 'en' ? "Filter by visa type" : "Vize tipine göre filtrele"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === 'en' ? 'All Types' : 'Tüm Tipler'}</SelectItem>
                      <SelectItem value="UK">{language === 'en' ? 'UK Visa' : 'İngiltere Vizesi'}</SelectItem>
                      <SelectItem value="Schengen">{language === 'en' ? 'Schengen Visa' : 'Schengen Vizesi'}</SelectItem>
                      <SelectItem value="US">{language === 'en' ? 'US Visa' : 'ABD Vizesi'}</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="bg-white dark:bg-gray-900"
                    title={language === 'en' ? "Toggle sort order" : "Sıralama düzenini değiştir"}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="w-full h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                  ))}
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                    {language === 'en' ? 'No submissions found' : 'Başvuru bulunamadı'}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'There are no visa submissions matching your criteria.' : 'Kriterlerinize uygun vize başvurusu bulunmamaktadır.'}
                  </p>
                </div>
              ) : (
                <div className="rounded-md border dark:border-gray-700">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                        <TableHead className="w-[250px] font-medium">{language === 'en' ? 'Applicant' : 'Başvuran'}</TableHead>
                        <TableHead className="font-medium">{language === 'en' ? 'Nationality' : 'Uyruk'}</TableHead>
                        <TableHead className="font-medium">{language === 'en' ? 'Type' : 'Tip'}</TableHead>
                        <TableHead className="font-medium">{language === 'en' ? 'Purpose' : 'Amaç'}</TableHead>
                        <TableHead className="font-medium">{language === 'en' ? 'Submitted' : 'Gönderildi'}</TableHead>
                        <TableHead className="font-medium">{language === 'en' ? 'Status' : 'Durum'}</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission, index) => (
                        <TableRow 
                          key={index}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                          onClick={() => handleSubmissionClick(submission.id || index)}
                        >
                          <TableCell className="font-medium">{submission.fullName}</TableCell>
                          <TableCell>{submission.nationality}</TableCell>
                          <TableCell>{submission.formType?.includes('UK') ? 'UK Visa' : submission.formType}</TableCell>
                          <TableCell className="capitalize">{submission.purposeOfVisit}</TableCell>
                          <TableCell>{formatDate(submission.submissionDate)}</TableCell>
                          <TableCell>
                            <Badge variant={submission.status === 'Approved' ? 'default' : 'outline'} className={
                              submission.status === 'Approved' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                : submission.status === 'Rejected'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                            }>
                              {submission.status || 'Submitted'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminVisaSubmissions;

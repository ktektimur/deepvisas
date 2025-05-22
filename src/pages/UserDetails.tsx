
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
import { ArrowLeft, User, Calendar, Globe, Passport, Mail, Phone, MessageSquare, MapPin, FileText } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface UserProfile {
  id: number;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
  telegram: string;
  city: string;
  visaType: string;
  lastUpdated: string;
  status: string;
  trackedCountries: string[];
  lastLogin: string;
}

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Mock data retrieval - in a real app would be an API call
    const fetchUserDetails = () => {
      setLoading(true);
      
      // This simulates fetching from a database/API
      // For demo purposes, use the mock data from AdminUserProfiles
      const mockProfiles = [
        {
          id: 1,
          fullName: 'John Smith',
          dateOfBirth: '1990-01-01',
          nationality: 'Turkey',
          passportNumber: 'U12345678',
          passportExpiry: '2030-06-15',
          email: 'john@example.com',
          phone: '+90 530 000 00 01',
          telegram: '@johnsmith',
          city: 'Istanbul',
          visaType: 'tourism',
          lastUpdated: '2025-05-10T10:23:45',
          status: 'active',
          trackedCountries: ['USA', 'Germany'],
          lastLogin: '2025-05-15 14:30'
        },
        {
          id: 2,
          fullName: 'Ahmet Yılmaz',
          dateOfBirth: '1985-03-15',
          nationality: 'Turkey',
          passportNumber: 'U87654321',
          passportExpiry: '2029-10-22',
          email: 'ahmet@example.com',
          phone: '+90 530 000 00 02',
          telegram: '@ahmetyilmaz',
          city: 'Ankara',
          visaType: 'business',
          lastUpdated: '2025-05-08T14:12:33',
          status: 'active',
          trackedCountries: ['France', 'Netherlands'],
          lastLogin: '2025-05-14 09:45'
        },
        {
          id: 3,
          fullName: 'Mary Johnson',
          dateOfBirth: '1992-07-25',
          nationality: 'Germany',
          passportNumber: 'G123456789',
          passportExpiry: '2028-04-30',
          email: 'mary@example.com',
          phone: '+49 123 456 7890',
          telegram: '@maryj',
          city: 'Berlin',
          visaType: 'student',
          lastUpdated: '2025-05-12T09:45:21',
          status: 'active',
          trackedCountries: ['UK', 'USA'],
          lastLogin: '2025-05-13 16:22'
        },
        {
          id: 4,
          fullName: 'Ahmed Al-Faisal',
          dateOfBirth: '1988-11-03',
          nationality: 'Iraq',
          passportNumber: 'I987654321',
          passportExpiry: '2026-08-12',
          email: 'ahmed@example.com',
          phone: '+964 750 123 4567',
          telegram: '@ahmedf',
          city: 'Baghdad',
          visaType: 'family',
          lastUpdated: '2025-05-15T16:30:10',
          status: 'suspended',
          trackedCountries: ['Germany', 'Turkey'],
          lastLogin: '2025-05-10 08:15'
        }
      ];
      
      // Check if there's any profile data in localStorage
      const savedProfile = localStorage.getItem('deepvisas_user_profile');
      if (savedProfile) {
        try {
          const profileData = JSON.parse(savedProfile);
          const localUserProfile = {
            id: mockProfiles.length + 1,
            ...profileData,
            status: 'active',
            trackedCountries: profileData.trackedCountries || ['USA'],
            lastLogin: new Date().toISOString().slice(0, 10) + ' ' + new Date().toTimeString().slice(0, 5),
            dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().slice(0, 10) : '',
            passportExpiry: profileData.passportExpiry ? new Date(profileData.passportExpiry).toISOString().slice(0, 10) : '',
            lastUpdated: new Date().toISOString()
          };
          
          // Add local profile to mock data if it doesn't exist
          const existingProfileIndex = mockProfiles.findIndex(profile => profile.email === localUserProfile.email);
          
          if (existingProfileIndex === -1) {
            mockProfiles.push(localUserProfile);
          } else {
            mockProfiles[existingProfileIndex] = {
              ...mockProfiles[existingProfileIndex],
              ...localUserProfile,
              id: mockProfiles[existingProfileIndex].id
            };
          }
        } catch (error) {
          console.error("Error parsing user profile:", error);
        }
      }
      
      // Find the user based on the ID
      const parsedId = parseInt(userId || '0', 10);
      const foundUser = mockProfiles.find(profile => profile.id === parsedId);
      
      setTimeout(() => {
        setUser(foundUser || null);
        setLoading(false);
      }, 500); // Simulate network delay
    };

    fetchUserDetails();
  }, [userId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PP');
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Back button and header */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/users')}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('admin.backToUsers')}
            </Button>
            
            <Badge className={
              user?.status === 'active' 
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-800"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-800"
            }>
              {user?.status || 'Unknown'}
            </Badge>
          </div>

          {loading ? (
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
          ) : !user ? (
            <Card className="dark:bg-gray-800 border dark:border-gray-700">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <User className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
                  <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">{t('admin.userNotFound')}</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{t('admin.userNotFoundDesc')}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* User Profile Overview Card */}
              <Card className="dark:bg-gray-800 border dark:border-gray-700">
                <CardHeader className="border-b dark:border-gray-700">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    {user.fullName}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {t('admin.userDetailDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('profile.personalInfo')}</h3>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.dateOfBirth')}</p>
                              <p className="text-gray-900 dark:text-white">{formatDate(user.dateOfBirth)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.nationality')}</p>
                              <p className="text-gray-900 dark:text-white">{user.nationality}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.currentCity')}</p>
                              <p className="text-gray-900 dark:text-white">{user.city}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Passport className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.passportNumber')}</p>
                              <p className="text-gray-900 dark:text-white">{user.passportNumber}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.passportExpiry')}</p>
                              <p className="text-gray-900 dark:text-white">{formatDate(user.passportExpiry)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('profile.contactInfo')}</h3>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.email')}</p>
                              <p className="text-gray-900 dark:text-white">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.phone')}</p>
                              <p className="text-gray-900 dark:text-white">{user.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.telegramUsername')}</p>
                              <p className="text-gray-900 dark:text-white">{user.telegram || 'Not provided'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('profile.visaType')}</p>
                              <p className="text-gray-900 dark:text-white capitalize">{user.visaType}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Activity and Tracking Card */}
              <Card className="dark:bg-gray-800 border dark:border-gray-700">
                <CardHeader className="border-b dark:border-gray-700">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('admin.trackingActivity')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.trackedCountries')}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {user.trackedCountries?.length > 0 ? (
                          user.trackedCountries.map((country, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-1 px-2 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800">
                              {country}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">{t('admin.noTrackedCountries')}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.activityLog')}</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{t('admin.lastLogin')}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.lastLogin}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{t('admin.lastUpdated')}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(user.lastUpdated)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t dark:border-gray-700 flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/users')}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {t('admin.backToAllUsers')}
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;

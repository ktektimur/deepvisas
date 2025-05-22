
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';
import { User, Search, Download } from 'lucide-react';

interface UserProfileData {
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
}

const AdminUserProfiles = () => {
  const { t } = useLanguage();
  const [userProfiles, setUserProfiles] = useState<UserProfileData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfileData | null>(null);

  // Fetch user profiles - in a real app, this would be an API call
  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockProfiles: UserProfileData[] = [
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
        lastUpdated: '2025-05-10T10:23:45'
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
        lastUpdated: '2025-05-08T14:12:33'
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
        lastUpdated: '2025-05-12T09:45:21'
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
        lastUpdated: '2025-05-15T16:30:10'
      }
    ];

    // Simulate loading data
    setTimeout(() => {
      setUserProfiles(mockProfiles);
    }, 500);

    // Check if there's any profile data in localStorage from the UserProfile component
    const savedProfile = localStorage.getItem('deepvisas_user_profile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      const localUserProfile = {
        id: mockProfiles.length + 1,
        ...profileData,
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString().slice(0, 10) : '',
        passportExpiry: profileData.passportExpiry ? new Date(profileData.passportExpiry).toISOString().slice(0, 10) : '',
        lastUpdated: new Date().toISOString()
      };
      
      // Check if we already have this email in our mock data
      const existingProfileIndex = mockProfiles.findIndex(profile => profile.email === localUserProfile.email);
      
      if (existingProfileIndex === -1) {
        // Add local profile to mock data if it doesn't exist
        mockProfiles.push(localUserProfile);
      } else {
        // Update existing profile
        mockProfiles[existingProfileIndex] = {
          ...mockProfiles[existingProfileIndex],
          ...localUserProfile,
          id: mockProfiles[existingProfileIndex].id
        };
      }
      
      setUserProfiles(mockProfiles);
    }
  }, []);

  // Filter profiles based on search query
  const filteredProfiles = userProfiles.filter((profile) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.fullName.toLowerCase().includes(searchLower) ||
      profile.email.toLowerCase().includes(searchLower) ||
      profile.nationality.toLowerCase().includes(searchLower) ||
      profile.visaType.toLowerCase().includes(searchLower) ||
      profile.city.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PP');
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  // Handle profile selection for detail view
  const handleProfileSelect = (profile: UserProfileData) => {
    setSelectedProfile(profile);
  };

  // Export user profiles as CSV
  const exportToCSV = () => {
    // Create CSV header
    const headers = Object.keys(userProfiles[0]).join(',');
    
    // Create CSV rows
    const rows = userProfiles.map(profile => {
      return Object.values(profile).map(value => {
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',');
    });
    
    // Combine header and rows
    const csv = [headers, ...rows].join('\n');
    
    // Create a download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'user_profiles.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profiles</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage all user profiles</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and List */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800 border dark:border-gray-700">
              <CardHeader className="border-b dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>
                  {filteredProfiles.length} {filteredProfiles.length === 1 ? 'user' : 'users'} found
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Nationality</TableHead>
                        <TableHead>Visa Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.map((profile) => (
                        <TableRow 
                          key={profile.id}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => handleProfileSelect(profile)}
                        >
                          <TableCell className="font-medium">{profile.fullName}</TableCell>
                          <TableCell>{profile.nationality}</TableCell>
                          <TableCell className="capitalize">{profile.visaType}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProfileSelect(profile);
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* User Profile Detail */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 border dark:border-gray-700">
              <CardHeader className="border-b dark:border-gray-700">
                <CardTitle className="flex items-center">
                  {selectedProfile ? (
                    <>
                      <User className="mr-2 h-5 w-5 text-primary" />
                      User Details
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-5 w-5" />
                      Select a User
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedProfile ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{selectedProfile.fullName}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Last updated: {formatDate(selectedProfile.lastUpdated)}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white">{selectedProfile.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-gray-900 dark:text-white">{selectedProfile.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                        <p className="text-gray-900 dark:text-white">{formatDate(selectedProfile.dateOfBirth)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nationality</p>
                        <p className="text-gray-900 dark:text-white">{selectedProfile.nationality}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current City</p>
                        <p className="text-gray-900 dark:text-white">{selectedProfile.city}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Passport Number</p>
                          <p className="text-gray-900 dark:text-white">{selectedProfile.passportNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Passport Expiry</p>
                          <p className="text-gray-900 dark:text-white">{formatDate(selectedProfile.passportExpiry)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visa Type</p>
                          <p className="text-gray-900 dark:text-white capitalize">{selectedProfile.visaType}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Telegram</p>
                          <p className="text-gray-900 dark:text-white">{selectedProfile.telegram || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <User className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-600 mb-3" />
                    <p>Select a user from the list to view their details.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUserProfiles;

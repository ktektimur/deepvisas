
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IdCard, FileText, Phone } from 'lucide-react';

// --- Types ---
type GreeceVisaFormData = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  travelPurpose: string;
  arrivalDate: string;
  departureDate: string;
  email: string;
  phone: string;
  address: string;
  employer?: string;
  monthlyIncome?: string;
  sponsorName?: string;
  sponsorRelationship?: string;
  sponsorContact?: string;
  additionalInfo?: string;
};

// --- LocalStorage helpers ---
const STORAGE_KEY = 'greeceVisaSubmissions';

function getSubmissions(): GreeceVisaFormData[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSubmission(data: Omit<GreeceVisaFormData, 'id'>) {
  const submissions = getSubmissions();
  submissions.push({ id: Date.now().toString(), ...data });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

// --- Form component ---
function GreeceVisaForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Omit<GreeceVisaFormData, 'id'>>({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    nationality: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    travelPurpose: '',
    arrivalDate: '',
    departureDate: '',
    email: '',
    phone: '',
    address: '',
    employer: '',
    monthlyIncome: '',
    sponsorName: '',
    sponsorRelationship: '',
    sponsorContact: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation example:
    if (!formData.firstName || !formData.lastName || !formData.passportNumber) {
      alert('Please fill in the required fields: First Name, Last Name, Passport Number');
      return;
    }

    saveSubmission(formData);
    alert('Your application has been successfully submitted!');
    onSubmitSuccess();
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      nationality: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      travelPurpose: '',
      arrivalDate: '',
      departureDate: '',
      email: '',
      phone: '',
      address: '',
      employer: '',
      monthlyIncome: '',
      sponsorName: '',
      sponsorRelationship: '',
      sponsorContact: '',
      additionalInfo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <IdCard className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold">Greece Visa Application Form</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">First Name:</label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Last Name:</label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Gender:</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Date of Birth:</label>
        <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Nationality:</label>
        <Input name="nationality" value={formData.nationality} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Passport Number:</label>
        <Input name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Passport Issue Date:</label>
          <Input type="date" name="passportIssueDate" value={formData.passportIssueDate} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Passport Expiry Date:</label>
          <Input type="date" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Purpose of Travel:</label>
        <Input name="travelPurpose" value={formData.travelPurpose} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Arrival Date:</label>
          <Input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Departure Date:</label>
          <Input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email:</label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <Phone className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">Phone:</label>
        </div>
        <Input name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Address:</label>
        <Textarea name="address" value={formData.address} onChange={handleChange} rows={3} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">Employment Information</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Employer:</label>
            <Input name="employer" value={formData.employer} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Monthly Income:</label>
            <Input name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">Sponsorship Information (if applicable)</label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Sponsor Name:</label>
            <Input name="sponsorName" value={formData.sponsorName} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Relationship to Sponsor:</label>
            <Input name="sponsorRelationship" value={formData.sponsorRelationship} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Sponsor Contact:</label>
            <Input name="sponsorContact" value={formData.sponsorContact} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Additional Information:</label>
        <Textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} />
      </div>

      <Button type="submit" className="w-full md:w-auto">
        Submit Application
      </Button>
    </form>
  );
}

// --- Admin panel component ---
function GreeceVisaAdminPanel() {
  const [submissions, setSubmissions] = useState<GreeceVisaFormData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const selectedSubmission = submissions.find((s) => s.id === selectedId) || null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Greece Visa Applications Admin Panel</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 overflow-auto max-h-[80vh] border-r pr-4">
          <h3 className="text-xl font-semibold mb-4">Applications</h3>
          {submissions.length === 0 && <p className="text-gray-500">No applications yet.</p>}
          <ul className="space-y-2">
            {submissions.map((sub) => (
              <li
                key={sub.id}
                className={`cursor-pointer p-3 rounded-md hover:bg-blue-50 transition-colors ${
                  selectedId === sub.id ? 'bg-blue-100 border-l-4 border-primary' : ''
                }`}
                onClick={() => setSelectedId(sub.id)}
              >
                <div className="font-medium">{sub.firstName} {sub.lastName}</div>
                <div className="text-sm text-gray-600">Passport: {sub.passportNumber}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:w-2/3 overflow-auto max-h-[80vh] p-4">
          <h3 className="text-xl font-semibold mb-4">Application Details</h3>
          {!selectedSubmission && <p className="text-gray-500">Please select an application.</p>}
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Personal Information</h4>
                  <p>
                    <span className="font-medium">Full Name:</span> {selectedSubmission.firstName} {selectedSubmission.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span> {selectedSubmission.gender || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Date of Birth:</span> {selectedSubmission.birthDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Nationality:</span> {selectedSubmission.nationality || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Passport Information</h4>
                  <p>
                    <span className="font-medium">Passport No:</span> {selectedSubmission.passportNumber}
                  </p>
                  <p>
                    <span className="font-medium">Issue Date:</span> {selectedSubmission.passportIssueDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Expiry Date:</span> {selectedSubmission.passportExpiryDate || '-'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Travel Information</h4>
                  <p>
                    <span className="font-medium">Purpose:</span> {selectedSubmission.travelPurpose || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Arrival Date:</span> {selectedSubmission.arrivalDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Departure Date:</span> {selectedSubmission.departureDate || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Contact Information</h4>
                  <p>
                    <span className="font-medium">Email:</span> {selectedSubmission.email || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {selectedSubmission.phone || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {selectedSubmission.address || '-'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Employment Information</h4>
                  <p>
                    <span className="font-medium">Employer:</span> {selectedSubmission.employer || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Monthly Income:</span> {selectedSubmission.monthlyIncome || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Sponsorship Information</h4>
                  <p>
                    <span className="font-medium">Sponsor:</span> {selectedSubmission.sponsorName || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Relationship:</span> {selectedSubmission.sponsorRelationship || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {selectedSubmission.sponsorContact || '-'}
                  </p>
                </div>
              </div>
              
              {selectedSubmission.additionalInfo && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Additional Information</h4>
                  <p>{selectedSubmission.additionalInfo}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Main page / route component ---
export default function GreeceVisaRequirements() {
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <DashboardLayout>
      <div className="responsive-container py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Greece Visa Application</h1>
            <p className="text-gray-600">
              Complete the form below to apply for a Greece visa
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAdmin((v) => !v)}
            title="Toggle admin panel"
          >
            {isAdmin ? 'User Mode' : 'Admin Mode'}
          </Button>
        </div>

        {!isAdmin && !formSubmitted && (
          <GreeceVisaForm onSubmitSuccess={() => setFormSubmitted(true)} />
        )}

        {!isAdmin && formSubmitted && (
          <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-lg shadow-sm border">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="mb-4 text-xl text-green-600 font-semibold">
              Your application has been successfully submitted. Thank you!
            </p>
            <Button
              onClick={() => setFormSubmitted(false)}
              variant="outline"
            >
              Submit another application
            </Button>
          </div>
        )}

        {isAdmin && <GreeceVisaAdminPanel />}
      </div>
    </DashboardLayout>
  );
}

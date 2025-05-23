
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
  const { t, language } = useLanguage();
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
      alert(language === 'en' ? 'Please fill in the required fields: First Name, Last Name, Passport Number' : 'Lütfen gerekli alanları doldurun: Ad, Soyad, Pasaport Numarası');
      return;
    }

    saveSubmission(formData);
    alert(language === 'en' ? 'Your application has been successfully submitted!' : 'Başvurunuz başarıyla gönderildi!');
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

  const placeholders = {
    en: {
      firstName: "e.g. John",
      lastName: "e.g. Smith",
      nationality: "e.g. Turkish",
      passportNumber: "e.g. U12345678",
      travelPurpose: "e.g. Tourism, Business",
      email: "e.g. john.smith@example.com",
      phone: "e.g. +90 555 123 4567",
      address: "e.g. Atatürk Mah., Ankara, Turkey",
      employer: "e.g. ABC Company Ltd.",
      monthlyIncome: "e.g. €2,500",
      sponsorName: "e.g. Maria Papadopoulos",
      sponsorRelationship: "e.g. Friend, Family, Employer",
      sponsorContact: "e.g. +30 210 123 4567",
      additionalInfo: "e.g. Any special requirements or circumstances"
    },
    tr: {
      firstName: "örn. Ahmet",
      lastName: "örn. Yılmaz",
      nationality: "örn. Türk",
      passportNumber: "örn. U12345678",
      travelPurpose: "örn. Turizm, İş",
      email: "örn. ahmet.yilmaz@example.com",
      phone: "örn. +90 555 123 4567",
      address: "örn. Atatürk Mah., Ankara, Türkiye",
      employer: "örn. ABC Şirketi Ltd.",
      monthlyIncome: "örn. €2.500",
      sponsorName: "örn. Maria Papadopoulos",
      sponsorRelationship: "örn. Arkadaş, Aile, İşveren",
      sponsorContact: "örn. +30 210 123 4567",
      additionalInfo: "örn. Özel gereksinimler veya durumlar"
    }
  };

  const placeholder = language === 'en' ? placeholders.en : placeholders.tr;
  const formLabels = {
    en: {
      firstName: "First Name:",
      lastName: "Last Name:",
      gender: "Gender:",
      birthDate: "Date of Birth:",
      nationality: "Nationality:",
      passportNumber: "Passport Number:",
      passportIssueDate: "Passport Issue Date:",
      passportExpiryDate: "Passport Expiry Date:",
      travelPurpose: "Purpose of Travel:",
      arrivalDate: "Arrival Date:",
      departureDate: "Departure Date:",
      email: "Email:",
      phone: "Phone:",
      address: "Address:",
      employer: "Employer:",
      monthlyIncome: "Monthly Income:",
      sponsorName: "Sponsor Name:",
      sponsorRelationship: "Relationship to Sponsor:",
      sponsorContact: "Sponsor Contact:",
      additionalInfo: "Additional Information:",
      employment: "Employment Information",
      sponsorship: "Sponsorship Information (if applicable)"
    },
    tr: {
      firstName: "Ad:",
      lastName: "Soyad:",
      gender: "Cinsiyet:",
      birthDate: "Doğum Tarihi:",
      nationality: "Uyruk:",
      passportNumber: "Pasaport Numarası:",
      passportIssueDate: "Pasaport Veriliş Tarihi:",
      passportExpiryDate: "Pasaport Geçerlilik Tarihi:",
      travelPurpose: "Seyahat Amacı:",
      arrivalDate: "Varış Tarihi:",
      departureDate: "Dönüş Tarihi:",
      email: "E-posta:",
      phone: "Telefon:",
      address: "Adres:",
      employer: "İşveren:",
      monthlyIncome: "Aylık Gelir:",
      sponsorName: "Sponsor Adı:",
      sponsorRelationship: "Sponsorla İlişki:",
      sponsorContact: "Sponsor İletişim:",
      additionalInfo: "Ek Bilgiler:",
      employment: "İstihdam Bilgileri",
      sponsorship: "Sponsorluk Bilgileri (varsa)"
    }
  };

  const labels = language === 'en' ? formLabels.en : formLabels.tr;
  const formTitle = language === 'en' ? "Greece Visa Application Form" : "Yunanistan Vize Başvuru Formu";
  const submitButtonText = language === 'en' ? "Submit Application" : "Başvuruyu Gönder";
  const selectOption = language === 'en' ? "Select" : "Seçiniz";
  const genderOptions = language === 'en' ? 
    [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }] :
    [{ value: "Male", label: "Erkek" }, { value: "Female", label: "Kadın" }, { value: "Other", label: "Diğer" }];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <IdCard className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold">{formTitle}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.firstName}</label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder={placeholder.firstName} required />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.lastName}</label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder={placeholder.lastName} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.gender}</label>
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
        >
          <option value="">{selectOption}</option>
          {genderOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.birthDate}</label>
        <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.nationality}</label>
        <Input name="nationality" value={formData.nationality} onChange={handleChange} placeholder={placeholder.nationality} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.passportNumber}</label>
        <Input name="passportNumber" value={formData.passportNumber} onChange={handleChange} placeholder={placeholder.passportNumber} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.passportIssueDate}</label>
          <Input type="date" name="passportIssueDate" value={formData.passportIssueDate} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.passportExpiryDate}</label>
          <Input type="date" name="passportExpiryDate" value={formData.passportExpiryDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.travelPurpose}</label>
        <Input name="travelPurpose" value={formData.travelPurpose} onChange={handleChange} placeholder={placeholder.travelPurpose} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.arrivalDate}</label>
          <Input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">{labels.departureDate}</label>
          <Input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.email}</label>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={placeholder.email} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <Phone className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">{labels.phone}</label>
        </div>
        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder={placeholder.phone} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.address}</label>
        <Textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder={placeholder.address} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">{labels.employment}</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">{labels.employer}</label>
            <Input name="employer" value={formData.employer} onChange={handleChange} placeholder={placeholder.employer} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">{labels.monthlyIncome}</label>
            <Input name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} placeholder={placeholder.monthlyIncome} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-primary h-4 w-4" />
          <label className="block text-sm font-medium">{labels.sponsorship}</label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">{labels.sponsorName}</label>
            <Input name="sponsorName" value={formData.sponsorName} onChange={handleChange} placeholder={placeholder.sponsorName} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">{labels.sponsorRelationship}</label>
            <Input name="sponsorRelationship" value={formData.sponsorRelationship} onChange={handleChange} placeholder={placeholder.sponsorRelationship} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">{labels.sponsorContact}</label>
            <Input name="sponsorContact" value={formData.sponsorContact} onChange={handleChange} placeholder={placeholder.sponsorContact} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">{labels.additionalInfo}</label>
        <Textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} placeholder={placeholder.additionalInfo} />
      </div>

      <Button type="submit" className="w-full md:w-auto">
        {submitButtonText}
      </Button>
    </form>
  );
}

// --- Admin panel component ---
function GreeceVisaAdminPanel() {
  const { language } = useLanguage();
  const [submissions, setSubmissions] = useState<GreeceVisaFormData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const selectedSubmission = submissions.find((s) => s.id === selectedId) || null;
  const adminTitle = language === 'en' ? "Greece Visa Applications Admin Panel" : "Yunanistan Vize Başvuruları Yönetici Paneli";
  const applicationsTitle = language === 'en' ? "Applications" : "Başvurular";
  const detailsTitle = language === 'en' ? "Application Details" : "Başvuru Detayları";
  const selectText = language === 'en' ? "Please select an application." : "Lütfen bir başvuru seçin.";
  const noApplications = language === 'en' ? "No applications yet." : "Henüz başvuru yok.";

  const labels = {
    en: {
      personalInfo: "Personal Information",
      fullName: "Full Name:",
      gender: "Gender:",
      dateOfBirth: "Date of Birth:",
      nationality: "Nationality:",
      passportInfo: "Passport Information",
      passportNo: "Passport No:",
      issueDate: "Issue Date:",
      expiryDate: "Expiry Date:",
      travelInfo: "Travel Information",
      purpose: "Purpose:",
      arrivalDate: "Arrival Date:",
      departureDate: "Departure Date:",
      contactInfo: "Contact Information",
      email: "Email:",
      phone: "Phone:",
      address: "Address:",
      employmentInfo: "Employment Information",
      employer: "Employer:",
      monthlyIncome: "Monthly Income:",
      sponsorshipInfo: "Sponsorship Information",
      sponsor: "Sponsor:",
      relationship: "Relationship:",
      contact: "Contact:",
      additionalInfo: "Additional Information"
    },
    tr: {
      personalInfo: "Kişisel Bilgiler",
      fullName: "Ad Soyad:",
      gender: "Cinsiyet:",
      dateOfBirth: "Doğum Tarihi:",
      nationality: "Uyruk:",
      passportInfo: "Pasaport Bilgileri",
      passportNo: "Pasaport No:",
      issueDate: "Veriliş Tarihi:",
      expiryDate: "Geçerlilik Tarihi:",
      travelInfo: "Seyahat Bilgileri",
      purpose: "Amaç:",
      arrivalDate: "Varış Tarihi:",
      departureDate: "Dönüş Tarihi:",
      contactInfo: "İletişim Bilgileri",
      email: "E-posta:",
      phone: "Telefon:",
      address: "Adres:",
      employmentInfo: "İstihdam Bilgileri",
      employer: "İşveren:",
      monthlyIncome: "Aylık Gelir:",
      sponsorshipInfo: "Sponsorluk Bilgileri",
      sponsor: "Sponsor:",
      relationship: "İlişki:",
      contact: "İletişim:",
      additionalInfo: "Ek Bilgiler"
    }
  };

  const l = language === 'en' ? labels.en : labels.tr;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">{adminTitle}</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 overflow-auto max-h-[80vh] border-r pr-4">
          <h3 className="text-xl font-semibold mb-4">{applicationsTitle}</h3>
          {submissions.length === 0 && <p className="text-gray-500">{noApplications}</p>}
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
          <h3 className="text-xl font-semibold mb-4">{detailsTitle}</h3>
          {!selectedSubmission && <p className="text-gray-500">{selectText}</p>}
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.personalInfo}</h4>
                  <p>
                    <span className="font-medium">{l.fullName}</span> {selectedSubmission.firstName} {selectedSubmission.lastName}
                  </p>
                  <p>
                    <span className="font-medium">{l.gender}</span> {selectedSubmission.gender || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.dateOfBirth}</span> {selectedSubmission.birthDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.nationality}</span> {selectedSubmission.nationality || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.passportInfo}</h4>
                  <p>
                    <span className="font-medium">{l.passportNo}</span> {selectedSubmission.passportNumber}
                  </p>
                  <p>
                    <span className="font-medium">{l.issueDate}</span> {selectedSubmission.passportIssueDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.expiryDate}</span> {selectedSubmission.passportExpiryDate || '-'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.travelInfo}</h4>
                  <p>
                    <span className="font-medium">{l.purpose}</span> {selectedSubmission.travelPurpose || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.arrivalDate}</span> {selectedSubmission.arrivalDate || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.departureDate}</span> {selectedSubmission.departureDate || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.contactInfo}</h4>
                  <p>
                    <span className="font-medium">{l.email}</span> {selectedSubmission.email || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.phone}</span> {selectedSubmission.phone || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.address}</span> {selectedSubmission.address || '-'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.employmentInfo}</h4>
                  <p>
                    <span className="font-medium">{l.employer}</span> {selectedSubmission.employer || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.monthlyIncome}</span> {selectedSubmission.monthlyIncome || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">{l.sponsorshipInfo}</h4>
                  <p>
                    <span className="font-medium">{l.sponsor}</span> {selectedSubmission.sponsorName || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.relationship}</span> {selectedSubmission.sponsorRelationship || '-'}
                  </p>
                  <p>
                    <span className="font-medium">{l.contact}</span> {selectedSubmission.sponsorContact || '-'}
                  </p>
                </div>
              </div>
              
              {selectedSubmission.additionalInfo && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">{l.additionalInfo}</h4>
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
  const { t, language } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const pageTitle = language === 'en' ? "Greece Visa Application" : "Yunanistan Vize Başvurusu";
  const pageDescription = language === 'en' ? "Complete the form below to apply for a Greece visa" : "Yunanistan vizesine başvurmak için aşağıdaki formu doldurun";
  const toggleButtonText = language === 'en' ? (isAdmin ? 'User Mode' : 'Admin Mode') : (isAdmin ? 'Kullanıcı Modu' : 'Yönetici Modu');
  const successMessage = language === 'en' ? "Your application has been successfully submitted. Thank you!" : "Başvurunuz başarıyla gönderildi. Teşekkür ederiz!";
  const submitAnotherText = language === 'en' ? "Submit another application" : "Başka bir başvuru gönder";

  return (
    <DashboardLayout>
      <div className="responsive-container py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-gray-600">
              {pageDescription}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAdmin((v) => !v)}
            title={language === 'en' ? "Toggle admin panel" : "Yönetici panelini aç/kapa"}
          >
            {toggleButtonText}
          </Button>
        </div>

        {!isAdmin && !formSubmitted && (
          <GreeceVisaForm onSubmitSuccess={() => setFormSubmitted(true)} />
        )}

        {!isAdmin && formSubmitted && (
          <div className="max-w-xl mx-auto text-center p-8 bg-white rounded-lg shadow-sm border">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="mb-4 text-xl text-green-600 font-semibold">
              {successMessage}
            </p>
            <Button
              onClick={() => setFormSubmitted(false)}
              variant="outline"
            >
              {submitAnotherText}
            </Button>
          </div>
        )}

        {isAdmin && <GreeceVisaAdminPanel />}
      </div>
    </DashboardLayout>
  );
}

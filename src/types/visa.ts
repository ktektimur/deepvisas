
export interface VisaApplication {
  id: string;
  country: string;
  status: string;
  applicationDate: string;
  city?: string;
  flag?: string;
  date?: string;
  slots?: number;
  nextAvailable?: string;
}

export interface VisaCardProps {
  visa: VisaApplication;
}

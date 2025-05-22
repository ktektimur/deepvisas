
export interface VisaApplication {
  id: string;
  country: string;
  status: string;
  applicationDate: string;
}

export interface VisaCardProps {
  visa: VisaApplication;
}

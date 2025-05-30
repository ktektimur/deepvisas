
const VISA_API_URL = 'http://api.deepvisas.com/visa-list';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGVlcHZpc2FzX2FwaV9jbGllbnQiLCJleHAiOjE3NTE1ODM3NTcsImlhdCI6MTc0ODU1OTc1N30.JQxbW1KGKPWGYAWlwmyGPeaAa7ZTrxQprAlGAx_mG-k';

export interface VisaApiData {
  id: string;
  country: string;
  city: string;
  flag: string;
  date: string;
  applicationDate: string;
  status: 'available' | 'full';
  slots?: number;
  nextAvailable?: string;
}

export const fetchVisaData = async (): Promise<VisaApiData[]> => {
  try {
    const response = await fetch(VISA_API_URL, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Visa data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch visa data:', error);
    throw error;
  }
};

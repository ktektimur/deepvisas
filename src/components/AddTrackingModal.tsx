
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AddTrackingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { country: string; city: string; visaType: string }) => void;
}

const AddTrackingModal: React.FC<AddTrackingModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const { t } = useLanguage();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [visaType, setVisaType] = useState('');

  const handleSubmit = () => {
    if (country && city && visaType) {
      onSubmit({ country, city, visaType });
      setCountry('');
      setCity('');
      setVisaType('');
      onOpenChange(false);
    }
  };

  const countries = ['Turkey', 'United States', 'Germany', 'United Kingdom', 'France'];
  
  const cities: { [key: string]: string[] } = {
    Turkey: ['Ankara', 'Istanbul', 'Izmir', 'Bursa', 'Gaziantep'],
    'United States': ['Washington', 'New York', 'Los Angeles', 'Chicago', 'Boston'],
    Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'],
    'United Kingdom': ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Glasgow'],
    France: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'],
  };

  const visaTypes = ['Tourist', 'Business', 'Student', 'Work', 'Family'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('dashboard.addTracking')}</DialogTitle>
          <DialogDescription>
            Select country, city and visa type to start tracking appointments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="country">{t('form.country')}</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="city">{t('form.city')}</Label>
            <Select
              value={city}
              onValueChange={setCity}
              disabled={!country}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {country &&
                  cities[country]?.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="visaType">{t('form.visaType')}</Label>
            <Select value={visaType} onValueChange={setVisaType}>
              <SelectTrigger id="visaType">
                <SelectValue placeholder="Select visa type" />
              </SelectTrigger>
              <SelectContent>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`visa.${type.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t('form.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={!country || !city || !visaType}>
            {t('form.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTrackingModal;


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

  // Updated country list as requested
  const countries = [
    'Netherlands', 'France', 'Belgium', 'Bulgaria', 'Croatia', 
    'Czechia', 'Estonia', 'Finland', 'Ireland', 'Latvia', 
    'Lithuania', 'Luxembourg', 'Norway', 'Slovenia', 'Sweden', 
    'Ukraine', 'USA', 'England', 'Iraq'
  ];
  
  // Updated city list as requested
  const cities = ['Ankara', 'Istanbul', 'Izmir', 'Gaziantep', 'Antalya', 'Bursa'];

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
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
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

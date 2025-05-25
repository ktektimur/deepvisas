
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [telegramNotifications, setTelegramNotifications] = React.useState(true);

  const handleSaveSettings = () => {
    toast.success(t('settings.settingsSaved'));
  };

  const handleLanguageChange = (newLanguage: 'en' | 'tr') => {
    setLanguage(newLanguage);
    toast.success(t('settings.settingsSaved'));
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.notificationPreferences')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">{t('settings.emailNotifications')}</Label>
                  <p className="text-sm text-gray-500">{t('settings.emailNotificationsDesc')}</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="telegram-notifications" className="font-medium">{t('settings.telegramNotifications')}</Label>
                  <p className="text-sm text-gray-500">{t('settings.telegramNotificationsDesc')}</p>
                </div>
                <Switch 
                  id="telegram-notifications" 
                  checked={telegramNotifications}
                  onCheckedChange={setTelegramNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.displaySettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language" className="font-medium mb-2 block">{t('settings.language')}</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'tr')}
                  className="w-full p-2 border rounded-md bg-white text-gray-900"
                >
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.telegramIntegration')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-700">
                {t('settings.telegramIntegrationDesc')}
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <a
                  href="https://t.me/deepvisas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  @deepvisas
                </a>
              </div>
              <Button onClick={() => window.open("https://t.me/deepvisas", "_blank")}>
                {t('settings.connectTelegram')}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.accountSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-medium mb-2 block">{t('settings.emailAddress')}</Label>
                <input
                  type="email"
                  id="email"
                  value="user@example.com"
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 text-gray-900"
                />
              </div>
              <Button variant="outline">{t('settings.changePassword')}</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings}>{t('settings.saveSettings')}</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

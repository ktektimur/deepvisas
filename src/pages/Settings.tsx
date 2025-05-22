
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [telegramNotifications, setTelegramNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [language, setLanguage] = React.useState('en');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="telegram-notifications" className="font-medium">Telegram Notifications</Label>
                  <p className="text-sm text-gray-500">Receive updates via Telegram</p>
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
              <CardTitle>Display Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Use dark theme</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div>
                <Label htmlFor="language" className="font-medium mb-2 block">Language</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="en">English</option>
                  <option value="tr">Turkish</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Telegram Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-700">
                Connect with our DeepVisas Telegram channel for the latest updates:
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
                Connect Telegram
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-medium mb-2 block">Email Address</Label>
                <input
                  type="email"
                  id="email"
                  value="user@example.com"
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

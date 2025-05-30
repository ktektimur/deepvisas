
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import DashboardLayout from '@/components/DashboardLayout';

const notificationData = [
  {
    id: 1,
    title: 'New slots available',
    message: 'New slots available in Ankara for US Tourist visa',
    time: '5 minutes ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'Slots filled up',
    message: 'Slots filled up in Istanbul for Schengen visa',
    time: '1 hour ago',
    type: 'warning',
    read: true,
  },
  {
    id: 3,
    title: 'System update',
    message: 'Our system has been updated with new tracking capabilities',
    time: '2 hours ago',
    type: 'info',
    read: false,
  },
  {
    id: 4,
    title: 'Reminder',
    message: 'Remember to complete your profile information',
    time: '1 day ago',
    type: 'info',
    read: true,
  },
  {
    id: 5,
    title: 'Visa appointment confirmation',
    message: 'Your visa appointment has been confirmed for June 15, 2025',
    time: '2 days ago',
    type: 'success',
    read: false,
  }
];

const Notifications = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = React.useState(notificationData);
  
  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.success(t('notifications.markAsRead'));
  };
  
  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success(t('notifications.delete'));
  };
  
  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success(t('notifications.markAllRead'));
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success(t('notifications.clearAll'));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{t('notifications.title')}</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full px-2">
                {unreadCount} {t('notifications.newNotification')}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              {t('notifications.markAllRead')}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('notifications.clearAll')}
            </Button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">{t('notifications.noNotifications')}</h3>
              <p className="text-gray-500">{t('notifications.noNotificationsDesc')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {t('notifications.newNotification')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(notification.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

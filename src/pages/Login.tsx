
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to appropriate page
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Form validation schema
  const formSchema = z.object({
    email: z.string()
      .min(1, language === 'tr' ? 'E-posta gerekli' : 'Email is required')
      .email(language === 'tr' ? 'Geçersiz e-posta adresi' : 'Invalid email address'),
    password: z.string()
      .min(1, language === 'tr' ? 'Şifre gerekli' : 'Password is required'),
  });

  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await login(data.email, data.password);
      
      if (!success) {
        toast({
          title: language === 'tr' ? 'Giriş başarısız' : 'Login failed',
          description: language === 'tr' 
            ? 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.' 
            : 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
      
    } catch (error) {
      toast({
        title: language === 'tr' ? 'Hata' : 'Error',
        description: language === 'tr' 
          ? 'Giriş sırasında bir hata oluştu.' 
          : 'An error occurred during login.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogins = [
    { label: 'Admin', email: 'admin@deepvisas.com', password: 'password123' },
    { label: 'User', email: 'user@deepvisas.com', password: 'password123' },
  ];

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {language === 'tr' ? 'Giriş Yap' : 'Login'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'tr' 
                ? 'DeepVisas hesabınıza giriş yapın' 
                : 'Sign in to your DeepVisas account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'tr' ? 'E-posta' : 'Email'}</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'tr' ? 'Şifre' : 'Password'}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'tr' ? 'Giriş yapılıyor...' : 'Logging in...'}
                    </>
                  ) : (
                    language === 'tr' ? 'Giriş Yap' : 'Login'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <p className="text-sm text-gray-500 text-center mb-4">
                {language === 'tr' ? 'Demo hesap örnekleri:' : 'Demo accounts:'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {demoLogins.map((demo) => (
                  <Button
                    key={demo.email}
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      form.setValue('email', demo.email);
                      form.setValue('password', demo.password);
                    }}
                    className="text-xs h-auto py-1"
                  >
                    {demo.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <div className="text-sm text-center w-full">
              {language === 'tr' ? 'Hesabınız yok mu?' : "Don't have an account?"}{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                {language === 'tr' ? 'Kaydolun' : 'Register'}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;

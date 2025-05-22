
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, Link, useNavigate } from 'react-router-dom';
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

const Register: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Form validation schema
  const formSchema = z.object({
    email: z.string()
      .min(1, language === 'tr' ? 'E-posta gerekli' : 'Email is required')
      .email(language === 'tr' ? 'Geçersiz e-posta adresi' : 'Invalid email address'),
    password: z.string()
      .min(6, language === 'tr' 
        ? 'Şifre en az 6 karakter olmalıdır' 
        : 'Password must be at least 6 characters'),
    confirmPassword: z.string()
      .min(1, language === 'tr' ? 'Şifreyi onaylayın' : 'Please confirm your password'),
  }).refine(
    (data) => data.password === data.confirmPassword, 
    {
      message: language === 'tr' ? 'Şifreler eşleşmiyor' : 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const success = await register(data.email, data.password);
      
      if (success) {
        toast({
          title: language === 'tr' ? 'Başarılı' : 'Success',
          description: language === 'tr' 
            ? 'Hesabınız başarıyla oluşturuldu.' 
            : 'Your account has been successfully created.',
          variant: 'default',
        });
        navigate('/login');
      } else {
        toast({
          title: language === 'tr' ? 'Kayıt Başarısız' : 'Registration Failed',
          description: language === 'tr' 
            ? 'Bu e-posta adresi zaten kullanılıyor.' 
            : 'This email address is already in use.',
          variant: 'destructive',
        });
      }
      
    } catch (error) {
      toast({
        title: language === 'tr' ? 'Hata' : 'Error',
        description: language === 'tr' 
          ? 'Kayıt sırasında bir hata oluştu.' 
          : 'An error occurred during registration.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {language === 'tr' ? 'Hesap Oluştur' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'tr' 
                ? 'DeepVisas\'da yeni bir hesap oluşturun' 
                : 'Create a new account on DeepVisas'}
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'tr' ? 'Şifre Onayı' : 'Confirm Password'}</FormLabel>
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
                      {language === 'tr' ? 'Kaydediliyor...' : 'Registering...'}
                    </>
                  ) : (
                    language === 'tr' ? 'Kaydol' : 'Register'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <div className="text-sm text-center w-full">
              {language === 'tr' ? 'Zaten hesabınız var mı?' : 'Already have an account?'}{' '}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                {language === 'tr' ? 'Giriş Yap' : 'Login'}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;

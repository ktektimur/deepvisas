
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, Link } from 'react-router-dom';
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
import { Loader2 } from 'lucide-react';

const Login: React.FC = () => {
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
      .min(1, 'E-posta gerekli')
      .email('Geçersiz e-posta adresi'),
    password: z.string()
      .min(1, 'Şifre gerekli'),
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
          title: 'Giriş başarısız',
          description: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.',
          variant: 'destructive',
        });
      }
      
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Giriş sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogins = [
    { label: 'Yönetici', email: 'admin@deepvisas.com', password: 'password123' },
    { label: 'Kullanıcı', email: 'user@deepvisas.com', password: 'password123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">DV</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">DeepVisas</span>
          </Link>
        </div>

        <Card className="bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Giriş Yap
            </CardTitle>
            <CardDescription className="text-center">
              DeepVisas hesabınıza giriş yapın
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
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input placeholder="email@ornek.com" {...field} />
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
                      <FormLabel>Şifre</FormLabel>
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
                      Giriş yapılıyor...
                    </>
                  ) : (
                    'Giriş Yap'
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <p className="text-sm text-gray-500 text-center mb-4">
                Demo hesap örnekleri:
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
              Hesabınız yok mu?{' '}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Kaydolun
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

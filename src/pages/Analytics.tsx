
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, TrendingUp, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';

// Sample analytics data
const slotsByCountry = [
  { name: 'United States', value: 35 },
  { name: 'Germany', value: 28 },
  { name: 'United Kingdom', value: 22 },
  { name: 'France', value: 15 },
  { name: 'Spain', value: 12 },
  { name: 'Italy', value: 8 },
];

const availabilityTrend = [
  { name: 'Jan', available: 12, full: 18 },
  { name: 'Feb', available: 15, full: 15 },
  { name: 'Mar', available: 10, full: 20 },
  { name: 'Apr', available: 18, full: 12 },
  { name: 'May', available: 22, full: 8 },
  { name: 'Jun', available: 25, full: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics = () => {
  const { t } = useLanguage();

  const visaTypeDistribution = [
    { name: t('visaTypes.tourist'), value: 45 },
    { name: t('visaTypes.business'), value: 25 },
    { name: t('visaTypes.student'), value: 15 },
    { name: t('visaTypes.work'), value: 10 },
    { name: t('visaTypes.other'), value: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t('analytics.title')}</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BarChart3 className="text-blue-700 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('analytics.totalTrackedVisas')}</p>
                <h3 className="text-2xl font-bold">120</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="text-green-700 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('analytics.successRate')}</p>
                <h3 className="text-2xl font-bold">86%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Calendar className="text-orange-700 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('analytics.appointmentsSecured')}</p>
                <h3 className="text-2xl font-bold">42</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users className="text-purple-700 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('analytics.activeUsers')}</p>
                <h3 className="text-2xl font-bold">87</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.slotsByCountry')}</CardTitle>
              <CardDescription>{t('analytics.slotsByCountryDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slotsByCountry}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.availabilityTrend')}</CardTitle>
              <CardDescription>{t('analytics.availabilityTrendDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={availabilityTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="available" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="full" stroke="#ff8042" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.visaTypeDistribution')}</CardTitle>
            <CardDescription>{t('analytics.visaTypeDistributionDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="flex flex-col md:flex-row h-full">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visaTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {visaTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex items-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {visaTypeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.value} visas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

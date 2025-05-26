import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AdminUserProfiles = React.lazy(() => import("./pages/AdminUserProfiles"));
const UserDetails = React.lazy(() => import("./pages/UserDetails"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Visas = React.lazy(() => import("./pages/Visas"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const AdminPricing = React.lazy(() => import("./pages/AdminPricing"));
const UKVisaRequirements = React.lazy(() => import("./pages/UKVisaRequirements"));
const GreeceVisaRequirements = React.lazy(() => import("./pages/GreeceVisaRequirements"));
const AdminVisaSubmissions = React.lazy(() => import("./pages/AdminVisaSubmissions"));
const VisaSubmissionView = React.lazy(() => import("./pages/VisaSubmissionView"));

// Configure QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Main Layout Component
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    {/* Header could be added here */}
    <main className="flex-1">{children}</main>
    {/* Footer could be added here */}
  </div>
);

// Dashboard Layout Component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Dashboard specific header/sidebar */}
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public Routes with Main Layout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/pricing" element={<Pricing />} />
                </Route>

                {/* Protected Routes with Dashboard Layout */}
                <Route element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/profile" element={<UserProfile />} />
                  <Route path="/dashboard/visas" element={<Visas />} />
                  <Route path="/dashboard/notifications" element={<Notifications />} />
                  <Route path="/dashboard/analytics" element={<Analytics />} />
                  <Route path="/dashboard/settings" element={<Settings />} />
                  <Route path="/dashboard/requirements/uk" element={<UKVisaRequirements />} />
                  <Route path="/dashboard/requirements/greece" element={<GreeceVisaRequirements />} />
                </Route>

                {/* Admin Routes with Dashboard Layout */}
                <Route element={
                  <ProtectedRoute requiredRole="admin">
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUserProfiles />} />
                  <Route path="/admin/users/:userId" element={<UserDetails />} />
                  <Route path="/admin/pricing" element={<AdminPricing />} />
                  <Route path="/admin/visa-submissions" element={<AdminVisaSubmissions />} />
                  <Route path="/admin/visa-submissions/:submissionId" element={<VisaSubmissionView />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
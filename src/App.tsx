
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Header could be added here */}
    <main className="flex-1">
      <Outlet />
    </main>
    {/* Footer could be added here */}
  </div>
);

// Dashboard Layout Component
const DashboardLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Dashboard specific header/sidebar */}
    <Outlet />
  </div>
);

// Protected Dashboard Layout
const ProtectedDashboardLayout = () => (
  <ProtectedRoute>
    <DashboardLayout />
  </ProtectedRoute>
);

// Protected Admin Layout
const ProtectedAdminLayout = () => (
  <ProtectedRoute requiredRole="admin">
    <DashboardLayout />
  </ProtectedRoute>
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
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="pricing" element={<Pricing />} />
                </Route>

                {/* Protected Routes with Dashboard Layout */}
                <Route path="/dashboard" element={<ProtectedDashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="visas" element={<Visas />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="requirements/uk" element={<UKVisaRequirements />} />
                  <Route path="requirements/greece" element={<GreeceVisaRequirements />} />
                </Route>

                {/* Admin Routes with Dashboard Layout */}
                <Route path="/admin" element={<ProtectedAdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUserProfiles />} />
                  <Route path="users/:userId" element={<UserDetails />} />
                  <Route path="pricing" element={<AdminPricing />} />
                  <Route path="visa-submissions" element={<AdminVisaSubmissions />} />
                  <Route path="visa-submissions/:submissionId" element={<VisaSubmissionView />} />
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


import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";
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

// Main Layout Component with Outlet
const MainLayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Protected Dashboard Layout with Outlet
const ProtectedDashboardLayoutWrapper = () => (
  <ProtectedRoute>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  </ProtectedRoute>
);

// Protected Admin Layout with Outlet
const ProtectedAdminLayoutWrapper = () => (
  <ProtectedRoute requiredRole="admin">
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <React.Suspense fallback={<div>Yükleniyor...</div>}>
            <Routes>
              {/* Public Routes with Main Layout */}
              <Route path="/" element={<MainLayoutWrapper />}>
                <Route index element={<Index />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* Login Route - No Layout */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes with Dashboard Layout */}
              <Route path="/dashboard" element={<ProtectedDashboardLayoutWrapper />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="visas" element={<Visas />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="requirements/uk" element={<UKVisaRequirements />} />
                <Route path="requirements/greece" element={<GreeceVisaRequirements />} />
              </Route>

              {/* Admin Routes with Admin Layout */}
              <Route path="/admin" element={<ProtectedAdminLayoutWrapper />}>
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
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

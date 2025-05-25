import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserProfiles from "./pages/AdminUserProfiles";
import UserDetails from "./pages/UserDetails";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Visas from "./pages/Visas";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import AdminPricing from "./pages/AdminPricing";
import UKVisaRequirements from "./pages/UKVisaRequirements";
import GreeceVisaRequirements from "./pages/GreeceVisaRequirements";
import AdminVisaSubmissions from "./pages/AdminVisaSubmissions";
import VisaSubmissionView from "./pages/VisaSubmissionView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/visas" element={
                <ProtectedRoute>
                  <Visas />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/requirements/uk" element={
                <ProtectedRoute>
                  <UKVisaRequirements />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/requirements/greece" element={
                <ProtectedRoute>
                  <GreeceVisaRequirements />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUserProfiles />
                </ProtectedRoute>
              } />
              <Route path="/admin/users/:userId" element={
                <ProtectedRoute requiredRole="admin">
                  <UserDetails />
                </ProtectedRoute>
              } />
              <Route path="/admin/pricing" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPricing />
                </ProtectedRoute>
              } />
              <Route path="/admin/visa-submissions" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminVisaSubmissions />
                </ProtectedRoute>
              } />
              <Route path="/admin/visa-submissions/:submissionId" element={
                <ProtectedRoute requiredRole="admin">
                  <VisaSubmissionView />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

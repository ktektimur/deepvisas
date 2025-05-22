
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole && !(requiredRole === 'user' && user?.role === 'admin')) {
    // User doesn't have the required role (but admins can access user routes)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

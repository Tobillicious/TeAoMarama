import React from 'react';
import type { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'teacher' | 'student' | 'admin';
  requireAuth?: boolean;
  redirectTo?: string;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRole,
  requireAuth = true,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>Loading...</p>
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If role is required but user doesn't have the required role
  if (requiredRole && currentUser?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's role
    const roleFeatures = getRoleBasedFeatures(currentUser?.role || 'student');
    return <Navigate to={roleFeatures.dashboard} replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

// Helper function to get role-based features (imported from auth provider)
const getRoleBasedFeatures = (role: string) => {
  switch (role) {
    case 'teacher':
      return { dashboard: '/teacher-dashboard' };
    case 'student':
      return { dashboard: '/student-dashboard' };
    case 'admin':
      return { dashboard: '/admin-dashboard' };
    default:
      return { dashboard: '/student-dashboard' };
  }
};

export default RouteGuard;

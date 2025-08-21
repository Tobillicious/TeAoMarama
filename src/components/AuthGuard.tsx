import React, { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../services/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireEducator?: boolean;
  culturalSensitivity?: 'low' | 'medium' | 'high' | 'sacred';
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  requireEducator = false,
  culturalSensitivity = 'low'
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, [currentUser, culturalSensitivity, requireEducator]);

  const checkAccess = async () => {
    if (requireAuth && !isAuthenticated) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    if (!requireAuth) {
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // Additional checks for cultural sensitivity and educator status
    // would be implemented here using the security middleware

    setHasAccess(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
          <p className="text-gray-600">Validating cultural protocols...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-4">
              🌿 This content requires special cultural clearance or educator permissions.
            </p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
            
            <a 
              href="/contact?subject=cultural-clearance"
              className="block w-full px-4 py-2 bg-pounamu text-white rounded-md hover:bg-pounamu-dark transition-colors"
            >
              Request Access
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
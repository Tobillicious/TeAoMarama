import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import LoadingSpinner from './LoadingSpinner';

const RoleBasedRouter: React.FC = () => {
  const { currentUser, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !currentUser) {
        // User not authenticated, redirect to login
        navigate('/login');
        return;
      }

      // User is authenticated, redirect based on role
      switch (currentUser.role) {
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'kaitiaki':
          navigate('/kaitiaki-dashboard');
          break;
        default:
          // Unknown role, redirect to landing page
          navigate('/');
          break;
      }
    }
  }, [currentUser, isLoading, isAuthenticated, navigate]);

  // Show loading while determining where to redirect
  return (
    <div className="role-router">
      <LoadingSpinner />
      <p>Determining your dashboard...</p>
    </div>
  );
};

export default RoleBasedRouter;

import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading Te Ao Mārama...', 
  size = 'medium' 
}) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <div className="loading-message">
        <div className="loading-text">{message}</div>
        <div className="loading-subtitle">🌿 Preparing your educational journey</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

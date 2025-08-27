import React, { memo } from 'react';

// Inline styles to prevent CSS loading blocking
const spinnerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  gap: '1rem'
};

const spinnerElementStyles: React.CSSProperties = {
  width: '48px',
  height: '48px',
  border: '3px solid #e5e7eb',
  borderTop: '3px solid #059669', // pounamu color
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  willChange: 'transform' // GPU acceleration
};

const textStyles: React.CSSProperties = {
  fontSize: '1.125rem',
  fontWeight: '500',
  color: '#374151',
  margin: 0
};

// Optimized LoadingSpinner with performance enhancements
const LoadingSpinner: React.FC<{ message?: string }> = memo(({ message = 'Loading...' }) => {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyles}>
        <div style={spinnerElementStyles} />
        <p style={textStyles}>{message}</p>
      </div>
    </>
  );
});

export default LoadingSpinner;

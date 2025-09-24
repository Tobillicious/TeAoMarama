import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '2rem'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem'
        }}>
          ✅
        </div>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Payment Successful!
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Welcome to Te Ao Mārama! Your subscription is now active.
        </p>
        <div style={{
          background: '#f3f4f6',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: '#374151'
        }}>
          Session ID: {sessionId}
        </div>
        <button
          onClick={() => window.location.href = '/teacher-dashboard'}
          style={{
            background: 'linear-gradient(45deg, #4ade80, #22c55e)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

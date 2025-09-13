import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You could send error to logging service here
    if (typeof window !== 'undefined') {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div /* TODO: Move to external CSS */ style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div /* TODO: Move to external CSS */ style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            padding: '2rem',
            maxWidth: '600px'
          }}>
            <h2 /* TODO: Move to external CSS */ style={{ color: '#dc2626', marginBottom: '1rem' }}>
              🚨 Oops! Something went wrong
            </h2>
            <p /* TODO: Move to external CSS */ style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                /* TODO: Move to external CSS */ style={{
                  background: '#059669',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                🔄 Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                /* TODO: Move to external CSS */ style={{
                  background: '#6b7280',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                ← Go Back
              </button>
            </div>
            {this.state.error && (
              <details /* TODO: Move to external CSS */ style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <summary /* TODO: Move to external CSS */ style={{ cursor: 'pointer', color: '#7f1d1d', fontWeight: '500' }}>
                  Technical Details
                </summary>
                <pre /* TODO: Move to external CSS */ style={{
                  background: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                  marginTop: '0.5rem',
                  color: '#374151'
                }}>
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import React, { Component, ErrorInfo, ReactNode } from 'react'
import './ErrorBoundary.css'

interface Props {,
children: ReactNode
  fallback?: ReactNode}
interface State {,
hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo}
class ErrorBoundary extends Component<Props, State> {
constructor(props: Props) {
super(props)
    this.state = { hasError: false }
  }
static getDerivedStateFromError(error: Error): State {
return { hasError: true, error }
  }
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
console.error('🌿 Error Boundary caught an error: ', error, errorInfo)
    this.setState({ error, errorInfo })
    
    // Log to console for debugging
console.group('🚨 Application Error Details')
    console.error('Error: ', error)
    console.error('Error Info: ', errorInfo)
    console.error('Component Stack: ', errorInfo.componentStack)
    console.groupEnd()
  }
render() {
if (this.state.hasError) {
if (this.props.fallback) {
return this.props.fallback
      }
return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">🌿</div>
            <h1 className="error-title">Kia ora e hoa</h1>
            <h2 className="error-subtitle">Something unexpected happened</h2>
            <p className="error-message">
We're working to fix this issue. Please try refreshing the page.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="error-details">
                <summary>Technical Details (Development)</summary>
                <div className="error-stack">
                  <h4>Error: </h4>
                  <pre>{this.state.error.toString()}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <h4>Component Stack:</h4>
                      <pre>{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
            
            <button 
className="error-retry-button"
onClick={() => window.location.reload()}
            >
              🔄 Refresh Page
            </button>
            
            <div className="error-help">
              <p>If this problem persists, please contact support.</p>
              <p>🌿 Te Ao Mārama - Educational Resources Platform</p>
            </div>
          </div>
        </div>
      )
    }
return this.props.children
  }
}
export default ErrorBoundary

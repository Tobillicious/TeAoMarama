import React, { useState } from 'react';
import { useAuth } from '../services/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMsg('');
    try {
      const { error } = await logIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/');
      }
    } catch (err) {
        setError('Failed to log in');
        console.error(err);
    }
  };

  const handleReset = async () => {
    setResetMsg('');
    setError('');
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });
      if (error) {
        setError(error.message);
      } else {
        setResetMsg('Password reset email sent!');
      }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred during password reset.');
        }
    }
  };

  return (
    <div className="auth-container">
      <div className="app-container">
        <form onSubmit={handleLogin} className="auth-form">
          <h2 className="auth-title">Whakatōmuri TeAoMarama</h2>
          <p className="auth-subtitle">Welcome back to Te Ao Mārama</p>
          
          {error && <div className="error-message">{error}</div>}
          {resetMsg && <div className="success-message">{resetMsg}</div>}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <button type="submit" className="form-button login-button">
            🌟 Sign In to Te Ao Mārama
          </button>
          
          <button 
            type="button" 
            onClick={handleReset} 
            className="text-link forgot-link"
          >
            Forgot your password?
          </button>
          
          <div className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/signup" className="text-link"> Create one here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
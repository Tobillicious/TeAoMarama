import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMsg('');

    try {
      if (auth && auth.login) {
        const { error } = await auth.login(email, password);
        if (error) {
          setError(error);
        } else {
          navigate('/');
        }
      } else {
        setError('Authentication service not available');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setError('Failed to log in');
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setError('An unknown error occurred during password reset.');
    }
  };

  return (
    <div className="auth-container">
      <div className="app-container">
        <div className="auth-form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            {resetMsg && <div className="success-message">{resetMsg}</div>}
            <button type="submit" className="auth-button" aria-label="Login button">
              Login
            </button>
          </form>
          <button onClick={handleReset} className="reset-button" aria-label="Reset password button">
            Reset Password
          </button>
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
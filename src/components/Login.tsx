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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetMsg('');

    try {
      if (auth && auth.logIn) {
        const { error } = await auth.logIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/');
        }
      } else {
        setError('Authentication service not available');
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

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          <button onClick={handleReset} className="reset-button">
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

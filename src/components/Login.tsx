import React, { useState } from 'react';
import type { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import { supabase } from '../supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student' | 'admin' | 'kaitiaki'>('student');
  const [error, setError] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const { login } = useAuth();
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
      const result = await login(email, password, role);
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/');
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
          <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="auth-form">
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
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'teacher' | 'student' | 'admin' | 'kaitiaki')}
                className="form-input"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="kaitiaki">Kaitiaki</option>
              </select>
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

export default React.memo(Login);
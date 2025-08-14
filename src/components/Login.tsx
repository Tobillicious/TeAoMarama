import React, { useState } from 'react';
import { useAuth } from '../services/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import supabase client for password reset

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
    <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white rounded-lg shadow p-6 w-full">
      <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">Login</h2>
      {error && <p className="text-red-600 text-sm text-center">Error: {error}</p>}
      {resetMsg && <p className="text-green-600 text-sm text-center">{resetMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button type="submit" className="bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition">Login</button>
      <button type="button" onClick={handleReset} className="text-indigo-600 hover:underline text-sm mt-2">Forgot password?</button>
      <p className="text-center text-sm mt-2">
        Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
      </p>
    </form>
  );
}

export default Login;


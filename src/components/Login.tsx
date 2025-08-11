import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
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
      await sendPasswordResetEmail(auth, email);
      setResetMsg('Password reset email sent!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white rounded-lg shadow p-6 w-full">
      <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">Login</h2>
      {error && <p className="text-red-600 text-sm text-center">Firebase: {error}</p>}
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
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setSuccess('Login successful!');
		} catch (err: unknown) {
			if (err instanceof Error) setError(err.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Log In</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Log In</button>
			{error && <p className="error-message">{error}</p>}
			{success && <p className="success-message">{success}</p>}
		</form>
	);
};

export default Login;

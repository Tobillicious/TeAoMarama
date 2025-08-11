import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider, useAuth } from './services/AuthContext';

import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

function Dashboard() {
  const { currentUser } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-10 mt-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome, {currentUser?.email}!</h2>
      <p className="text-gray-600 mb-6">You are now logged in.</p>
      <div className="mb-6 text-center">
        <span className="text-lg font-semibold text-indigo-600">Kia kaha! Keep up the good mahi!</span>
        <p className="text-sm text-gray-500 mt-2">This is your dashboard. More features coming soon!</p>
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Log Out</button>
    </div>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-lg">Welcome to Gemini React App</h1>
        {currentUser ? <Dashboard /> : (
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <div className="w-full md:w-1/2">
              <SignUp />
            </div>
            <div className="w-full md:w-1/2">
              <Login />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App

import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider, useAuth } from './services/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-10 mt-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome, {currentUser?.email}!</h2>
      <p className="text-gray-600">You are now logged in.</p>
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

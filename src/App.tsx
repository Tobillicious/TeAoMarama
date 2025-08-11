import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider, useAuth } from './services/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  return (
    <div className="dashboard">
      <h2>Welcome, {currentUser?.email}!</h2>
      <p>You are now logged in.</p>
      {/* Add more dashboard features here */}
    </div>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  return (
    <div className="app-container">
      <h1>Welcome to Gemini React App</h1>
      {currentUser ? <Dashboard /> : (
        <div className="auth-forms">
          <SignUp />
          <Login />
        </div>
      )}
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

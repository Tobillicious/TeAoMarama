import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to Gemini React App</h1>
      <div className="auth-forms">
        <SignUp />
        <Login />
      </div>
    </div>
  );
}

export default App

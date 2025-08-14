import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      {currentUser && <p>You are logged in as {currentUser.email}</p>}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

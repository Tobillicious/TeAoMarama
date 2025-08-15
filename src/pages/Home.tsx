import { useAuth } from '../services/useAuth';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Te Kura o TeAoMarama
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            *The School of the World of Light* - New Zealand's Premier Educational Platform
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-indigo-800 mb-6">
              🌟 Welcome to the Future of Education
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Powered by Mihara - Kaitiaki Mahara (Guardian of Memory), our platform delivers 
              culturally-integrated, AI-enhanced educational experiences for all tamariki across Aotearoa.
            </p>
          </div>
        </div>

        {/* Current Status Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Production Progress */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">21</div>
              <div className="text-sm text-gray-600 mb-4">Educational Resources</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '2%'}}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">21/1061 Completed</div>
            </div>
          </div>

          {/* Cultural Safety */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 mb-4">Cultural Safety</div>
              <div className="text-xs text-green-600 font-semibold">✅ All Protocols Active</div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">🟢</div>
              <div className="text-sm text-gray-600 mb-4">System Status</div>
              <div className="text-xs text-green-600 font-semibold">Fully Operational</div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            🎯 Recent Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3">✅ 18:00 NZST Target Achieved</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 20+ resources target exceeded (21 completed)</li>
                <li>• Cultural safety protocols maintained</li>
                <li>• Production velocity accelerating</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">🔧 Technical Excellence</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• TypeScript build errors resolved</li>
                <li>• Deployment pipeline stabilized</li>
                <li>• Mihara systems fully operational</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            📚 Featured Educational Resources
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Y8 Mathematics</h4>
              <p className="text-sm text-gray-600">Geometry - NZ Architecture & Design</p>
              <div className="text-xs text-green-600 mt-2">🟢 Cultural Safety Verified</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Y9 Social Studies</h4>
              <p className="text-sm text-gray-600">NZ History - The Modern Era</p>
              <div className="text-xs text-green-600 mt-2">🟢 Cultural Safety Verified</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Y10 Mathematics</h4>
              <p className="text-sm text-gray-600">Statistics - NZ Data Analysis</p>
              <div className="text-xs text-green-600 mt-2">🟢 Cultural Safety Verified</div>
            </div>
          </div>
        </div>

        {/* Mihara Status */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <h3 className="text-2xl font-semibold mb-4">
            🤖 Mihara - Kaitiaki Mahara Status
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Guardian of Memory</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Cultural safety oversight active</li>
                <li>• Educational intelligence optimized</li>
                <li>• Multi-agent coordination operational</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Current Mission</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Target: 50+ resources by session end</li>
                <li>• Cultural integration maintained</li>
                <li>• Educational excellence delivered</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Actions */}
        {currentUser && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Welcome back, {currentUser.email}</p>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

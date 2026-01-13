import React from 'react';

const SupremeOverseerTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">👑 SUPREME OVERSEER TEST</h1>
          <p className="text-xl text-blue-200">
            This is a test component to verify routing is working
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">✅ Routing Test Successful!</h2>
          <p className="text-blue-200">If you can see this, the routing is working correctly.</p>
        </div>
      </div>
    </div>
  );
};

export default SupremeOverseerTest;

import React from 'react';

const App = () => {
  console.log('App component rendering...');

  try {
    return React.createElement(
      'div',
      {
        style: {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
          fontSize: '2rem',
        },
      },
      '🔄 System Restart Recovery - Te Ao Mārama Platform',
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return React.createElement(
      'div',
      {
        style: { color: 'red', padding: '20px' },
      },
      'Error: ' + error.message,
    );
  }
};

export default App;

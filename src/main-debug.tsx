import ReactDOM from 'react-dom/client';

console.log('🌿 Starting Debug App...');

const TestComponent = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1e40af',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>👑 Debug App Working!</h1>
      <p>React is functioning correctly.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TestComponent />);
  console.log('✅ Debug App initialized');
} else {
  console.error('Root element not found!');
}

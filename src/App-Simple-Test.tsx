const App = () => {
  console.log('App-Simple-Test: Rendering...');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        fontSize: '2rem',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '40px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>🔄 Simple Test</h1>
        <p style={{ marginBottom: '20px' }}>Te Ao Mārama Platform</p>
        <div
          style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '20px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>✅ Test Status</h3>
          <p style={{ margin: 0 }}>React app is working!</p>
        </div>
      </div>
    </div>
  );
};

export default App;

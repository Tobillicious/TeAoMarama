// Debug version with extensive logging
console.log('🔍 Debug script starting...');

try {
  console.log('📦 Importing React...');
  import('react')
    .then((React) => {
      console.log('✅ React imported successfully:', React);

      console.log('📦 Importing ReactDOM...');
      import('react-dom/client')
        .then((ReactDOM) => {
          console.log('✅ ReactDOM imported successfully:', ReactDOM);

          console.log('🎯 Looking for root element...');
          const rootElement = document.getElementById('root');
          console.log('Root element found:', rootElement);

          if (!rootElement) {
            console.error('❌ Root element not found!');
            document.body.innerHTML = '<h1 style="color: red;">❌ Root element not found!</h1>';
            return;
          }

          console.log('🚀 Creating React root...');
          const root = ReactDOM.createRoot(rootElement);
          console.log('✅ React root created:', root);

          console.log('🎨 Rendering React component...');
          root.render(
            React.createElement('div', { style: { padding: '2rem', textAlign: 'center' } }, [
              React.createElement('h1', { key: 'title' }, '🧪 Debug React Test'),
              React.createElement('p', { key: 'status' }, '✅ React is working!'),
              React.createElement('p', { key: 'time' }, `Time: ${new Date().toLocaleString()}`),
              React.createElement(
                'p',
                { key: 'version' },
                `React version: ${React.version || 'Unknown'}`,
              ),
            ]),
          );
          console.log('✅ React component rendered successfully!');
        })
        .catch((error) => {
          console.error('❌ Failed to import ReactDOM:', error);
          document.body.innerHTML = `<h1 style="color: red;">❌ ReactDOM import failed: ${error.message}</h1>`;
        });
    })
    .catch((error) => {
      console.error('❌ Failed to import React:', error);
      document.body.innerHTML = `<h1 style="color: red;">❌ React import failed: ${error.message}</h1>`;
    });
} catch (error) {
  console.error('❌ Critical error in debug script:', error);
  document.body.innerHTML = `<h1 style="color: red;">❌ Critical error: ${error.message}</h1>`;
}

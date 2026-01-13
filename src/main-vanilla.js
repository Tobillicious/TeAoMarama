console.log('🌿 Starting Te Ao Mārama Platform (Vanilla JS)...');

// Try to find the root element
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  console.log('Root element found, creating content...');

  // Create content using vanilla JavaScript
  rootElement.innerHTML = `
    <div style="
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      color: white;
      font-size: 2rem;
      text-align: center;
      padding: 40px;
    ">
      <div style="
        background: rgba(255,255,255,0.1);
        padding: 40px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
      ">
        <h1 style="margin-bottom: 20px;">🔄 Vanilla JS Test</h1>
        <p style="margin-bottom: 20px;">Te Ao Mārama Platform</p>
        <div style="
          background: rgba(255,255,255,0.2);
          padding: 20px;
          border-radius: 15px;
          margin-top: 20px;
        ">
          <h3 style="margin-bottom: 10px;">✅ Test Status</h3>
          <p style="margin: 0;">Platform restored with vanilla JavaScript</p>
        </div>
      </div>
    </div>
  `;

  console.log('Vanilla JS render completed');
} else {
  console.error('Root element not found!');
}

console.log('✅ Te Ao Mārama Platform initialized (Vanilla JS)');

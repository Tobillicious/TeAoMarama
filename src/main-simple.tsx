import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <div>
    <h1>🧪 Simple React Test</h1>
    <p>If you can see this, React is working!</p>
    <p>Time: {new Date().toLocaleString()}</p>
  </div>,
);

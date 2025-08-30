import React from 'react';
import './DemoAccessBanner.css';

const DemoAccessBanner: React.FC = () => {
  return (
    <div className="demo-access-banner">
      <div className="banner-content">
        <div className="banner-icon">🌟</div>
        <div className="banner-text">
          <strong>TeAoMarama Educational Platform</strong>
          <span> - Advanced AI-Powered Learning System</span>
        </div>
        <div className="banner-status">
          <span className="status-indicator active"></span>
          <span>All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};

export default DemoAccessBanner;

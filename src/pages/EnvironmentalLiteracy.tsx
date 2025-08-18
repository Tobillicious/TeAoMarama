import React from 'react';

interface EnvironmentalLiteracyProps {
  className?: string;
}

export const EnvironmentalLiteracy: React.FC<EnvironmentalLiteracyProps> = ({ className = '' }) => {
  return (
    <div className={`environmental-literacy ${className}`}>
      <header className="literacy-hero">
        <h1>Environmental Literacy Framework</h1>
        <p>Building ecological understanding through te taiao Māori</p>
      </header>
      <section className="framework-content">
        <div className="literacy-dimensions">
          <div className="dimension-card">
            <h3>🌿 Kaitiakitanga</h3>
            <p>Guardianship and stewardship of natural resources</p>
          </div>
          <div className="dimension-card">
            <h3>🌍 Systems Thinking</h3>
            <p>Understanding interconnected ecological relationships</p>
          </div>
          <div className="dimension-card">
            <h3>📊 Data Analysis</h3>
            <p>Interpreting environmental data and trends</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnvironmentalLiteracy;
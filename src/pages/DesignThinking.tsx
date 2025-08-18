import React from 'react';

interface DesignThinkingProps {
  className?: string;
}

export const DesignThinking: React.FC<DesignThinkingProps> = ({ className = '' }) => {
  return (
    <div className={`design-thinking ${className}`}>
      <header className="thinking-hero">
        <h1>Design Thinking Process</h1>
        <p>Innovative problem-solving with Māori design principles</p>
      </header>
      <section className="process-stages">
        <div className="stage-card">
          <h3>1. Whakatōhea - Empathize</h3>
          <p>Understanding user needs and cultural context</p>
        </div>
        <div className="stage-card">
          <h3>2. Whakatakoto - Define</h3>
          <p>Clearly articulate the problem and constraints</p>
        </div>
        <div className="stage-card">
          <h3>3. Waihanga - Ideate</h3>
          <p>Generate creative solutions through collaboration</p>
        </div>
        <div className="stage-card">
          <h3>4. Hanga - Prototype</h3>
          <p>Build tangible representations of ideas</p>
        </div>
        <div className="stage-card">
          <h3>5. Whakamātautau - Test</h3>
          <p>Validate solutions with real users</p>
        </div>
      </section>
    </div>
  );
};

export default DesignThinking;
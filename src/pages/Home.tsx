import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = React.memo(function Home() {
  const navigate = useNavigate();
  const [showTeReo, setShowTeReo] = useState(false);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">
          {showTeReo ? 'Te Kura o TeAoMarama' : 'Te Kura o TeAoMarama'}
        </h1>
        <p className="hero-subtitle">
          {showTeReo 
            ? 'He taonga mātauranga mō ngā akonga katoa o Aotearoa'
            : 'Educational platform for 800,000 akonga in Aotearoa New Zealand'
          }
        </p>
        <div className="hero-actions">
          <button 
            className="cta-button primary"
            onClick={() => navigate('/platform')}
          >
            {showTeReo ? 'Tīmata Ako' : 'Start Learning'}
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => setShowTeReo(!showTeReo)}
          >
            {showTeReo ? 'English' : 'Te Reo Māori'}
          </button>
        </div>
      </header>

      <section className="features-section">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>{showTeReo ? 'Ngā Rauemi' : 'Resources'}</h3>
            <p className="resource-count">2,013+</p>
            <p>{showTeReo ? 'Ngā rauemi akoranga' : 'Educational resources'}</p>
          </div>
          
          <div className="feature-card">
            <h3>{showTeReo ? 'Taiao Haumaru' : 'Cultural Safety'}</h3>
            <p className="safety-score">100%</p>
            <p>{showTeReo ? 'Tikanga Māori validated' : 'Culturally safe content'}</p>
          </div>
          
          <div className="feature-card">
            <h3>{showTeReo ? 'AI Āwhina' : 'AI Enhanced'}</h3>
            <p className="ai-status">Active</p>
            <p>{showTeReo ? 'DeepSeek & MCP coordination' : 'Multi-LLM coordination'}</p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <h2>{showTeReo ? 'Ā Mātou Whāinga' : 'Our Mission'}</h2>
        <p>
          {showTeReo 
            ? 'He whakatipu i te mātauranga Māori me te mātauranga ā-taiao hoki, ā, he whakamahi hoki i ngā hangarau hōu hei āwhina i ngā akonga katoa o Aotearoa.'
            : 'Empowering indigenous education through advanced AI coordination and culturally safe learning experiences for all students in Aotearoa.'
          }
        </p>
      </section>
    </div>
  );
});

export default Home;
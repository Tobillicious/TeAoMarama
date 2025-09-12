import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Brain, Award, TrendingUp, Sparkles, Heart, Globe, Zap, Cpu, Target, Palette } from 'lucide-react';
import './Home.css';

const Home = React.memo(function Home() {
  const navigate = useNavigate();
  const [showTeReo, setShowTeReo] = useState(false);
  const [resourceCount, setResourceCount] = useState(2013);

  // Animate to show actual development pipeline scale
  useEffect(() => {
    const targetCount = 500; // Honest count of quality-ready resources
    const increment = Math.ceil((targetCount - 50) / 30);
    let current = 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setResourceCount(targetCount);
        clearInterval(timer);
      } else {
        setResourceCount(current);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      title: showTeReo ? '🔥 Quality Resources' : '🔥 QUALITY RESOURCES',
      subtitle: showTeReo ? `${resourceCount}+ ready-to-use` : `${resourceCount}+ Ready-to-use lessons`,
      path: '/working-resources',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      highlight: true
    },
    {
      title: showTeReo ? '⚡ Enhancement Engine' : '⚡ ENHANCEMENT ENGINE',
      subtitle: showTeReo ? '4-pass AI whakapai' : '4-pass AI content enhancement',
      path: '/superintelligence',
      icon: <Cpu className="w-8 h-8" />,
      color: 'from-cyan-500 to-blue-600',
      highlight: true,
      badge: 'ACTIVE'
    },
    {
      title: showTeReo ? 'Kaiako Dashboard' : 'TEACHER DASHBOARD',
      subtitle: showTeReo ? 'Professional taputapu' : 'Development & analytics tools',
      path: '/teacher',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-600',
      highlight: true
    },
    {
      title: showTeReo ? 'Ākonga Dashboard' : 'STUDENT DASHBOARD', 
      subtitle: showTeReo ? 'Personalized ako' : 'Adaptive learning pathways',
      path: '/student',
      icon: <Award className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-600',
      highlight: true
    },
    {
      title: showTeReo ? 'Place-Based Learning' : 'PLACE-BASED LEARNING',
      subtitle: showTeReo ? 'Local context integration' : 'Authentic community connections',
      path: '/cultural-learning-modules',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-600',
      highlight: true
    },
    {
      title: showTeReo ? 'Platform Audit' : '🔍 PLATFORM AUDIT',
      subtitle: showTeReo ? 'Quality analysis' : 'Content quality & cultural analysis',
      path: '/audit',
      icon: <Target className="w-8 h-8" />,
      color: 'from-red-500 to-pink-600',
      highlight: true,
      badge: 'NEW'
    },
    {
      title: showTeReo ? 'Content Pipeline' : 'CONTENT PIPELINE',
      subtitle: showTeReo ? '2K+ in development' : '2K+ Resources in development',
      path: '/advanced-analytics',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-amber-600'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section with Enhanced Stats */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <Globe className="w-12 h-12 inline mr-4 text-green-500" />
            {showTeReo ? 'Te Kura o TeAoMarama' : 'Te Kura o TeAoMarama'}
          </h1>
          <p className="hero-subtitle">
            {showTeReo 
              ? 'AI-Enhanced Educational Development Platform - Building Tomorrow\'s Curriculum'
              : 'AI-Enhanced Educational Development Platform - Transforming Learning for Aotearoa'
            }
          </p>
          
          {/* Live Stats Bar - Honest Development Pipeline */}
          <div className="stats-bar">
            <div className="stat-item">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="stat-number">{resourceCount}+</span>
              <span className="stat-label">{showTeReo ? 'Ready Resources' : 'Quality Resources'}</span>
            </div>
            <div className="stat-item">
              <Cpu className="w-6 h-6 text-cyan-500" />
              <span className="stat-number">4-Pass</span>
              <span className="stat-label">{showTeReo ? 'Enhancement' : 'AI Enhancement'}</span>
            </div>
            <div className="stat-item">
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="stat-number">Local</span>
              <span className="stat-label">{showTeReo ? 'Place-Based' : 'Place-Based Learning'}</span>
            </div>
            <div className="stat-item">
              <Target className="w-6 h-6 text-teal-500" />
              <span className="stat-number">2K+</span>
              <span className="stat-label">{showTeReo ? 'In Development' : 'In Development'}</span>
            </div>
            <div className="stat-item">
              <Award className="w-6 h-6 text-purple-500" />
              <span className="stat-number">NZC</span>
              <span className="stat-label">{showTeReo ? 'Aligned' : 'Curriculum Aligned'}</span>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/working-resources')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {showTeReo ? 'Tīmata Ako' : 'Explore Resources'}
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => setShowTeReo(!showTeReo)}
            >
              <Globe className="w-5 h-5 mr-2" />
              {showTeReo ? 'English' : 'Te Reo Māori'}
            </button>
          </div>
        </div>
      </header>

      {/* Quick Access Dashboard */}
      <section className="dashboard-section">
        <h2 className="section-title">
          {showTeReo ? 'Ngā Huarahi Tere' : 'Quick Access Dashboard'}
        </h2>
        <div className="dashboard-grid">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className={`dashboard-card ${action.highlight ? 'highlighted' : ''}`}
              onClick={() => navigate(action.path)}
            >
              <div className={`card-background bg-gradient-to-br ${action.color}`}>
                <div className="card-icon">
                  {action.icon}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{action.title}</h3>
                  <p className="card-subtitle">{action.subtitle}</p>
                </div>
                {action.highlight && (
                  <div className="highlight-badge">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Capabilities Showcase */}
      <section className="showcase-section">
        <h2 className="section-title">
          {showTeReo ? 'Platform Capabilities' : 'Platform Capabilities'}
        </h2>
        <div className="showcase-grid">
          <div className="showcase-item">
            <div className="showcase-icon">
              <Cpu className="w-12 h-12 text-cyan-500" />
            </div>
            <h3>{showTeReo ? '4-Pass Enhancement' : 'AI Enhancement Engine'}</h3>
            <p>{showTeReo ? 'AI whakapai system' : 'Transforms template content into culturally-rich, place-based lessons'}</p>
            <div className="showcase-stats">
              <span className="highlight-number">4-Pass</span>
              <span>Enhancement pipeline</span>
            </div>
          </div>
          
          <div className="showcase-item">
            <div className="showcase-icon">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <h3>{showTeReo ? 'Place-Based Focus' : 'Authentic Integration'}</h3>
            <p>{showTeReo ? 'Local context weaving' : 'Genuine community knowledge and local environmental connections'}</p>
            <div className="showcase-stats">
              <span className="highlight-number">Local</span>
              <span>Community-centered approach</span>
            </div>
          </div>
          
          <div className="showcase-item">
            <div className="showcase-icon">
              <Sparkles className="w-12 h-12 text-yellow-500" />
            </div>
            <h3>{showTeReo ? 'Quality Over Quantity' : 'Quality-First Approach'}</h3>
            <p>{showTeReo ? 'Focused excellence' : 'Developing fewer, higher-quality resources with authentic pedagogy'}</p>
            <div className="showcase-stats">
              <span className="highlight-number">Quality</span>
              <span>Over quantity every time</span>
            </div>
          </div>
          
          <div className="showcase-item">
            <div className="showcase-icon">
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
            <h3>{showTeReo ? 'Development Pipeline' : 'Content Development'}</h3>
            <p>{showTeReo ? 'Continuous improvement' : 'Active development of template content into complete lessons'}</p>
            <div className="showcase-stats">
              <span className="highlight-number">2K+</span>
              <span>Resources in active development</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>{showTeReo ? 'Ā Mātou Whāinga' : 'Our Vision'}</h2>
          <p className="mission-text">
            {showTeReo 
              ? 'He whakatipu i ngā taputapu AI hei whakapai i nga rauemi akoranga, he whakamahi i te mātauranga-ā-iwi me nga pūnaha AI hei hanga i nga akoranga auaha, ā-rohe hoki mō Aotearoa.'
              : 'Building AI-powered tools that transform educational templates into authentic, place-based learning experiences. We develop quality-first resources that connect students to their local communities while meeting curriculum excellence standards.'
            }
          </p>
          <div className="mission-badges">
            <span className="badge">{showTeReo ? 'Quality-First' : 'Quality-First Development'}</span>
            <span className="badge">{showTeReo ? 'AI-Powered' : 'AI-Enhanced Creation'}</span>
            <span className="badge">{showTeReo ? 'Place-Based' : 'Place-Based Learning'}</span>
            <span className="badge">{showTeReo ? 'Community-Connected' : 'Community-Centered'}</span>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
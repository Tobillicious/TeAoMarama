import React from 'react';
import { ArrowRight, Star, Users, BookOpen, Award, CheckCircle } from 'lucide-react';

const StunningHomepage: React.FC = () => {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative' as const
    },
    hero: {
      padding: '120px 24px 80px',
      textAlign: 'center' as const,
      position: 'relative' as const,
      zIndex: 10
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '24px',
      lineHeight: '1.1'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      color: '#e2e8f0',
      marginBottom: '48px',
      maxWidth: '800px',
      margin: '0 auto 48px auto'
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '20px 40px',
      borderRadius: '16px',
      fontWeight: '700',
      fontSize: '18px',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease',
      marginRight: '16px'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '20px 40px',
      borderRadius: '16px',
      fontWeight: '600',
      fontSize: '18px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    },
    statsSection: {
      padding: '80px 24px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      margin: '0 24px',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '32px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    statItem: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '1.1rem',
      color: '#cbd5e1'
    },
    featuresSection: {
      padding: '80px 24px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Te Ao Mārama
        </h1>
        <p style={styles.heroSubtitle}>
          Transform your teaching with AI-powered, culturally authentic educational resources 
          designed specifically for New Zealand educators.
        </p>
        
        <div>
          <button 
            style={styles.ctaButton}
            onClick={() => navigate('/join')}
          >
            Start Your Journey
            <ArrowRight size={20} />
          </button>
          
          <button 
            style={styles.secondaryButton}
            onClick={() => navigate('/resources')}
          >
            Explore Resources
            <BookOpen size={20} />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>1,200+</div>
            <div style={styles.statLabel}>Teachers</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>500+</div>
            <div style={styles.statLabel}>Resources</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>25,000+</div>
            <div style={styles.statLabel}>Students</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>150+</div>
            <div style={styles.statLabel}>Schools</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '64px',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Why Teachers Love Te Ao Mārama
        </h2>
        
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <Star size={32} style={{ color: '#fbbf24', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
              NZ Curriculum Aligned
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Every resource perfectly aligned with New Zealand Curriculum standards across all learning areas.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <Users size={32} style={{ color: '#10b981', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
              Cultural Safety First
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Tikanga Māori validated content ensuring cultural authenticity in every lesson.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <Award size={32} style={{ color: '#8b5cf6', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
              AI-Powered Insights
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              Advanced analytics and personalized recommendations to optimize learning outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Ready to Transform Your Teaching?
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '40px' }}>
          Join 1,200+ New Zealand teachers creating outstanding learning experiences.
        </p>
        
        <button 
          style={{
            ...styles.ctaButton,
            fontSize: '20px',
            padding: '24px 48px'
          }}
          onClick={() => navigate('/join')}
        >
          Start Free Trial
          <ArrowRight size={24} />
        </button>
        
        <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '16px' }}>
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </section>
    </div>
  );
};

export default StunningHomepage;
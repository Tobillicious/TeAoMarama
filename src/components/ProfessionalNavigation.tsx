import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Brain, 
  Zap, 
  Crown, 
  Sparkles,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react';

const ProfessionalNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationSections = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Teacher Dashboard', path: '/teacher-dashboard', icon: Users },
        { name: 'Student Dashboard', path: '/student-dashboard', icon: User },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Browse Resources', path: '/resources', icon: BookOpen },
        { name: 'Te Kete Ako', path: '/te-kete-ako', icon: BookOpen },
        { name: 'Cultural Learning', path: '/cultural-learning', icon: Sparkles }
      ]
    },
    {
      title: 'AI Tools',
      premium: true,
      items: [
        { name: 'AI Assistant', path: '/ai-assistant', icon: Brain },
        { name: 'Content Analysis', path: '/content-analysis', icon: BarChart3 },
        { name: 'Smart Recommendations', path: '/recommendations', icon: Sparkles },
        { name: 'Language Models', path: '/language-models', icon: Brain }
      ]
    },
    {
      title: 'Year 8 Curriculum',
      items: [
        { name: 'Social Studies', path: '/year8/social-studies', icon: BookOpen },
        { name: 'Writing Units', path: '/year8/writing', icon: BookOpen },
        { name: 'Reading Units', path: '/year8/reading', icon: BookOpen },
        { name: 'Critical Literacy', path: '/year8/literacy', icon: BookOpen }
      ]
    },
    {
      title: 'Tools',
      items: [
        { name: 'Multimedia Studio', path: '/multimedia-studio', icon: Sparkles },
        { name: 'Assessment Builder', path: '/assessment-builder', icon: BarChart3 },
        { name: 'Lesson Planner', path: '/lesson-planner', icon: BookOpen },
        { name: 'Community', path: '/community', icon: Users }
      ]
    }
  ];

  const styles = {
    nav: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px)'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 24px'
    },
    navContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '72px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: 'white'
    },
    logoText: {
      fontSize: '1.8rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    menuSection: {
      position: 'relative' as const
    },
    menuTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '8px 16px',
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      textDecoration: 'none'
    },
    premiumBadge: {
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: '#1f2937',
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '12px',
      fontWeight: '700',
      marginLeft: '8px'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      minWidth: '220px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      padding: '8px 0',
      marginTop: '8px',
      zIndex: 1001
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      color: '#e2e8f0',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      fontSize: '14px'
    },
    mobileMenuButton: {
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: 'white',
      cursor: 'pointer'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    subscribeButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    }
  };

  const handleDropdownToggle = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.navContent}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🌿
            </div>
            <span style={styles.logoText}>Te Ao Mārama</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.desktopMenu}>
            {navigationSections.map((section) => (
              <div 
                key={section.title}
                style={styles.menuSection}
                onMouseEnter={() => setActiveDropdown(section.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div 
                  style={{
                    ...styles.menuTitle,
                    background: activeDropdown === section.title ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {section.title}
                  <ChevronDown size={14} />
                  {section.premium && <span style={styles.premiumBadge}>PRO</span>}
                </div>

                {activeDropdown === section.title && (
                  <div style={styles.dropdown}>
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        style={{
                          ...styles.dropdownItem,
                          background: isActive(item.path) ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isActive(item.path) ? 'rgba(59, 130, 246, 0.2)' : 'transparent';
                        }}
                      >
                        <item.icon size={16} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Section */}
          <div style={styles.userSection}>
            <Link to="/subscription" style={styles.subscribeButton}>
              <Crown size={16} />
              Upgrade
            </Link>
            
            <div style={styles.menuSection}>
              <div style={styles.menuTitle}>
                <User size={16} />
                Account
                <ChevronDown size={14} />
              </div>
            </div>

            <button 
              style={{
                ...styles.mobileMenuButton,
                display: 'flex'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '24px'
        }}>
          <div style={{
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {navigationSections.map((section) => (
              <div key={section.title} style={{ marginBottom: '24px' }}>
                <h3 style={{
                  color: 'white',
                  fontWeight: '700',
                  marginBottom: '12px',
                  fontSize: '16px'
                }}>
                  {section.title}
                  {section.premium && <span style={styles.premiumBadge}>PRO</span>}
                </h3>
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#e2e8f0',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      background: isActive(item.path) ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProfessionalNavigation;
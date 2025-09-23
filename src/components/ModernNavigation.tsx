import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Brain, 
  Crown, 
  Sparkles,
  Menu,
  X,
  ChevronDown,
  User,
  GraduationCap,
  Target,
  FileText,
  Zap
} from 'lucide-react';

// Router-safe wrapper component with error handling
const RouterSafeNavigation: React.FC = () => {
  try {
    return <ModernNavigationInner />;
  } catch (error) {
    console.error('Router context error in navigation:', error);
    return <FallbackNavigation />;
  }
};

// Fallback navigation for when Router context is unavailable
const FallbackNavigation: React.FC = () => {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
            <span className="text-xl font-bold">Te Ao Mārama</span>
          </div>
          <div className="text-sm text-slate-300">Navigation loading...</div>
        </div>
      </div>
    </nav>
  );
};

const ModernNavigationInner: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  let location;
  try {
    location = useLocation();
  } catch (error) {
    console.error('useLocation hook failed:', error);
    location = { pathname: '/' };
  }

  const isActive = (path: string) => location.pathname === path;

  // Professional educator-focused navigation structure
  const navigationSections = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Teacher Dashboard', path: '/teacher', icon: GraduationCap },
        { name: 'Student Dashboard', path: '/student', icon: User },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'Te Kete Ako',
      subtitle: 'Resources',
      items: [
        { name: 'Browse Resources', path: '/resources', icon: BookOpen },
        { name: 'Year 8 Curriculum', path: '/year8', icon: FileText },
        { name: 'Cultural Learning', path: '/cultural', icon: Sparkles },
        { name: 'Teacher Demo', path: '/teacher-demo', icon: Target }
      ]
    },
    {
      title: 'Students & Classes',
      items: [
        { name: 'Class Management', path: '/classes', icon: Users },
        { name: 'Student Progress', path: '/progress', icon: BarChart3 },
        { name: 'Onboarding', path: '/onboarding', icon: Target }
      ]
    },
    {
      title: 'AI Tools',
      premium: true,
      items: [
        { name: 'Supreme AI', path: '/supreme-ai', icon: Crown },
        { name: 'GraphRAG', path: '/graphrag', icon: Brain },
        { name: 'GLM Symphony', path: '/glm-symphony', icon: Sparkles },
        { name: 'LLM Army', path: '/llm-army', icon: Zap },
        { name: 'EXA Search', path: '/exa-ai', icon: Brain },
        { name: 'Unified LLM', path: '/unified-llm', icon: Brain }
      ]
    }
  ];

  const quickLinks = [
    { name: 'Join Now', path: '/join', icon: Zap, highlight: true, color: '#f59e0b' },
    { name: 'Subscription', path: '/subscription', icon: Crown, highlight: true, color: '#10b981' },
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
      fontSize: '1.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
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
      marginLeft: '6px'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: '0',
      minWidth: '240px',
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
    quickLink: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
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
          {/* Logo with Māori cultural elements */}
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

          {/* Desktop Navigation with Professional Educator Focus */}
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
                  {section.subtitle ? (
                    <span>
                      <span style={{ fontStyle: 'italic', fontSize: '12px', color: '#cbd5e1' }}>
                        {section.title}
                      </span>
                      <br />
                      {section.subtitle}
                    </span>
                  ) : (
                    section.title
                  )}
                  <ChevronDown size={14} />
                  {section.premium && <span style={styles.premiumBadge}>PRO</span>}
                </div>

                {activeDropdown === section.title && (
                  <div style={styles.dropdown}>
                    {section.items.map((item) => {
                      try {
                        return (
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
                        );
                      } catch (error) {
                        console.error(`Error rendering dropdown item ${item.path}:`, error);
                        return (
                          <a
                            key={item.path}
                            href={item.path}
                            style={styles.dropdownItem}
                          >
                            <item.icon size={16} />
                            {item.name}
                          </a>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Action Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...styles.quickLink,
                    background: link.highlight ? `linear-gradient(135deg, ${link.color}20, ${link.color}40)` : 'transparent',
                    borderColor: link.color,
                    color: 'white'
                  }}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* User Account Section */}
            <div style={styles.menuSection}>
              <div style={styles.menuTitle}>
                <User size={16} />
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu with Better Organization */}
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
          padding: '24px',
          overflowY: 'auto'
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
                  {section.subtitle ? `${section.title} - ${section.subtitle}` : section.title}
                  {section.premium && <span style={styles.premiumBadge}>PRO</span>}
                </h3>
                {section.items.map((item) => {
                  try {
                    return (
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
                          background: isActive(item.path) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                          marginBottom: '4px'
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon size={16} />
                        {item.name}
                      </Link>
                    );
                  } catch (error) {
                    console.error(`Error rendering mobile item ${item.path}:`, error);
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          color: '#e2e8f0',
                          textDecoration: 'none',
                          borderRadius: '8px',
                          marginBottom: '4px'
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon size={16} />
                        {item.name}
                      </a>
                    );
                  }
                })}
              </div>
            ))}
            
            {/* Quick Actions in Mobile */}
            <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
              <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                Quick Actions
              </h3>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${link.color}40, ${link.color}60)`,
                    marginBottom: '8px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Main export with error boundary
const ModernNavigation: React.FC = () => {
  return <RouterSafeNavigation />;
};

export default ModernNavigation;

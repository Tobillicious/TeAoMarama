import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SiteBreadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
  description?: string;
}

interface SiteBreadcrumbsProps {
  className?: string;
  showDescription?: boolean;
  maxItems?: number;
}

const SiteBreadcrumbs: React.FC<SiteBreadcrumbsProps> = ({
  className = '',
  showDescription = true,
  maxItems = 5,
}) => {
  const location = useLocation();

  // Comprehensive route mapping for breadcrumbs
  const routeMap: Record<string, BreadcrumbItem[]> = {
    '/': [{ label: 'Home', path: '/', icon: '🏠', description: 'Educational Platform Home' }],
    '/landing': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Landing', path: '/landing', icon: '🚀', description: 'Platform Landing Page' },
    ],
    '/login': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Authentication',
        path: '/login',
        icon: '🔐',
        description: 'User Authentication System',
      },
    ],
    '/dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Dashboard', path: '/dashboard', icon: '📊', description: 'User Dashboard' },
    ],
    '/teacher-dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Teacher',
        path: '/teacher-dashboard',
        icon: '👩‍🏫',
        description: 'Teacher Dashboard',
      },
    ],
    '/student-dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Student',
        path: '/student-dashboard',
        icon: '👨‍🎓',
        description: 'Student Dashboard',
      },
    ],
    '/kaitiaki-dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Kaitiaki',
        path: '/kaitiaki-dashboard',
        icon: '🛡️',
        description: 'Cultural Guardian Dashboard',
      },
    ],
    '/agent-coordination': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Agent Coordination',
        path: '/agent-coordination',
        icon: '🤖',
        description: 'Distributed Agent Network Coordination',
      },
    ],
    '/multi-llm-coordination': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Multi-LLM',
        path: '/multi-llm-coordination',
        icon: '🧠',
        description: 'Multi-LLM Coordination Dashboard',
      },
    ],
    '/multi-llm-performance': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Multi-LLM', path: '/multi-llm-coordination', icon: '🧠' },
      {
        label: 'Performance',
        path: '/multi-llm-performance',
        icon: '📈',
        description: 'Performance Monitoring Dashboard',
      },
    ],
    '/claude-integration': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Claude Integration',
        path: '/claude-integration',
        icon: '🔗',
        description: 'Claude AI Integration Dashboard',
      },
    ],
    '/educational-dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Education',
        path: '/educational-dashboard',
        icon: '🎓',
        description: 'Educational Dashboard',
      },
    ],
    '/cultural-learning-modules': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Cultural Learning',
        path: '/cultural-learning-modules',
        icon: '🌺',
        description: 'Cultural Learning Modules',
      },
    ],
    '/cultural-activities': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Cultural Activities',
        path: '/cultural-activities',
        icon: '🎭',
        description: 'Cultural Learning Activities',
      },
    ],
    '/year8-social-studies': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Year 8', path: '/year8', icon: '📚' },
      {
        label: 'Social Studies',
        path: '/year8-social-studies',
        icon: '🌍',
        description: 'Year 8 Social Studies Curriculum',
      },
    ],
    '/year8-reading': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Year 8', path: '/year8', icon: '📚' },
      {
        label: 'Reading',
        path: '/year8-reading',
        icon: '📖',
        description: 'Year 8 Reading Strategies',
      },
    ],
    '/year8-writing-units': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Year 8', path: '/year8', icon: '📚' },
      {
        label: 'Writing Units',
        path: '/year8-writing-units',
        icon: '✍️',
        description: 'Year 8 Writing Units',
      },
    ],
    '/year8-academic-vocab': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Year 8', path: '/year8', icon: '📚' },
      {
        label: 'Academic Vocabulary',
        path: '/year8-academic-vocab',
        icon: '📝',
        description: 'Year 8 Academic Vocabulary',
      },
    ],
    '/year8-critical-literacy': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Year 8', path: '/year8', icon: '📚' },
      {
        label: 'Critical Literacy',
        path: '/year8-critical-literacy',
        icon: '🔍',
        description: 'Year 8 Critical Literacy',
      },
    ],
    '/resources': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Resources',
        path: '/resources',
        icon: '📚',
        description: 'Educational Resources Browser',
      },
    ],
    '/te-kete-ako-resources': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'TeKeteAko',
        path: '/te-kete-ako-resources',
        icon: '🎒',
        description: 'TeKeteAko Educational Resources',
      },
    ],
    '/assessment-framework': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Assessment',
        path: '/assessment-framework',
        icon: '📋',
        description: 'Assessment Framework',
      },
    ],
    '/interactive-assessments': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Assessment', path: '/assessment-framework', icon: '📋' },
      {
        label: 'Interactive',
        path: '/interactive-assessments',
        icon: '🎯',
        description: 'Interactive Assessment System',
      },
    ],
    '/enhanced-content-discovery': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Content Discovery',
        path: '/enhanced-content-discovery',
        icon: '🔍',
        description: 'Enhanced Content Discovery',
      },
    ],
    '/cultural-learning-paths': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Cultural Learning', path: '/cultural-learning-modules', icon: '🌺' },
      {
        label: 'Learning Paths',
        path: '/cultural-learning-paths',
        icon: '🛤️',
        description: 'Cultural Learning Path Navigator',
      },
    ],
    '/professional-lesson-templates': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Templates',
        path: '/professional-lesson-templates',
        icon: '📄',
        description: 'Professional Lesson Templates',
      },
    ],
    '/superintelligence': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Superintelligence',
        path: '/superintelligence',
        icon: '🧠',
        description: 'Superintelligence Dashboard',
      },
    ],
    '/supreme-coordination': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Supreme Coordination',
        path: '/supreme-coordination',
        icon: '👑',
        description: 'Supreme Intelligence Coordinator',
      },
    ],
    '/borg-collective': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Borg Collective',
        path: '/borg-collective',
        icon: '🤖',
        description: 'Collective Intelligence System',
      },
    ],
    '/performance-dashboard': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Performance',
        path: '/performance-dashboard',
        icon: '📊',
        description: 'Performance Monitoring Dashboard',
      },
    ],
    '/advanced-analytics': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Analytics',
        path: '/advanced-analytics',
        icon: '📈',
        description: 'Advanced Analytics Dashboard',
      },
    ],
    '/collaboration': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Collaboration',
        path: '/collaboration',
        icon: '🤝',
        description: 'Collaboration Hub',
      },
    ],
    '/multimedia': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Multimedia', path: '/multimedia', icon: '🎬', description: 'Multimedia Studio' },
    ],
    '/community-feedback': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Community',
        path: '/community-feedback',
        icon: '💬',
        description: 'Community Feedback System',
      },
    ],
    '/teaching-quality': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Teaching Quality',
        path: '/teaching-quality',
        icon: '⭐',
        description: 'Teaching Content Quality Dashboard',
      },
    ],
    '/database-integration': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Database',
        path: '/database-integration',
        icon: '🗄️',
        description: 'Database Integration System',
      },
    ],
    '/wisdom-accelerator': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Wisdom Accelerator',
        path: '/wisdom-accelerator',
        icon: '⚡',
        description: 'Advanced Wisdom Accelerator',
      },
    ],
    '/kaiako-team': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Kaiako Team',
        path: '/kaiako-team',
        icon: '👥',
        description: 'Kaiako Teaching Team Dashboard',
      },
    ],
    '/teaching-team': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Teaching Team',
        path: '/teaching-team',
        icon: '👥',
        description: 'Teaching Team Dashboard',
      },
    ],
    '/treasure-navigation': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Treasure Navigation',
        path: '/treasure-navigation',
        icon: '🗺️',
        description: 'Treasure Map Navigation System',
      },
    ],
    '/treasure-map': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Treasure Map',
        path: '/treasure-map',
        icon: '🗺️',
        description: 'Interactive Treasure Map',
      },
    ],
    '/cultural-safety-compliance': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Cultural Safety',
        path: '/cultural-safety-compliance',
        icon: '🛡️',
        description: 'Cultural Safety Compliance Dashboard',
      },
    ],
    '/cultural-safety': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Cultural Safety',
        path: '/cultural-safety',
        icon: '🛡️',
        description: 'Cultural Safety Compliance Dashboard',
      },
    ],
    '/tikanga-compliance': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Tikanga Compliance',
        path: '/tikanga-compliance',
        icon: '🛡️',
        description: 'Tikanga Protocol Compliance Dashboard',
      },
    ],
    '/advanced-performance-monitoring': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Performance Monitoring',
        path: '/advanced-performance-monitoring',
        icon: '📊',
        description: 'Advanced Performance Monitoring Dashboard',
      },
    ],
    '/performance-monitoring': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Performance Monitoring',
        path: '/performance-monitoring',
        icon: '📊',
        description: 'Advanced Performance Monitoring Dashboard',
      },
    ],
    '/system-performance': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'System Performance',
        path: '/system-performance',
        icon: '📊',
        description: 'System Performance Monitoring Dashboard',
      },
    ],
    '/distributed-intelligence': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Distributed Intelligence',
        path: '/distributed-intelligence',
        icon: '🧠',
        description: 'Distributed Intelligence Coordinator',
      },
    ],
    '/collective-intelligence': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Collective Intelligence',
        path: '/collective-intelligence',
        icon: '🧠',
        description: 'Collective Intelligence Networks',
      },
    ],
    '/superintelligence-coordinator': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Superintelligence Coordinator',
        path: '/superintelligence-coordinator',
        icon: '🧠',
        description: 'Superintelligence Coordination System',
      },
    ],
    '/social-studies-slideshow': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Social Studies Slideshow',
        path: '/social-studies-slideshow',
        icon: '📚',
        description: 'Interactive Social Studies Presentation',
      },
    ],
    '/slideshow': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Slideshow',
        path: '/slideshow',
        icon: '📚',
        description: 'Interactive Educational Slideshow',
      },
    ],
  };

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;

    // Check for exact match first
    if (routeMap[path]) {
      return routeMap[path];
    }

    // Check for dynamic routes (e.g., /unit/:unitId, /lesson/:lessonId)
    const dynamicRoutes = [
      { pattern: /^\/unit\/[^/]+$/, base: '/unit', label: 'Unit Detail', icon: '📚' },
      { pattern: /^\/lesson\/[^/]+$/, base: '/lesson', label: 'Lesson Viewer', icon: '📖' },
    ];

    for (const route of dynamicRoutes) {
      if (route.pattern.test(path)) {
        return [
          { label: 'Home', path: '/', icon: '🏠' },
          { label: route.label, path: path, icon: route.icon, description: `${route.label} Page` },
        ];
      }
    }

    // Fallback: generate breadcrumbs from path segments
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/', icon: '🏠' }];

    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        path: currentPath,
        icon: getIconForSegment(segment),
        description: `${label} Page`,
      });
    });

    return breadcrumbs;
  };

  // Get appropriate icon for path segment
  const getIconForSegment = (segment: string): string => {
    const iconMap: Record<string, string> = {
      year8: '📚',
      year7: '📚',
      year9: '📚',
      year10: '📚',
      social: '🌍',
      studies: '🌍',
      reading: '📖',
      writing: '✍️',
      vocab: '📝',
      vocabulary: '📝',
      critical: '🔍',
      literacy: '🔍',
      cultural: '🛡️',
      learning: '🎓',
      activities: '🎭',
      assessment: '📋',
      interactive: '🎯',
      content: '📄',
      discovery: '🔍',
      enhanced: '✨',
      professional: '👔',
      lesson: '📖',
      templates: '📄',
      supreme: '👑',
      coordination: '🤖',
      borg: '🤖',
      analytics: '📈',
      collaboration: '🤝',
      multimedia: '🎬',
      community: '💬',
      feedback: '💬',
      teaching: '👩‍🏫',
      quality: '⭐',
      database: '🗄️',
      integration: '🔗',
      wisdom: '⚡',
      accelerator: '⚡',
      resources: '📚',
      'te-kete-ako': '🎒',
      kaitiaki: '🛡️',
      agent: '🤖',
      'multi-llm': '🧠',
      claude: '🔗',
      dashboard: '📊',
      login: '🔐',
      authentication: '🔐',
      teacher: '👩‍🏫',
      student: '👨‍🎓',
      home: '🏠',
      landing: '🚀',
      kaiako: '👥',
      team: '👥',
      treasure: '🗺️',
      map: '🗺️',
      navigation: '🗺️',
      safety: '🛡️',
      compliance: '🛡️',
      tikanga: '🛡️',
      performance: '📊',
      monitoring: '📊',
      system: '📊',
      distributed: '🧠',
      intelligence: '🧠',
      collective: '🧠',
      superintelligence: '🧠',
      coordinator: '🧠',
      slideshow: '📚',
      'social-studies': '📚',
    };

    return iconMap[segment] || '📄';
  };

  const breadcrumbs = generateBreadcrumbs();
  const displayBreadcrumbs = maxItems ? breadcrumbs.slice(-maxItems) : breadcrumbs;

  return (
    <nav className={`site-breadcrumbs ${className}`} aria-label="Breadcrumb navigation">
      <ol className="breadcrumb-list">
        {displayBreadcrumbs.map((item, index) => {
          const isLast = index === displayBreadcrumbs.length - 1;

          return (
            <li key={item.path} className="breadcrumb-item">
              {!isLast ? (
                <Link to={item.path} className="breadcrumb-link" title={item.description}>
                  {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                  <span className="breadcrumb-label">{item.label}</span>
                </Link>
              ) : (
                <span className="breadcrumb-current" title={item.description}>
                  {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                  <span className="breadcrumb-label">{item.label}</span>
                </span>
              )}

              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M6.5 3L11.5 8L6.5 13L5.5 12L9.5 8L5.5 4L6.5 3Z" />
                  </svg>
                </span>
              )}

              {showDescription && item.description && (
                <span className="breadcrumb-description" aria-label={item.description}>
                  {item.description}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Show ellipsis if we truncated items */}
      {maxItems && breadcrumbs.length > maxItems && (
        <div className="breadcrumb-ellipsis">
          <span className="breadcrumb-icon">⋯</span>
          <span className="breadcrumb-label">{breadcrumbs.length - maxItems + 1} more</span>
        </div>
      )}
    </nav>
  );
};

export default SiteBreadcrumbs;

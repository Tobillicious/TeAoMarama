import React from 'react';
import type { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './SiteBreadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon: string;
  description?: string;
}

interface SiteBreadcrumbsProps {
  maxItems?: number;
  showDescription?: boolean;
  className?: string;
}

const SiteBreadcrumbs: React.FC<SiteBreadcrumbsProps> = ({
  maxItems = 5,
  showDescription = false,
  className = '',
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Define route mappings for complex paths
  const routeMap: Record<string, BreadcrumbItem[]> = {
    '/': [
      {
        label: 'Home',
        path: '/',
        icon: '🏠',
        description: 'Platform overview and getting started',
      },
    ],
    '/teacher': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Teacher Dashboard',
        path: '/teacher',
        icon: '👨‍🏫',
        description: 'Professional teaching tools and resources',
      },
    ],
    '/student': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Student Dashboard',
        path: '/student',
        icon: '🎓',
        description: 'Student learning dashboard',
      },
    ],
    '/resources': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Resources',
        path: '/resources',
        icon: '📚',
        description: 'Educational resources and materials',
      },
    ],
    '/lesson': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Resources', path: '/resources', icon: '📚' },
      {
        label: 'Lesson Viewer',
        path: '/lesson',
        icon: '📖',
        description: 'Interactive lesson content',
      },
    ],
    '/year8-social-studies': [
      { label: 'Home', path: '/', icon: '🏠' },
      {
        label: 'Year 8 Social Studies',
        path: '/year8-social-studies',
        icon: '🌍',
        description: 'Year 8 Social Studies content',
      },
    ],
    '/about': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'About', path: '/about', icon: 'ℹ️', description: 'Learn about our platform' },
    ],
    '/contact': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Contact', path: '/contact', icon: '📞', description: 'Get in touch with us' },
    ],
    '/login': [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Login', path: '/login', icon: '🔐', description: 'Sign in to your account' },
    ],
  };

  // Dynamic routes for complex paths
  const dynamicRoutes = [
    { pattern: /^\/lesson\/[^/]+$/, base: '/lesson', label: 'Lesson Detail', icon: '📖' },
    { pattern: /^\/unit\/[^/]+$/, base: '/unit', label: 'Unit Detail', icon: '📚' },
  ];

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    // Check for exact route match first
    if (routeMap[location.pathname]) {
      return routeMap[location.pathname];
    }

    // Check for dynamic route patterns
    for (const route of dynamicRoutes) {
      if (route.pattern.test(location.pathname)) {
        return [
          { label: 'Home', path: '/', icon: '🏠' },
          {
            label: route.label,
            path: location.pathname,
            icon: route.icon,
            description: `${route.label} Page`,
          },
        ];
      }
    }

    // Generate breadcrumbs from path segments
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;

      // Generate label from segment
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
    }

    return breadcrumbs;
  };

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
      'deployed-content': '📚',
    };

    return iconMap[segment] || '📄';
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className={`site-breadcrumbs ${className}`} aria-label="Breadcrumb navigation">
      <ol className="breadcrumb-list">
        {breadcrumbs.slice(0, maxItems).map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path} className="breadcrumb-item">
              {!isLast ? (
                <Link to={item.path} className="breadcrumb-link">
                  <span className="breadcrumb-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="breadcrumb-label">{item.label}</span>
                </Link>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  <span className="breadcrumb-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="breadcrumb-label">{item.label}</span>
                </span>
              )}

              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  →
                </span>
              )}

              {showDescription && item.description && (
                <span className="breadcrumb-description">{item.description}</span>
              )}
            </li>
          );
        })}
      </ol>

      {maxItems && breadcrumbs.length > maxItems && (
        <div className="breadcrumb-overflow">
          <span className="breadcrumb-ellipsis">...</span>
          <span className="breadcrumb-total">({breadcrumbs.length} items)</span>
        </div>
      )}
    </nav>
  );
};

export default SiteBreadcrumbs;

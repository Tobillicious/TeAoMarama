import React from 'react';
import type { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: string;
}

interface BreadcrumbsProps {
  customBreadcrumbs?: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customBreadcrumbs, showHome = true }) => {
  const location = useLocation();
  
  // Generate breadcrumbs from URL path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return showHome ? [{ label: 'Home', path: '/', icon: '🏠' }, ...customBreadcrumbs] : customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({ label: 'Home', path: '/', icon: '🏠' });
    }

    // Route mapping for better labels
    const routeLabels: Record<string, { label: string; icon: string }> = {
      'quality-lessons': { label: 'Quality Lessons', icon: '🌟' },
      'lesson': { label: 'Lesson Details', icon: '📚' },
      'cultural-learning-modules': { label: 'Cultural Learning', icon: '🌿' },
      'educational-platform': { label: 'Educational Platform', icon: '📚' },
      'assessment-framework': { label: 'Assessments', icon: '📊' },
      'enhanced-content-discovery': { label: 'Content Discovery', icon: '🔍' },
      'multimedia': { label: 'Multimedia Studio', icon: '🎬' },
      'advanced-analytics': { label: 'Analytics', icon: '📈' },
      'teacher-dashboard': { label: 'Teacher Dashboard', icon: '👨‍🏫' },
      'student-dashboard': { label: 'Student Dashboard', icon: '🎓' },
      'performance-dashboard': { label: 'Performance', icon: '⚡' },
      'database-integration': { label: 'Database', icon: '🔗' },
      'superintelligence': { label: 'AI Systems', icon: '🧠' },
      'year8-social-studies': { label: 'Year 8 Social Studies', icon: '📖' },
      'year8-reading': { label: 'Year 8 Reading', icon: '📚' },
      'year8-writing-units': { label: 'Year 8 Writing', icon: '✍️' },
      'year8-academic-vocab': { label: 'Year 8 Vocabulary', icon: '📝' },
      'year8-critical-literacy': { label: 'Critical Literacy', icon: '🔍' },
      'cultural-activities': { label: 'Cultural Activities', icon: '🌿' },
      'collaboration': { label: 'Collaboration', icon: '👥' },
      'community-feedback': { label: 'Community', icon: '💬' },
      'resource-unlocker': { label: 'Resources', icon: '🔓' },
      'wisdom-accelerator': { label: 'Wisdom Accelerator', icon: '🚀' },
      'supreme-coordination': { label: 'Coordination', icon: '🎯' }
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle lesson ID parameter
      if (pathSegments[index - 1] === 'lesson' && segment.match(/^y\d+/)) {
        const lessonTitles: Record<string, string> = {
          'y7-treaty-waitangi': 'Treaty of Waitangi Investigation',
          'y5-maori-games': 'Traditional Māori Games',
          'y3-native-birds': 'NZ Native Birds Reading',
          'esol-support': 'ESOL Support Toolkit',
          'y10-climate-action': 'Climate Change Action'
        };
        
        breadcrumbs.push({
          label: lessonTitles[segment] || segment,
          path: currentPath,
          icon: '📖'
        });
      } else {
        const routeInfo = routeLabels[segment];
        if (routeInfo) {
          breadcrumbs.push({
            label: routeInfo.label,
            path: currentPath,
            icon: routeInfo.icon
          });
        } else {
          // Fallback: capitalize and clean up segment
          const cleanLabel = segment
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          breadcrumbs.push({
            label: cleanLabel,
            path: currentPath,
            icon: '📄'
          });
        }
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for home page only
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb navigation">
      <div className="breadcrumb-container">
        <ol className="breadcrumb-list">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.path} className="breadcrumb-item">
                {!isLast ? (
                  <>
                    <Link to={item.path} className="breadcrumb-link">
                      {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                      <span className="breadcrumb-text">{item.label}</span>
                    </Link>
                    <span className="breadcrumb-separator" aria-hidden="true">›</span>
                  </>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">
                    {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                    <span className="breadcrumb-text">{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        
        {/* Breadcrumb Actions */}
        <div className="breadcrumb-actions">
          <button
            onClick={() => window.history.back()}
            className="breadcrumb-back-btn"
            title="Go back"
          >
            ← Back
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
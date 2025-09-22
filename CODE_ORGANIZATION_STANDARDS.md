# 📁 CODE ORGANIZATION & STYLING STANDARDS - Te Ao Mārama

**Comprehensive Code Organization, Styling Guidelines, and Development Standards**

## 🎯 STANDARDS OVERVIEW

This document establishes clear code organization and styling standards for the Te Ao Mārama educational platform, ensuring consistency, maintainability, and cultural safety across all development work.

---

## 🏗️ CODE ORGANIZATION

### **Project Structure**

```
src/
├── components/                 # React components (451 files)
│   ├── auth/                  # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthProvider.tsx
│   ├── educational/           # Educational components
│   │   ├── ResourceBrowser.tsx
│   │   ├── LessonViewer.tsx
│   │   └── AssessmentSystem.tsx
│   ├── navigation/            # Navigation components
│   │   ├── ProfessionalNavigation.tsx
│   │   ├── Sidebar.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   └── cultural/             # Cultural-specific components
│       ├── TeReoWordle.tsx
│       ├── CulturalLearning.tsx
│       └── TikangaValidator.tsx
├── pages/                    # Page components (50+ files)
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Year8SocialStudies.tsx
│   └── Year8WritingUnits.tsx
├── content/                  # Educational content (7,350+ files)
│   ├── activities/           # 1,222 JSON files
│   ├── assessments/          # 531 JSON files
│   ├── lessons/              # 927 JSON files
│   ├── multimedia/           # 738 JSON files
│   └── unit-plans/           # 616 JSON files
├── services/                 # Business logic & AI services
│   ├── AuthProvider.tsx
│   ├── ContentService.ts
│   └── CulturalValidationService.ts
├── utils/                    # Utility functions (111 files)
│   ├── api-helpers.ts
│   ├── cultural-validators.ts
│   └── performance-optimizers.ts
├── types/                    # TypeScript definitions
│   ├── component-types.ts
│   ├── cultural.ts
│   └── educational.ts
├── styles/                   # Global styles (12 files)
│   ├── globals.css
│   ├── components.css
│   └── cultural-themes.css
└── hooks/                    # Custom React hooks
    ├── useCulturalContext.ts
    ├── usePagination.tsx
    └── useAuth.ts
```

### **File Naming Conventions**

- **Components**: PascalCase (e.g., `ResourceBrowser.tsx`)
- **Pages**: PascalCase (e.g., `Year8SocialStudies.tsx`)
- **Utilities**: camelCase (e.g., `culturalValidators.ts`)
- **Types**: camelCase (e.g., `componentTypes.ts`)
- **Styles**: kebab-case (e.g., `cultural-themes.css`)
- **Content**: kebab-case (e.g., `maori-mathematics.json`)

---

## 🎨 STYLING STANDARDS

### **CSS Organization**

Following the user's preference for external CSS files (no inline styles):

```css
/* Component-specific styles */
.component-name {
  /* Base styles */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}

/* Cultural theme styles */
.cultural-theme--maori {
  /* Māori cultural styling */
}

.cultural-theme--pakeha {
  /* Pākehā cultural styling */
}
```

### **CSS File Structure**

```
styles/
├── globals.css               # Global styles and variables
├── components.css            # Component-specific styles
├── cultural-themes.css       # Cultural theme styles
├── layout.css               # Layout and grid systems
├── typography.css           # Typography and fonts
├── colors.css               # Color palette and variables
├── animations.css           # Animations and transitions
├── responsive.css           # Responsive design styles
├── accessibility.css        # Accessibility enhancements
├── print.css                # Print styles
├── dark-mode.css            # Dark mode styles
└── utilities.css            # Utility classes
```

### **CSS Variables**

```css
:root {
  /* Primary Colors */
  --primary-blue: #1e40af;
  --primary-green: #059669;
  --primary-purple: #667eea;
  --primary-indigo: #764ba2;

  /* Cultural Colors */
  --maori-red: #d32f2f;
  --maori-black: #212121;
  --maori-white: #fafafa;
  --maori-brown: #8d6e63;

  /* Neutral Colors */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Typography */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-serif: 'Georgia', serif;
  --font-family-mono: 'Fira Code', monospace;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

## 🧩 COMPONENT STANDARDS

### **Component Structure**

```typescript
// Component.tsx
import React from 'react';
import { ComponentProps } from '../types/component-types';
import './Component.css';

interface ComponentProps {
  title: string;
  description?: string;
  culturalContext?: 'maori' | 'pakeha' | 'multicultural';
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({
  title,
  description,
  culturalContext = 'multicultural',
  children,
}) => {
  return (
    <div className={`component component--${culturalContext}`}>
      <h2 className="component__title">{title}</h2>
      {description && <p className="component__description">{description}</p>}
      {children && <div className="component__content">{children}</div>}
    </div>
  );
};

export default Component;
```

### **Component CSS**

```css
/* Component.css */
.component {
  /* Base component styles */
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.component__title {
  /* Title styles */
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin-bottom: var(--spacing-sm);
}

.component__description {
  /* Description styles */
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.component__content {
  /* Content styles */
  margin-top: var(--spacing-md);
}

/* Cultural context modifiers */
.component--maori {
  background: linear-gradient(135deg, var(--maori-red), var(--maori-brown));
  color: var(--maori-white);
}

.component--pakeha {
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
  color: white;
}

.component--multicultural {
  background: linear-gradient(135deg, var(--primary-green), var(--primary-blue));
  color: white;
}
```

---

## 📝 TYPESCRIPT STANDARDS

### **Type Definitions**

```typescript
// types/component-types.ts
export interface BaseComponentProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  subject: 'Mathematics' | 'Science' | 'English' | 'Social Studies';
  yearLevel: 'Year 8' | 'Year 9' | 'Year 10';
  culturalContext: 'maori' | 'pakeha' | 'multicultural';
  content: string;
  activities: string[];
  assessments: string[];
  metadata: ResourceMetadata;
}

export interface ResourceMetadata {
  created: string;
  updated: string;
  author: string;
  culturalSafety: boolean;
  curriculumAlignment: string[];
  accessibility: AccessibilityInfo;
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA';
  screenReaderCompatible: boolean;
  keyboardNavigable: boolean;
  colorContrast: number;
}
```

### **Cultural Types**

```typescript
// types/cultural.ts
export interface CulturalContext {
  type: 'maori' | 'pakeha' | 'multicultural';
  protocols: CulturalProtocol[];
  language: 'te-reo' | 'english' | 'bilingual';
  validation: CulturalValidation;
}

export interface CulturalProtocol {
  name: string;
  description: string;
  requirements: string[];
  validation: boolean;
}

export interface CulturalValidation {
  tikanga: boolean;
  whakapapa: boolean;
  kaitiakitanga: boolean;
  manaakitanga: boolean;
  whanaungatanga: boolean;
}
```

---

## 🎯 CULTURAL SAFETY STANDARDS

### **Cultural Content Guidelines**

```typescript
// Cultural content validation
interface CulturalContentValidator {
  validateTikanga(content: string): boolean;
  validateWhakapapa(content: string): boolean;
  validateKaitiakitanga(content: string): boolean;
  validateManaakitanga(content: string): boolean;
  validateWhanaungatanga(content: string): boolean;
}

// Cultural safety checklist
const culturalSafetyChecklist = {
  tikanga: 'Traditional customs and protocols respected',
  whakapapa: 'Genealogy and family connections honored',
  kaitiakitanga: 'Environmental stewardship emphasized',
  manaakitanga: 'Hospitality and care demonstrated',
  whanaungatanga: 'Relationship building prioritized',
};
```

### **Cultural Styling Guidelines**

```css
/* Cultural theme styles */
.cultural-theme--maori {
  /* Māori cultural colors and patterns */
  background: linear-gradient(135deg, #d32f2f, #8d6e63);
  color: #fafafa;
  font-family: var(--font-family-serif);
}

.cultural-theme--pakeha {
  /* Pākehā cultural styling */
  background: linear-gradient(135deg, #1e40af, #667eea);
  color: white;
  font-family: var(--font-family-sans);
}

.cultural-theme--multicultural {
  /* Multicultural inclusive styling */
  background: linear-gradient(135deg, #059669, #1e40af);
  color: white;
  font-family: var(--font-family-sans);
}
```

---

## 🔧 DEVELOPMENT STANDARDS

### **Code Quality Requirements**

```typescript
// ESLint configuration
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}

// TypeScript configuration
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### **Testing Standards**

```typescript
// Component testing
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders with required props', () => {
    render(<Component title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('validates cultural context', () => {
    render(<Component title="Test Title" culturalContext="maori" />);
    expect(screen.getByRole('main')).toHaveClass('component--maori');
  });
});
```

---

## 📊 PERFORMANCE STANDARDS

### **Performance Requirements**

- **Bundle Size**: <500KB initial bundle
- **Load Time**: <3 seconds first contentful paint
- **Runtime Performance**: >60fps animations
- **Memory Usage**: <100MB peak memory
- **Accessibility**: WCAG 2.1 AA compliance

### **Optimization Guidelines**

```typescript
// Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Memoization
const MemoizedComponent = React.memo(Component);

// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 🚀 DEPLOYMENT STANDARDS

### **Build Requirements**

```bash
# Build process
npm run build
npm run typecheck
npm run lint
npm run test
npm run cultural:safety:check
npm run accessibility:audit
npm run performance:audit
```

### **Deployment Checklist**

- [ ] TypeScript compilation successful
- [ ] ESLint validation passed
- [ ] All tests passing
- [ ] Cultural safety validation complete
- [ ] Accessibility audit passed
- [ ] Performance audit passed
- [ ] Bundle size within limits
- [ ] Security audit passed

---

## 📋 CODE REVIEW STANDARDS

### **Review Checklist**

- [ ] **Code Quality**: TypeScript, ESLint compliance
- [ ] **Cultural Safety**: Māori content validation
- [ ] **Accessibility**: WCAG compliance
- [ ] **Performance**: Optimization opportunities
- [ ] **Security**: Vulnerability assessment
- [ ] **Documentation**: Code comments and documentation
- [ ] **Testing**: Test coverage and quality
- [ ] **Styling**: External CSS, no inline styles

### **Review Process**

1. **Automated Checks**: TypeScript, ESLint, tests
2. **Cultural Review**: Māori content validation
3. **Technical Review**: Code quality and architecture
4. **Accessibility Review**: WCAG compliance
5. **Performance Review**: Optimization opportunities
6. **Security Review**: Vulnerability assessment
7. **Final Approval**: Lead developer sign-off

---

## 🔄 CONTINUOUS IMPROVEMENT

### **Standards Evolution**

- **Regular Review**: Monthly standards review
- **Community Input**: Team feedback incorporation
- **Best Practices**: Industry standard adoption
- **Cultural Updates**: Māori protocol updates
- **Technology Updates**: Framework and tool updates

### **Quality Metrics**

- **Code Coverage**: >90% test coverage
- **TypeScript Coverage**: 100% type coverage
- **Cultural Safety**: 100% validation compliance
- **Accessibility**: >95% WCAG compliance
- **Performance**: >90 Lighthouse score

---

**Last Updated**: January 2025  
**Version**: 2.0  
**Status**: Active Standards

_These standards are maintained by the development team and AI coordination system. For updates or clarifications, follow the established communication protocols._

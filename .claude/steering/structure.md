# Project Structure Guide

## Directory Organization

### Root Level
- **src/** - Main application source code
- **public/** - Static assets and resources  
- **migration/** - Data migration scripts and educational content processing
- **scripts/** - Build and development automation scripts
- **reports/** - Generated reports and analytics
- **real-resources/** - Validated educational resources
- **tests/** - Testing files (Playwright e2e tests)

### Core Application Structure (src/)

#### Components (`src/components/`)
Organize components by functionality and complexity:
- **UI Components**: `Button.tsx`, `Card.tsx`, `LoadingSpinner.tsx`
- **Navigation**: `Navigation.tsx`, `MiharaNavigation.tsx`
- **Authentication**: `AuthGuard.tsx`, `Login.tsx`, `SignUp.tsx`
- **Educational**: `EducationalPlatformDashboard.tsx`, `ResourceCountDisplay.tsx`
- **AI Systems**: `SuperintelligenceDashboard.tsx`, `SuperintelligenceOrchestrator.tsx`
- **Feature Dashboards**: `MigrationDashboard.tsx`, `HumanSuccessDashboard.tsx`

#### Pages (`src/pages/`)
Route-level components using lazy loading:
- **Core Pages**: `Home.tsx`, `About.tsx`, `Contact.tsx`
- **Educational Platform**: `EducationalPlatform.tsx`
- **Specialized CSS**: Component-specific stylesheets (e.g., `Home.css`, `EducationalPlatform.css`)

#### Services (`src/services/`)
Application logic and external integrations:
- **Authentication**: `AuthProvider.tsx`, `AuthContext.tsx`, `useAuth.ts`
- **Platform Services**: `PlatformDevelopmentService.ts`
- **Database**: `supabaseClient.ts`

#### Utils (`src/utils/`)
Shared utilities and AI systems:
- **AI Intelligence**: `superintelligence.ts`, `codebase-intelligence.ts`
- **Educational Tools**: `educational-enhancement.ts`, `cultural-intelligence.js`
- **Analytics**: `learning-analytics.js`, `platform-utils.ts`

#### Styles (`src/styles/`)
Global styling system:
- **Core Styles**: `globals.css`, `variables.css`, `components.css`
- **Design System**: `unified-design-system.css`, `styleguide.css`
- **Cultural Themes**: `cultural-adaptive.css`, `te-kete-synthesis.css`

### Educational Content Structure

#### Migration (`migration/`)
Content processing and migration tools:
- **Agent Coordination**: Multi-agent system files for content processing
- **Recovery**: `recovered_resources/` - Processed educational materials
- **Assessment**: `assessment_templates/` - Educational assessment frameworks

#### Real Resources (`real-resources/`)
Production-ready educational content:
- **Subject-specific**: Resources organized by year level and subject
- **Assessment Tools**: Ready-to-use assessment materials
- **Cultural Content**: Māori-integrated educational resources

## File Naming Conventions

### Components
- **React Components**: PascalCase with `.tsx` extension (e.g., `EducationalPlatform.tsx`)
- **Component Styles**: Match component name with `.css` extension (e.g., `EducationalPlatform.css`)
- **Hooks**: Use `use` prefix (e.g., `useAuth.ts`)

### Educational Resources
- **Format**: `Y[YearLevel]_[Subject]_[Topic]_[Description].md`
- **Example**: `Y7_Mathematics_Geometry_Maori_Patterns.md`
- **Assessment**: `Assessment_[Subject]_[YearLevel]_[Topic].md`

### Scripts and Utilities
- **kebab-case** for script files (e.g., `build-resources.ts`)
- **camelCase** for utility functions and services

## Key File Locations

### Configuration
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration  
- `tailwind.config.js` - Styling configuration
- `package.json` - Dependencies and scripts
- `CLAUDE.md` - Project-specific AI instructions

### Entry Points
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Main application component
- `index.html` - HTML template

### Educational Resources
- `public/resources/` - Public educational content
- `real-resources/` - Validated educational materials
- `migration/recovered_resources/` - Processed content from migrations

## Architecture Patterns

### Component Architecture
- Use lazy loading for route-level components
- Implement proper error boundaries
- Follow React 19 patterns (concurrent features)
- Use TypeScript strict mode throughout

### State Management
- React Context for global state (authentication, theme)
- Local component state for UI-specific data
- Avoid prop drilling through Context providers

### Educational Resource Management
- JSON-based resource metadata
- Markdown content for educational materials
- Automated build pipeline for resource compilation
- Cultural validation protocols for all content

### AI Integration
- Superintelligence system in `utils/superintelligence.ts`
- Multi-agent coordination for content processing
- Cultural intelligence for Māori content validation
- Performance monitoring and optimization

## Development Workflow

### Adding New Components
1. Create component in appropriate `src/components/` subdirectory
2. Add corresponding CSS file
3. Export from component file
4. Add to routing if necessary (lazy load for pages)

### Adding Educational Content
1. Follow naming conventions for resource files
2. Include cultural context and curriculum alignment
3. Add to build pipeline through `scripts/build-resources.ts`
4. Validate through cultural review process

### Styling Guidelines
- Use Tailwind CSS for utility classes
- Component-specific CSS for complex styling
- Follow unified design system patterns
- Maintain cultural-adaptive styling capabilities
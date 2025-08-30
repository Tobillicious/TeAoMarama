# Tech Stack Guide

## Core Technologies

### Frontend Framework
- **React 19** with TypeScript for type safety
- **Vite** as build tool and dev server
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling (configured in tailwind.config.js)

### State Management & Authentication
- **React Context** for global state (AuthProvider)
- **Supabase** for authentication and backend services
- **Firebase** for additional auth capabilities

### UI Components & Styling
- **Radix UI** components (@radix-ui/react-*)
- **Lucide React** for icons
- **CSS Modules** and component-specific CSS files
- **class-variance-authority** and **clsx** for conditional styling

### Performance & Optimization
- **React.lazy()** for code splitting
- **React.Suspense** for loading states
- **@tanstack/react-virtual** for virtualized lists
- **React.memo()** for component optimization

## Build System

### Development
```bash
npm run dev          # Start dev server on port 3000
npm run preview      # Preview production build
```

### Build & Deploy
```bash
npm run build        # Build for production (includes resource compilation)
npm run build:analyze # Build with bundle analysis
npm run deploy:netlify # Deploy to Netlify
npm run build:deploy  # Build and deploy in one step
```

### Testing
```bash
npm run test         # Run unit tests with Vitest
npm run test:e2e     # Run Playwright e2e tests
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint code linting
```

### Educational Content Pipeline
```bash
npm run build-resources    # Compile educational resources
npm run gen:resources      # Generate bulk educational content
npm run import:te-kete     # Import Te Kete Ako resources
```

## Project Dependencies

### Core React Ecosystem
- react@19.1.1, react-dom@19.1.1
- react-router-dom@7.8.0
- @types/react, @types/react-dom for TypeScript

### Backend Integration
- @supabase/supabase-js for Supabase integration
- firebase for Firebase services
- axios for HTTP requests

### Development Tools
- typescript@5.8.3 with strict configuration
- eslint with React-specific rules
- tsx for TypeScript execution
- playwright for e2e testing

### Performance Tools
- lighthouse for performance auditing
- rollup-plugin-visualizer for bundle analysis
- vite-plugin-compression2 for build optimization

## Configuration Files

### TypeScript
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - App-specific config
- `tsconfig.node.json` - Node.js config
- `tsconfig.scripts.json` - Scripts config

### Build Configuration
- `vite.config.ts` - Vite configuration with React plugin
- `postcss.config.js` - PostCSS for Tailwind
- `tailwind.config.js` - Tailwind CSS configuration

### Code Quality
- `eslint.config.js` - ESLint configuration
- `cspell.json` - Spell checking configuration

## Deployment

### Production Environment
- **Netlify** as primary hosting platform
- **Node.js 22.x** engine requirement
- Build artifacts in `dist/` directory
- `_redirects` file for SPA routing

### Environment Variables
Configure these for different environments:
- Supabase API keys and URLs
- Firebase configuration
- DeepSeek API keys for AI features

## Development Conventions

### File Organization
- Use TypeScript for all new code
- Component-specific CSS files alongside components
- Lazy loading for route-level components
- Barrel exports where appropriate

### Code Style
- Follow ESLint configuration strictly
- Use TypeScript strict mode
- Implement proper error boundaries
- Use React 19 features (concurrent features, new hooks)

### Performance Requirements
- All routes must be code-split
- Components should use React.memo() where beneficial
- Virtualization required for large lists (educational resources)
- Build output should be optimized and compressed
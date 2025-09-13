import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
      },
      mangle: {
        toplevel: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react') || id.includes('framer-motion')) {
              return 'ui-vendor';
            }
            if (id.includes('firebase') || id.includes('supabase')) {
              return 'firebase-vendor';
            }
            return 'vendor-misc';
          }

          // Feature-specific chunks
          if (id.includes('EducationalPlatform')) {
            return 'educational-platform';
          }
          if (id.includes('ProfessionalTeacherDashboard')) {
            return 'teacher-dashboard';
          }
          if (id.includes('Year8SocialStudies')) {
            return 'year8-content';
          }
          if (id.includes('FunctionalResourceBrowser')) {
            return 'resource-browser';
          }
          if (id.includes('RealLessonViewer')) {
            return 'lesson-viewer';
          }
          if (id.includes('HumanReadableContentBrowser')) {
            return 'content-browser';
          }
          if (id.includes('ComprehensiveAuthSystem')) {
            return 'auth-system';
          }
          if (id.includes('EnhancedStudentDashboard')) {
            return 'student-dashboard';
          }

          return 'main';
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
  css: {
    devSourcemap: true,
  },
});

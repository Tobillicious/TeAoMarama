import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// Function to copy directory recursively
function copyDirectory(src: string, dest: string) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const items = readdirSync(src);
  for (const item of items) {
    const srcPath = resolve(src, item);
    const destPath = resolve(dest, item);

    if (statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Plugin to copy enhanced resources
const copyEnhancedResources = () => {
  return {
    name: 'copy-enhanced-resources',
    writeBundle() {
      const src = resolve(__dirname, 'enhanced-resources-output');
      const dest = resolve(__dirname, 'dist/enhanced-resources-output');

      if (existsSync(src)) {
        console.log('📦 Copying enhanced resources to dist...');
        copyDirectory(src, dest);
        console.log('✅ Enhanced resources copied successfully');
      } else {
        console.warn('⚠️ Enhanced resources directory not found');
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyEnhancedResources()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
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
          if (
            id.includes('UnifiedContentDiscovery') ||
            id.includes('ContentPreviewModal') ||
            id.includes('content-indexer')
          ) {
            return 'content-discovery';
          }
          if (
            id.includes('TeKeteAkoResourceExplorer') ||
            id.includes('ProfessionalLessonTemplate')
          ) {
            return 'te-kete-ako';
          }
          if (
            id.includes('EnhancedDashboard') ||
            id.includes('TeacherDashboard') ||
            id.includes('StudentDashboard')
          ) {
            return 'dashboards';
          }
          if (id.includes('AssessmentSystem') || id.includes('InteractiveAssessmentSystem')) {
            return 'assessment';
          }
          if (id.includes('CulturalLearning') || id.includes('CulturalContext')) {
            return 'cultural';
          }

          // Large content files
          if (id.includes('content/') || id.includes('lessons/') || id.includes('resources/')) {
            return 'content-files';
          }

          return 'main';
        },
      },
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'framer-motion'],
  },
  server: {
    port: 5173,
    host: true,
  },
});

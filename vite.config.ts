import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';

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
    }
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
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],

          // Feature chunks
          'content-discovery': [
            './src/components/UnifiedContentDiscovery.tsx',
            './src/components/ContentPreviewModal.tsx',
            './src/utils/content-indexer.tsx',
          ],
          'te-kete-ako': [
            './src/components/TeKeteAkoResourceExplorer.tsx',
            './src/components/ProfessionalLessonTemplate.tsx',
          ],
          dashboards: [
            './src/components/EnhancedDashboard.tsx',
            './src/pages/TeacherDashboard.tsx',
            './src/pages/StudentDashboard.tsx',
          ],
          assessment: [
            './src/components/AssessmentSystem.tsx',
            './src/components/InteractiveAssessmentSystem.tsx',
          ],
          cultural: [
            './src/components/CulturalLearningPathNavigator.tsx',
            './src/contexts/CulturalContext.tsx',
            './src/utils/cultural-context-utils.ts',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
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

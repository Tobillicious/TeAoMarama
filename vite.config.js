import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// Custom plugin to copy enhanced resources
const copyEnhancedResourcesPlugin = () => {
  return {
    name: 'copy-enhanced-resources',
    writeBundle() {
      const sourceDir = './enhanced-resources-output';
      const targetDir = './dist/enhanced-resources-output';

      if (existsSync(sourceDir)) {
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }

        const files = readdirSync(sourceDir);
        console.log(`📦 Copying ${files.length} enhanced resource files...`);

        files.forEach((file) => {
          copyFileSync(`${sourceDir}/${file}`, `${targetDir}/${file}`);
        });

        console.log(`✅ Enhanced resources copied to dist/enhanced-resources-output/`);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyEnhancedResourcesPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('firebase')) {
              return 'firebase-vendor';
            }
            if (id.includes('lucide-react') || id.includes('framer-motion')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }

          // Feature chunks based on file paths
          if (
            id.includes('src/components/WorkingResourceBrowser') ||
            id.includes('src/components/ActualContentViewer') ||
            id.includes('src/components/EnhancedResourceBrowser')
          ) {
            return 'resource-browser';
          }

          if (
            id.includes('src/components/Superintelligence') ||
            id.includes('src/components/ClaudeIntegration') ||
            id.includes('src/components/EvolutionDashboard')
          ) {
            return 'superintelligence';
          }

          if (
            id.includes('src/components/Year8') ||
            id.includes('src/components/Assessment') ||
            id.includes('src/components/Educational')
          ) {
            return 'educational-content';
          }

          if (
            id.includes('src/components/Cultural') ||
            id.includes('src/components/Kaitiaki') ||
            id.includes('src/contexts/Cultural')
          ) {
            return 'cultural';
          }

          if (
            id.includes('src/components/Dashboard') ||
            id.includes('src/pages/') ||
            id.includes('src/components/Analytics')
          ) {
            return 'dashboards';
          }

          if (id.includes('src/utils/')) {
            return 'utils';
          }

          // Default chunk for other components
          return 'components';
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

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        // Enable Fast Refresh optimizations
        // fastRefresh: true,
        // Optimize JSX for performance
        jsxRuntime: 'automatic',
      }),
      // Gzip compression
      compression({
        algorithms: ['gzip'],
        threshold: 1024,
      }),
      // Brotli compression for better performance
      compression({
        algorithms: ['brotliCompress'],
        threshold: 1024,
        filename: '[path][base].br',
      }),
      // Bundle analyzer (only in analyze mode)
      mode === 'analyze' && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    
    build: {
      outDir: 'dist',
      sourcemap: command === 'serve' ? true : false, // Only in dev
      minify: 'terser',
      target: 'es2020',
      cssCodeSplit: true,
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // More aggressive code splitting for Core Web Vitals
          manualChunks: (id) => {
            // Critical vendor chunks - smallest possible
            if (id.includes('node_modules')) {
              // React core - highest priority
              if (id.includes('react/') || id.includes('react-dom/')) {
                return 'vendor-react';
              }
              // Router - medium priority
              if (id.includes('react-router')) {
                return 'vendor-router';
              }
              // Large libraries - lazy load
              if (id.includes('firebase') || id.includes('supabase')) {
                return 'vendor-database';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('recharts')) {
                return 'vendor-charts';
              }
              if (id.includes('@radix-ui')) {
                return 'vendor-ui';
              }
              // Other vendors
              return 'vendor-misc';
            }

            // Core app components - immediate load
            if (id.includes('src/components/Navigation') || 
                id.includes('src/components/LoadingSpinner') ||
                id.includes('src/components/AuthGuard')) {
              return 'app-core';
            }

            // Educational platform - priority chunk
            if (id.includes('Educational') || id.includes('pages/EducationalPlatform')) {
              return 'educational-platform';
            }

            // AI/Superintelligence - lazy load only when needed
            if (id.includes('Superintelligence') || 
                id.includes('superintelligence') ||
                id.includes('AI') || 
                id.includes('Overseer') ||
                id.includes('Borg')) {
              return 'ai-systems';
            }

            // Dashboard components - group by functionality
            if (id.includes('Dashboard')) {
              if (id.includes('Human') || id.includes('Platform')) {
                return 'dashboard-core';
              }
              if (id.includes('Advanced') || id.includes('Analytics') || id.includes('MCP')) {
                return 'dashboard-advanced';
              }
              return 'dashboard-misc';
            }

            // Other components
            if (id.includes('components/')) {
              if (id.includes('Modal') || id.includes('Resource')) {
                return 'components-modals';
              }
              return 'components-misc';
            }

            // Pages
            if (id.includes('pages/')) {
              return 'pages';
            }

            // Utilities - split by usage frequency
            if (id.includes('utils/')) {
              if (id.includes('performance') || id.includes('platform-utils')) {
                return 'utils-core';
              }
              if (id.includes('superintelligence') || id.includes('ai-')) {
                return 'utils-ai';
              }
              return 'utils-misc';
            }
          },
          // Optimize file naming for caching
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name]-[hash].css';
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
      },
      // Optimize build for performance
      terserOptions: {
        compress: {
          drop_console: command !== 'serve',
          drop_debugger: command !== 'serve',
          pure_funcs: ['console.log'],
        },
      },
    },
    
    // Optimize dev server for development
    server: {
      port: 3003,
      host: true,
      open: false,
      // HTTP/2 disabled for local development
      cors: true,
      // Optimize HMR
      hmr: {
        overlay: true,
      },
    },
    
    // Preview server config
    preview: {
      port: 3003,
      host: true,
    },
    
    // Optimize dependencies
    optimizeDeps: {
      // Pre-bundle these for faster dev startup
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
      ],
      // Exclude heavy dependencies from pre-bundling
      exclude: [
        'firebase',
        '@supabase/supabase-js',
        'puppeteer',
        'lighthouse',
      ],
    },
    
    // Define environment variables
    define: {
      __DEV__: command === 'serve',
      __PERFORMANCE_MODE__: JSON.stringify(env.PERFORMANCE_MODE || 'standard'),
    },
    
    // CSS optimization
    css: {
      devSourcemap: command === 'serve',
      postcss: {
        plugins: [],
      },
    },
    
    // Enable experimental features for performance
    experimental: {
      renderBuiltUrl: (filename) => {
        return `/${filename}`;
      },
    },
  };
});

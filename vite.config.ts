import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh with optimizations
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic',
      // Enable React DevTools in development
      devTools: true,
    }),
    splitVendorChunkPlugin(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
    // Enable compression for production builds
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  build: {
    // Enable advanced code splitting
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()
            : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
        manualChunks: {
          // Core React chunks
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],

          // UI component libraries
          'ui-components': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
          ],

          // Markdown processing
          markdown: ['marked', 'sanitize-html'],

          // Database and API
          database: ['@supabase/supabase-js'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],

          // Utilities and helpers
          utils: ['axios', 'clsx', 'class-variance-authority', 'lucide-react'],

          // Agent and AI systems
          'ai-systems': ['firebase-admin', 'pg'],
        },
      },
    },
    // Performance optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable module federation for micro-frontends
    modulePreload: {
      polyfill: false,
    },
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false,
    },
    // Enable HTTP/2 push
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      'marked',
      'sanitize-html',
      'clsx',
      'class-variance-authority',
      'lucide-react',
    ],
    exclude: ['firebase-admin', 'pg', 'weaviate-client'],
    // Force pre-bundling for better performance
    force: true,
  },
  // Resolve Firebase package issues
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/auth': 'firebase/auth',
      'firebase/firestore': 'firebase/firestore',
    },
  },
  // Enable experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      } else {
        return { relative: true };
      }
    },
  },
});

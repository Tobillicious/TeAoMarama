import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate React and React DOM
                    'react-vendor': ['react', 'react-dom'],
                    // Separate routing
                    'router-vendor': ['react-router-dom'],
                    // Separate UI components
                    'ui-vendor': [
                        '@radix-ui/react-slot',
                        'class-variance-authority',
                        'clsx',
                        'tailwind-merge',
                    ],
                    // Separate markdown processing (lazy load)
                    'markdown-vendor': ['marked', 'domhandler', 'htmlparser2', 'sanitize-html'],
                    // Separate database operations (lazy load)
                    'database-vendor': ['@supabase/supabase-js'],
                    // Separate virtual scrolling (lazy load)
                    'virtual-vendor': ['@tanstack/react-virtual'],
                },
            },
        },
        // Optimize chunk size warnings
        chunkSizeWarningLimit: 1000,
        // Enable source maps for debugging
        sourcemap: false,
        // Optimize CSS
        cssCodeSplit: true,
        // Minify options
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
        exclude: ['marked', 'domhandler', 'htmlparser2', 'sanitize-html'],
    },
    // Server options for development
    server: {
        port: 5173,
        host: true,
        // Reduce HMR frequency to prevent excessive reloads
        hmr: {
            overlay: false,
        },
    },
});

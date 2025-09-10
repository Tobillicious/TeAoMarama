import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    // Vendor chunks
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                        if (id.includes('react-router')) {
                            return 'vendor-router';
                        }
                        if (id.includes('firebase')) {
                            return 'vendor-firebase';
                        }
                        return 'vendor';
                    }
                    // Component chunks
                    if (id.includes('components')) {
                        if (id.includes('Dashboard')) {
                            return 'components-dashboard';
                        }
                        if (id.includes('Superintelligence')) {
                            return 'components-superintelligence';
                        }
                        if (id.includes('Educational')) {
                            return 'components-educational';
                        }
                        return 'components';
                    }
                    // Page chunks
                    if (id.includes('pages')) {
                        return 'pages';
                    }
                    // Utility chunks
                    if (id.includes('utils')) {
                        return 'utils';
                    }
                },
            },
        },
    },
    server: {
        port: 3000,
        host: true,
    },
});

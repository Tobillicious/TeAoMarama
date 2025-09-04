import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// Performance-optimized Vite configuration
export default defineConfig({
    plugins: [react()],
    // Build optimizations
    build: {
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false, // Disable in production for smaller bundle
        minify: 'terser',
        // Chunk size optimization
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-router': ['react-router-dom'],
                    // Feature-based chunks
                    'cultural-modules': [
                        './src/components/CulturalLearningModules.tsx',
                        './src/components/CulturalLearningPathNavigator.tsx'
                    ],
                    'assessment-system': [
                        './src/components/AssessmentSystem.tsx',
                        './src/components/InteractiveAssessmentSystem.tsx'
                    ],
                    'lesson-system': [
                        './src/components/LessonManager.tsx',
                        './src/components/LessonViewer.tsx'
                    ],
                    'download-utils': [
                        './src/components/DownloadManager.tsx'
                    ]
                },
                // Asset naming strategy
                chunkFileNames: function (chunkInfo) {
                    var _a;
                    var facadeModuleId = chunkInfo.facadeModuleId
                        ? ((_a = chunkInfo.facadeModuleId.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.tsx', '').replace('.ts', '')) || 'chunk'
                        : 'chunk';
                    return "assets/".concat(facadeModuleId, ".[hash].js");
                },
                assetFileNames: function (assetInfo) {
                    var _a;
                    var info = ((_a = assetInfo.name) === null || _a === void 0 ? void 0 : _a.split('.')) || ['asset'];
                    var ext = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return "assets/images/[name].[hash][extname]";
                    }
                    else if (/css/i.test(ext)) {
                        return "assets/styles/[name].[hash][extname]";
                    }
                    return "assets/[name].[hash][extname]";
                }
            }
        },
        // Terser options for better minification
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug']
            },
            format: {
                comments: false
            }
        }
    },
    // Server optimizations
    server: {
        hmr: {
            overlay: false
        }
    },
    // Resolve optimizations
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@utils': resolve(__dirname, './src/utils'),
            '@styles': resolve(__dirname, './src/styles')
        }
    },
    // CSS optimizations
    css: {
        devSourcemap: false,
        preprocessorOptions: {
            scss: {
                charset: false
            }
        }
    },
    // Dependency optimization
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom'
        ],
        exclude: [
        // Large dependencies that should be loaded separately
        ]
    },
    // Define global constants
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __BUILD_DATE__: JSON.stringify(new Date().toISOString())
    }
});

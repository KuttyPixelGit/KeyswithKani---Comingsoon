import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env vars so Vite can inject them into import.meta.env
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  const isProduction = mode === 'production';

  return {
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react'
    },
    base: '/',
    publicDir: 'public',
    plugins: [], // ⬅️ Removed apiPlugin()
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: isProduction ? 'esbuild' : false,
      emptyOutDir: true,
      target: 'esnext',
      modulePreload: true,
      cssCodeSplit: true,
      commonjsOptions: {
        transformMixedEsModules: true,
        esmExternals: true
      },
      rollupOptions: {
        input: {
          main: './index.html'
        },
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['lucide-react']
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        },
        // ⬅️ You don’t need nodemailer etc. in client build anymore
        external: []
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      cors: {
        origin: isProduction
          ? [
              'https://www.keyswithkani.ca',
              'https://keyswithkani.vercel.app'
            ]
          : [
              'http://localhost:5173',
              'http://localhost:3000'
            ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
        credentials: true
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, '.')
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'import.meta.env.PROD': isProduction,
      'import.meta.env.DEV': !isProduction
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@vercel/analytics', 'lucide-react']
    }
  };
});

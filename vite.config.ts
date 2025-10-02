import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { apiPlugin } from './vite-plugin-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load env file so it's available to the plugin
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };
  
  const isProduction = mode === 'production';
  
  return {
    base: './',
    publicDir: 'public',
    plugins: [apiPlugin()],
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
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      emptyOutDir: true,
      target: 'esnext',
      modulePreload: true,
      cssCodeSplit: true,
      rollupOptions: {
        external: ['nodemailer', 'fs', 'path', 'os', 'child_process'],
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
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

import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { apiPlugin } from './src/plugins/api';

export default defineConfig(({ mode }) => {
  // Load environment variables for both Vite and Node.js
  const env = loadEnv(mode, process.cwd(), '');
  
  // Make environment variables available to the Node.js server
  process.env = { ...process.env, ...env };
  
  return {
    publicDir: 'public',
    plugins: [
      // @ts-ignore - Vite plugin type issue
      apiPlugin(),
    ],
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      cors: {
        origin: [
          'https://www.keyswithkani.ca',
          'https://keyswithkani.vercel.app',
          'http://localhost:5173'
        ],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
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
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        external: ['nodemailer', 'fs', 'path', 'os', 'child_process'],
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssCodeSplit: true,
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || '')
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@vercel/analytics', 'lucide-react']
    }
  };
});

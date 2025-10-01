import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    publicDir: 'public',
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          // Remove the rewrite to keep the /api prefix
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.error('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log('Proxying request to:', req.method, req.url);
              proxyReq.setHeader('x-forwarded-host', 'localhost:5173');
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, '.')
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

import { Plugin } from 'vite';
import { sendEmail } from '../api/contact';

export function apiPlugin(): Plugin {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
          return;
        }

        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
          }
          
          const data = JSON.parse(body);
          const result = await sendEmail(data);
          
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (error: any) {
          console.error('API error:', error);
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.statusCode = 500;
          res.end(JSON.stringify({ 
            success: false, 
            message: error.message || 'Internal server error' 
          }));
        }
      });
    }
  };
}

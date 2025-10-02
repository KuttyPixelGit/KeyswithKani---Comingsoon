import type { Plugin } from 'vite';
import nodemailer from 'nodemailer';

export function apiPlugin(): Plugin {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.end();
            return;
          }
          next();
          return;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        try {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              const { name, email, message } = JSON.parse(body);

              if (!name || !email) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, message: 'Name and email are required' }));
                return;
              }

              const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
                tls: { rejectUnauthorized: false }
              });

              await transporter.sendMail({
                from: `"${name}" <${process.env.EMAIL_FROM}>`,
                to: process.env.EMAIL_TO,
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
                    <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    ${message ? `<p><strong>Message:</strong></p><div style="padding: 15px; background: #f9f9f9;">${message.replace(/\n/g, '<br>')}</div>` : ''}
                    <p style="color: #777; font-size: 12px; margin-top: 20px;">Sent at: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
                  </div>
                `
              });

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Thank you for contacting us! We will get back to you soon.' }));
            } catch (error: any) {
              console.error('Contact form error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, message: 'Failed to send message. Please try again later.' }));
            }
          });
        } catch (error: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, message: 'An error occurred.' }));
        }
      });
    }
  };
}

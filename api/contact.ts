import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Ensure we have the correct content-type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({
      success: false,
      message: 'Content-Type must be application/json',
    });
  }

  // Parse JSON body if it's a string
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON in request body',
      });
    }
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.error('Missing required environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please try again later.',
      });
    }

    // Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Note: Changed from SMTP_PASS to SMTP_PASSWORD
      },
      tls: {
        // Only disable in development
        rejectUnauthorized: process.env.NODE_ENV !== 'production'
      },
      debug: process.env.NODE_ENV !== 'production', // Enable debug logging in development
      logger: process.env.NODE_ENV !== 'production' // Log information in development
    });

    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('Server is ready to take our messages');
    } catch (error) {
      console.error('SMTP connection error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to connect to email server. Please try again later.',
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong>
              <span style="color: #333;">${name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong>
              <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
            </p>
            
            ${message ? `
              <p style="margin: 10px 0;">
                <strong style="color: #555;">Message:</strong>
              </p>
              <div style="background-color: white; padding: 15px; border-left: 3px solid #4CAF50; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            ` : ''}
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 12px;">
            <p>This email was sent from the KeyswithKani contact form.</p>
            <p>Received at: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${message ? `Message:\n${message}` : ''}

---
Received at: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}
      `,
    });

    console.log(`✅ Contact form email sent from ${email}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
}

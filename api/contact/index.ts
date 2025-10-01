import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as nodemailer from 'nodemailer';

type RequestBody = {
  name: string;
  email: string;
  message?: string;
};

// Enable CORS
const allowCors = (fn: Function) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body as RequestBody;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  try {
    if (!process.env.VITE_EMAIL_USER || !process.env.VITE_EMAIL_PASS) {
      throw new Error('Email configuration is missing');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.VITE_EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.VITE_EMAIL_PORT || '587'),
      secure: process.env.VITE_EMAIL_SECURE === 'true',
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.VITE_EMAIL_USER}>`,
      to: process.env.VITE_EMAIL_RECIPIENT || process.env.VITE_EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Message: ${message || 'No message provided'}`
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p>${(message || 'No message provided').replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send message. Please try again later.' 
    });
  }
};

export default allowCors(handler);

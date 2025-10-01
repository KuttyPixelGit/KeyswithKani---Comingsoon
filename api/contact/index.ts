import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as nodemailer from 'nodemailer';

type RequestBody = {
  name: string;
  email: string;
  message?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body as RequestBody;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  try {
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
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message || 'No message provided'}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
}

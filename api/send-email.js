import nodemailer from 'nodemailer';

// Create a test account for development
let testAccount;

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

export async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email) {
    return res.status(400).json({ 
      success: false,
      message: 'Name and email are required fields' 
    });
  }

  try {
    // Use test account in development, real credentials in production
    let transporter;
    let testAccount;
    
    if (process.env.NODE_ENV === 'production' && process.env.EMAIL_HOST) {
      // Production configuration
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Development configuration (Ethereal)
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECIPIENT || 'your-email@example.com',
      replyTo: email,
      subject: `New Contact from ${name} - ${process.env.SITE_NAME || 'Website'}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00C8C8; border-bottom: 2px solid #FFD700; padding-bottom: 5px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            This email was sent from the contact form on ${process.env.SITE_URL || 'your website'}.
          </p>
        </div>
      `,
    });

    console.log('Message sent: %s', info.messageId);
    
    // In development, log the preview URL
    if (testAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', previewUrl);
      return res.status(200).json({ 
        success: true,
        message: 'Email sent successfully',
        previewUrl
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Error sending email',
      error: error.message 
    });
  }
}

import * as nodemailer from 'nodemailer';

// Log environment variables for debugging
console.log('Email Config:', {
  host: process.env.VITE_EMAIL_HOST,
  port: process.env.VITE_EMAIL_PORT,
  secure: process.env.VITE_EMAIL_SECURE,
  user: process.env.VITE_EMAIL_USER ? '***' : 'MISSING',
  pass: process.env.VITE_EMAIL_PASS ? '***' : 'MISSING',
  recipient: process.env.VITE_EMAIL_RECIPIENT ? '***' : 'MISSING'
});

if (!process.env.VITE_EMAIL_USER || !process.env.VITE_EMAIL_PASS) {
  console.error('Missing required email configuration. Please check your .env file.');
}

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.VITE_EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.VITE_EMAIL_PORT || '587'),
  secure: process.env.VITE_EMAIL_SECURE === 'true',
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASS,
  },
});

export async function sendEmail(data: { name: string; email: string; message: string }) {
  try {
    await transporter.sendMail({
      from: `"${data.name}" <${process.env.VITE_EMAIL_USER}>`,
      to: process.env.VITE_EMAIL_RECIPIENT,
      subject: `New contact from ${data.name}`,
      text: data.message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      `,
    });
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send message. Please try again later.' };
  }
}

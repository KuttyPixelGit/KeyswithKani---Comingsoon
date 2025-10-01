// Import required modules
const nodemailer = require('nodemailer');

// Helper function to send JSON response
const sendJsonResponse = (res, status, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
};

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, { success: false, message: 'Method not allowed' });
  }

  try {
    // Parse JSON body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
      console.error('Error parsing request body:', e);
      return sendJsonResponse(res, 400, { success: false, message: 'Invalid JSON body' });
    }

    const { name, email, message } = body;

    // Validate input
    if (!name?.trim() || !email?.trim()) {
      return sendJsonResponse(res, 400, { 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    // Get email configuration from environment variables
    const emailUser = process.env.VITE_EMAIL_USER;
    const emailPass = process.env.VITE_EMAIL_PASS;
    
    if (!emailUser || !emailPass) {
      console.error('Email configuration is missing');
      return sendJsonResponse(res, 500, {
        success: false,
        message: 'Server configuration error'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.VITE_EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.VITE_EMAIL_PORT || '587'),
      secure: process.env.VITE_EMAIL_SECURE === 'true',
      auth: { 
        user: emailUser, 
        pass: emailPass 
      },
    });

    // Send email
    const recipient = process.env.VITE_EMAIL_RECIPIENT || emailUser;
    const emailText = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message || 'No message provided'}`
    ].join('\n\n');

    await transporter.sendMail({
      from: `"${name}" <${emailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: emailText,
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
    });
    
    return sendJsonResponse(res, 200, { 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return sendJsonResponse(res, 500, { 
      success: false, 
      message: 'Failed to process your request. Please try again later.' 
    });
  }
};

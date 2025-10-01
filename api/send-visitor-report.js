import nodemailer from 'nodemailer';

export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, visitorCount, subject } = request.body;

    // Validate input
    if (!email || !visitorCount) {
      return response.status(400).json({ error: 'Email and visitor count are required' });
    }

    // Create transporter for nodemailer
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject || `Weekly Visitor Report - ${new Date().toLocaleDateString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFD700;">Keyswithkani Weekly Visitor Report</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Visitor Statistics</h3>
            <p style="font-size: 18px; margin: 10px 0;">
              <strong>Total Visitors:</strong> 
              <span style="color: #00C8C8; font-size: 24px;">${visitorCount.toLocaleString()}</span>
            </p>
            <p style="font-size: 14px; color: #666;">
              Report generated on: ${new Date().toLocaleString()}
            </p>
          </div>
          <p style="color: #333;">
            This automated report is sent weekly to provide updates on website visitor statistics.
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #999;">
            Keyswithkani - 70 Wayside Lane, St Thomas Ontario Canada N5P 0G5<br>
            Phone: +1 519 619 0070 | Email: contact@keyswithkani.ca
          </p>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return response.status(200).json({ 
      success: true, 
      message: 'Visitor report sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ 
      success: false, 
      error: 'Failed to send visitor report',
      details: error.message
    });
  }
}
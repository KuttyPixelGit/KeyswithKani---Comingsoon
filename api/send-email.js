import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create a test account for development
  let testAccount = await nodemailer.createTestAccount();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'your-email@example.com', // Replace with your email
      subject: 'New Contact Form Submission',
      text: message,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ 
      message: 'Email sent successfully',
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Error sending email',
      error: error.message 
    });
  }
}

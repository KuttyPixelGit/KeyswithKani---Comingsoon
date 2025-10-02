import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@vercel/postgres';
import nodemailer from 'nodemailer';

// This is a serverless function that will be called by Vercel Cron
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Verify the request is coming from Vercel Cron
  const authHeader = req.headers.authorization;
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
  
  if (!authHeader || authHeader !== expectedAuth) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const client = await createClient();
    
    // Get weekly stats
    const { rows: weeklyStats } = await client.sql`
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        COUNT(DISTINCT visitor_id) as unique_visitors,
        COUNT(*) as total_visits
      FROM visits
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date ASC
    `;

    // Get total stats for the week
    const { rows: [totalStats] } = await client.sql`
      SELECT 
        COUNT(DISTINCT visitor_id) as total_unique_visitors,
        COUNT(*) as total_visits
      FROM visits
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;

    // Get most visited pages
    const { rows: topPages } = await client.sql`
      SELECT 
        pathname,
        COUNT(*) as visits
      FROM visits
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY pathname
      ORDER BY visits DESC
      LIMIT 5
    `;

    await client.end();

    // Generate HTML report
    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekStartStr = weekStart.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let reportHtml = `
      <h1>Weekly Visitor Report</h1>
      <p>Report for ${weekStartStr} to ${reportDate}</p>
      
      <h2>Summary</h2>
      <ul>
        <li>Total Visits: ${totalStats.total_visits}</li>
        <li>Unique Visitors: ${totalStats.total_unique_visitors}</li>
      </ul>
      
      <h2>Daily Stats</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <th>Date</th>
          <th>Unique Visitors</th>
          <th>Total Visits</th>
        </tr>
    `;

    weeklyStats.forEach(day => {
      const date = new Date(day.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      reportHtml += `
        <tr>
          <td>${date}</td>
          <td style="text-align: center;">${day.unique_visitors}</td>
          <td style="text-align: center;">${day.total_visits}</td>
        </tr>
      `;
    });

    reportHtml += `
      </table>
      
      <h2>Top Pages</h2>
      <ul>
    `;

    topPages.forEach(page => {
      reportHtml += `<li>${page.pathname} - ${page.visits} visits</li>`;
    });

    reportHtml += `
      </ul>
      <p>This is an automated report. Do not reply to this email.</p>
    `;

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"KeyswithKani Analytics" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.REPORT_RECIPIENT || process.env.SMTP_USER,
      subject: `Weekly Visitor Report - ${reportDate}`,
      html: reportHtml,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Weekly report sent successfully' 
    });

  } catch (error) {
    console.error('Error generating weekly report:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to generate report',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

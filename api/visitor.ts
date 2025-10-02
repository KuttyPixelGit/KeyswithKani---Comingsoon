import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from '../src/utils/email';

// Types
type DailyStats = {
  date: string;
  count: number;
};

// In-memory storage (replace with Vercel KV in production)
const storage = {
  data: new Map<string, any>(),
  
  // Get a value from storage
  async get(key: string): Promise<unknown> {
    return this.data.get(key) || null;
  },
  
  // Set a value in storage
  async set(key: string, value: unknown): Promise<void> {
    this.data.set(key, value);
  },
  
  // Increment a numeric value
  async incr(key: string): Promise<number> {
    const current = (await this.get(key) as number) || 0;
    const newValue = current + 1;
    await this.set(key, newValue);
    return newValue;
  },
  
  // Get a field from a hash
  async hget(key: string, field: string): Promise<unknown> {
    const hash = (await this.get(key) as Record<string, unknown>) || {};
    return hash[field] || null;
  },
  
  // Increment a field in a hash
  async hincrby(key: string, field: string, increment: number): Promise<number> {
    const hash = (await this.get(key) as Record<string, number>) || {};
    const current = hash[field] || 0;
    const newValue = current + increment;
    await this.set(key, { ...hash, [field]: newValue });
    return newValue;
  }
};

// Email configuration
const EMAIL_CONFIG = {
  businessEmail: process.env.EMAIL_TO || process.env.BUSINESS_EMAIL || 'your-email@example.com',
  fromEmail: process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@yourdomain.com',
  
  // Send email using nodemailer
  async sendReport(subject: string, text: string): Promise<boolean> {
    return sendEmail({
      to: this.businessEmail,
      subject,
      text
    });
  }
};

// Visitor counter keys
// Storage keys
const KEYS = {
  TOTAL_VISITORS: 'total_visitors',
  DAILY_VISITS: (date: string) => `daily_visits:${date}`,
  LAST_REPORT_DATE: 'last_report_date'
};

async function incrementVisitor() {
  try {
    // Increment total visitors
    const total = await storage.incr(KEYS.TOTAL_VISITORS);
    
    // Track daily visits
    const today = new Date().toISOString().split('T')[0];
    await storage.hincrby(KEYS.DAILY_VISITS(today), 'count', 1);
    
    // Check if we need to send a weekly report
    await checkAndSendWeeklyReport();
    
    return total;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    throw error;
  }
}

async function getVisitorCount(): Promise<number> {
  try {
    return (await storage.get(KEYS.TOTAL_VISITORS) as number) || 0;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return 0;
  }
}

async function checkAndSendWeeklyReport(): Promise<void> {
  try {
    const now = new Date();
    const lastReportDateStr = await storage.get(KEYS.LAST_REPORT_DATE) as string | null;
    
    // Check if it's time to send a weekly report (every Sunday)
    if (!lastReportDateStr || (now.getDay() === 0 && new Date(lastReportDateStr).getDate() !== now.getDate())) {
      await sendWeeklyReport();
      await storage.set(KEYS.LAST_REPORT_DATE, now.toISOString());
    }
  } catch (error) {
    console.error('Error in weekly report check:', error);
  }
}

async function sendWeeklyReport(): Promise<boolean> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    
    // Get daily visits for the past week
    const dailyStats: DailyStats[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = (await storage.hget(KEYS.DAILY_VISITS(dateStr), 'count') as number) || 0;
      dailyStats.push({ date: dateStr, count });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const totalVisitors = await getVisitorCount();
    const weekTotal = dailyStats.reduce((sum, day) => sum + day.count, 0);
    
    // Format the email content
    const emailContent = [
      '=== WEEKLY VISITOR REPORT ===',
      `Report Date: ${endDate.toLocaleDateString()}`,
      `Total Visitors: ${totalVisitors}`,
      `Visitors This Week: ${weekTotal}`,
      '',
      'Daily Breakdown:',
      ...dailyStats.map(day => `  ${day.date}: ${day.count} visitors`),
      '\nThank you for using our analytics service!'
    ].join('\n');
    
    // Send the email
    await EMAIL_CONFIG.sendReport(
      `Weekly Visitor Report - ${endDate.toLocaleDateString()}`,
      emailContent
    );
    
    return true;
  } catch (error) {
    console.error('Error sending weekly report:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      const count = await incrementVisitor();
      return res.status(200).json({ success: true, count });
    } else if (req.method === 'GET') {
      const count = await getVisitorCount();
      return res.status(200).json({ totalVisitors: count });
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Visitor tracking error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

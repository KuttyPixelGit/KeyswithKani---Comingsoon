import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory visitor tracking for serverless (Note: resets on deployment)
let visitorCount = 0;
const dailyVisits: Record<string, number> = {};

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
      // Increment visitor count
      visitorCount++;
      
      // Track daily visits
      const today = new Date().toISOString().split('T')[0];
      dailyVisits[today] = (dailyVisits[today] || 0) + 1;
      
      return res.status(200).json({ success: true, count: visitorCount });
    } else if (req.method === 'GET') {
      // Get current visitor count
      return res.status(200).json({ totalVisitors: visitorCount });
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Visitor tracking error:', error);
    return res.status(200).json({ totalVisitors: visitorCount });
  }
}

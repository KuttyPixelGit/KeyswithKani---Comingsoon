import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { pathname, referrer } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Create a simple hash of the IP for basic uniqueness (not for security, just grouping)
    const visitorId = require('crypto')
      .createHash('md5')
      .update(ip + userAgent)
      .digest('hex');

    // Connect to Vercel Postgres
    const client = await createClient();
    
    // Create visits table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        visitor_id VARCHAR(50) NOT NULL,
        pathname VARCHAR(500) NOT NULL,
        referrer VARCHAR(1000),
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert the visit
    await client.sql`
      INSERT INTO visits (visitor_id, pathname, referrer, user_agent)
      VALUES (${visitorId}, ${pathname || '/'}, ${referrer || ''}, ${userAgent})
    `;

    await client.end();
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import rateLimit from 'utils/rateLimit';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SA as string);
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const limiter = new Map<string, number>();

const rateLimitMiddleware = (req: AuthedRequest, res: NextApiResponse, next: CallableFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const currentTime = Date.now();
  const limit = 5; // allow 5 requests
  const windowMs = 60 * 1000; // per 1 minute

  if (!limiter.has(ip as string)) {
    limiter.set(ip as string, currentTime);
  }

  const firstRequestTime = limiter.get(ip as string) || 0;

  if (currentTime - firstRequestTime > windowMs) {
    limiter.set(ip as string, currentTime);
    return next();
  }

  return res.status(429).json({ error: 'Too many requests, please try again later.' });
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  rateLimitMiddleware(req, res, async () => {
    if (req.method === 'GET') {
      try {
        const configurationsRef = db.collection('configurations');
        const snapshot = await configurationsRef.get();
        const configurations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(configurations);
      } catch (err) {
        return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
      }
    } else if (req.method === 'POST') {
      try {
        const { name, value } = req.body;
        const newConfig = await db.collection('configurations').add({ name, value });

        return res.status(201).json({ id: newConfig.id, name, value });
      } catch (err) {
        return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
      }
    } else {
      return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
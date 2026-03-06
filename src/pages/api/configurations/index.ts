import type { NextApiRequest, NextApiResponse } from 'next';
import { getConfigurations } from '@/lib/configurations';
import { initializeFirebaseAdmin } from '@/lib/firebaseAdmin';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

initializeFirebaseAdmin();

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const configurations = await getConfigurations(req.user?.id);
    return res.status(200).json(configurations);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
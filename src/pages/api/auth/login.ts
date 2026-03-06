import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: any; // Define a type for your user object if needed
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const rateLimitMap = new Map<string, number>();

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const rateLimitKey = req.ip;
  const currentTime = Date.now();
  const requestCount = rateLimitMap.get(rateLimitKey) || 0;

  if (requestCount >= 5) {
    return res.status(429).json({ message: 'Too many requests' });
  }

  try {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    rateLimitMap.set(rateLimitKey, requestCount + 1);
    setTimeout(() => {
      rateLimitMap.delete(rateLimitKey);
    }, 60000); // Reset count after 1 minute

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
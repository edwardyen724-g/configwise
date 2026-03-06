import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const SIGNUP_RATE_LIMIT = 5; // Maximum signups
const signupAttempts = new Map<string, number>();

export default async function signup(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    if (clientIp && signupAttempts.has(clientIp)) {
      const attempts = signupAttempts.get(clientIp)!;
      if (attempts >= SIGNUP_RATE_LIMIT) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
      }
    } else {
      signupAttempts.set(clientIp, 0);
    }

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (clientIp) {
      signupAttempts.set(clientIp, signupAttempts.get(clientIp)! + 1);
    }

    return res.status(200).json({ user });
    
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}
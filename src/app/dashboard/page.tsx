import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@supabase/auth-helpers-react';
import { fetchConfigurations } from '../../lib/configurationService';
import { Configuration } from '../../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard: React.FC = () => {
  const session = useSession();
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfigurations = async () => {
      if (!session) return;

      try {
        const data = await fetchConfigurations(session.user.id);
        setConfigurations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    loadConfigurations();
  }, [session]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Your Configurations</h1>
      {error && <p className="text-red-600">{error}</p>}
      {configurations.length === 0 ? (
        <p>You have no configurations yet.</p>
      ) : (
        <ul className="mt-4">
          {configurations.map((config) => (
            <li key={config.id} className="border-b py-2">
              <h2 className="font-semibold">{config.name}</h2>
              <p>Status: {config.status}</p>
              <p>Last Updated: {new Date(config.lastUpdated).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
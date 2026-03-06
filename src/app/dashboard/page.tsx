import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '../context/AuthContext'; // Adjust the import based on your AuthContext structure
import { TailwindProvider } from 'tailwindcss-react-native'; // Adjust accordingly based on your tailwind setup

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DashboardPage: React.FC = () => {
  const { session } = useSession();
  const [configurations, setConfigurations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchConfigurations = async () => {
      if (!session) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('configurations')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) throw error;
        setConfigurations(data || []);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchConfigurations();
  }, [session]);

  return (
    <TailwindProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Say Goodbye to Configuration Chaos – Streamline Your Next.js Projects with ConfigWise!
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4">
            {configurations.length > 0 ? (
              <ul>
                {configurations.map((config) => (
                  <li key={config.id} className="border p-4 my-2 rounded">
                    <h2 className="font-semibold">{config.name}</h2>
                    <p>Status: {config.status}</p>
                    <p>Last Updated: {new Date(config.updated_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No configurations found.</p>
            )}
          </div>
        )}
      </div>
    </TailwindProvider>
  );
};

export default DashboardPage;
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('configurations')
          .select('*');

        if (error) throw error;
        console.log(data);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Say Goodbye to Configuration Chaos – Streamline Your Next.js Projects with ConfigWise!
      </h1>
      <p className="mt-4 text-lg text-center text-gray-600">
        Simplify Next.js configuration management for developers.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Real-time Tracking</h2>
          <p className="mt-2 text-gray-600">
            Identify drift from source code with real-time configuration tracking.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Integrated Documentation</h2>
          <p className="mt-2 text-gray-600">
            Documentation updates synchronize with configuration changes.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">User-friendly Dashboard</h2>
          <p className="mt-2 text-gray-600">
            Visualize configuration status and history with our dashboard.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pre-built Templates</h2>
          <p className="mt-2 text-gray-600">
            Simplify your setup with common Next.js configurations.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Collaboration Tools</h2>
          <p className="mt-2 text-gray-600">
            Team members can comment and suggest changes on configurations.
          </p>
        </div>
      </div>
    </main>
  );
}
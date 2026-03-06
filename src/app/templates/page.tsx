import React from 'react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TemplatePage: React.FC = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('templates')
          .select('*');

        if (error) throw error;

        setTemplates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ConfigWise Templates</h1>
      <h2 className="text-xl font-semibold mb-2">
        Say Goodbye to Configuration Chaos – Streamline Your Next.js Projects with ConfigWise!
      </h2>
      <p className="mb-4">
        Explore our pre-built templates to simplify setup and enhance your project management.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map(template => (
          <div key={template.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{template.title}</h3>
            <p>{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;
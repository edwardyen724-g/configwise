'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const TemplatesPage: React.FC = () => {
  const router = useRouter();

  const templates = [
    {
      id: 1,
      name: 'Basic Next.js Configuration',
      description: 'A simple setup for Next.js applications with essential configurations.',
    },
    {
      id: 2,
      name: 'E-commerce Setup',
      description: 'Pre-configured for Next.js applications with integrated Stripe payments.',
    },
    {
      id: 3,
      name: 'SEO Optimization Template',
      description: 'Focused on best practices for SEO in Next.js projects.',
    },
  ];

  const handleTemplateClick = (id: number) => {
    router.push(`/templates/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Say Goodbye to Configuration Chaos!</h1>
      <p className="text-lg mb-6">Streamline Your Next.js Projects with ConfigWise!</p>
      <h2 className="text-2xl font-semibold mb-4">Available Templates</h2>
      <ul className="space-y-4">
        {templates.map(template => (
          <li key={template.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold cursor-pointer" onClick={() => handleTemplateClick(template.id)}>
              {template.name}
            </h3>
            <p className="text-gray-600">{template.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesPage;
import React from 'react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Documentation for ConfigWise</h1>
      <p className="text-xl mb-4">
        <strong>Tagline:</strong> Simplify Next.js configuration management for developers.
      </p>
      <h2 className="text-3xl font-semibold mb-4">Overview</h2>
      <p>
        ConfigWise helps freelance web developers manage Next.js configuration effortlessly,
        minimizing chaos with a user-friendly interface and powerful tools.
      </p>
      
      <h2 className="text-3xl font-semibold mb-4">MVP Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Real-time configuration tracking to identify drift from source code.</li>
        <li>Integrated documentation updates that synchronize with configuration changes.</li>
        <li>User-friendly dashboard to visualize configuration status and history.</li>
        <li>Pre-built templates for common Next.js configurations to simplify setup.</li>
        <li>Collaboration tools for team members to comment and suggest changes on configurations.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
      <p>
        To get started with ConfigWise, you need to create an account and set up your Next.js project
        with the provided templates. Follow the steps in our <a href="/quickstart" className="text-blue-500 underline">Quickstart Guide</a>.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Support</h2>
      <p>
        For any assistance, please reach out to our support team at{' '}
        <a href="mailto:support@configwise.com" className="text-blue-500 underline">support@configwise.com</a>.
      </p>
    </div>
  );
};

export default DocumentationPage;
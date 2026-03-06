import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center">
        Say Goodbye to Configuration Chaos – Streamline Your Next.js Projects with ConfigWise!
      </h1>
      <p className="mt-4 text-lg text-center">
        Simplify Next.js configuration management for developers.
      </p>
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">MVP Features</h2>
        <ul className="list-disc list-inside">
          <li>Real-time configuration tracking to identify drift from source code.</li>
          <li>Integrated documentation updates that synchronize with configuration changes.</li>
          <li>User-friendly dashboard to visualize configuration status and history.</li>
          <li>Pre-built templates for common Next.js configurations to simplify setup.</li>
          <li>Collaboration tools for team members to comment and suggest changes on configurations.</li>
        </ul>
      </div>
      <Link href="/get-started" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Get Started
      </Link>
    </main>
  );
};

export default Home;
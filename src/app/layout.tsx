import React from 'react';
import './globals.css';
import { SupabaseProvider } from '../context/SupabaseContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ConfigWise',
  description: 'Simplify Next.js configuration management for developers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Toaster />
          <main className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4 text-center">
              <h1 className="text-2xl font-bold">Say Goodbye to Configuration Chaos</h1>
              <p className="text-lg">{metadata.description}</p>
            </header>
            <div className="flex-grow">{children}</div>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>&copy; {new Date().getFullYear()} ConfigWise. All rights reserved.</p>
            </footer>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
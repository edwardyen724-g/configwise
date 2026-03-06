import React from 'react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ConfigWise',
  description: 'Simplify Next.js configuration management for developers.',
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">ConfigWise</h1>
          <p className="text-sm">{metadata.description}</p>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-200 text-center p-4">
          <p className="text-sm">
            © {new Date().getFullYear()} ConfigWise. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
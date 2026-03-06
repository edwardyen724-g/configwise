import { defineConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const isProduction = process.env.NODE_ENV === 'production';

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all Sentry logs
};

const config = defineConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'], // Replace with your image domains
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PK: process.env.NEXT_PUBLIC_STRIPE_PK,
  },
  future: {
    webpack5: true,
  },
  postcss: {
    plugins: [tailwindcss, autoprefixer],
  },
});

export default isProduction
  ? withSentryConfig(config, sentryWebpackPluginOptions)
  : config;
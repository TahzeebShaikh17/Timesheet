/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (now stable)
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/types': './src/types',
      '@/hooks': './src/hooks',
      '@/ui': './src/components/ui',
      '@/dashboard': './src/components/dashboard',
      '@/layout': './src/components/layout',
    },
  },

  // API rewrites for .NET Core backend integration
  async rewrites() {
    const apiUrl = process.env.API_URL || 'https://localhost:7276';
    
    console.log('🔗 API Proxy Configuration:');
    console.log('   Environment:', process.env.NODE_ENV);
    console.log('   API URL:', apiUrl);
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },

  // Environment variables
  env: {
    API_URL: process.env.API_URL || 'https://localhost:7276',
    NEXT_PUBLIC_APP_NAME: 'One Portal',
  },

  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
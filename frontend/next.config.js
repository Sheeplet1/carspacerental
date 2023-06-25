/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:5000/:path*'
              : '/:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;

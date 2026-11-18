/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: 'https://e-commerce-svyy.onrender.com/api/:path*/',
      },
      {
        source: '/api/:path*',
        destination: 'https://e-commerce-svyy.onrender.com/api/:path*/',
      },
    ];
  },
};

module.exports = nextConfig;

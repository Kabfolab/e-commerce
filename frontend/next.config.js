/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://e-commerce-svyy.onrender.com/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig

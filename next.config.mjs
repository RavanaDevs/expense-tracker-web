/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://170.187.237.26:5555/:path*',
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmc-public-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/profiles/**',
      },
      {
        protocol: 'https',
        hostname: 'cmc-public-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/logos/**',
      },
    ],
  },
}

module.exports = nextConfig

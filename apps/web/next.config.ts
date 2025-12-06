/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['hono'], 
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
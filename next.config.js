/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AWS_EXPORTS_REGION: process.env.AWS_EXPORTS_REGION,
    AWS_EXPORTS_USER_POOL_ID: process.env.AWS_EXPORTS_USER_POOL_ID,
    AWS_EXPORTS_USER_POOLS_WEB_CLIENT_ID: process.env.AWS_EXPORTS_USER_POOLS_WEB_CLIENT_ID,
  }
}

module.exports = nextConfig

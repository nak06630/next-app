/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_AWS_EXPORTS_REGION: process.env.NEXT_AWS_EXPORTS_REGION,
    NEXT_AWS_EXPORTS_USER_POOL_ID: process.env.NEXT_AWS_EXPORTS_USER_POOL_ID,
    NEXT_AWS_EXPORTS_USER_POOLS_WEB_CLIENT_ID: process.env.NEXT_AWS_EXPORTS_USER_POOLS_WEB_CLIENT_ID,
  }
}

module.exports = nextConfig

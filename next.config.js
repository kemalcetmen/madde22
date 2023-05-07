/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 's3-alpha-sig.figma.com'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  transpilePackages: ['@radix-ui/react-checkbox', '@radix-ui/react-dropdown-menu'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

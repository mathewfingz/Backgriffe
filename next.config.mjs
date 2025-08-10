/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverComponentsExternalPackages: ['argon2'],
    allowedDevOrigins: ['http://localhost:3010', 'http://192.168.1.4:3010']
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'node:crypto': 'crypto',
      'node:fs': 'fs',
      'node:path': 'path',
      'node:os': 'os',
    }
    if (isServer) {
      const externals = config.externals || []
      config.externals = [...externals, 'argon2']
    }
    return config
  },
}

export default nextConfig




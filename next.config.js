/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')(
)

const nextConfig = {
    // output: 'export',
    images: {
        domains: ['localhost', '127.0.0.1'],
        unoptimized: true
    },
    // distDir: 'dist',
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // Important: return the modified config
        return config
    },
}

module.exports = withMDX(nextConfig)

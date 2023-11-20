/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')(
)

const nextConfig = {
    output: 'export',
    images: {
        domains: ['localhost', '127.0.0.1'],
        unoptimized: true
    },
    distDir: 'dist',
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

module.exports = withMDX(nextConfig)

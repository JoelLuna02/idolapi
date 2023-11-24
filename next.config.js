/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')(
)

const nextConfig = {
    //output: 'export',
    images: {
        domains: ['localhost', '127.0.0.1'],
        unoptimized: true
    },
    webpack5: false,
    //distDir: 'dist',
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    /*useFileSystemPublicRoutes: false,
    exportPathMap: function () {
        return {
            '/': { page: '/' }
        }
    }*/
}

module.exports = withMDX(nextConfig)

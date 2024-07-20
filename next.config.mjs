/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'ai-studio-assets.limewire.media',
            port: '',
            pathname: '/**'
        }, {
            protocol: 'https',
            hostname: 'api.limewire.com',
            port: '',
            pathname: '/**'
        }]
    },
};

export default nextConfig;

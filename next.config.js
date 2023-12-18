/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NEXT_PUBLIC_PRODUCTION_MODE == 'development') {
            return [
                {
                    source: '/api/:path*',
                    destination: 'http://127.0.0.1:8000/api/:path*',
                },
            ];
        } else {
            return [];
        }
    },
}

module.exports = nextConfig

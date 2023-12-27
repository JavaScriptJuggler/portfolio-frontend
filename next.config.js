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
            return [
                {
                    source: '/api/:path*',
                    destination: 'https://soumya-manna-api.000webhostapp.com/api/:path*',
                },
            ];
        }
    },
}

module.exports = nextConfig

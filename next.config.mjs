import '@total-typescript/ts-reset'
import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/',
                    has: [
                        {
                            type: 'host',
                            value: 'cv.yuval.tech',
                        },
                    ],
                    destination: '/cv.pdf',
                },
            ],
        }
    },
}

export default nextConfig

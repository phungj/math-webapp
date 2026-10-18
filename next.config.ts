import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/~phungj/math',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

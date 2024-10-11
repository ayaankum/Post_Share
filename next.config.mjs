/* eslint-disable indent */
/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: { missingSuspenseWithCSRBailout: false, },

    reactStrictMode: false,
    images: {
        remotePatterns: [
          
         
            {
                protocol: "https",
                hostname: "test-my-skills.blr1.digitaloceanspaces.com",
            },
        ],
    },
};

export default nextConfig;

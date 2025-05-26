/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      images: {
        domains: ['a.storyblok.com'], 
      },
};

export default nextConfig;

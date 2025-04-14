/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], 
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true, 
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;

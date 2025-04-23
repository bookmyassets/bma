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
      {
        source: '/about-us',
        destination: '/about',
        permanent: true, 
      },
      {
        source : '/projects/:slug',
        destination : '/projects/dholera/:slug',
        permanent: true, 
      }
    ];
  },
};

export default nextConfig;

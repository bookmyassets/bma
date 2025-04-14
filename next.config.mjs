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
        source: '/INFOPACK',
        destination: '/infopack',
        permanent: true,
      },
      {
        source: '/Infopack',
        destination: '/infopack',
        permanent: true,
      },
      {
        source: '/INFOpack',
        destination: '/infopack',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

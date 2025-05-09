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
        source: '/projects/paradise-2',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-1',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/projects/dholera/pages/about',
        permanent: true,
      },
      {
        source: '/projects/dholera/westwyn-c',
        destination: '/projects/dholera/westwyn-c',
        permanent: true,
      },
      {
        source: '/projects/orchid-township',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/maple',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/marina-bay',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/paradise-p1',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/maple-township-mt',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/marina-bay-mb',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/paradise-p2',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/orchid-township-ot',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/westwyn-c',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/paradise-p1',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/maple-township-mt',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/marina-bay-mb',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/paradise-p2',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/maple-township-mt',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/marina-bay-mb',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/paradise-p2',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/orchid-township-ot',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/westwyn-c',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/maple/paradise-p1',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/maple-township-mt',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/marina-bay-mb',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/paradise-p2',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/orchid-township-ot',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/westwyn-c',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/paradise-p1',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/maple-township-mt',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/marina-bay-mb',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/paradise-p2',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/orchid-township-ot',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/westwyn-c',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/paradise-p1',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/maple-township-mt',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/marina-bay-mb',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/paradise-p2',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/westwyn-c',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/paradise-p1',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/maple-township-mt',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/marina-bay-mb',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/orchid-township-ot',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/westwyn-c',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/orchid-township-ot',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/paradise-p2',
        destination: '/projects/dholera/paradise-p2/paradise-p2',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/dholera/abcd-building',
        destination: '/dholera-sir/abcd-building-dholera',
        permanent: true,
      },
      {
        source: '/carrers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/copyright',
        destination: '/policies/copyright',
        permanent: true,
      },
      {
        source: '/terms-of-use',
        destination: '/policies/terms',
        permanent: true,
      },
      {
        source: '/pages/Blogs',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/properties',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/pages/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/Events',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/policies/privacy',
        permanent: true,
      },
      
    ];
  },
};

export default nextConfig;

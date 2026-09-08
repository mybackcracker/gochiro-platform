import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/pvj8uwsd/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/chiropractor-in-glen-mills-pa",
        destination: "/service-areas/glen-mills",
        permanent: true,
      },
      {
        source: "/local-chiropractic-visit-pricing",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/how-mobile-chiropractic-visits-work",
        destination: "/what-to-expect",
        permanent: true,
      },
      {
        source: "/areas-served-faq",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/about-dr-defries",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/-new-patient-initial-visit",
        destination: "/what-to-expect",
        permanent: true,
      },
      {
        source: "/booking-pages/special-considerations",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/policies/booking---appointment-policy",
        destination: "/what-to-expect",
        permanent: true,
      },
      {
        source: "/booking-pages/car-accident-chiropractor-delco",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

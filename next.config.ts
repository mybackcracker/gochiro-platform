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
        // Stable, reusable patient-facing address for phone and QR-code use.
        // Keep this temporary so a future intake provider can be swapped
        // without browsers permanently caching the external destination.
        source: "/intake",
        destination:
          "https://script.google.com/macros/s/AKfycbyJJ1cbPMkBL0McMnk0Kc5jHr4q7jKoej3dk1ma5fe13DraUBP_sKEkwgWY1YH1nBAgWw/exec",
        permanent: false,
      },
      {
        // Reusable tour/event intake. The query selects the streamlined form
        // within the same secure Apps Script deployment as the full intake.
        source: "/tour-intake",
        destination:
          "https://script.google.com/macros/s/AKfycbyJJ1cbPMkBL0McMnk0Kc5jHr4q7jKoej3dk1ma5fe13DraUBP_sKEkwgWY1YH1nBAgWw/exec?form=tour",
        permanent: false,
      },
      {
        source: "/chiropractor-in-glen-mills-pa",
        destination: "/service-areas/glen-mills",
        permanent: true,
      },
      {
        source: "/chiropractor-in-brookhaven-pa",
        destination: "/service-areas/brookhaven",
        permanent: true,
      },
      {
        source: "/chiropractor-in-media-pa",
        destination: "/service-areas/media",
        permanent: true,
      },
      {
        source: "/chiropractor-in-aston-pa",
        destination: "/service-areas/aston",
        permanent: true,
      },
      {
        source: "/chiropractor-in-boothwyn-pa",
        destination: "/service-areas/boothwyn",
        permanent: true,
      },
      {
        source: "/chiropractor-in-garnet-valley-pa",
        destination: "/service-areas/garnet-valley",
        permanent: true,
      },
      {
        source: "/chiropractor-in-ridley-park-pa",
        destination: "/service-areas/ridley-park",
        permanent: true,
      },
      {
        source: "/chiropractor-in-springfield-pa",
        destination: "/service-areas/springfield",
        permanent: true,
      },
      {
        source: "/chiropractor-in-wallingford-pa",
        destination: "/service-areas/wallingford",
        permanent: true,
      },
      {
        source: "/chiropractor-in-glenolden-pa",
        destination: "/service-areas/glenolden",
        permanent: true,
      },
      {
        source: "/chiropractor-in-essington-pa",
        destination: "/service-areas/essington",
        permanent: true,
      },
      {
        source: "/chiropractor-in-newtown-square-pa",
        destination: "/service-areas/newtown-square",
        permanent: true,
      },
      {
        source: "/chiropractor-in-west-chester-pa",
        destination: "/service-areas/west-chester",
        permanent: true,
      },
      {
        source: "/chiropractor-in-chadds-ford-pa",
        destination: "/service-areas/chadds-ford",
        permanent: true,
      },
      {
        source: "/chiropractor-in-havertown-pa",
        destination: "/service-areas/havertown",
        permanent: true,
      },
      {
        source: "/chiropractor-aston-pa",
        destination: "/service-areas/aston",
        permanent: true,
      },
      {
        source: "/chiropractor-in-chichester-pa",
        destination: "/service-areas/boothwyn",
        permanent: true,
      },
      {
        source: "/towns/local-chiropractor-concordville-pa-2",
        destination: "/service-areas/glen-mills",
        permanent: true,
      },
      {
        source: "/towns/mobile-chiropractor-in-media--pa",
        destination: "/service-areas/media",
        permanent: true,
      },
      {
        source: "/towns/springfield",
        destination: "/service-areas/springfield",
        permanent: true,
      },
      {
        source: "/blog/chiropractor-aston-pa",
        destination: "/service-areas/aston",
        permanent: true,
      },
      {
        source: "/local-chiropractic-visit-pricing",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/expanded-chiropractic-visit-pricing",
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
        source: "/the-approach",
        destination: "/philosophy",
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
        source: "/booking---appointment-policy",
        destination: "/what-to-expect",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/what-to-expect",
        permanent: true,
      },
      {
        source: "/forms/new-patient-intake",
        destination: "/forms",
        permanent: true,
      },
      {
        source: "/policies/financial-policy-agreement",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/chester-car-accident-treatment-2",
        destination: "/contact",
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

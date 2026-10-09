import type { ReactNode } from "react";
import { BUSINESS_NAME, BUSINESS_PHONE } from "@/lib/gochiro";
import { SCHEMA_SITE_URL } from "@/lib/businessSchema";
import MarketingHeader from "@/components/MarketingHeader";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = SCHEMA_SITE_URL;

const searchSignals = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_NAME,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: BUSINESS_PHONE,
    },
    {
      "@type": "ItemList",
      name: "Go Chiro Mobile primary pages",
      itemListElement: [
        ["Book Online", "/book-online"],
        ["Patient Forms", "/forms"],
        ["Pricing", "/pricing"],
        ["Service Areas", "/service-areas"],
        ["Philadelphia Care", "/philadelphia"],
        ["Hotel & Traveler Care", "/philadelphia/hotel-visits"],
        ["Touring & Events", "/touring-production-care"],
        ["About Dr. David DeFries, DC", "/about"],
        ["Contact", "/contact"],
      ].map(([name, path], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${SITE_URL}${path}`,
      })),
    },
  ],
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(searchSignals).replace(/</g, "\\u003c"),
        }}
      />
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

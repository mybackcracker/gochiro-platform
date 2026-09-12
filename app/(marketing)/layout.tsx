import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://gochiromobile.com";

const searchSignals = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "GoChiroMobile",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "GoChiroMobile",
      url: SITE_URL,
      telephone: "+1-610-494-0412",
    },
    {
      "@type": "ItemList",
      name: "GoChiroMobile primary pages",
      itemListElement: [
        ["Book Online", "/book-online"],
        ["Patient Forms", "/forms"],
        ["Pricing", "/pricing"],
        ["Service Areas", "/service-areas"],
        ["Touring & Events", "/touring-production-care"],
        ["About Dr. David DeFries", "/about"],
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
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

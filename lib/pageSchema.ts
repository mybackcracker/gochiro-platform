import { BUSINESS_SCHEMA_ID, SCHEMA_SITE_URL } from "./businessSchema";

export type PageSchemaInput = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  service?: { name: string; description: string; areas: string[] };
};

export function pageSchema({ path, name, description, type = "WebPage", service }: PageSchemaInput) {
  const url = `${SCHEMA_SITE_URL}${path === "/" ? "" : path}`;
  const page = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SCHEMA_SITE_URL}/#website` },
    publisher: { "@id": BUSINESS_SCHEMA_ID },
    ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      page,
      ...(service ? [{
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        url,
        provider: { "@id": BUSINESS_SCHEMA_ID },
        areaServed: service.areas.map(name => ({ "@type": "Place", name })),
      }] : []),
    ],
  };
}

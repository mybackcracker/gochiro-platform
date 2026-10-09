import LocationRequestCTA from "@/components/LocationRequestCTA";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container, Eyebrow, H2, CTAButton, Callout } from "@/components/ui";
import ZipChecker from "@/components/ZipChecker";
import LocalAreaLinkList from "@/components/LocalAreaLinkList";
import { BUSINESS_SERVICE_AREA } from "@/lib/gochiro";
import { LOCAL_AREAS } from "@/lib/localAreas";
import type { NearbyArea } from "@/lib/localAreas/types";

export const metadata: Metadata = {
  title: "Service Areas — Go Chiro Mobile",
  description: "Find out if Go Chiro Mobile comes to your area.",
};

// Same three-way grouping as the ZIP cards above, but for local-area page
// links. Pulls town names from lib/localAreas so this list can never drift
// out of sync with the pages that actually exist — add a page to the
// registry and it appears here automatically once its slug is listed below.
function localAreaLinks(slugs: string[]): NearbyArea[] {
  return slugs
    .map((slug) => LOCAL_AREAS[slug])
    .filter((area) => area !== undefined)
    .map((area) => ({ label: area.town, href: `/service-areas/${area.slug}` }));
}

const DELAWARE_COUNTY_AREA_SLUGS = [
  "aston",
  "brookhaven",
  "boothwyn",
  "garnet-valley",
  "ridley-park",
  "springfield",
  "media",
  "wallingford",
  "glenolden",
  "essington",
  "newtown-square",
  "chadds-ford",
  "havertown",
];
const MAIN_LINE_AREA_SLUGS = ["main-line"];
const WEST_CHESTER_AREA_SLUGS = ["west-chester"];

export default function ServiceAreasPage() {
  return (
    <div>
      <Section tone="navy" className="pb-14 pt-14 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow onDark>Service Areas</Eyebrow>
            <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">
              Mobile Chiropractic Service Areas
            </h1>
            <p className="mt-5 text-xl font-medium text-white/90">
              Find out if Go Chiro Mobile comes to your area.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Service area: {BUSINESS_SERVICE_AREA}.
            </p>
            <div className="mt-8 text-left">
              <ZipChecker />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Callout title="Pricing by Location">
              <p className="text-base leading-relaxed text-muted">
                Visit prices can vary by location because travel is part of a mobile visit.
                Entering your ZIP code when you schedule will show your exact price before you
                book.
              </p>
              <div className="mt-5">
                <CTAButton href="/pricing" variant="secondary">
                  View Pricing
                </CTAButton>
              </div>
            </Callout>

            <Callout title="Outside My Regular Service Area?" tone="white">
              <LocationRequestCTA />
              <Link href="/philadelphia" className="mt-5 block font-semibold underline">Explore Philadelphia workplace, touring and individual care</Link>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <Container>
          <H2>Browse by Community</H2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Read more about mobile chiropractic care in a specific community below, or use the ZIP
            checker above — it remains the fastest way to confirm whether your exact address is
            currently bookable.
          </p>
          <div className="mt-8 space-y-10">
            <div>
              <p className="font-heading font-bold text-ink">Delaware County</p>
              <LocalAreaLinkList items={localAreaLinks(DELAWARE_COUNTY_AREA_SLUGS)} />
            </div>
            <div>
              <p className="font-heading font-bold text-ink">Main Line</p>
              <LocalAreaLinkList items={localAreaLinks(MAIN_LINE_AREA_SLUGS)} />
            </div>
            <div>
              <p className="font-heading font-bold text-ink">West Chester</p>
              <LocalAreaLinkList items={localAreaLinks(WEST_CHESTER_AREA_SLUGS)} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

import type { Metadata } from "next";
import { Section, Container, Eyebrow, H2, CTAButton, Callout } from "@/components/ui";
import ZipChecker from "@/components/ZipChecker";
import LocalAreaLinkList from "@/components/LocalAreaLinkList";
import { ZIPS, BUSINESS_PHONE } from "@/lib/gochiro";
import { LOCAL_AREAS } from "@/lib/localAreas";
import type { NearbyArea } from "@/lib/localAreas/types";

export const metadata: Metadata = {
  title: "Service Areas — GoChiroMobile",
  description: "Find out if GoChiroMobile comes to your area.",
};

// East, West, and Central are internal scheduling regions (lib/gochiro.ts) —
// there's no separate patient-facing place-name data attached to them, so
// they're grouped here under the one recognizable geography the business's
// own approved copy already uses to describe them: Delaware County. Main
// Line and West Chester keep their own real place names, unchanged, since
// those region keys already are the place names. No ZIP/region data is
// altered — this only changes how the list is grouped for display.
const DELAWARE_COUNTY_ZIPS = [...ZIPS.East, ...ZIPS.West, ...ZIPS.Central];

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
              Find out if GoChiroMobile comes to your area.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              I provide routine mobile chiropractic visits throughout Delaware County and selected
              areas of Chester County and the Main Line.
            </p>
            <div className="mt-8 text-left">
              <ZipChecker />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pb-8 sm:pb-10">
        <Container>
          <H2>Areas We Serve</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line p-5">
              <p className="font-heading font-bold text-ink">Delaware County</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{DELAWARE_COUNTY_ZIPS.join(", ")}</p>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <p className="font-heading font-bold text-ink">Main Line</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ZIPS.MainLine.join(", ")}</p>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <p className="font-heading font-bold text-ink">West Chester</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ZIPS.WestChester.join(", ")}</p>
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
              <p className="text-base leading-relaxed text-muted">
                The areas above represent where I routinely schedule individual visits. They are
                not necessarily the limit of where I can provide care.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Group Visits, workplace wellness visits, special events and other arrangements may
                be available outside the regular service area, including Philadelphia.
              </p>
              <p className="mt-4 text-lg font-semibold text-ink">
                Call or text{" "}
                <a href={`tel:${BUSINESS_PHONE}`} className="text-navy underline">
                  {BUSINESS_PHONE}
                </a>{" "}
                to ask about availability.
              </p>
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

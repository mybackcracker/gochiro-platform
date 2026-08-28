import type { Metadata } from "next";
import { ArticleShell, H2, P, CTAButton } from "@/components/ui";
import ZipChecker from "@/components/ZipChecker";
import { ZIPS, BUSINESS_PHONE } from "@/lib/gochiro";

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

export default function ServiceAreasPage() {
  return (
    <ArticleShell
      eyebrow="Service Areas"
      title="Mobile Chiropractic Service Areas"
      lede="Find out if GoChiroMobile comes to your area."
    >
      <P>
        I provide routine mobile chiropractic visits throughout Delaware County and selected areas
        of Chester County and the Main Line.
      </P>

      <div className="mt-6">
        <ZipChecker />
      </div>

      <H2>Areas We Serve</H2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-900">Delaware County</p>
          <p className="mt-1 text-sm text-slate-600">{DELAWARE_COUNTY_ZIPS.join(", ")}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-900">Main Line</p>
          <p className="mt-1 text-sm text-slate-600">{ZIPS.MainLine.join(", ")}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-semibold text-slate-900">West Chester</p>
          <p className="mt-1 text-sm text-slate-600">{ZIPS.WestChester.join(", ")}</p>
        </div>
      </div>

      <H2>Pricing by Location</H2>
      <P>
        Visit prices can vary by location because travel is part of a mobile visit. Entering your
        ZIP code when you schedule will show your exact price before you book.
      </P>
      <div className="mt-4">
        <CTAButton href="/pricing">View Pricing</CTAButton>
      </div>

      <H2>Outside My Regular Service Area?</H2>
      <P>
        The areas above represent where I routinely schedule individual visits. They are not
        necessarily the limit of where I can provide care.
      </P>
      <P>
        Group Visits, workplace wellness visits, special events and other arrangements may be
        available outside the regular service area, including Philadelphia.
      </P>
      <p className="mt-4 text-lg font-semibold text-slate-900">
        Call or text{" "}
        <a href={`tel:${BUSINESS_PHONE}`} className="underline">
          {BUSINESS_PHONE}
        </a>{" "}
        to ask about availability.
      </p>
    </ArticleShell>
  );
}

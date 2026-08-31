export interface LocalAreaImage {
  src: string;
  alt: string;
}

export interface LocalAreaStep {
  title: string;
  body: string;
}

/** A nearby-area reference — a plain label, or a label linked to that area's own page once one exists. */
export type NearbyArea = string | { label: string; href: string };

/**
 * Content contract for a local service-area page, rendered by
 * components/LocalAreaPage.tsx at app/(marketing)/service-areas/[slug].
 *
 * This is deliberately a content *contract*, not a template string. There is
 * no single hero paragraph that gets interpolated with a town name — every
 * field below is prose authored for one specific area. The shared page
 * component only supplies layout, section order and the site's existing
 * visual system (Section/Container/TwoColumn/Step/etc. from components/ui);
 * everything a visitor reads comes from the content module for that area, so
 * new pages read as substantive local content rather than a mail-merged
 * doorway page.
 *
 * `slug` may represent a single town (e.g. "aston") or a small served
 * cluster of neighboring towns written as one page (e.g. a future
 * "brookhaven-parkside-upland") — `town` is just the display name for
 * whatever that page covers.
 */
export interface LocalAreaContent {
  slug: string;
  town: string;

  metaTitle: string;
  metaDescription: string;

  heroEyebrow: string;
  heroHeading: string;
  heroLede: string;
  heroParagraphs: string[];
  heroImage: LocalAreaImage;
  heroCta: string;

  // Clinical-care section — placed right after the hero, ahead of the local
  // history material, so a visitor understands what GoChiroMobile actually
  // treats before reading local color. `clinicalCareCategories` is normally
  // the shared CLINICAL_CARE_CATEGORIES list (see ./clinicalCare) — the
  // conditions addressed don't vary by town — while intro/closing are
  // authored per page so the section doesn't read as one repeated block.
  clinicalCareHeading: string;
  clinicalCareIntro: string;
  clinicalCareCategories: string[];
  clinicalCareClosing: string;

  // Not every future area page will have a Dr. DeFries history angle —
  // leave both undefined to omit the section entirely.
  connectionHeading?: string;
  connectionParagraphs?: string[];
  connectionImage?: LocalAreaImage;

  howItWorksHeading: string;
  howItWorksIntro?: string;
  howItWorksSteps: LocalAreaStep[];

  careHeading: string;
  careParagraphs: string[];

  schedulingHeading: string;
  schedulingParagraphs: string[];

  workplaceHeading: string;
  workplaceParagraphs: string[];
  workplaceCta: string;

  nearbyHeading: string;
  nearbyParagraph: string;
  nearbyAreas: NearbyArea[];

  closingHeading: string;
}

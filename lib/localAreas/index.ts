import type { LocalAreaContent } from "./types";
import { aston } from "./aston";
import { brookhaven } from "./brookhaven";
import { boothwyn } from "./boothwyn";
import { garnetValley } from "./garnet-valley";
import { ridleyPark } from "./ridley-park";
import { springfield } from "./springfield";
import { media } from "./media";
import { wallingford } from "./wallingford";
import { glenolden } from "./glenolden";
import { essington } from "./essington";
import { newtownSquare } from "./newtown-square";
import { westChester } from "./west-chester";
import { chaddsFord } from "./chadds-ford";
import { havertown } from "./havertown";
import { mainLine } from "./main-line";

// Keyed by URL slug — app/(marketing)/service-areas/[slug]/page.tsx renders
// whichever entry matches. Add a new town/cluster page by writing its own
// content module (see ./aston.ts for the shape) and registering it below;
// no other file needs to change, and generateStaticParams picks it up
// automatically.
export const LOCAL_AREAS: Record<string, LocalAreaContent> = {
  [aston.slug]: aston,
  [brookhaven.slug]: brookhaven,
  [boothwyn.slug]: boothwyn,
  [garnetValley.slug]: garnetValley,
  [ridleyPark.slug]: ridleyPark,
  [springfield.slug]: springfield,
  [media.slug]: media,
  [wallingford.slug]: wallingford,
  [glenolden.slug]: glenolden,
  [essington.slug]: essington,
  [newtownSquare.slug]: newtownSquare,
  [westChester.slug]: westChester,
  [chaddsFord.slug]: chaddsFord,
  [havertown.slug]: havertown,
  [mainLine.slug]: mainLine,
};

export function getLocalArea(slug: string): LocalAreaContent | undefined {
  return LOCAL_AREAS[slug];
}

export function getLocalAreaSlugs(): string[] {
  return Object.keys(LOCAL_AREAS);
}

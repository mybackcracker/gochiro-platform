import { findRegion } from "./gochiro";
import { isPennsylvaniaZip } from "./pennsylvaniaZips";
export type ZipRoute = "booking" | "request" | "not-pennsylvania" | "incomplete";
export function zipRoute(zip: string): ZipRoute {
  if (!/^\d{5}$/.test(zip)) return "incomplete";
  if (findRegion(zip)) return "booking";
  return isPennsylvaniaZip(zip) ? "request" : "not-pennsylvania";
}
export function locationRequestPath(zip: string): string {
  return `/check-your-location?zip=${encodeURIComponent(zip)}`;
}

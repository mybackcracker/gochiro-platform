import type { Metadata } from "next";
import PageSearchSchema from "@/components/PageSearchSchema";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Schedule a Mobile Chiropractic Visit | Go Chiro Mobile",
  description: "Check online booking availability for your ZIP. Serving Delaware County and surrounding communities; additional locations by arrangement.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return <><PageSearchSchema path="/book" name="Schedule a Mobile Chiropractic Visit" description="Check online booking availability for your ZIP. Serving Delaware County and surrounding communities; additional locations by arrangement." />{children}</>;
}

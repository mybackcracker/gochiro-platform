import type { Metadata } from "next";
import PageSearchSchema from "@/components/PageSearchSchema";
import type { ReactNode } from "react";
import BookingPolicyGate from "./BookingPolicyGate";

export const metadata: Metadata = {
  title: "Schedule a Mobile Chiropractic Visit | Go Chiro Mobile",
  description: "Check your ZIP code, choose a visit and review available times for mobile chiropractic care in Pennsylvania.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: ReactNode }) {
  return <><PageSearchSchema path="/book" name="Schedule a Mobile Chiropractic Visit" description="Check your ZIP code, choose a visit and review available times for mobile chiropractic care in Pennsylvania." /><BookingPolicyGate>{children}</BookingPolicyGate></>;
}

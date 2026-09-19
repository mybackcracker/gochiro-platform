"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function MarketingHeader() {
  const pathname = usePathname();
  if (pathname === "/exercises" || pathname.startsWith("/exercises/")) return null;
  return <SiteHeader />;
}

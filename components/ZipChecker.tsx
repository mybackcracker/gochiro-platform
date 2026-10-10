"use client";

import { useRouter } from "next/navigation";
import { zipRoute, locationRequestPath } from "@/lib/zipRouting";
import Link from "next/link";
import { useState } from "react";
import { findRegion } from "@/lib/gochiro";
import { CTAButton } from "@/components/ui";

export default function ZipChecker() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const region = findRegion(zip);
  const route = zipRoute(zip);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(16,38,56,0.35)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            setChecked(false);
          }}
          inputMode="numeric"
          placeholder="Enter your zip code"
          aria-label="Visit ZIP code"
          className="w-full rounded-lg border border-line px-5 py-3.5 text-base text-ink outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/30"
        />
        <button
          onClick={() => {
            if (route === "request") router.push(locationRequestPath(zip));
            else setChecked(true);
          }}
          disabled={zip.length !== 5}
          className="rounded-lg bg-apricot px-6 py-3.5 text-base font-bold text-navy transition-colors hover:bg-apricot-light disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          Check Availability
        </button>
      </div>
      {checked && zip.length === 5 && region && (
        <div className="mt-5">
          <p className="text-base font-medium text-ink">Good news — we serve your area. Choose your visit:</p>
          <div className="mt-3 flex flex-col gap-3">
            <CTAButton href={`/book?start=new&zip=${zip}`}>New Patient</CTAButton>
            <CTAButton href={`/book?start=returning&zip=${zip}`} variant="secondary">Existing Patient</CTAButton>
            <CTAButton href={`/book?start=group&zip=${zip}`} variant="secondary">Group Visit</CTAButton>
          </div>
        </div>
      )}
      <p className="mt-5 text-sm text-muted">Learn about group visits: <Link href="/group-visits/standard" className="font-semibold text-navy underline">Delaware County</Link> · <Link href="/group-visits/premium" className="font-semibold text-navy underline">Main Line &amp; West Chester</Link></p>
      {checked && zip.length === 5 && !region && (
        <div className="mt-5 rounded-xl bg-cream p-4">
          <p>Care is available in Pennsylvania only. This ZIP is not listed as a Pennsylvania location. Please check your ZIP code.</p>
        </div>
      )}
    </div>
  );
}

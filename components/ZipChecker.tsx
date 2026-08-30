"use client";

import { useState } from "react";
import { findRegion, BUSINESS_PHONE } from "@/lib/gochiro";
import { CTAButton } from "@/components/ui";

export default function ZipChecker() {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const region = findRegion(zip);

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
          className="w-full rounded-full border border-line px-5 py-3.5 text-base text-ink outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/30"
        />
        <button
          onClick={() => setChecked(true)}
          disabled={zip.length !== 5}
          className="rounded-full bg-navy px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          Check Availability
        </button>
      </div>
      {checked && zip.length === 5 && region && (
        <div className="mt-5">
          <p className="text-base font-medium text-ink">Good news — we serve your area. Ready to book?</p>
          <div className="mt-3">
            <CTAButton href="/book-online">Schedule a Visit</CTAButton>
          </div>
        </div>
      )}
      {checked && zip.length === 5 && !region && (
        <div className="mt-5 rounded-xl bg-cream p-4">
          <p className="text-base font-medium text-ink">
            Your ZIP isn&apos;t currently within my regular individual-visit area, but other
            arrangements may be possible. Group Visits, events and some Philadelphia-area visits
            are considered separately. Call or text{" "}
            <a href={`tel:${BUSINESS_PHONE}`} className="font-semibold text-navy underline">
              {BUSINESS_PHONE}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

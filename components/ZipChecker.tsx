"use client";

import { useState } from "react";
import { findRegion, BUSINESS_PHONE } from "@/lib/gochiro";
import { CTAButton } from "@/components/ui";

export default function ZipChecker() {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const region = findRegion(zip);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            setChecked(false);
          }}
          inputMode="numeric"
          placeholder="Enter your zip code"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900"
        />
        <button
          onClick={() => setChecked(true)}
          disabled={zip.length !== 5}
          className="rounded-xl bg-slate-900 px-5 py-3 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Check Availability
        </button>
      </div>
      {checked && zip.length === 5 && region && (
        <div className="mt-5">
          <p className="text-base font-medium text-slate-900">
            Good news — we serve your area. Ready to book?
          </p>
          <div className="mt-3">
            <CTAButton href="/book-online">Schedule a Visit</CTAButton>
          </div>
        </div>
      )}
      {checked && zip.length === 5 && !region && (
        <div className="mt-5">
          <p className="text-base font-medium text-slate-900">
            Your ZIP isn&apos;t currently within my regular individual-visit area, but other
            arrangements may be possible. Group Visits, events and some Philadelphia-area visits
            are considered separately. Call or text{" "}
            <a href={`tel:${BUSINESS_PHONE}`} className="font-semibold underline">
              {BUSINESS_PHONE}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

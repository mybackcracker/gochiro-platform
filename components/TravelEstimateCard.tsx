"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locationRequestPath } from "@/lib/zipRouting";
import type { SignedTravelEstimate } from "@/lib/travelEstimate";

export default function TravelEstimateCard({ zip, initial = null, onEstimate, showRequest = true }: {
  zip: string;
  initial?: SignedTravelEstimate | null;
  onEstimate?: (value: SignedTravelEstimate | null) => void;
  showRequest?: boolean;
}) {
  const [quote, setQuote] = useState<SignedTravelEstimate | null>(null);
  const [status, setStatus] = useState("loading");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setQuote(null); onEstimate?.(null); setStatus("loading");
    async function load() {
      try {
        let data = initial?.estimate.zip === zip ? initial : null;
        if (!data) {
          const response = await fetch("/api/travel-estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ zip }), signal: controller.signal });
          if (!response.ok) throw new Error("Estimate unavailable");
          data = await response.json() as SignedTravelEstimate;
        }
        if (!data || data.estimate?.zip !== zip || typeof data.token !== "string") throw new Error("Estimate unavailable");
        if (active) { setQuote(data); onEstimate?.(data); setStatus("ready"); }
      } catch { if (active) setStatus("error"); }
    }
    void load();
    return () => { active = false; controller.abort(); };
  }, [zip, initial, onEstimate, retry]);
  const validQuote = quote?.estimate.zip === zip ? quote : null;
  const e = validQuote?.estimate;
  return <section className="mt-5 rounded-2xl border border-line bg-cream p-5 text-ink sm:p-6" aria-label="Visit cost estimate">
    <h2 className="text-lg font-bold">Visits to {zip} may be available by arrangement.</h2>
    <p className="mt-3 text-sm leading-relaxed">We try to help when care at home is needed. Outside our regular booking area, additional travel time increases the cost.</p>
    <div aria-live="polite" aria-atomic="true">
      {status === "loading" && <p className="mt-4 text-sm" role="status">Calculating your travel estimate…</p>}
      {status === "error" && <p className="mt-4 text-sm">An automatic estimate is unavailable. You can request a personal quote before deciding to book. <button type="button" onClick={() => setRetry(n => n + 1)} className="font-semibold underline">Try again</button></p>}
      {e && <div className="mt-4">
        <p className="text-sm font-semibold">Estimated total for one new-patient visit</p>
        <p className="mt-1 text-3xl font-extrabold">${e.total}</p>
        <dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between gap-4"><dt>New-patient appointment</dt><dd>${e.appointmentFee}</dd></div><div className="flex justify-between gap-4"><dt>Travel, including gas</dt><dd>${e.travelFee}</dd></div></dl>
        <p className="mt-3 text-xs text-muted">About {Math.round(e.outboundSeconds / 60)} minutes outward and {Math.round(e.returnSeconds / 60)} minutes return. ZIP-based driving-time estimate from Google Maps, without live traffic.</p>
        <p className="mt-2 text-xs text-muted">Travel is $100 per round-trip driving hour, rounded to the nearest $25.</p>
      </div>}
    </div>
    <p className="mt-4 text-sm"><strong>Seeing more than one person?</strong> Additional people treated at the same location during this visit pay their applicable appointment fees, with no additional travel charge.</p>
    <p className="mt-3 text-xs text-muted">We confirm your address, availability, and final price before booking. Returning-patient, weekend, and short-notice fees may differ. An accepted appointment requires a deposit of at least 50%. No payment is needed to request a visit.</p>
    {showRequest && <Link href={locationRequestPath(zip, validQuote?.token)} className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-apricot px-5 py-3 font-bold text-navy hover:bg-apricot-light">{status === "error" ? "Request a personal quote" : "Request a Visit"}</Link>}
  </section>;
}

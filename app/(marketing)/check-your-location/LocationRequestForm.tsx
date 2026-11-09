"use client";
import { FormEvent, useState } from "react";
import { zipRoute } from "@/lib/zipRouting";
import type { SignedTravelEstimate } from "@/lib/travelEstimate";
import { LOCATION_CONTACTS, LOCATION_TIMING } from "@/lib/locationRequest";

type Phase = "address" | "quoted" | "contact" | "sent";
export default function LocationRequestForm({ initialZip = "" }: { initialZip?: string }) {
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState(initialZip);
  const [phase, setPhase] = useState<Phase>("address");
  const [quote, setQuote] = useState<SignedTravelEstimate | null>(null);
  const [manual, setManual] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [canRequestManual, setCanRequestManual] = useState(false);
  const [method, setMethod] = useState("Text");
  const [submittedTotal, setSubmittedTotal] = useState<number | null>(null);
  const field = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-ink focus:outline-2 focus:outline-navy";
  const button = "w-full rounded-lg bg-apricot px-5 py-3 font-bold text-navy hover:bg-apricot-light disabled:opacity-60";
  const address = quote?.estimate.destinationAddress ?? (street.trim() + ", PA " + zip);

  function editAddress(fieldName: "street" | "zip", value: string) {
    if (fieldName === "street") setStreet(value);
    if (fieldName === "zip") setZip(value.replace(/\D/g, "").slice(0, 5));
    setQuote(null); setManual(false); setCanRequestManual(false); setPhase("address"); setError("");
  }

  async function checkPrice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || zipRoute(zip) !== "request") return;
    setBusy(true); setError(""); setCanRequestManual(false);
    try {
      const response = await fetch("/api/travel-estimate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street, zip })
      });
      const data = await response.json();
      if (!response.ok) {
        setCanRequestManual(response.status === 503 || response.status === 429);
        throw new Error(response.status === 503 || response.status === 429
          ? "We could not calculate a reliable price for this address."
          : (data.error || "Please check the address and try again."));
      }
      const next = data as SignedTravelEstimate;
      if (!next.estimate || next.estimate.zip !== zip || !next.token) throw new Error("Please try checking this address again.");
      setQuote(next); setPhase("quoted");
    } catch (e) { setError(e instanceof Error ? e.message : "We could not check this address."); }
    finally { setBusy(false); }
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || (!quote && !manual)) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    if (fields.acknowledged !== "on") return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/location-request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields, address: street, zip, state: "PA", contactMethod: method,
          acknowledged: true, estimateToken: quote?.token || "",
          estimateAcknowledged: quote ? "true" : "false",
          manualQuoteRequested: manual ? "true" : "false"
        })
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) throw new Error(data.error || "We could not send your request.");
      setSubmittedTotal(typeof data.estimate?.total === "number" ? data.estimate.total : null);
      setPhase("sent");
    } catch (e) { setError(e instanceof Error ? e.message : "We could not send your request."); }
    finally { setBusy(false); }
  }

  if (phase === "sent") return <div className="rounded-xl border border-line p-6" role="status">
    <h2 className="text-xl font-bold">Request received</h2>
    <p className="mt-2">We will contact you to confirm availability and final pricing. This is not a booked appointment.</p>
    {submittedTotal !== null && <p className="mt-2 font-semibold">Your estimated total: {"$" + submittedTotal}</p>}
  </div>;

  return <div className="space-y-5">
    {phase === "address" ? <form onSubmit={checkPrice} className="space-y-4">
      <label className="block text-sm font-semibold">Street address
        <input value={street} onChange={e => editAddress("street", e.target.value)} autoComplete="street-address" required minLength={5} maxLength={200} placeholder="Street number and name" className={field}/>
      </label>
        <label className="block text-sm font-semibold">ZIP code
          <input value={zip} onChange={e => editAddress("zip", e.target.value)} autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" required className={field}/>
        </label>
      {zipRoute(zip) === "booking" ? <p className="text-sm">We serve this area. <a href="/book" className="font-semibold underline">Book a regular visit</a>.</p>
        : zip.length === 5 && zipRoute(zip) === "not-pennsylvania" ? <p className="text-sm">For this location, please <a href="/contact" className="font-semibold underline">contact the practice</a>.</p>
        : <button type="submit" disabled={busy || zipRoute(zip) !== "request"} className={button}>{busy ? "Checking…" : "See Estimated Price"}</button>}
      {canRequestManual && <button type="button" onClick={() => { setManual(true); setPhase("contact"); setError(""); }} className="text-sm font-semibold underline">Request a personal quote instead</button>}
    </form> : <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 text-sm">
        <p className="text-muted">{address}</p>
        <button type="button" onClick={() => { setPhase("address"); setQuote(null); setManual(false); setError(""); }} className="shrink-0 font-semibold underline">Change address</button>
      </div>
      {quote && <div className="rounded-xl border border-line p-5">
        <p className="text-sm font-medium text-muted">Estimated weekday new-patient visit</p>
        <p className="mt-1 text-4xl font-extrabold text-navy">{"$" + quote.estimate.total}</p>
        <p className="mt-2 text-sm">Visit: {"$" + quote.estimate.appointmentFee} · Travel: {"$" + quote.estimate.travelFee}</p>
        <p className="mt-3 text-sm">You are farther than our usual travel area. We understand some circumstances warrant care at home, and we may be able to make the trip.</p>
        <p className="mt-2 text-xs text-muted">Estimate only; final price and availability are confirmed before scheduling.</p>
      </div>}
      {phase === "quoted" && <button type="button" onClick={() => setPhase("contact")} className={button}>I&apos;d Like to Request a Visit</button>}
      {manual && <p className="text-sm">We will confirm a travel-inclusive quote before you decide whether to schedule.</p>}
    </div>}
    {phase === "contact" && <form onSubmit={submitRequest} className="space-y-4 rounded-xl border border-line p-5">
      <h2 className="text-lg font-bold">Where can we reach you?</h2>
      <label className="block text-sm font-semibold">Name
        <input name="name" required maxLength={100} autoComplete="name" className={field}/>
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Reply by
          <select value={method} onChange={e => setMethod(e.target.value)} className={field}>{LOCATION_CONTACTS.map(option => <option key={option}>{option}</option>)}</select>
        </label>
        <label className="block text-sm font-semibold">{method === "Email" ? "Email address" : "Phone number"}
          <input key={method} name="contact" type={method === "Email" ? "email" : "tel"} required maxLength={160} autoComplete={method === "Email" ? "email" : "tel"} className={field}/>
        </label>
      </div>
      <label className="block text-sm font-semibold">When would you like care?
        <select name="timing" required defaultValue="" className={field}>
          <option value="" disabled>Choose timing</option>
          {LOCATION_TIMING.map(option => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="flex items-start gap-3 text-sm">
        <input name="acknowledged" type="checkbox" required className="mt-1 h-5 w-5 shrink-0"/>
        <span>{quote ? "I understand the estimated total shown above, including travel." : "I am requesting a personal quote before booking."} Confirming a visit requires a deposit of at least 50%.</span>
      </label>
      <details className="text-xs text-muted"><summary className="cursor-pointer font-semibold">Deposit and cancellation terms</summary>
        <p className="mt-2">The deposit is applied toward your visit. Cancel at least 24 hours ahead for a refund or transfer; late cancellation or a no-show forfeits the deposit. If Go Chiro Mobile cancels, it is refunded. For bookings less than 24 hours ahead, we confirm the terms before payment.</p>
      </details>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <button disabled={busy} type="submit" className={button}>{busy ? "Sending…" : manual ? "Request Personal Quote" : "Send Visit Request"}</button>
      <p className="text-xs text-muted">No payment is required to send a request.</p>
    </form>}
    {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
  </div>;
}

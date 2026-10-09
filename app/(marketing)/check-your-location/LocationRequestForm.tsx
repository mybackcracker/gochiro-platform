"use client";
import { FormEvent, useState } from "react";
import { LOCATION_CONTACTS, LOCATION_TIMING, PRIVATE_PARKING_OPTIONS, STAIRS_OPTIONS, ELEVATOR_OPTIONS } from "@/lib/locationRequest";
export default function LocationRequestForm() {
  const [method,setMethod] = useState("Text");
  const [status,setStatus] = useState("idle");
  const [message,setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/location-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(data),acknowledged:data.get("acknowledged") === "on"})});
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || "Unable to send your request.");
      setStatus("success");
    } catch (e) { setStatus("error");setMessage(e instanceof Error ? e.message : "Please call or text 610-494-0412."); }
  }
  const field = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink focus:outline-2 focus:outline-navy";
  if (status === "success") return <div role="status" className="rounded-2xl bg-cream p-6"><h2 className="text-xl font-bold">Your location request has been received.</h2><p className="mt-3">We’ll review whether we can serve your location and contact you about the next steps. This is not a confirmed appointment.</p></div>;
  return <form onSubmit={submit} className="space-y-6">
    <fieldset disabled={status === "sending"} className="space-y-6">
      <legend className="mb-4 text-xl font-bold">Tell us where you need care</legend>
      <label className="block font-semibold">Name<input name="name" autoComplete="name" required maxLength={100} className={field}/></label>
      <label className="block font-semibold">Preferred reply method<select name="contactMethod" value={method} onChange={e=>setMethod(e.target.value)} className={field}>{LOCATION_CONTACTS.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="block font-semibold">{method === "Email" ? "Email address" : "Phone number"}<input key={method === "Email" ? "email" : "tel"} name="contact" type={method === "Email" ? "email" : "tel"} autoComplete={method === "Email" ? "email" : "tel"} required maxLength={160} className={field}/></label>
      <label className="block font-semibold">Visit street address<input name="address" autoComplete="street-address" required maxLength={200} className={field}/></label>
      <div className="grid gap-5 sm:grid-cols-2"><label className="block font-semibold">City<input name="city" autoComplete="address-level2" required maxLength={100} className={field}/></label><label className="block font-semibold">ZIP code<input name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" required maxLength={5} className={field}/></label></div>
      <p>Service is available in Pennsylvania only.</p><input type="hidden" name="state" value="PA"/>
      <label className="block font-semibold">Is private or reserved parking available?<select name="privateParking" required defaultValue="" className={field}><option value="" disabled>Select parking</option>{PRIVATE_PARKING_OPTIONS.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="block font-semibold">Are there stairs to reach the treatment space?<select name="stairs" required defaultValue="" className={field}><option value="" disabled>Select stairs</option>{STAIRS_OPTIONS.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="block font-semibold">Is an elevator available?<select name="elevator" required defaultValue="" className={field}><option value="" disabled>Select elevator access</option>{ELEVATOR_OPTIONS.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="block font-semibold">How soon are you hoping to be seen?<select name="timing" required defaultValue="" className={field}><option value="" disabled>Select timing</option>{LOCATION_TIMING.map(x=><option key={x}>{x}</option>)}</select></label>
      <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="flex items-start gap-3"><input name="acknowledged" type="checkbox" required className="mt-1 h-5 w-5 shrink-0"/><span>I understand that pricing includes care and travel, and a deposit of at least 50% is required to confirm an accepted appointment. I have read the cancellation terms above.</span></label>
      <button type="submit" className="rounded-xl bg-navy px-6 py-3 font-semibold text-white disabled:opacity-60">{status === "sending" ? "Sending…" : "Check My Location"}</button>
    </fieldset>
    {status === "error" && <p role="alert" className="text-red-800">{message}</p>}
  </form>;
}

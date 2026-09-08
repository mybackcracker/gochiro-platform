"use client";

import { FormEvent, useMemo, useState } from "react";

const inputClass = "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/15";
const labelClass = "block text-sm font-semibold text-ink";
const checkboxClass = "h-4 w-4 rounded border-line text-navy focus:ring-navy";

const AUDIENCES = [
  "Artists / Musicians",
  "Dancers / Performers",
  "Cast",
  "Touring Crew",
  "Production Staff",
  "Other",
];

interface FormState {
  name: string;
  role: string;
  preferredContact: string;
  mobile: string;
  email: string;
  productionName: string;
  productionDate: string;
  multipleDates: boolean;
  additionalDates: string;
  venue: string;
  city: string;
  venueNotConfirmed: boolean;
  coverageType: string;
  approximatePeople: string;
  audiences: string[];
  coverageTimeKnown: boolean;
  coverageTime: string;
  additionalServices: string;
  notes: string;
  website: string;
}

const initialState: FormState = {
  name: "",
  role: "",
  preferredContact: "",
  mobile: "",
  email: "",
  productionName: "",
  productionDate: "",
  multipleDates: false,
  additionalDates: "",
  venue: "",
  city: "",
  venueNotConfirmed: false,
  coverageType: "",
  approximatePeople: "",
  audiences: [],
  coverageTimeKnown: false,
  coverageTime: "",
  additionalServices: "",
  notes: "",
  website: "",
};

export default function ProductionRequestForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const needsMobile = useMemo(() => ["Text", "Phone call"].includes(form.preferredContact), [form.preferredContact]);
  const needsEmail = form.preferredContact === "Email";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAudience(audience: string) {
    setForm((prev) => ({
      ...prev,
      audiences: prev.audiences.includes(audience)
        ? prev.audiences.filter((item) => item !== audience)
        : [...prev.audiences, audience],
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/production-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to send your request.");

      setStatus("success");
      setMessage("Production request received. We’ll review the date, location and requested coverage and follow up regarding availability and options.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your request. Please call or text GoChiroMobile.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-3xl rounded-2xl border border-line bg-white p-6 sm:p-8" role="status">
        <h2 className="text-2xl font-semibold text-ink">Production request received</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{message}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-full bg-navy px-6 py-3 text-base font-semibold text-white">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>Your name<input className={inputClass} name="name" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} required /></label>
        <label className={labelClass}>Your role<select className={inputClass} name="role" value={form.role} onChange={(e) => update("role", e.target.value)} required><option value="">Select</option><option>Tour Manager</option><option>Production Manager</option><option>Artist Management</option><option>Venue</option><option>Promoter</option><option>Artist / Performer</option><option>Other</option></select></label>

        <label className={labelClass}>Preferred contact method<select className={inputClass} name="preferredContact" value={form.preferredContact} onChange={(e) => update("preferredContact", e.target.value)} required><option value="">Select</option><option>Text</option><option>Email</option><option>Phone call</option><option>No preference</option></select></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>Mobile number<input className={inputClass} type="tel" name="mobile" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} maxLength={40} required={needsMobile || form.preferredContact === "No preference"} /></label>
          <label className={labelClass}>Email<input className={inputClass} type="email" name="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={160} required={needsEmail} /></label>
        </div>

        <label className={`${labelClass} sm:col-span-2`}>Production / tour / artist name <span className="font-normal text-muted">(optional)</span><input className={inputClass} name="productionName" value={form.productionName} onChange={(e) => update("productionName", e.target.value)} maxLength={160} /><span className="mt-1 block text-xs font-normal text-muted">For privacy, you may leave this blank or provide a tour/production name instead.</span></label>

        <label className={labelClass}>Production date<input className={inputClass} type="date" name="productionDate" value={form.productionDate} onChange={(e) => update("productionDate", e.target.value)} required /></label>
        <div className="pt-7">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink"><input className={checkboxClass} type="checkbox" checked={form.multipleDates} onChange={(e) => update("multipleDates", e.target.checked)} />Multiple dates?</label>
          {form.multipleDates && <input className={inputClass} value={form.additionalDates} onChange={(e) => update("additionalDates", e.target.value)} placeholder="Additional dates or date range" maxLength={200} required />}
        </div>

        <label className={labelClass}>Venue / location<input className={inputClass} name="venue" value={form.venue} onChange={(e) => update("venue", e.target.value)} maxLength={160} disabled={form.venueNotConfirmed} required={!form.venueNotConfirmed} /></label>
        <div>
          <label className={labelClass}>City<input className={inputClass} name="city" value={form.city} onChange={(e) => update("city", e.target.value)} maxLength={100} required /></label>
          <label className="mt-3 flex items-center gap-2 text-sm text-muted"><input className={checkboxClass} type="checkbox" checked={form.venueNotConfirmed} onChange={(e) => update("venueNotConfirmed", e.target.checked)} />Venue not confirmed yet</label>
        </div>

        <label className={labelClass}>What are you looking for?<select className={inputClass} name="coverageType" value={form.coverageType} onChange={(e) => update("coverageType", e.target.value)} required><option value="">Select</option><option>Care for one person</option><option>On-site care available to multiple people</option><option>Not sure — help me determine the best arrangement</option></select></label>
        <label className={labelClass}>Approximate number of people<select className={inputClass} name="approximatePeople" value={form.approximatePeople} onChange={(e) => update("approximatePeople", e.target.value)} required><option value="">Select</option><option>1–4</option><option>5–8</option><option>9–12</option><option>13+</option><option>Not sure</option></select></label>

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>Who would care be available to? <span className="font-normal text-muted">(select all that apply)</span></legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {AUDIENCES.map((audience) => <label key={audience} className="flex items-center gap-2 text-sm text-ink"><input className={checkboxClass} type="checkbox" checked={form.audiences.includes(audience)} onChange={() => toggleAudience(audience)} />{audience}</label>)}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink"><input className={checkboxClass} type="checkbox" checked={form.coverageTimeKnown} onChange={(e) => update("coverageTimeKnown", e.target.checked)} />I know the approximate coverage time</label>
          {form.coverageTimeKnown ? <input className={inputClass} value={form.coverageTime} onChange={(e) => update("coverageTime", e.target.value)} placeholder="e.g. 3–5 PM" maxLength={100} required /> : <p className="mt-2 text-sm text-muted">It is fine if the schedule is still being determined.</p>}
        </div>

        <label className={`${labelClass} sm:col-span-2`}>Would you be interested in additional on-site wellness services if available?<select className={inputClass} name="additionalServices" value={form.additionalServices} onChange={(e) => update("additionalServices", e.target.value)} required><option value="">Select</option><option>Massage therapy</option><option>Possibly — tell me what’s available</option><option>No</option></select></label>

        <label className={`${labelClass} sm:col-span-2`}>Anything else we should know? <span className="font-normal text-muted">(optional)</span><textarea className={inputClass} name="notes" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={1500} placeholder="Timing, multiple locations, access/security, or unusual production requirements." /><span className="mt-1 block text-xs font-normal text-muted">Please do not include medical or clinical information here. Individual care details are collected separately and privately.</span></label>

        <label className="hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label>
      </div>

      {status === "error" && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">{message}</p>}
      <button type="submit" disabled={status === "sending"} className="mt-7 rounded-full bg-navy px-6 py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? "Sending…" : "Request Production Coverage"}</button>
      <p className="mt-3 text-sm text-muted">Submitting this form does not obligate you to book. We’ll review your production needs and contact you about availability and the most appropriate coverage arrangement.</p>
    </form>
  );
}

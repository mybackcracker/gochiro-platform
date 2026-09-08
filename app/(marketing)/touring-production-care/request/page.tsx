import type { Metadata } from "next";
import { Section, Container, PageHeader, Callout } from "@/components/ui";
import { BUSINESS_PHONE, PUBLIC_CONTACT_EMAIL } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "Request Touring Production Coverage | GoChiroMobile",
  description: "Request on-site musculoskeletal care for a touring production in Philadelphia or the surrounding region.",
};

const inputClass = "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/15";
const labelClass = "block text-sm font-semibold text-ink";

export default function ProductionRequestPage() {
  return (
    <div>
      <Section tone="white" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
        <Container>
          <PageHeader
            eyebrow="Touring Productions"
            title="Request Production Coverage"
            lede="Tell us what you know so far. You do not need to know exactly what type of coverage you need, and artist identity is optional at this stage."
          />
        </Container>
      </Section>

      <Section tone="cream" className="pt-8">
        <Container>
          <Callout title="Version 1 inquiry path" tone="white" className="max-w-3xl">
            <p className="text-base leading-relaxed text-muted">
              The production-request questions are defined below, but this site does not yet have a lead-storage or form-submission backend. Until that secure delivery path is connected, please call, text or email GoChiroMobile rather than submitting clinical or production information into a form that cannot be delivered.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-base font-semibold text-navy">
              <a href={`tel:${BUSINESS_PHONE}`} className="underline underline-offset-4">Call / Text {BUSINESS_PHONE}</a>
              <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="underline underline-offset-4">Email {PUBLIC_CONTACT_EMAIL}</a>
            </div>
          </Callout>

          <div className="mt-10 max-w-3xl rounded-2xl border border-line bg-white p-6 sm:p-8" aria-label="Production request form preview">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>Your name<input className={inputClass} type="text" disabled /></label>
              <label className={labelClass}>Your role<select className={inputClass} disabled defaultValue=""><option value="">Select</option><option>Tour Manager</option><option>Production Manager</option><option>Artist Management</option><option>Venue / Promoter</option><option>Artist / Performer</option><option>Other</option></select></label>
              <label className={labelClass}>Preferred contact<select className={inputClass} disabled defaultValue=""><option value="">Select</option><option>Text</option><option>Email</option><option>Phone</option><option>No preference</option></select></label>
              <label className={labelClass}>Mobile number<input className={inputClass} type="tel" disabled /></label>
              <label className={labelClass}>Email<input className={inputClass} type="email" disabled /></label>
              <label className={labelClass}>Production / tour / artist name <span className="font-normal text-muted">(optional)</span><input className={inputClass} type="text" disabled /><span className="mt-1 block text-xs font-normal text-muted">For privacy, leave this blank or provide a production/tour name instead.</span></label>
              <label className={labelClass}>Production date<input className={inputClass} type="date" disabled /></label>
              <label className={labelClass}>Venue / location<input className={inputClass} type="text" disabled /></label>
              <label className={labelClass}>City<input className={inputClass} type="text" disabled /></label>
              <label className={labelClass}>What are you looking for?<select className={inputClass} disabled defaultValue=""><option value="">Select</option><option>Care for one person</option><option>On-site care for multiple people</option><option>Not sure — help me determine it</option></select></label>
              <label className={labelClass}>Approximate number of people<select className={inputClass} disabled defaultValue=""><option value="">Select</option><option>1–4</option><option>5–8</option><option>9–12</option><option>13+</option><option>Not sure</option></select></label>
              <label className={labelClass}>Preferred coverage time<input className={inputClass} type="text" placeholder="e.g. 3–5 PM or not known yet" disabled /></label>
              <label className={labelClass}>Additional services<select className={inputClass} disabled defaultValue=""><option value="">Select</option><option>Interested in massage therapy</option><option>Possibly — tell me what is available</option><option>No</option></select></label>
              <label className={`${labelClass} sm:col-span-2`}>Anything else we should know?<textarea className={inputClass} rows={4} disabled /></label>
            </div>
            <button type="button" disabled className="mt-7 rounded-full bg-navy/40 px-6 py-3.5 text-base font-semibold text-white">Request Production Coverage</button>
            <p className="mt-3 text-sm text-muted">Form submission will be enabled only after a real delivery/storage backend is connected.</p>
          </div>
        </Container>
      </Section>
    </div>
  );
}

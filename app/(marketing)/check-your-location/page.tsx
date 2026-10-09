import { isPennsylvaniaZip } from "@/lib/pennsylvaniaZips";
import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui";
import ExtendedAreaTerms from "@/components/ExtendedAreaTerms";
import LocationRequestForm from "./LocationRequestForm";
export const metadata: Metadata = { title:"Check Your Location | Go Chiro Mobile",description:"Request a location review for individually arranged Pennsylvania chiropractic visits. Confirm service, pricing and access before booking.",alternates:{canonical:"https://www.gochiromobile.com/check-your-location"} };
export default async function Page({ searchParams }: { searchParams: Promise<{ zip?: string | string[] }> }) {
  const params = await searchParams;
  const initialZip = typeof params.zip === "string" && isPennsylvaniaZip(params.zip) ? params.zip : "";
  return <Section tone="white"><Container><div className="mx-auto max-w-3xl space-y-8"><PageHeader eyebrow="Visits by arrangement" title="Check Your Location" lede="Start with your location. We’ll review access and travel before discussing care, pricing and scheduling."/><p><strong>Hoping to be seen today?</strong> <a href="sms:+16104940412" className="font-semibold underline">Text 610-494-0412</a> with your address and access details. A text does not guarantee an immediate reply or appointment.</p><ExtendedAreaTerms/><LocationRequestForm initialZip={initialZip}/></div></Container></Section>}

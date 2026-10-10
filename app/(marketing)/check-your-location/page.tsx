import PageSearchSchema from "@/components/PageSearchSchema";
import { isPennsylvaniaZip } from "@/lib/pennsylvaniaZips";
import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui";
import ExtendedAreaTerms from "@/components/ExtendedAreaTerms";
import LocationRequestForm from "./LocationRequestForm";
export const metadata: Metadata = { title:"Request a Visit | Go Chiro Mobile",description:"Request a location review for individually arranged Pennsylvania chiropractic visits. Confirm service, pricing and access before booking.",alternates:{canonical:"https://www.gochiromobile.com/check-your-location"} };
export default async function Page({ searchParams }: { searchParams: Promise<{ zip?: string | string[] }> }) {
  const params = await searchParams;
  const initialZip = typeof params.zip === "string" && isPennsylvaniaZip(params.zip) ? params.zip : "";
  return <><PageSearchSchema path={"/check-your-location"} name={"Request a Visit | Go Chiro Mobile"} description={"Request a location review for individually arranged Pennsylvania chiropractic visits. Confirm service, pricing and access before booking."} /><Section tone="white"><Container><div className="mx-auto max-w-3xl space-y-8"><div className="space-y-5"><p className="text-lg text-slate-700">Your location is outside our regular online booking area. Visits may be available by arrangement. Complete the form below.</p><PageHeader title="Request a Visit"/></div><p><strong>Hoping to be seen today?</strong> <a href="sms:+16104940412" className="font-semibold underline">Text 610-494-0412</a> with your address and access details. A text does not guarantee an immediate reply or appointment.</p><ExtendedAreaTerms/><LocationRequestForm initialZip={initialZip}/></div></Container></Section></>}

import { verifyEstimate } from "@/lib/travelEstimateServer";
import PageSearchSchema from "@/components/PageSearchSchema";
import { isPennsylvaniaZip } from "@/lib/pennsylvaniaZips";
import type { Metadata } from "next";
import { Section, Container, PageHeader } from "@/components/ui";
import ExtendedAreaTerms from "@/components/ExtendedAreaTerms";
import LocationRequestForm from "./LocationRequestForm";
export const metadata: Metadata = { title:"Request a Visit | Go Chiro Mobile",description:"Request a mobile chiropractic visit by arrangement. Serving Delaware County and surrounding communities, with additional locations by arrangement.",alternates:{canonical:"https://www.gochiromobile.com/check-your-location"} };
export default async function Page({ searchParams }: { searchParams: Promise<{ zip?: string | string[]; estimate?: string | string[] }> }) {
  const params = await searchParams;
  const initialZip = typeof params.zip === "string" && isPennsylvaniaZip(params.zip) ? params.zip : "";
  const estimate = verifyEstimate(params.estimate, initialZip);
  const initialEstimate = estimate && typeof params.estimate === "string" ? { estimate, token: params.estimate } : null;
  return <><PageSearchSchema path={"/check-your-location"} name={"Request a Visit | Go Chiro Mobile"} description={"Request a mobile chiropractic visit by arrangement. Serving Delaware County and surrounding communities, with additional locations by arrangement."} /><Section tone="white"><Container><div className="mx-auto max-w-3xl space-y-8"><div className="space-y-5"><p className="text-lg text-slate-700">For locations beyond our regular travel area, we recognize that some circumstances call for care at home. Review the estimated total, including travel, before deciding whether you would like to arrange a visit.</p><PageHeader title="Request a Visit"/></div><ExtendedAreaTerms/><LocationRequestForm initialZip={initialZip} initialEstimate={initialEstimate}/></div></Container></Section></>}

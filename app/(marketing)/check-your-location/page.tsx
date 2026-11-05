import PageSearchSchema from "@/components/PageSearchSchema";
import { isPennsylvaniaZip } from "@/lib/pennsylvaniaZips";
import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import LocationRequestForm from "./LocationRequestForm";

export const metadata: Metadata = {
  title: "Extended-Area Visit Estimate | Go Chiro Mobile",
  description: "See an estimated price for a mobile chiropractic visit outside our regular service area.",
  alternates: { canonical: "https://www.gochiromobile.com/check-your-location" }
};

export default async function Page({ searchParams }: { searchParams: Promise<{ zip?: string | string[] }> }) {
  const params = await searchParams;
  const initialZip = typeof params.zip === "string" && isPennsylvaniaZip(params.zip) ? params.zip : "";
  return <>
    <PageSearchSchema path="/check-your-location" name="Extended-Area Visit Estimate | Go Chiro Mobile" description="Check an estimated mobile chiropractic visit cost for your address." />
    <Section tone="white">
      <Container>
        <div className="mx-auto max-w-xl space-y-5">
          <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Check Your Visit Cost</h1>
          <p className="text-base text-muted">Outside our regular service area? Enter the full visit address to see an estimate, including travel.</p>
          <LocationRequestForm initialZip={initialZip}/>
        </div>
      </Container>
    </Section>
  </>;
}

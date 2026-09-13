import type { Metadata } from "next";
import { Section, Container, PageHeader, CTAButton, H2, P, Callout } from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "How Backstage Care Works | GoChiroMobile",
  description: "See how GoChiroMobile organizes backstage musculoskeletal care for touring artists, crew and production personnel from signup through on-site care.",
};

const steps = [
  ["01", "Production books coverage", "Send the date, location, preferred coverage window and approximate headcount. We build the care setup around the production schedule."],
  ["02", "QR code or link goes backstage", "Artists and crew get one simple place to reserve care from their phones. A compact sign can sit near catering, production offices or the treatment area."],
  ["03", "Choose your care. Choose your time.", "Participants select an available service and appointment time. Reserved times are removed from availability automatically."],
  ["04", "Complete required registration", "When healthcare registration, consent or intake is required, it is completed digitally before care so there is less paperwork at the treatment table."],
  ["05", "We bring the treatment setup", "Portable treatment and assessment equipment comes with the provider. A suitable area, basic seating and access to power when needed are generally all the production has to provide."],
  ["06", "Care fits around the show day", "Scheduled appointments, drop-in availability or a hybrid flow can work around load-in, soundcheck, rehearsal, meals, call times and performance preparation."],
  ["07", "Follow-up after the visit", "Participants may receive appropriate mobility or self-care information and a way to reach GoChiroMobile after the production moves on."],
];

export default function HowBackstageCareWorksPage() {
  return (
    <div>
      <Section tone="navy" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Container>
          <PageHeader eyebrow="Touring Productions & Live Events" title="Backstage Care Without Backstage Chaos" lede="One link. A clear schedule. Mobile registration. On-site care. GoChiroMobile manages the participant flow so production personnel do not have to." />
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/touring-production-care/request" variant="inverse">Request Production Coverage</CTAButton>
            <CTAButton href="/touring-production-care" variant="inverseOutline">Touring Production Care</CTAButton>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <H2>You provide the space. We manage the flow.</H2>
              <P>The system is designed for a real production day: people are moving, schedules change and nobody wants another clipboard to manage. Participants use their own phones to reserve a time and complete required steps before reaching the treatment area.</P>
            </div>
            <Callout title="Built for artists, crew & production" tone="white">
              <p className="text-base leading-relaxed text-muted">The workflow can support chiropractic and musculoskeletal care and, when coordinated for an engagement, massage therapy. The event setup adapts to the services and providers available that day.</p>
            </Callout>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">From QR code to care</p>
            <H2>How It Works</H2>
            <P>Each step is intentionally simple for the production and the person receiving care.</P>
          </div>
          <div className="mt-10 grid gap-5">
            {steps.map(([number, title, text]) => (
              <div key={number} className="grid gap-4 rounded-2xl border border-black/10 bg-white p-6 sm:grid-cols-[72px_1fr] sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">{number}</div>
                <div>
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">{title}</h3>
                  <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <H2>What the participant sees</H2>
              <P>The mobile experience centers on one instruction: choose your care, choose your time. Available appointment buttons make the next step obvious while keeping the signup simple.</P>
              <div className="mt-6 rounded-2xl bg-[#071f30] p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">Mobile signup</p>
                <p className="mt-3 text-3xl font-bold">Choose your care.<br/><span className="text-teal-300">Choose your time.</span></p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm font-semibold">
                  <div className="rounded-xl bg-white/10 p-3">Massage</div>
                  <div className="rounded-xl border border-teal-300 bg-teal-300/10 p-3">Chiropractic</div>
                  <div className="rounded-xl bg-white/10 p-3">Both</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm font-bold text-navy">
                  {["4:00 PM","4:20 PM","4:40 PM","5:00 PM","5:20 PM","5:40 PM"].map((time) => <div key={time} className="rounded-lg bg-white p-2">{time}</div>)}
                </div>
                <div className="mt-4 rounded-xl bg-white p-4 text-navy">
                  <p className="text-sm font-bold">Reserve care</p>
                  <p className="mt-1 text-xs text-muted">Use an alias or first name and last initial.</p>
                </div>
              </div>
            </div>
            <div>
              <H2>What production gets</H2>
              <P>A practical system that reduces coordination for tour or venue personnel while helping providers keep the treatment area organized.</P>
              <div className="mt-6 space-y-3">
                {["A shareable QR code or private signup link","A clear list of available services and times","Digital registration when required","A provider-friendly view of the day's flow","Scheduled, drop-in or hybrid care options"].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-black/10 p-4"><span className="font-bold text-accent">✓</span><span className="text-base text-navy">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="max-w-3xl">
            <H2>Designed to stay out of the production&apos;s way</H2>
            <P>The goal is not to create another backstage process for someone to supervise. Once coverage is arranged, GoChiroMobile handles the care workflow while coordinating with the production&apos;s preferred timing, location and access requirements.</P>
            <p className="mt-6 text-sm text-muted">Availability, services, provider mix and appointment length can vary by engagement. Touring-production care is currently available at Pennsylvania locations.</p>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="max-w-3xl">
            <H2 onDark>Want This at Your Next Philadelphia-Area Stop?</H2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">Send the date, location and what you know about the production. We can recommend a practical coverage setup from there.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/touring-production-care/request" variant="inverse">Request Production Coverage</CTAButton>
              <CTAButton href={`tel:${BUSINESS_PHONE}`} variant="inverseOutline">Call / Text {BUSINESS_PHONE}</CTAButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

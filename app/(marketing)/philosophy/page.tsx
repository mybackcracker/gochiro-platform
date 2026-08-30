import type { Metadata } from "next";
import { Section, Container, Eyebrow, H1, H2, P, Prose, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Philosophy — GoChiroMobile",
  description: "My approach to chiropractic care.",
};

const PRINCIPLES: { title: string; paragraphs: string[] }[] = [
  {
    title: "Pain Matters. So Does Why It Hurts.",
    paragraphs: [
      "Pain is often what gets someone's attention, and relieving it matters. But pain can also be a signal that something isn't moving or functioning the way it should.",
      "I want to understand what's contributing to the problem rather than only chasing where it hurts.",
    ],
  },
  {
    title: "Treat the Person, Not Just the Painful Area",
    paragraphs: [
      "A neck, back, shoulder or knee doesn't operate independently from the rest of you.",
      "How you move, work, sleep, exercise and what has changed recently can all matter. That's why evaluation comes before deciding what treatment makes sense.",
    ],
  },
  {
    title: "Education Is Part of Care",
    paragraphs: [
      "I want you to understand what I think is happening and why I'm recommending something.",
      "The more you understand your own body and what you can do between visits, the less dependent you have to be on someone else to manage it for you.",
    ],
  },
  {
    title: "I Recommend. You Decide.",
    paragraphs: ["My responsibility is to evaluate, explain and make a recommendation.", "You decide what fits your goals."],
  },
  {
    title: "The Goal Is Function, Not Dependency",
    paragraphs: [
      "Success isn't measured by how often you come back.",
      "It's whether you're moving better, functioning better and becoming more capable of managing the problem that brought you to me.",
    ],
  },
];

export default function PhilosophyPage() {
  return (
    <div>
      <Section tone="white">
        <Container>
          <Eyebrow>Our Philosophy</Eyebrow>
          <H1 className="mt-3">My Approach to Chiropractic Care</H1>

          <div className="mx-auto mt-10 max-w-3xl divide-y divide-line sm:mt-14">
            {PRINCIPLES.map((principle, i) => (
              <div key={principle.title} className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 first:pt-0">
                <span className="font-heading text-4xl font-bold text-navy/15 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <H2>{principle.title}</H2>
                  <Prose>
                    {principle.paragraphs.map((paragraph) => (
                      <P key={paragraph}>{paragraph}</P>
                    ))}
                  </Prose>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" className="py-14">
        <Container>
          <div className="text-center">
            <CTAButton href="/book-online">Schedule a visit →</CTAButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}

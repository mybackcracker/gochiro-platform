import type { Metadata } from "next";
import { ArticleShell, H2, P, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Philosophy — GoChiroMobile",
  description: "My approach to chiropractic care.",
};

export default function PhilosophyPage() {
  return (
    <ArticleShell eyebrow="Our Philosophy" title="My Approach to Chiropractic Care">
      <H2>Pain Matters. So Does Why It Hurts.</H2>
      <P>
        Pain is often what gets someone&apos;s attention, and relieving it matters. But pain can
        also be a signal that something isn&apos;t moving or functioning the way it should.
      </P>
      <P>
        I want to understand what&apos;s contributing to the problem rather than only chasing
        where it hurts.
      </P>

      <H2>Treat the Person, Not Just the Painful Area</H2>
      <P>A neck, back, shoulder or knee doesn&apos;t operate independently from the rest of you.</P>
      <P>
        How you move, work, sleep, exercise and what has changed recently can all matter.
        That&apos;s why evaluation comes before deciding what treatment makes sense.
      </P>

      <H2>Education Is Part of Care</H2>
      <P>
        I want you to understand what I think is happening and why I&apos;m recommending
        something.
      </P>
      <P>
        The more you understand your own body and what you can do between visits, the less
        dependent you have to be on someone else to manage it for you.
      </P>

      <H2>I Recommend. You Decide.</H2>
      <P>My responsibility is to evaluate, explain and make a recommendation.</P>
      <P>You decide what fits your goals.</P>

      <H2>The Goal Is Function, Not Dependency</H2>
      <P>Success isn&apos;t measured by how often you come back.</P>
      <P>
        It&apos;s whether you&apos;re moving better, functioning better and becoming more capable
        of managing the problem that brought you to me.
      </P>

      <div className="mt-10">
        <CTAButton href="/book-online">Schedule a visit →</CTAButton>
      </div>
    </ArticleShell>
  );
}

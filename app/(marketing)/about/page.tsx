import type { Metadata } from "next";
import { ArticleShell, H2, P, CTAButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Dr. David DeFries — GoChiroMobile",
  description: "Third-generation chiropractor. Practicing since 2003.",
};

export default function AboutPage() {
  return (
    <ArticleShell
      eyebrow="About"
      title="Meet Dr. David DeFries"
      lede="Third-generation chiropractor. Practicing since 2003."
    >
      <P>
        I grew up around chiropractic care. My father was a chiropractor, and long before I became
        one myself, I watched the relationships he built with his patients.
      </P>
      <P>
        What stayed with me wasn&apos;t a particular technique. It was the attention he gave
        people — knowing their history, listening to what had changed and treating the person
        rather than simply moving to the next appointment.
      </P>
      <P>
        I graduated from Parker College of Chiropractic in 2003 and began practicing that same
        year.
      </P>

      <H2>Why I Started GoChiroMobile</H2>
      <P>
        The idea for GoChiroMobile developed during COVID, when the traditional office model
        suddenly changed.
      </P>
      <P>
        It made me reconsider what actually required a chiropractic office. The evaluation,
        treatment, equipment and one-on-one interaction could come with me. The patient&apos;s
        drive, waiting room and time away from home or work didn&apos;t have to.
      </P>
      <P>
        That became GoChiroMobile: chiropractic care built around bringing the visit to the
        patient.
      </P>

      <H2>How I Practice</H2>
      <P>I want to understand why something is bothering you, not simply identify where it hurts.</P>
      <P>
        That means looking at how you move, what&apos;s changed and what you&apos;re trying to get
        back to. I&apos;ll explain what I&apos;m finding, provide treatment when appropriate and
        give you practical recommendations for what you can do between visits.
      </P>
      <P>
        My goal isn&apos;t to make you dependent on care. It&apos;s to help you understand your
        problem and make informed decisions about what comes next.
      </P>

      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Credentials</p>
        <p className="mt-1">David DeFries, DC</p>
        <p>Parker College of Chiropractic, 2003</p>
        <p>Practicing since 2003</p>
        <p>Licensed Doctor of Chiropractic — Pennsylvania</p>
        <p>License DC008983</p>
      </div>

      <div className="mt-6">
        <CTAButton href="/book-online">Schedule a visit →</CTAButton>
      </div>
    </ArticleShell>
  );
}

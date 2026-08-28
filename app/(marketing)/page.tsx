import Link from "next/link";
import type { Metadata } from "next";
import { CTAButton } from "@/components/ui";
import ZipChecker from "@/components/ZipChecker";
import { BUSINESS_PHONE } from "@/lib/gochiro";

export const metadata: Metadata = {
  title: "GoChiroMobile — Chiropractic Care That Comes to You",
  description:
    "Dr. David DeFries provides one-on-one chiropractic care in your home, workplace, or other convenient location.",
};

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-14 pb-10 sm:pt-20">
        <h1 className="max-w-2xl text-4xl font-bold text-slate-900 sm:text-5xl">
          Chiropractic Care That Comes to You
        </h1>
        <p className="mt-5 max-w-2xl text-xl text-slate-700">
          Dr. David DeFries provides one-on-one chiropractic care in your home, workplace, or
          other convenient location.
        </p>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Serving Delaware County, parts of Chester County and the Main Line, with special visits
          and events available in Philadelphia and surrounding areas.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTAButton href="#service-area">Check My Area</CTAButton>
          <CTAButton href="/book-online" variant="secondary">
            Schedule a Visit
          </CTAButton>
        </div>
      </section>

      {/* 2. Ready to Schedule? */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <h2 className="text-center text-2xl font-bold text-slate-900">Ready to Schedule?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900">New Patient</h3>
            <p className="mt-2 text-slate-700">
              First visit — or haven&apos;t been seen in more than a year.
            </p>
            <div className="mt-4">
              <CTAButton href="/book?start=new" variant="secondary">
                Schedule a First Visit
              </CTAButton>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900">Returning Patient</h3>
            <p className="mt-2 text-slate-700">
              Already a patient and have been seen within the past year.
            </p>
            <div className="mt-4">
              <CTAButton href="/book?start=returning" variant="secondary">
                Schedule a Visit
              </CTAButton>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900">Group Visit</h3>
            <p className="mt-2 text-slate-700">
              Wellness-focused chiropractic care for two or more people at one location.
            </p>
            <div className="mt-4">
              <CTAButton href="/book?start=group" variant="secondary">
                Schedule a Group Visit
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chiropractic Care Without the Trip */}
      <section id="how-it-works" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-10">
        <h2 className="text-2xl font-bold text-slate-900">Chiropractic Care Without the Trip</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
            <p className="mt-1 text-lg font-bold text-slate-900">Schedule online</p>
            <p className="mt-2 text-slate-700">Choose your visit and an available appointment time.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
            <p className="mt-1 text-lg font-bold text-slate-900">I come to you</p>
            <p className="mt-2 text-slate-700">I bring the table and equipment needed for your visit.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              Get evaluated and treated at your location
            </p>
            <p className="mt-2 text-slate-700">
              Your visit includes appropriate evaluation and treatment without the drive or
              waiting room.
            </p>
          </div>
        </div>
        <Link href="/what-to-expect" className="mt-6 inline-block font-semibold text-slate-900 hover:underline">
          What to Expect →
        </Link>
      </section>

      {/* 4. Conditions Snapshot */}
      <section id="conditions" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-10">
        <h2 className="text-2xl font-bold text-slate-900">Common problems we help with</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {["Back pain", "Neck pain", "Headaches", "Sciatica", "Joint pain", "Sports injuries"].map(
            (item) => (
              <li
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {item}
              </li>
            )
          )}
        </ul>
      </section>

      {/* 5. Confirm Your Service Area */}
      <section id="service-area" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-10">
        <h2 className="text-2xl font-bold text-slate-900">Do we come to you?</h2>
        <ZipChecker />
      </section>

      {/* 6. Meet Dr. David DeFries */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-slate-900">Meet Dr. David DeFries</h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Dr. David DeFries is a third-generation chiropractor who has been practicing since 2003.
          He graduated from Parker College of Chiropractic and is a licensed Doctor of
          Chiropractic in Pennsylvania.
        </p>
        <Link href="/about" className="mt-4 inline-block font-semibold text-slate-900 hover:underline">
          Meet Dr. DeFries →
        </Link>
      </section>

      {/* 7. Closing CTA */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center sm:px-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Chiropractic Care, Without the Trip to Get It.
          </h2>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-online"
              className="rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-100"
            >
              Schedule a Visit
            </Link>
            <a href={`tel:${BUSINESS_PHONE}`} className="text-base font-semibold text-white hover:underline">
              Call or text {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

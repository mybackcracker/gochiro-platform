"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const SESSION_KEY = "gochiro-cancellation-policy-accepted";

export default function BookingPolicyGate({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY) === "yes") {
      setAccepted(true);
    }
  }, []);

  if (accepted) return <>{children}</>;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Before You Schedule</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Cancellation &amp; Rescheduling Policy</h1>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          At least 24 hours&apos; notice is required to cancel or reschedule an appointment. Cancellations,
          no-shows, or same-day changes made with less than 24 hours&apos; notice will be charged a $50 fee.
          For a Group Visit, the $50 fee applies once to the entire booking and is the host&apos;s responsibility.
          If an emergency or unavoidable circumstance occurs, please contact us as soon as possible; the fee
          may be waived at the practice&apos;s discretion.
        </div>

        <Link
          href="/pricing#cancellation-policy"
          className="mt-4 inline-block text-sm font-semibold text-slate-700 underline hover:text-slate-900"
        >
          View the full policy
        </Link>

        <label className="mt-6 flex items-start gap-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300"
          />
          I have read and agree to the cancellation and rescheduling policy.
        </label>

        <button
          type="button"
          disabled={!checked}
          onClick={() => {
            window.sessionStorage.setItem(SESSION_KEY, "yes");
            setAccepted(true);
          }}
          className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue to Scheduling
        </button>
      </section>
    </main>
  );
}

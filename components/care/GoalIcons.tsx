import type { MobilityIcon } from "@/lib/conditions";

// Decorative artwork always accompanies a visible goal label.
export function GoalIcon({ kind }: { kind: MobilityIcon | "pain" | "strength" }) {
  const movement = {
    bend: <><circle cx="35" cy="13" r="5"/><path d="M30 21 21 34 25 50 22 65M21 34 40 43 48 62M30 21 48 33 55 51M48 62h9M22 65h-9"/></>,
    turn: <><circle cx="36" cy="24" r="12"/><path d="M16 65v-8q0-15 20-15t20 15v8M18 18a22 22 0 0 1 34-6M52 5v7h-7M45 24h3"/></>,
    reach: <><circle cx="36" cy="17" r="6"/><path d="M36 26v23M36 32 20 18 16 7M36 32 51 20 57 8M36 49 24 65M36 49l12 16"/></>,
    grip: <><path d="M22 60 13 40q-2-6 3-7 4-1 7 5l4 7V20q0-7 6-7t6 7v16-20q0-7 6-7t6 7v20-13q0-6 5-6t5 6v20q0 11-9 18M22 60h30"/></>,
    walk: <><circle cx="40" cy="13" r="5"/><path d="M37 22 29 39 19 46M37 22 44 36h12M29 39l15 12 9 15M29 39 22 58 10 66"/></>,
  };
  return <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 shrink-0 text-navy" aria-hidden="true" focusable="false">
    {kind === "pain" ? <><path d="M10 20h15l14 16 20 19M44 55h15V40"/><path d="M13 57v-9M25 57V39"/></> : kind === "strength" ? <><path d="M22 24v24M14 30v12M50 24v24M58 30v12M22 36h28"/><rect x="8" y="31" width="6" height="10" rx="2"/><rect x="58" y="31" width="6" height="10" rx="2"/></> : movement[kind]}
  </svg>;
}

export default function CareGoals({ mobilityLabel, mobilityIcon, activity }: { mobilityLabel: string; mobilityIcon: MobilityIcon; activity: string }) {
  return <section aria-labelledby="care-goals" className="mt-12 sm:mt-16">
    <h2 id="care-goals" className="font-heading text-2xl font-bold text-navy">What do you want to do more comfortably?</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {[{kind: "pain" as const, label: "Less pain"}, {kind: mobilityIcon, label: mobilityLabel}, {kind: "strength" as const, label: "Build strength and control"}].map((goal) => <div key={goal.kind} className="flex items-center gap-4 rounded-2xl bg-cream p-6 sm:flex-col sm:text-center"><GoalIcon kind={goal.kind}/><p className="font-heading text-base font-semibold text-navy">{goal.label}</p></div>)}
    </div>
    <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink">{activity}</p>
    <p className="mt-2 text-sm text-muted">Goals depend on your findings and needs; results vary.</p>
  </section>;
}

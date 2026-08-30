import Link from "next/link";
import type { ReactNode } from "react";

// Shared design system. Built around the approved Brookhaven-reference
// tokens in app/globals.css (navy / navy-dark / cream / ink / muted / line).
// Kept intentionally small: a handful of composable primitives rather than
// one-off styling per page, so every page reads as one system.

type Tone = "white" | "cream" | "navy";

const TONE_CLASSES: Record<Tone, string> = {
  white: "bg-white text-ink",
  cream: "bg-cream text-ink",
  navy: "bg-navy text-white",
};

/** Full-bleed section band. Controls background + vertical rhythm only — compose with Container for width. */
export function Section({
  tone = "white",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${TONE_CLASSES[tone]} py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

/** Default content width. `narrow` is for long-form reading columns (Philosophy, About prose). */
export function Container({
  narrow = false,
  className = "",
  children,
}: {
  narrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full ${narrow ? "max-w-3xl" : "max-w-6xl"} px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

/** Constrains a run of body copy to a readable measure inside a wider Container. */
export function Prose({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`max-w-2xl ${className}`}>{children}</div>;
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] ${
        onDark ? "text-white/70" : "text-navy"
      }`}
    >
      <span className={`h-px w-6 ${onDark ? "bg-white/50" : "bg-navy/50"}`} aria-hidden />
      {children}
    </p>
  );
}

export function H1({ onDark = false, className = "", children }: { onDark?: boolean; className?: string; children: ReactNode }) {
  return (
    <h1
      className={`text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl ${
        onDark ? "text-white" : "text-ink"
      } ${className}`}
    >
      {children}
    </h1>
  );
}

export function H2({ onDark = false, className = "", children }: { onDark?: boolean; className?: string; children: ReactNode }) {
  return (
    <h2 className={`text-2xl font-bold sm:text-3xl ${onDark ? "text-white" : "text-ink"} ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ onDark = false, className = "", children }: { onDark?: boolean; className?: string; children: ReactNode }) {
  return (
    <h3 className={`text-lg font-bold ${onDark ? "text-white" : "text-ink"} ${className}`}>{children}</h3>
  );
}

export function Lede({ onDark = false, className = "", children }: { onDark?: boolean; className?: string; children: ReactNode }) {
  return (
    <p className={`text-xl font-medium leading-relaxed ${onDark ? "text-white/90" : "text-ink"} ${className}`}>
      {children}
    </p>
  );
}

export function P({ onDark = false, className = "", children }: { onDark?: boolean; className?: string; children: ReactNode }) {
  return (
    <p className={`mt-4 text-lg leading-relaxed ${onDark ? "text-white/85" : "text-muted"} ${className}`}>
      {children}
    </p>
  );
}

/** Article-style page header: eyebrow + title + lede, wired for the wider Container. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H1 className="mt-3">{title}</H1>
      {lede && <Lede className="mt-5">{lede}</Lede>}
    </div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "inverseOutline";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants: Record<typeof variant, string> = {
    primary: "bg-navy text-white hover:bg-navy-dark focus-visible:ring-navy",
    secondary:
      "border border-navy/30 text-navy hover:border-navy hover:bg-navy/5 focus-visible:ring-navy",
    inverse: "bg-white text-navy hover:bg-cream focus-visible:ring-white focus-visible:ring-offset-navy",
    inverseOutline:
      "border border-white/50 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-navy",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}

/** A clickable "entry door" — for the New/Returning/Group Visit style choices. Card is the one place a border+rounded box is used for genuinely distinct, tappable options. */
export function ChoiceCard({
  title,
  description,
  href,
  cta,
  accent,
  emphasizeCta = false,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
  accent?: ReactNode;
  /** Opt-in only — default rendering is unchanged so existing callers (e.g. the homepage) are unaffected. */
  emphasizeCta?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-[0_12px_32px_-16px_rgba(24,50,74,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
    >
      {accent && <div className="mb-4">{accent}</div>}
      <H3>{title}</H3>
      <p className="mt-2 flex-1 text-base leading-relaxed text-muted">{description}</p>
      <span
        className={`mt-5 inline-flex items-center gap-1.5 font-semibold text-navy ${
          emphasizeCta ? "text-base underline decoration-navy/40 underline-offset-4" : "text-sm"
        }`}
      >
        {cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

/** Supplementary, non-clickable information (fee note, prep instructions, coverage caveat). Cream fill, no border — visually distinct from ChoiceCard so not everything reads as the same "boxed" pattern. */
export function Callout({
  title,
  tone = "cream",
  className = "",
  children,
}: {
  title?: string;
  tone?: "cream" | "white";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-2xl p-6 sm:p-7 ${tone === "cream" ? "bg-cream" : "bg-white border border-line"} ${className}`}>
      {title && <p className="font-heading text-base font-bold text-ink">{title}</p>}
      <div className={title ? "mt-2" : ""}>{children}</div>
    </div>
  );
}

export function Divider({ onDark = false }: { onDark?: boolean }) {
  return <hr className={`border-t ${onDark ? "border-white/15" : "border-line"}`} />;
}

/** A numbered step used for both a horizontal 3-up process and a vertical timeline (pass `orientation`). */
export function Step({
  number,
  title,
  children,
  orientation = "vertical",
}: {
  number: number;
  title: string;
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "horizontal") {
    return (
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-white">
          {number}
        </span>
        <H3 className="mt-4">{title}</H3>
        <p className="mt-2 text-base leading-relaxed text-muted">{children}</p>
      </div>
    );
  }
  return (
    <div className="relative flex gap-6 pb-10 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-white">
          {number}
        </span>
        <span className="mt-2 w-px flex-1 bg-line last:hidden" aria-hidden />
      </div>
      <div className="pt-1.5">
        <H3>{title}</H3>
        <p className="mt-2 text-base leading-relaxed text-muted">{children}</p>
      </div>
    </div>
  );
}

/** Compact index-style list (e.g. "Common problems") — deliberately not button/pill shaped. */
export function TagList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 border-b border-line py-2 text-base font-medium text-ink">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Two-column layout helper for photo + copy pairings. Pass `reverse` to put the media on the left at desktop width. */
export function TwoColumn({
  media,
  reverse = false,
  className = "",
  children,
}: {
  media: ReactNode;
  reverse?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${className}`}>
      <div className={reverse ? "lg:order-2" : ""}>{media}</div>
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

/** Consistent image framing — one rounded/overflow treatment reused everywhere a photo appears. */
export function ImageFrame({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-line bg-cream ${className}`}>
      {children}
    </div>
  );
}

export function CredentialsPanel({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
      <Eyebrow>Credentials</Eyebrow>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="w-40 shrink-0 text-sm font-semibold text-muted">{row.label}</dt>
            <dd className="text-base font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

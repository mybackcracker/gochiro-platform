import Link from "next/link";
import type { ReactNode } from "react";

export function ArticleShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:py-20">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
      {lede && <p className="mt-6 text-xl font-semibold text-slate-900">{lede}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 text-2xl font-bold text-slate-900">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-lg leading-relaxed text-slate-700">{children}</p>;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-block rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800"
      : "inline-block rounded-xl border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-900 hover:border-slate-500";
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Divider() {
  return <hr className="mt-10 border-slate-200" />;
}

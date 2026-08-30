"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS_NAME, BUSINESS_PHONE } from "@/lib/gochiro";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/philosophy", label: "Our Philosophy" },
  { href: "/what-to-expect", label: "What to Expect" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lets keyboard/screen-reader users dismiss the menu without tabbing to a close control.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy font-heading text-sm font-bold text-white"
          >
            G
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-ink">{BUSINESS_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-x-5 gap-y-2 text-sm font-medium text-muted sm:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${BUSINESS_PHONE}`}
            className="hidden text-sm font-medium text-muted transition-colors hover:text-navy sm:inline"
          >
            {BUSINESS_PHONE}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 sm:hidden"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-4.5 w-4.5" aria-hidden>
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
          <Link
            href="/book-online"
            className="rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            Schedule a Visit
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Site" className="border-t border-line bg-white sm:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink transition-colors hover:bg-cream hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

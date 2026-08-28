import Link from "next/link";
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
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          {BUSINESS_NAME}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${BUSINESS_PHONE}`}
            className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
          >
            {BUSINESS_PHONE}
          </a>
          <Link
            href="/book-online"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Schedule a Visit
          </Link>
        </div>
      </div>
    </header>
  );
}

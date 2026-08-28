import Link from "next/link";
import { PUBLIC_CONTACT_EMAIL, BUSINESS_NAME, BUSINESS_PHONE } from "@/lib/gochiro";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/philosophy", label: "Our Philosophy" },
  { href: "/what-to-expect", label: "What to Expect" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/book-online", label: "Book Online" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-bold text-slate-900">{BUSINESS_NAME}</p>
          <p className="mt-2 text-sm text-slate-600">
            <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-slate-900">
              {BUSINESS_PHONE}
            </a>
            {" · "}
            <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="hover:text-slate-900">
              {PUBLIC_CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500">
        Licensed Doctor of Chiropractic, Pennsylvania, DC008983. © {year} {BUSINESS_NAME}.
      </div>
    </footer>
  );
}

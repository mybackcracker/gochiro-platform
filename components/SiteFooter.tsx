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
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-heading text-lg font-bold text-white">{BUSINESS_NAME}</p>
          <p className="mt-3 text-sm">
            <a href={`tel:${BUSINESS_PHONE}`} className="transition-colors hover:text-white">
              {BUSINESS_PHONE}
            </a>
            {" · "}
            <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="transition-colors hover:text-white">
              {PUBLIC_CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 sm:px-6">
        Licensed Doctor of Chiropractic, Pennsylvania, DC008983. © {year} {BUSINESS_NAME}.
      </div>
    </footer>
  );
}

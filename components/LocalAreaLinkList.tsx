import Link from "next/link";
import type { NearbyArea } from "@/lib/localAreas/types";

// Same markup/classes as components/ui.tsx's TagList — reproduced here
// rather than editing that frozen shared component — but each item may
// optionally link to that area's own page. Shared by components/LocalAreaPage.tsx
// (nearby-communities section) and the Service Areas index page (full directory).
export default function LocalAreaLinkList({ items }: { items: NearbyArea[] }) {
  return (
    <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const href = typeof item === "string" ? undefined : item.href;
        return (
          <li key={label} className="flex items-center gap-3 border-b border-line py-2 text-base font-medium text-ink">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy" aria-hidden />
            {href ? (
              <Link href={href} className="hover:text-navy hover:underline">
                {label}
              </Link>
            ) : (
              label
            )}
          </li>
        );
      })}
    </ul>
  );
}

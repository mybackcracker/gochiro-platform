import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { BUSINESS_PHONE } from "@/lib/gochiro";

const PHONE_DIGITS = BUSINESS_PHONE.replace(/\D/g, "");

export default function TouringProductionCareLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-navy-dark text-white">
        <Container className="flex flex-col gap-2 py-3 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:text-left">
          <p className="text-sm font-semibold sm:text-base">
            Need care today? Same-day and short-notice appointments may be available.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-bold sm:text-base">
            <a className="underline underline-offset-4 hover:text-white/80" href={`tel:${PHONE_DIGITS}`}>
              Call {BUSINESS_PHONE}
            </a>
            <span className="text-white/50" aria-hidden>•</span>
            <a className="underline underline-offset-4 hover:text-white/80" href={`sms:${PHONE_DIGITS}`}>
              Text {BUSINESS_PHONE}
            </a>
          </div>
        </Container>
      </div>
      {children}
    </>
  );
}

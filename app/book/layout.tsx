import type { ReactNode } from "react";
import BookingPolicyGate from "./BookingPolicyGate";

export default function BookLayout({ children }: { children: ReactNode }) {
  return <BookingPolicyGate>{children}</BookingPolicyGate>;
}

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Care layout review", robots: { index: false, follow: false } };

export default function CareDesignReview() {
  return <div style={{ padding: "24px", background: "#d8d5ce" }}>
    <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Phone layout review</h1>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
      <iframe title="Neck pain phone preview" src="/conditions/neck-pain" width="390" height="1100" style={{ border: "none", background: "white" }} />
      <iframe title="Treatments phone preview" src="/treatments" width="390" height="1100" style={{ border: "none", background: "white" }} />
    </div>
  </div>;
}

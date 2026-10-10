import type { Metadata } from "next";
export const metadata: Metadata = { title: "Homepage design preview — Go Chiro Mobile", robots: { index: false, follow: false } };
export default function Preview() {
  return <main style={{background:"#e9e4dc",padding:"32px 18px",minHeight:"100vh"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <h1 style={{fontSize:28,fontWeight:800,marginBottom:12}}>Go Chiro Mobile · Homepage preview</h1>
      <p style={{marginBottom:24}}>A design preview for review. Booking links open the existing scheduling flow.</p>
      <a href="/" style={{display:"inline-block",background:"#142a3c",color:"white",padding:"12px 20px",borderRadius:7,fontWeight:700,marginBottom:28}}>Open full desktop preview ↗</a>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:16}}>Phone layout</h2>
      <div style={{width:"100%",maxWidth:414,border:"8px solid #142a3c",borderRadius:24,overflow:"hidden",background:"white"}}>
        <iframe title="Homepage at phone width" src="/" style={{display:"block",width:"100%",height:780,border:0}} />
      </div>
    </div>
  </main>;
}

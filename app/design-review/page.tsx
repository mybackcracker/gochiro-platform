export const metadata = { robots: { index: false, follow: false } };
export default function Review(){return <main style={{padding:16,display:"flex",gap:16,alignItems:"start"}}>{["/group-visits/standard","/philadelphia/hotel-visits","/philadelphia/workplace"].map(p=><div key={p}><p>{p}</p><iframe title={p} src={p} style={{width:383,height:760,border:"1px solid #ccc"}} /></div>)}</main>}

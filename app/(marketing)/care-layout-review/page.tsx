export default function Page() {
  const pages = ["/conditions", "/conditions/low-back-pain", "/conditions/headaches", "/conditions/sciatica"];
  return <div style={{display:"grid",gridTemplateColumns:"repeat(2,390px)",gap:24,padding:24}}>{pages.map((path) => <div key={path}><h1>{path}</h1><iframe title={path} src={path} style={{width:390,height:1100,border:"1px solid #bbb"}} /></div>)}</div>;
}

import { useState } from "react";
import { pct } from "../data/appData";

export function PCard({ p, setPage, addToCart }) {
  const [err, setErr] = useState(false);
  return (
    <div onClick={() => setPage("detail")} className="pcard" style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, overflow:"hidden", cursor:"pointer", display:"flex", flexDirection:"column" }}>
      <div style={{ position:"relative", height:160, overflow:"hidden", background:"#f9fafb" }}>
        {err ? <div style={{ width:"100%", height:"100%", display:"grid", placeItems:"center", fontSize:44 }}>💊</div>
          : <img src={p.img} alt={p.name} onError={() => setErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover" }} />}
        {p.badge && <span style={{ position:"absolute", top:10, left:10, background:p.bc, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:6 }}>{p.badge}</span>}
      </div>
      <div style={{ padding:"16px", flex:1, display:"flex", flexDirection:"column", gap:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.06em" }}>{p.brand}</div>
        <div className="lc2" style={{ fontSize:13, fontWeight:600, color:"#111827", lineHeight:1.5, flex:1 }}>{p.name}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <span style={{ fontSize:16, fontWeight:700, color:"#059669" }}>₹{p.price}</span>
            <span style={{ fontSize:11, color:"#9ca3af", textDecoration:"line-through", marginLeft:5 }}>₹{p.mrp}</span>
            <span style={{ fontSize:10, color:"#16a34a", fontWeight:700, marginLeft:4 }}>{pct(p.price,p.mrp)}% off</span>
          </div>
          <button onClick={e => { e.stopPropagation(); addToCart(p); }}
            style={{ background:"#f0fdf4", color:"#059669", border:"1.5px solid #6ee7b7", borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background="#059669"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#f0fdf4"; e.currentTarget.style.color="#059669"; }}
          >+ Add</button>
        </div>
      </div>
    </div>
  );
}

export function SHead({ title, sub, cta, onCta }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24 }}>
      <div>
        <h2 style={{ fontSize:24, fontWeight:700, color:"#111827", fontFamily:"'Playfair Display',serif" }}>{title}</h2>
        {sub && <p style={{ fontSize:13, color:"#9ca3af", marginTop:5 }}>{sub}</p>}
      </div>
      {cta && <button onClick={onCta} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, color:"#059669" }}>{cta} →</button>}
    </div>
  );
}

export function BlogCard({ b }) {
  return (
    <div className="pcard" style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, overflow:"hidden", cursor:"pointer" }}>
      <div style={{ height:160, overflow:"hidden" }}><img src={b.img} alt={b.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} /></div>
      <div style={{ padding:"18px" }}>
        <span style={{ display:"inline-block", color:b.tagColor, background:b.tagBg, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", padding:"4px 11px", borderRadius:50, marginBottom:12 }}>{b.tag}</span>
        <h3 className="lc2" style={{ fontSize:14, fontWeight:700, color:"#111827", lineHeight:1.5, marginBottom:10, fontFamily:"'Playfair Display',serif" }}>{b.title}</h3>
        <p className="lc2" style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, marginBottom:14 }}>{b.excerpt}</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #f3f4f6", paddingTop:12, fontSize:12, color:"#9ca3af" }}>
          <span>{b.author}</span><span>⏱ {b.time} read</span>
        </div>
      </div>
    </div>
  );
}

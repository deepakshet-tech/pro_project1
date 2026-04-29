import { useState } from "react";
import { PACKAGES, pct } from "../data/appData";

export default function Packages({ onBookPkg }) {
  const tabs = ["All Packages","Diabetes","Cardiac","Full Body","Women's Health","Senior Citizen"];
  const [active, setActive] = useState("All Packages");
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"40px 32px 56px" }}>
        <div className="packages-hero" style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", borderRadius:18, padding:"52px 44px", textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:30, fontWeight:700, color:"#fff", marginBottom:12, fontFamily:"'Playfair Display',serif" }}>🔬 Health Check Packages</h1>
          <p style={{ color:"rgba(255,255,255,0.82)", fontSize:14, lineHeight:1.8 }}>Comprehensive lab test packages designed by expert physicians.<br/>Home collection · Results in 24–48 hours.</p>
        </div>
        <div className="packages-tabs" style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:32 }}>
          {tabs.map(t => <button key={t} onClick={() => setActive(t)} style={{ borderRadius:50, padding:"9px 20px", fontSize:13, fontWeight:600, cursor:"pointer", border:`1.5px solid ${active===t?"#059669":"#e5e7eb"}`, background:active===t?"#059669":"#fff", color:active===t?"#fff":"#4b5563" }}>{t}</button>)}
        </div>
        <div className="grid-packages" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {PACKAGES.map(pkg => (
            <div key={pkg.name} className="pcard" style={{ background:"#fff", border:`1.5px solid ${pkg.popular?"#059669":"#e5e7eb"}`, borderRadius:18, overflow:"hidden" }}>
              <div style={{ position:"relative", height:130, overflow:"hidden" }}>
                <img src={pkg.img} alt={pkg.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(6,78,59,0.7),transparent)" }} />
                {pkg.popular && <span style={{ position:"absolute", top:12, right:12, background:"#059669", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:50 }}>⭐ Popular</span>}
                <span style={{ position:"absolute", bottom:12, left:16, fontSize:26 }}>{pkg.icon}</span>
              </div>
              <div style={{ padding:"22px 22px" }}>
                <div style={{ fontWeight:700, fontSize:16, color:"#111827", marginBottom:5, fontFamily:"'Playfair Display',serif" }}>{pkg.name}</div>
                <div style={{ color:"#9ca3af", fontSize:13, marginBottom:16 }}>{pkg.tagline}</div>
                <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#9ca3af", marginBottom:10 }}>Includes</div>
                {pkg.tests.map(t => <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:7, fontSize:13, color:"#4b5563", marginBottom:6 }}><span style={{ color:"#059669", fontWeight:700, flexShrink:0 }}>✓</span>{t}</div>)}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, marginTop:16, borderTop:"1px solid #f3f4f6" }}>
                  <div>
                    <span style={{ fontSize:20, fontWeight:700, color:"#059669" }}>₹{pkg.price.toLocaleString()}</span>
                    <span style={{ fontSize:13, color:"#9ca3af", textDecoration:"line-through", marginLeft:8 }}>₹{pkg.mrp.toLocaleString()}</span>
                    <span style={{ background:"#dcfce7", color:"#166534", fontSize:11, fontWeight:700, borderRadius:6, padding:"2px 7px", marginLeft:7 }}>{pct(pkg.price,pkg.mrp)}% off</span>
                  </div>
                  {/* ✅ FIXED: opens booking modal via App-level state */}
                  <button onClick={() => onBookPkg(pkg)} style={{ background:"#059669", color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:700, cursor:"pointer" }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

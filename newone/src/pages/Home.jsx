import { useEffect, useState } from "react";
import { BLOGS, CATEGORIES, PRODUCTS } from "../data/appData";
import { BlogCard, PCard, SHead } from "../components/ShopCards";

export default function Home({ setPage, addToCart }) {
  const [slide, setSlide] = useState(0);
  const banners = [
    { from:"#064e3b", to:"#065f46", label:"FLAT 20% OFF", title:"Medicines Delivered\nto Your Doorstep", sub:"Genuine medicines · Expert pharmacists · Fast delivery.", cta:"Shop Now", p:"products" },
    { from:"#0c4a6e", to:"#075985", label:"UP TO 40% OFF", title:"Lab Tests at\nHome Collection", sub:"Book health checkup packages with doorstep sample collection.", cta:"Book Test", p:"packages" },
    { from:"#78350f", to:"#92400e", label:"EXCLUSIVE DEALS", title:"Vitamins &\nSupplements Sale", sub:"Top brands on vitamins, proteins and nutrition products.", cta:"Explore", p:"products" },
  ];
  const b = banners[slide];
  useEffect(() => { const t = setInterval(() => setSlide(s => (s+1)%3), 4500); return () => clearInterval(t); }, []);

  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ background:`linear-gradient(135deg,${b.from},${b.to})`, padding:"64px 32px 52px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", textAlign:"center" }}>
          <span style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"5px 16px", borderRadius:50, marginBottom:20 }}>{b.label}</span>
          <h1 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:18, whiteSpace:"pre-line", fontFamily:"'Playfair Display',serif" }}>{b.title}</h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:15, lineHeight:1.8, maxWidth:480, margin:"0 auto 30px" }}>{b.sub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPage(b.p)} style={{ background:"#fff", color:"#065f46", fontWeight:700, border:"none", padding:"14px 30px", borderRadius:12, fontSize:15, cursor:"pointer" }}>{b.cta} →</button>
            <button onClick={() => setPage("rx")} style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.35)", color:"#fff", fontWeight:600, padding:"14px 22px", borderRadius:12, fontSize:15, cursor:"pointer" }}>Upload Prescription</button>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:34 }}>
            {banners.map((_,i) => <button key={i} onClick={() => setSlide(i)} style={{ height:8, width:i===slide?28:8, background:i===slide?"#fff":"rgba(255,255,255,0.4)", border:"none", borderRadius:50, cursor:"pointer", transition:"width 0.3s" }} />)}
          </div>
        </div>
      </div>
      <div style={{ background:"#059669", padding:"18px 32px" }}>
        <div style={{ maxWidth:1180, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"12px 60px" }}>
          {[["50,000+","Products"],["24/7","Pharmacist Support"],["100%","Genuine Medicines"],["2 Hrs","Express Delivery"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff", fontFamily:"'Playfair Display',serif" }}>{n}</div>
              <div style={{ fontSize:12, color:"#a7f3d0", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"48px 32px 56px" }}>
        <div style={{ background:"linear-gradient(135deg,#f59e0b,#ea580c)", borderRadius:18, padding:"26px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap", marginBottom:52 }}>
          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            <div style={{ width:56, height:56, background:"rgba(255,255,255,0.2)", borderRadius:14, display:"grid", placeItems:"center", fontSize:26, flexShrink:0 }}>📋</div>
            <div>
              <div style={{ fontWeight:700, color:"#fff", fontSize:17, fontFamily:"'Playfair Display',serif", marginBottom:5 }}>Have a Prescription? Get Medicines in 2 Hours!</div>
              <div style={{ color:"rgba(255,255,255,0.85)", fontSize:13 }}>Our pharmacists verify and dispatch your medicines fast.</div>
            </div>
          </div>
          <button onClick={() => setPage("rx")} style={{ background:"#fff", color:"#d97706", fontWeight:700, border:"none", padding:"13px 26px", borderRadius:12, fontSize:14, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>Upload Rx →</button>
        </div>
        <SHead title="Shop by Category" sub="Everything you need for your health & wellness" cta="View All" onCta={() => setPage("products")} />
        <div className="grid-categories" style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:14, marginBottom:52 }}>
          {CATEGORIES.map(c => (
            <button key={c.name} onClick={() => setPage(c.name==="Lab Tests"?"packages":"products")}
              style={{ background:c.bg, border:`1.5px solid ${c.border}`, borderRadius:16, padding:"16px 8px", display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", transition:"transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >
              <div style={{ width:52, height:52, borderRadius:12, overflow:"hidden", marginBottom:10, background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
                <img src={c.img} alt={c.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:"#111827", lineHeight:1.3, textAlign:"center" }}>{c.name}</div>
              <div style={{ fontSize:10, color:"#6b7280", marginTop:3 }}>{c.count}</div>
            </button>
          ))}
        </div>
        <SHead title="Bestselling Products" sub="Most trusted by our customers" cta="View All" onCta={() => setPage("products")} />
        <div className="grid-products" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, marginBottom:52 }}>
          {PRODUCTS.slice(0,8).map(p => <PCard key={p.id} p={p} setPage={setPage} addToCart={addToCart} />)}
        </div>
        <div style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", borderRadius:18, padding:"38px 44px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:24, flexWrap:"wrap", marginBottom:52 }}>
          <div>
            <div style={{ color:"#7dd3fc", fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>🔬 Lab Tests & Health Packages</div>
            <h2 style={{ color:"#fff", fontSize:25, fontWeight:700, marginBottom:10, fontFamily:"'Playfair Display',serif" }}>Book Health Checkup from Home</h2>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, lineHeight:1.7 }}>Comprehensive packages starting at ₹249. Home sample collection.</p>
          </div>
          <button onClick={() => setPage("packages")} style={{ background:"#fff", color:"#0369a1", fontWeight:700, border:"none", padding:"14px 28px", borderRadius:12, fontSize:14, cursor:"pointer", flexShrink:0 }}>Book a Test →</button>
        </div>
        <SHead title="Health Tips & Articles" sub="Expert advice from our pharmacists" cta="Read All" onCta={() => setPage("blog")} />
        <div className="grid-blog" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
          {BLOGS.slice(0,3).map(b => <BlogCard key={b.title} b={b} />)}
        </div>
      </div>
    </div>
  );
}

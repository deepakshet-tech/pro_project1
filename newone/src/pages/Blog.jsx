import { useState } from "react";
import { BLOGS } from "../data/appData";
import { BlogCard } from "../components/ShopCards";

export default function Blog() {
  const filters = ["All","Nutrition","Medication","Mental Health","Cardiac","Fitness","Wellness"];
  const [active, setActive] = useState("All");
  const filtered = active==="All" ? BLOGS : BLOGS.filter(b => b.tag===active);
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"40px 32px 56px" }}>
        <div className="blog-featured" style={{ position:"relative", background:"#111827", borderRadius:18, overflow:"hidden", marginBottom:48 }}>
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=50" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.28 }} />
          <div style={{ position:"relative", zIndex:1, padding:"52px 48px" }}>
            <span style={{ display:"inline-block", background:"rgba(5,150,105,0.3)", border:"1px solid rgba(52,211,153,0.3)", color:"#6ee7b7", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", padding:"5px 16px", borderRadius:50, marginBottom:18 }}>Featured Article</span>
            <h2 style={{ fontSize:26, fontWeight:700, color:"#fff", lineHeight:1.35, marginBottom:14, maxWidth:540, fontFamily:"'Playfair Display',serif" }}>The Complete Guide to Managing Hypertension Naturally in 2025</h2>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14, lineHeight:1.8, maxWidth:500, marginBottom:24 }}>Hypertension affects 1 in 3 adults. Our chief pharmacist walks through evidence-based lifestyle interventions.</p>
            <button style={{ background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"12px 22px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Read Article →</button>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:14 }}>
          <h2 style={{ fontSize:24, fontWeight:700, color:"#111827", fontFamily:"'Playfair Display',serif" }}>Latest Articles</h2>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {filters.map(f => <button key={f} onClick={() => setActive(f)} style={{ borderRadius:50, padding:"7px 18px", fontSize:12, fontWeight:600, cursor:"pointer", border:`1.5px solid ${active===f?"#059669":"#e5e7eb"}`, background:active===f?"#059669":"#fff", color:active===f?"#fff":"#4b5563" }}>{f}</button>)}
          </div>
        </div>
        {filtered.length===0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#9ca3af" }}>
            <div style={{ fontSize:48, marginBottom:14 }}>📭</div>
            <div style={{ fontWeight:600, fontSize:15, marginBottom:10 }}>No articles in this category yet</div>
            <button onClick={() => setActive("All")} style={{ color:"#059669", background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600 }}>Show all articles</button>
          </div>
        ) : (
          <div className="grid-blog" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {filtered.map(b => <BlogCard key={b.title} b={b} />)}
          </div>
        )}
      </div>
    </div>
  );
}

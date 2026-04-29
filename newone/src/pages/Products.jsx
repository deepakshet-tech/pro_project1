import { useState } from "react";
import { PRODUCTS } from "../data/appData";
import { PCard } from "../components/ShopCards";

export default function Products({ setPage, addToCart }) {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [price, setPrice] = useState(5000);
  const cats = ["All","Medicines","Vitamins","Skincare","Devices","Nutrition","Baby Care","Ayurveda","Personal Care"];
  const shown = PRODUCTS.filter(p => cat==="All"||p.cat===cat).filter(p => p.price<=price).sort((a,b) => sort==="Price: Low to High"?a.price-b.price:sort==="Price: High to Low"?b.price-a.price:0);
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"40px 32px 56px" }}>
        <div className="products-layout" style={{ display:"flex", gap:28 }}>
          <aside className="products-sidebar" style={{ width:220, flexShrink:0 }}>
            <div className="products-sidebar-inner" style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"22px 20px", position:"sticky", top:130 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, paddingBottom:14, borderBottom:"1px solid #f3f4f6" }}>
                <span style={{ fontWeight:700, fontSize:15, fontFamily:"'Playfair Display',serif" }}>Filters</span>
                <button onClick={() => { setCat("All"); setPrice(5000); }} style={{ fontSize:12, fontWeight:600, color:"#059669", background:"none", border:"none", cursor:"pointer" }}>Clear All</button>
              </div>
              <div style={{ marginBottom:22 }}>
                <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:12 }}>Category</div>
                {cats.map(c => (
                  <button key={c} onClick={() => setCat(c)} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 0", fontSize:13, cursor:"pointer", background:"none", border:"none", width:"100%", textAlign:"left", color:cat===c?"#059669":"#4b5563", fontWeight:cat===c?700:400 }}>
                    <span style={{ width:15, height:15, border:`2px solid ${cat===c?"#059669":"#d1d5db"}`, borderRadius:4, background:cat===c?"#059669":"transparent", flexShrink:0, display:"grid", placeItems:"center" }}>
                      {cat===c && <span style={{ color:"#fff", fontSize:8, fontWeight:900 }}>✓</span>}
                    </span>{c}
                  </button>
                ))}
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:12 }}>Price Range</div>
                <input type="range" min={0} max={5000} value={price} onChange={e => setPrice(+e.target.value)} style={{ width:"100%", accentColor:"#059669" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280", marginTop:6 }}><span>₹0</span><span>₹{price.toLocaleString()}</span></div>
              </div>
            </div>
          </aside>
          <div style={{ flex:1, minWidth:0 }}>
            <div className="filter-pills" style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
              {cats.map(c => <button key={c} onClick={() => setCat(c)} style={{ borderRadius:50, padding:"7px 18px", fontSize:12, fontWeight:600, cursor:"pointer", border:`1.5px solid ${cat===c?"#059669":"#e5e7eb"}`, background:cat===c?"#059669":"#fff", color:cat===c?"#fff":"#4b5563" }}>{c}</button>)}
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <span style={{ fontSize:13, color:"#6b7280" }}><strong style={{ color:"#111827" }}>{shown.length}</strong> products found</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ border:"1.5px solid #e5e7eb", borderRadius:8, padding:"8px 14px", fontSize:13, color:"#4b5563", outline:"none", background:"#fff", cursor:"pointer" }}>
                <option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option>
              </select>
            </div>
            {shown.length===0 ? (
              <div style={{ textAlign:"center", padding:"80px 0", color:"#9ca3af" }}>
                <div style={{ fontSize:48, marginBottom:14 }}>🔍</div>
                <div style={{ fontWeight:600, fontSize:15, marginBottom:10 }}>No products found</div>
                <button onClick={() => { setCat("All"); setPrice(5000); }} style={{ color:"#059669", background:"none", border:"none", cursor:"pointer", fontSize:13 }}>Clear filters</button>
              </div>
            ) : (
              <div className="products-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
                {shown.map(p => <PCard key={p.id} p={p} setPage={setPage} addToCart={addToCart} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

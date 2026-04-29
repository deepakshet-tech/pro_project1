import { useState } from "react";
import { PRODUCTS, pct } from "../data/appData";
import { PCard, SHead } from "../components/ShopCards";

export default function ProductDetails({ setPage, addToCart, showToast }) {
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState(0);
  const p = PRODUCTS[sel];
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"40px 32px 56px" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color:"#9ca3af", marginBottom:28 }}>
          <button onClick={() => setPage("home")} style={{ color:"#9ca3af", background:"none", border:"none", cursor:"pointer", padding:0 }}>Home</button>
          <span>/</span><button onClick={() => setPage("products")} style={{ color:"#9ca3af", background:"none", border:"none", cursor:"pointer", padding:0 }}>Products</button>
          <span>/</span><span style={{ color:"#374151" }} className="lc2">{p.name}</span>
        </div>
        <div className="detail-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.1fr", gap:48, alignItems:"start" }}>
          <div>
            <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", height:340, border:"1.5px solid #e5e7eb" }}>
              <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ display:"flex", gap:12, marginTop:14 }}>
              {PRODUCTS.slice(0,5).map((prod,i) => (
                <button key={i} onClick={() => setSel(i)} style={{ width:60, height:60, borderRadius:10, overflow:"hidden", border:`2px solid ${sel===i?"#059669":"#e5e7eb"}`, flexShrink:0, padding:0, cursor:"pointer" }}>
                  <img src={prod.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </button>
              ))}
            </div>
          </div>
          <div style={{ background:"#fff", borderRadius:18, padding:"32px", border:"1.5px solid #e5e7eb" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{p.brand}</div>
            <h1 style={{ fontSize:24, fontWeight:700, color:"#111827", lineHeight:1.35, marginBottom:14, fontFamily:"'Playfair Display',serif" }}>{p.name}</h1>
            <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:22 }}>
              <span style={{ fontSize:32, fontWeight:700, color:"#059669", fontFamily:"'Playfair Display',serif" }}>₹{p.price}</span>
              <span style={{ fontSize:15, color:"#9ca3af", textDecoration:"line-through" }}>₹{p.mrp}</span>
              <span style={{ background:"#dcfce7", color:"#166534", fontSize:13, fontWeight:700, padding:"4px 10px", borderRadius:8 }}>{pct(p.price,p.mrp)}% OFF</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:22 }}>
              <span style={{ fontSize:14, fontWeight:600, color:"#4b5563" }}>Quantity:</span>
              <div style={{ display:"flex", background:"#f3f4f6", borderRadius:12, overflow:"hidden" }}>
                <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:42, height:42, background:"none", border:"none", cursor:"pointer", fontSize:20, fontWeight:700, color:"#059669" }}>−</button>
                <span style={{ width:44, display:"grid", placeItems:"center", fontWeight:700, fontSize:16 }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ width:42, height:42, background:"none", border:"none", cursor:"pointer", fontSize:20, fontWeight:700, color:"#059669" }}>+</button>
              </div>
            </div>
            <div style={{ display:"flex", gap:12, marginBottom:14 }}>
              <button onClick={() => addToCart(p)} style={{ flex:1, background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"15px 0", fontSize:15, fontWeight:700, cursor:"pointer" }}>🛒 Add to Cart</button>
              <button onClick={() => showToast("❤️ Added to Wishlist!")} style={{ background:"#fff", color:"#059669", border:"2px solid #059669", borderRadius:12, padding:"15px 18px", fontSize:18, cursor:"pointer" }}>♡</button>
            </div>
            <button onClick={() => showToast("⚡ Proceeding to checkout...")} style={{ width:"100%", background:"#f59e0b", color:"#fff", border:"none", borderRadius:12, padding:"15px 0", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:22 }}>⚡ Buy Now</button>
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:22 }}>🚚</span>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#111827" }}>Free Delivery by Tomorrow, 6 PM</div>
                <div style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>Express 2-hour delivery available for ₹49</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop:56 }}>
          <SHead title="Related Products" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {PRODUCTS.slice(1,5).map(p => <PCard key={p.id} p={p} setPage={setPage} addToCart={addToCart} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

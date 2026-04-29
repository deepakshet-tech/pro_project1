import { useState } from "react";
import { STORES } from "../data/appData";

export default function Contact({ showToast }) {
  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", type:"", message:"" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"12px 14px", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif", color:"#111827", background:"#fff" };
  const lbl = { display:"block", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:7 };
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 32px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#059669", marginBottom:10 }}>Get in Touch</div>
          <h1 style={{ fontSize:34, fontWeight:700, color:"#111827", marginBottom:12, fontFamily:"'Playfair Display',serif" }}>We're Here to Help</h1>
          <p style={{ color:"#6b7280", fontSize:14, maxWidth:440, margin:"0 auto", lineHeight:1.8 }}>Speak to our certified pharmacists, find your nearest store, or send us a message.</p>
        </div>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:32 }}>
          <div>
            <div style={{ background:"linear-gradient(135deg,#059669,#047857)", borderRadius:18, padding:"28px", color:"#fff", marginBottom:18 }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", opacity:0.8, marginBottom:8 }}>📞 Pharmacist Helpline</div>
              <div style={{ fontSize:32, fontWeight:700, marginBottom:8, fontFamily:"'Playfair Display',serif" }}>1800-103-0123</div>
              <div style={{ fontSize:13, opacity:0.82, marginBottom:18 }}>Toll-free · Available 24/7</div>
              <button onClick={() => showToast("📞 Calling helpline...")} style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", borderRadius:10, padding:"9px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Call Now</button>
            </div>
            {[["📧","Email","care@medicare-plus.in"],["💬","WhatsApp","+91 98765 43210"],["🕐","Hours","Mon–Sat, 8 AM – 10 PM"]].map(([icon,label,val]) => (
              <button key={label} onClick={() => showToast(`${icon} ${val}`)} style={{ display:"flex", alignItems:"center", gap:16, background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"16px 18px", width:"100%", textAlign:"left", cursor:"pointer", marginBottom:12 }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#6ee7b7"} onMouseLeave={e=>e.currentTarget.style.borderColor="#e5e7eb"}>
                <div style={{ width:44, height:44, background:"#f0fdf4", borderRadius:10, display:"grid", placeItems:"center", fontSize:20, flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"#9ca3af", marginBottom:3 }}>{label}</div>
                  <div style={{ fontWeight:600, color:"#111827", fontSize:14 }}>{val}</div>
                </div>
              </button>
            ))}
            <div style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:16, padding:"22px 20px" }}>
              <h3 style={{ fontWeight:700, color:"#111827", marginBottom:16, fontFamily:"'Playfair Display',serif", fontSize:17 }}>🗺 Find Nearest Store</h3>
              {STORES.map(s => (
                <div key={s.name} onClick={() => showToast(`📍 Navigating to ${s.name}...`)} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"14px 8px", borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}>
                  <div><div style={{ fontWeight:600, fontSize:14, color:"#111827" }}>{s.name}</div><div style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>{s.addr}</div></div>
                  <span style={{ color:"#059669", fontSize:13, fontWeight:700, marginLeft:14, whiteSpace:"nowrap" }}>{s.dist}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:18, padding:"36px 32px" }}>
            <h3 style={{ fontSize:22, fontWeight:700, color:"#111827", marginBottom:28, fontFamily:"'Playfair Display',serif" }}>Send Us a Message</h3>
            <div className="contact-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              {[["First Name","first","Ravi"],["Last Name","last","Kumar"]].map(([l,k,ph]) => (
                <div key={k}><label style={lbl}>{l}</label><input placeholder={ph} value={form[k]} onChange={set(k)} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} /></div>
              ))}
            </div>
            {[["Email Address","email","ravi@example.com","email"],["Phone Number","phone","+91 98765 43210","tel"]].map(([l,k,ph,t]) => (
              <div key={k} style={{ marginBottom:16 }}><label style={lbl}>{l}</label><input type={t} placeholder={ph} value={form[k]} onChange={set(k)} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} /></div>
            ))}
            <div style={{ marginBottom:16 }}>
              <label style={lbl}>Query Type</label>
              <select value={form.type} onChange={set("type")} style={inp}>
                <option value="">Select a topic...</option>
                {["Order & Delivery","Prescription Verification","Medicine Availability","Lab Test Booking","Returns & Refunds","Other"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={lbl}>Message</label>
              <textarea value={form.message} onChange={set("message")} rows={5} placeholder="Describe your query..." style={{ ...inp, resize:"vertical" }} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
            </div>
            <button onClick={() => { if (!form.email||!form.message) { showToast("⚠️ Please fill email and message!"); return; } showToast("✅ Message sent! We'll reply within 24 hours."); setForm({ first:"", last:"", email:"", phone:"", type:"", message:"" }); }} style={{ width:"100%", background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"16px 0", fontSize:16, fontWeight:700, cursor:"pointer" }}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useState } from "react";

export default function UploadPrescription({ showToast }) {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const ref = useRef();
  const handle = f => { if (!f) return; setFile(f); showToast("📄 Prescription uploaded!"); };
  return (
    <div style={{ background:"#f3f4f6" }}>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"56px 32px 64px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:30, fontWeight:700, color:"#111827", marginBottom:12, fontFamily:"'Playfair Display',serif" }}>Upload Your Prescription</h1>
          <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.8, maxWidth:440, margin:"0 auto" }}>Our certified pharmacists will verify your prescription and prepare your order within minutes.</p>
        </div>
        <div onClick={() => ref.current.click()} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
          style={{ border:`2px dashed ${drag?"#059669":"#6ee7b7"}`, borderRadius:18, padding:"60px 32px", textAlign:"center", cursor:"pointer", background:drag?"#f0fdf4":"#fff", transition:"all 0.2s" }}>
          <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display:"none" }} onChange={e => handle(e.target.files[0])} />
          <div style={{ width:60, height:60, background:"#dcfce7", borderRadius:16, display:"grid", placeItems:"center", fontSize:28, margin:"0 auto 18px" }}>📤</div>
          <div style={{ fontSize:17, fontWeight:700, color:"#111827", marginBottom:8 }}>Drag & Drop your prescription here</div>
          <div style={{ fontSize:14, color:"#9ca3af" }}>or <span style={{ color:"#059669", fontWeight:600 }}>browse to upload</span></div>
          <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:18 }}>
            {["JPG","PNG","PDF"].map(f => <span key={f} style={{ background:"#dcfce7", color:"#059669", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:8 }}>{f}</span>)}
          </div>
        </div>
        {file && (
          <div style={{ marginTop:16, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:24 }}>📄</span>
            <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:14 }}>{file.name}</div><div style={{ fontSize:12, color:"#9ca3af" }}>{(file.size/1024).toFixed(1)} KB</div></div>
            <button onClick={() => setFile(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#f87171", fontSize:20 }}>✕</button>
          </div>
        )}
        <div className="rx-features" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:32 }}>
          {[["🔒","100% Secure","Encrypted and never shared with third parties."],["👨‍⚕️","Expert Review","Certified pharmacists review every prescription."],["⚡","Fast Processing","Verified within 30 minutes during pharmacy hours."],["📦","Quick Delivery","Medicines delivered within 2–4 hours of approval."]].map(([icon,title,text]) => (
            <div key={title} style={{ background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:14, padding:"18px 16px", display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:44, height:44, background:"#f0fdf4", borderRadius:10, display:"grid", placeItems:"center", fontSize:20, flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"#111827", marginBottom:5 }}>{title}</div>
                <div style={{ fontSize:12, color:"#6b7280", lineHeight:1.6 }}>{text}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => { if (!file) { showToast("⚠️ Please upload a prescription first!"); return; } showToast("✅ Submitted! Pharmacist will review shortly."); }} style={{ width:"100%", marginTop:32, background:"#059669", color:"#fff", border:"none", borderRadius:14, padding:"17px 0", fontSize:16, fontWeight:700, cursor:"pointer" }}>Submit Prescription for Verification</button>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ROUTE_PATHS, pageFromPath } from "./routes/routePaths";

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; margin: 0 !important; padding: 0 !important; overflow-x: hidden; background: #f3f4f6; }
  body { font-family: 'DM Sans', sans-serif; color: #111827; }
  #root { min-height: 100vh; display: flex; flex-direction: column; }
  #root > div { flex: 1; display: flex; flex-direction: column; }
  .lc2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pcard { transition: box-shadow 0.18s, transform 0.18s; }
  .pcard:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.10); transform: translateY(-2px); }
  @keyframes slideIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
  .cart-slide { animation: slideIn 0.3s cubic-bezier(.4,0,.2,1) both; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  .search-drop { animation: fadeIn 0.15s ease both; }
  @keyframes modalIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
  .modal-anim { animation: modalIn 0.2s cubic-bezier(.4,0,.2,1) both; }

  .overlay-backdrop {
    position: fixed;
    inset: 0;
    z-index: 800;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .overlay-backdrop.side {
    align-items: stretch;
    justify-content: flex-end;
    padding: 0;
  }

  /* ── Responsive helper classes ── */

  /* Navbar nav links: horizontal scroll on small screens */
  .nav-links-row {
    display: flex;
    justify-content: center;
    padding: 0 32px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .nav-links-row::-webkit-scrollbar { display: none; }

  /* ════════════════════════════════════════════════════════
     TABLET LANDSCAPE  ≤ 1100px
  ════════════════════════════════════════════════════════ */
  @media (max-width: 1100px) {

    /* Navbar: tighten padding */
    header > div:nth-child(2) {
      padding: 12px 16px !important;
      gap: 14px !important;
    }

    /* Categories 8 → 4 columns */
    .grid-categories {
      grid-template-columns: repeat(4, 1fr) !important;
    }

    /* Products 4 → 3 columns */
    .grid-products {
      grid-template-columns: repeat(3, 1fr) !important;
    }

    /* Packages 3 → 2 columns */
    .grid-packages {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Blog 3 → 2 columns */
    .grid-blog {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Footer 4 → 2 columns */
    .grid-footer {
      grid-template-columns: 1fr 1fr !important;
      gap: 28px !important;
    }
  }

  /* ════════════════════════════════════════════════════════
     TABLET PORTRAIT  ≤ 768px
  ════════════════════════════════════════════════════════ */
  @media (max-width: 768px) {

    /* Hide top green info strip */
    .navbar-strip { display: none !important; }

    /* Navbar main row: reduce gap */
    header > div:nth-child(2) {
      padding: 10px 12px !important;
      gap: 10px !important;
    }

    /* Hide "Account" / "Wishlist" text, keep icons */
    .nav-icon-text { display: none !important; }

    /* Nav links: start-aligned + scroll */
    .nav-links-row {
      justify-content: flex-start !important;
      padding: 0 8px !important;
    }

    /* Page inner padding */
    .page-pad { padding: 28px 16px 40px !important; }

    /* Hero banner padding */
    .hero-inner { padding: 44px 16px 36px !important; }

    /* Stats bar: wrap tighter */
    .stats-bar { gap: 14px 32px !important; }

    /* Rx promo banner: stack */
    .promo-rx {
      flex-direction: column !important;
      text-align: center !important;
      gap: 14px !important;
      padding: 22px 18px !important;
    }

    /* Lab promo banner: stack */
    .promo-lab {
      flex-direction: column !important;
      gap: 16px !important;
      padding: 28px 20px !important;
    }

    /* Categories 4 → 4 (keep, just tighten gap) */
    .grid-categories { gap: 10px !important; margin-bottom: 32px !important; }

    /* Products 3 → 2 columns */
    .grid-products { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; margin-bottom: 32px !important; }

    /* Blog 2 → 1 column */
    .grid-blog { grid-template-columns: 1fr !important; gap: 14px !important; }

    /* Packages 2 → 1 column */
    .grid-packages { grid-template-columns: 1fr !important; gap: 16px !important; }

    /* Products page: hide sidebar, full layout */
    .products-layout { flex-direction: column !important; }
    .products-sidebar { width: 100% !important; margin-bottom: 18px !important; }
    .products-sidebar-inner { position: static !important; top: auto !important; }
    .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }

    /* Detail page: stack */
    .detail-grid { grid-template-columns: 1fr !important; gap: 22px !important; }
    .detail-image { height: 260px !important; }

    /* RX features: 2 → 1 column */
    .rx-features { grid-template-columns: 1fr !important; gap: 12px !important; }
    .rx-dropzone { padding: 44px 20px !important; }

    /* Contact: stack */
    .contact-grid { grid-template-columns: 1fr !important; gap: 22px !important; }
    .contact-name-row { grid-template-columns: 1fr !important; }

    /* Footer 2 → 2 (keep) tighten */
    .grid-footer { gap: 22px !important; }

    /* Cart panel */
    .cart-panel-inner { width: 340px !important; }

    /* Modals: full-width */
    .modal-inner { width: 100% !important; max-width: 420px !important; }
    .modal-inner-wide { width: 100% !important; max-width: 460px !important; }

    /* Packages hero */
    .packages-hero { padding: 36px 20px !important; }

    /* Blog featured */
    .blog-featured { padding: 36px 22px !important; }
    .blog-featured h2 { font-size: 20px !important; max-width: 100% !important; }
  }

  /* ════════════════════════════════════════════════════════
     MOBILE  ≤ 480px
  ════════════════════════════════════════════════════════ */
  @media (max-width: 480px) {

    /* Navbar: hide category select in search */
    .search-cat { display: none !important; }

    /* Navbar main row */
    header > div:nth-child(2) {
      grid-template-columns: auto 1fr auto !important;
      padding: 8px 10px !important;
      gap: 8px !important;
    }

    /* Logo text size */
    .logo-text { font-size: 16px !important; }
    .logo-icon { width: 30px !important; height: 30px !important; font-size: 16px !important; }

    /* Upload Rx btn: icon only */
    .rx-btn-text { display: none !important; }
    .rx-btn { padding: 10px 12px !important; font-size: 16px !important; }

    /* Hero */
    .hero-inner { padding: 32px 12px 28px !important; }
    .hero-buttons { flex-direction: column !important; align-items: center !important; }
    .hero-buttons button { width: 100% !important; max-width: 260px !important; }

    /* Stats bar: 2-col grid */
    .stats-bar {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 12px 16px !important;
      padding: 16px 14px !important;
    }

    /* Page padding */
    .page-pad { padding: 20px 12px 32px !important; }

    /* Categories 4 → 2 per row */
    .grid-categories {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 8px !important;
      margin-bottom: 24px !important;
    }

    /* Products: keep 2 cols, smaller gap */
    .grid-products { gap: 10px !important; margin-bottom: 24px !important; }
    .pcard-img { height: 120px !important; }

    /* Section heading */
    .section-head h2 { font-size: 19px !important; }

    /* Related products: 2 cols */
    .grid-related { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }

    /* Detail image */
    .detail-image { height: 220px !important; }
    .detail-info { padding: 22px 18px !important; }
    .detail-price { font-size: 26px !important; }

    /* RX page */
    .rx-dropzone { padding: 36px 14px !important; }
    .rx-features { grid-template-columns: 1fr !important; }

    /* Packages hero */
    .packages-hero { padding: 28px 16px !important; }
    .packages-hero h1 { font-size: 22px !important; }

    /* Packages tabs: horizontal scroll */
    .packages-tabs {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 4px;
    }
    .packages-tabs::-webkit-scrollbar { display: none; }
    .packages-tabs button { flex-shrink: 0 !important; }

    /* Blog */
    .blog-featured { padding: 28px 14px !important; }
    .blog-featured h2 { font-size: 18px !important; }

    /* Contact: name row single col */
    .contact-name-row { grid-template-columns: 1fr !important; }

    /* Footer: 1 column */
    .grid-footer { grid-template-columns: 1fr !important; gap: 24px !important; }
    .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
    .footer-badges { flex-wrap: wrap !important; gap: 6px !important; }

    /* Cart: full screen width */
    .cart-panel-inner { width: 100vw !important; }

    /* Modal: bottom sheet */
    .overlay-backdrop { padding: 0 !important; align-items: flex-end !important; }
    .modal-inner, .modal-inner-wide {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 20px 20px 0 0 !important;
      max-height: 92vh !important;
      overflow-y: auto !important;
    }

    /* Filter pills: horizontal scroll */
    .filter-pills {
      flex-wrap: nowrap !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 4px;
    }
    .filter-pills::-webkit-scrollbar { display: none; }
    .filter-pills button { flex-shrink: 0 !important; }
  }

  /* ════════════════════════════════════════════════════════
     SMALL MOBILE  ≤ 360px
  ════════════════════════════════════════════════════════ */
  @media (max-width: 360px) {
    .logo-text { display: none !important; }
    .grid-categories { grid-template-columns: repeat(2, 1fr) !important; gap: 6px !important; }
    .grid-products { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
    .pcard-img { height: 100px !important; }
    .hero-inner { padding: 24px 10px 20px !important; }
    .page-pad { padding: 16px 10px 28px !important; }
    .packages-hero { padding: 22px 12px !important; }
    .packages-hero h1 { font-size: 20px !important; }
    .grid-footer { grid-template-columns: 1fr !important; }
  }
`;

function InjectStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id:1, brand:"Sun Pharma", name:"Metformin 500mg Tablets (Strip of 10)", price:42, mrp:55, badge:"Rx", bc:"#0ea5e9", cat:"Medicines", img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80" },
  { id:2, brand:"HealthVit", name:"Vitamin D3 + K2 Supplement 60 Capsules", price:349, mrp:499, badge:"New", bc:"#059669", cat:"Vitamins", img:"https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=400&q=80" },
  { id:3, brand:"Cetaphil", name:"Moisturising Lotion Sensitive Skin 250ml", price:384, mrp:549, badge:"−30%", bc:"#f97316", cat:"Skincare", img:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80" },
  { id:4, brand:"Omron", name:"Digital Blood Pressure Monitor HEM-7120", price:1649, mrp:2100, badge:null, bc:"", cat:"Devices", img:"https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80" },
  { id:5, brand:"Cipla", name:"Atorvastatin 10mg Film-Coated Tablets", price:78, mrp:95, badge:"Rx", bc:"#0ea5e9", cat:"Medicines", img:"https://www.scabpharmacy.com/wp-content/uploads/2024/01/Atorvastatin-10mg-teva-scaled.jpg" },
  { id:6, brand:"Himalaya", name:"Neem Face Wash Purifying Gel 150ml", price:139, mrp:175, badge:null, bc:"", cat:"Skincare", img:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80" },
  { id:7, brand:"Ensure", name:"Adult Nutrition Powder Vanilla 400g", price:649, mrp:799, badge:"Best", bc:"#f59e0b", cat:"Vitamins", img:"https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80" },
  { id:8, brand:"Dettol", name:"Hand Sanitizer Original 50ml Pack of 3", price:119, mrp:150, badge:null, bc:"", cat:"Personal Care", img:"https://www.bbassets.com/media/uploads/p/l/40193949_3-hygienix-anti-bacterial-hand-sanitizer.jpg" },
  { id:9, brand:"Dr. Morepen", name:"Pulse Oximeter with Finger Tip Sensor", price:799, mrp:1299, badge:"−38%", bc:"#f97316", cat:"Devices", img:"https://m.media-amazon.com/images/I/61Q-+KR3WcL.jpg" },
  { id:10, brand:"Patanjali", name:"Ashwagandha Churna 100g – Pure Herbs", price:89, mrp:120, badge:"Herbal", bc:"#65a30d", cat:"Ayurveda", img:"https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=400&q=80" },
  { id:11, brand:"MuscleBlaze", name:"Whey Protein Isolate Chocolate 1kg", price:1899, mrp:2499, badge:"Hot", bc:"#ef4444", cat:"Nutrition", img:"https://images.jdmagicbox.com/quickquotes/images_main/knox-hand-sanitizer-30-03-2021-148-226793204-032vr.jpg" },
  { id:12, brand:"Pampers", name:"Baby Dry Diapers Size M (7–12 kg) 56pcs", price:849, mrp:1099, badge:"New", bc:"#059669", cat:"Baby Care", img:"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80" },
];

const PACKAGES = [
  { icon:"🩺", name:"Complete Health Checkup", tagline:"75 tests · All-in-one wellness", price:999, mrp:2800, popular:true, img:"https://www.jeewanmalahospital.com/img/hospital.jpg", tests:["Complete Blood Count (CBC)","Lipid Profile","Liver Function Test","Kidney Function Test","Thyroid Profile (T3,T4,TSH)","+ 70 more tests"] },
  { icon:"🫀", name:"Cardiac Risk Profile", tagline:"28 tests · Heart health", price:799, mrp:1900, popular:false, img:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80", tests:["Lipid Profile Full","hs-CRP","Homocysteine","ECG Report","HbA1c","+ 23 more tests"] },
  { icon:"🌸", name:"Women's Wellness Plus", tagline:"42 tests · Hormonal health", price:1249, mrp:3200, popular:false, img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80", tests:["Thyroid Complete","Female Hormone Panel","Iron & Vitamin D","Bone Health Markers","+ 37 more tests"] },
  { icon:"🩸", name:"Diabetes Care Pack", tagline:"18 tests · Blood sugar", price:599, mrp:1400, popular:false, img:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80", tests:["HbA1c (3-month average)","Fasting & PP Blood Sugar","Insulin Resistance","Kidney Markers","Urine Routine"] },
  { icon:"👴", name:"Senior Citizen Checkup", tagline:"65 tests · Age-focused", price:1499, mrp:4000, popular:false, img:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&q=80", tests:["Bone Density Markers","PSA","Vitamin B12 & D3","Kidney & Liver Function","+ 60 more tests"] },
  { icon:"⚡", name:"Basic Health Scan", tagline:"12 tests · Quick snapshot", price:249, mrp:700, popular:false, img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80", tests:["Complete Blood Count","Blood Sugar","Cholesterol Total","Uric Acid","Haemoglobin"] },
];

const BLOGS = [
  { img:"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80", tag:"Cardiac", tagColor:"#991b1b", tagBg:"#fee2e2", title:"5 Foods Cardiologists Want You to Eat Every Week", excerpt:"Heart-protective foods that reduce inflammation and support arterial health.", author:"Dr. Priya Sharma", time:"5 min" },
  { img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80", tag:"Medication", tagColor:"#92400e", tagBg:"#fef3c7", title:"How to Store Your Medicines Safely at Home", excerpt:"Temperature, humidity and light all affect drug potency. Keep medicines effective.", author:"PharmD. Rahul Nair", time:"3 min" },
  { img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80", tag:"Wellness", tagColor:"#065f46", tagBg:"#d1fae5", title:"Managing Diabetes Through Diet and Exercise", excerpt:"Evidence-based nutritional strategies and workout plans from endocrinologists.", author:"Dr. Anita Bose", time:"7 min" },
  { img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", tag:"Mental Health", tagColor:"#075985", tagBg:"#e0f2fe", title:"Sleep Hygiene: Why 7 Hours Changes Everything", excerpt:"Practical tips to fix your sleep cycle for better immunity, mood and cognition.", author:"Dr. Suresh Menon", time:"6 min" },
  { img:"https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=600&q=80", tag:"Nutrition", tagColor:"#581c87", tagBg:"#f3e8ff", title:"Vitamin D Deficiency: The Silent Epidemic in India", excerpt:"Over 70% of Indians are deficient in Vitamin D. How to test and supplement safely.", author:"PharmD. Divya Rao", time:"4 min" },
  { img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", tag:"Fitness", tagColor:"#9a3412", tagBg:"#ffedd5", title:"The Right Protein Supplement: Whey, Plant or Collagen?", excerpt:"A pharmacist's honest guide to choosing the right protein powder for your goals.", author:"PharmD. Rahul Nair", time:"8 min" },
];

const CATEGORIES = [
  { name:"Medicines", count:"12,400+", bg:"#eff6ff", border:"#bfdbfe", img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=80" },
  { name:"Vitamins", count:"2,800+", bg:"#fffbeb", border:"#fde68a", img:"https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=200&q=80" },
  { name:"Skincare", count:"4,200+", bg:"#fff1f2", border:"#fecdd3", img:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80" },
  { name:"Devices", count:"680+", bg:"#f0f9ff", border:"#bae6fd", img:"https://images.unsplash.com/photo-1576671081837-49000212a370?w=200&q=80" },
  { name:"Baby Care", count:"1,900+", bg:"#faf5ff", border:"#e9d5ff", img:"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&q=80" },
  { name:"Nutrition", count:"3,100+", bg:"#f0fdf4", border:"#bbf7d0", img:"https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&q=80" },
  { name:"Ayurveda", count:"980+", bg:"#f7fee7", border:"#d9f99d", img:"https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=200&q=80" },
  { name:"Lab Tests", count:"240+", bg:"#f0fdfa", border:"#99f6e4", img:"https://images.unsplash.com/photo-1581093458791-9d09c4a3b9f0?w=200&q=80" },
];

const STORES = [
  { name:"MediCare+ Koramangala", addr:"80 Feet Rd, Koramangala 4th Block, Bengaluru", dist:"0.8 km" },
  { name:"MediCare+ Indiranagar", addr:"100 Feet Rd, HAL 2nd Stage, Indiranagar", dist:"2.1 km" },
  { name:"MediCare+ HSR Layout", addr:"Sector 1, HSR Layout, Bengaluru 560102", dist:"3.4 km" },
  { name:"MediCare+ Whitefield", addr:"ITPL Main Rd, Whitefield, Bengaluru", dist:"8.7 km" },
];

const pct = (p, m) => Math.round(((m - p) / m) * 100);

/* ─── OVERLAY — position:absolute on #app-root (solves iframe fixed issue) ── */
function Overlay({ onClose, side, children }) {
  return (
    <div
      className={side ? "overlay-backdrop side" : "overlay-backdrop"}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

/* ─── ACCOUNT MODAL ───────────────────────────────────────────────────────── */
function AccountModal({ onClose }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email:"", password:"", name:"" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif", color:"#111827", background:"#fff", marginBottom:14, display:"block" };
  const lbl = { fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", display:"block", marginBottom:6 };
  return (
    <Overlay onClose={onClose}>
      <div className="modal-anim modal-inner" style={{ width:400, background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.22)" }}>
        <div style={{ background:"#059669", padding:"22px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:18 }}>👤 My Account</div>
            <div style={{ color:"#a7f3d0", fontSize:12, marginTop:3 }}>Welcome to MediCare+</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", color:"#fff", fontSize:18, display:"grid", placeItems:"center" }}>✕</button>
        </div>
        <div style={{ display:"flex", borderBottom:"1.5px solid #e5e7eb" }}>
          {["login","register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"13px 0", fontSize:14, fontWeight:tab===t?700:500, color:tab===t?"#059669":"#6b7280", background:"none", border:"none", borderBottom:`2.5px solid ${tab===t?"#059669":"transparent"}`, cursor:"pointer" }}>
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>
        <div style={{ padding:"28px 28px 24px" }}>
          {tab === "register" && <>
            <label style={lbl}>Full Name</label>
            <input placeholder="Ravi Kumar" value={form.name} onChange={set("name")} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          </>}
          <label style={lbl}>Email Address</label>
          <input type="email" placeholder="ravi@example.com" value={form.email} onChange={set("email")} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          <label style={lbl}>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={set("password")} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          <button onClick={onClose} style={{ width:"100%", background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:15, fontWeight:700, cursor:"pointer", marginTop:4 }}>
            {tab === "login" ? "Sign In →" : "Create Account →"}
          </button>
          {tab === "login" && <button onClick={onClose} style={{ width:"100%", background:"none", border:"none", color:"#059669", fontSize:13, fontWeight:600, cursor:"pointer", marginTop:12 }}>Forgot Password?</button>}
        </div>
      </div>
    </Overlay>
  );
}

/* ─── WISHLIST MODAL ──────────────────────────────────────────────────────── */
function WishlistModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div className="modal-anim modal-inner" style={{ width:420, background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.22)" }}>
        <div style={{ background:"#059669", padding:"22px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:18 }}>♡ My Wishlist</div>
            <div style={{ color:"#a7f3d0", fontSize:12, marginTop:3 }}>Save your favourite products</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", color:"#fff", fontSize:18, display:"grid", placeItems:"center" }}>✕</button>
        </div>
        <div style={{ padding:"48px 32px", textAlign:"center" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>♡</div>
          <div style={{ fontWeight:700, fontSize:16, color:"#111827", marginBottom:8 }}>Your wishlist is empty</div>
          <div style={{ color:"#9ca3af", fontSize:13, marginBottom:24 }}>Sign in to save and sync your favourite items across devices.</div>
          <button onClick={onClose} style={{ background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer" }}>Sign In to View Wishlist</button>
        </div>
      </div>
    </Overlay>
  );
}

/* ─── PACKAGE BOOKING MODAL ───────────────────────────────────────────────── */
function PackageBookModal({ pkg, onClose, showToast }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const inp = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif", color:"#111827", background:"#fff", marginBottom:14, display:"block" };
  const lbl = { fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", display:"block", marginBottom:6 };
  const slots = ["7:00 AM – 8:00 AM","8:00 AM – 9:00 AM","9:00 AM – 10:00 AM","10:00 AM – 11:00 AM","11:00 AM – 12:00 PM","4:00 PM – 5:00 PM"];
  const handleConfirm = () => {
    if (!name || !phone || !date || !slot) { showToast("⚠️ Please fill all fields to book!"); return; }
    onClose(); showToast(`✅ ${pkg.name} booked for ${date}!`);
  };
  return (
    <Overlay onClose={onClose}>
      <div className="modal-anim modal-inner-wide" style={{ width:460, background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.22)", maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ background:"linear-gradient(135deg,#0c4a6e,#0369a1)", padding:"22px 24px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ color:"#7dd3fc", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>🔬 Book Lab Test</div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:17 }}>{pkg.name}</div>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginTop:4 }}>{pkg.tagline}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", color:"#fff", fontSize:18, display:"grid", placeItems:"center", flexShrink:0 }}>✕</button>
        </div>
        <div style={{ padding:"24px 28px" }}>
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
            <div>
              <div style={{ fontSize:12, color:"#6b7280" }}>Package Price</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:2 }}>
                <span style={{ fontSize:22, fontWeight:700, color:"#059669" }}>₹{pkg.price.toLocaleString()}</span>
                <span style={{ fontSize:13, color:"#9ca3af", textDecoration:"line-through" }}>₹{pkg.mrp.toLocaleString()}</span>
                <span style={{ background:"#dcfce7", color:"#166534", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6 }}>{pct(pkg.price,pkg.mrp)}% off</span>
              </div>
            </div>
            <div style={{ fontSize:28 }}>{pkg.icon}</div>
          </div>
          <label style={lbl}>Patient Name</label>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          <label style={lbl}>Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" value={phone} onChange={e=>setPhone(e.target.value)} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          <label style={lbl}>Preferred Date</label>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inp} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"} />
          <label style={lbl}>Preferred Time Slot</label>
          <select value={slot} onChange={e=>setSlot(e.target.value)} style={{ ...inp, cursor:"pointer" }} onFocus={e=>e.target.style.borderColor="#059669"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}>
            <option value="">Select a time slot...</option>
            {slots.map(s => <option key={s}>{s}</option>)}
          </select>
          <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 16px", fontSize:12, color:"#1e40af", marginBottom:20 }}>
            🏠 Home sample collection included · Results in 24–48 hours
          </div>
          <button onClick={handleConfirm} style={{ width:"100%", background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"15px 0", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:10 }}>
            📅 Confirm Booking · ₹{pkg.price.toLocaleString()}
          </button>
          <button onClick={onClose} style={{ width:"100%", background:"none", color:"#6b7280", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"11px 0", fontSize:13, fontWeight:600, cursor:"pointer" }}>Cancel</button>
        </div>
      </div>
    </Overlay>
  );
}

/* ─── CART PANEL ──────────────────────────────────────────────────────────── */
function CartPanel({ items, onClose, onQty, onRemove, onConfirm, confirmed }) {
  const total = items.reduce((s,i) => s+i.price*i.qty, 0);
  const mrpTot = items.reduce((s,i) => s+i.mrp*i.qty, 0);
  const saved = mrpTot - total;
  return (
    <Overlay onClose={onClose} side>
      <div className="cart-slide cart-panel-inner" style={{ width:400, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"-8px 0 40px rgba(0,0,0,0.18)" }}>
        <div style={{ background:"#059669", padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:22 }}>🛒</span>
            <div>
              <div style={{ color:"#fff", fontWeight:700, fontSize:17 }}>Your Cart</div>
              <div style={{ color:"#a7f3d0", fontSize:12, marginTop:2 }}>{items.length} item{items.length!==1?"s":""}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, width:34, height:34, cursor:"pointer", color:"#fff", fontSize:18, display:"grid", placeItems:"center" }}>✕</button>
        </div>
        {confirmed ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:36, textAlign:"center" }}>
            <div style={{ width:80, height:80, background:"#dcfce7", borderRadius:"50%", display:"grid", placeItems:"center", fontSize:36, marginBottom:20 }}>✅</div>
            <h2 style={{ fontSize:22, fontWeight:700, color:"#111827", fontFamily:"'Playfair Display',serif", marginBottom:10 }}>Order Confirmed!</h2>
            <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.7, marginBottom:6 }}>Thank you for shopping with <strong>MediCare+</strong>.</p>
            <p style={{ color:"#6b7280", fontSize:14, lineHeight:1.7, marginBottom:28 }}>Your order will be delivered by <strong>Tomorrow, 6 PM</strong>.</p>
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:14, padding:"18px 22px", width:"100%", marginBottom:20 }}>
              <div style={{ fontSize:13, color:"#065f46", fontWeight:700, marginBottom:10 }}>Order Summary</div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#374151", marginBottom:6 }}><span>Items ordered</span><span>{items.reduce((s,i)=>s+i.qty,0)}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:14, color:"#059669", fontWeight:700, marginBottom:6 }}><span>Total Paid</span><span>₹{total.toLocaleString()}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#16a34a" }}><span>You Saved</span><span style={{ fontWeight:700 }}>₹{saved.toLocaleString()}</span></div>
            </div>
            <div style={{ fontSize:13, color:"#9ca3af" }}>🙏 Thank you for choosing MediCare+</div>
          </div>
        ) : items.length === 0 ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:36, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🛒</div>
            <div style={{ fontWeight:700, fontSize:16, color:"#111827", marginBottom:8 }}>Your cart is empty</div>
            <div style={{ color:"#9ca3af", fontSize:13 }}>Add medicines and health products to get started.</div>
          </div>
        ) : (
          <>
            <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
              {items.map(item => (
                <div key={item.id} style={{ display:"flex", gap:14, padding:"14px 18px", borderBottom:"1px solid #f3f4f6", alignItems:"flex-start" }}>
                  <div style={{ width:62, height:62, borderRadius:10, overflow:"hidden", border:"1px solid #e5e7eb", flexShrink:0, background:"#f9fafb" }}>
                    <img src={item.img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100"} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:3 }}>{item.brand}</div>
                    <div className="lc2" style={{ fontSize:12, fontWeight:600, color:"#111827", lineHeight:1.4, marginBottom:8 }}>{item.name}</div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <span style={{ color:"#059669", fontWeight:700, fontSize:15 }}>₹{(item.price*item.qty).toLocaleString()}</span>
                        {item.qty>1 && <span style={{ color:"#9ca3af", fontSize:11, marginLeft:5 }}>₹{item.price}×{item.qty}</span>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", background:"#f3f4f6", borderRadius:8, overflow:"hidden" }}>
                        <button onClick={()=>item.qty===1?onRemove(item.id):onQty(item.id,item.qty-1)} style={{ width:32, height:30, border:"none", background:"none", cursor:"pointer", fontSize:item.qty===1?14:18, fontWeight:700, color:item.qty===1?"#ef4444":"#059669", display:"grid", placeItems:"center" }}>{item.qty===1?"🗑":"−"}</button>
                        <span style={{ width:30, textAlign:"center", fontWeight:700, fontSize:13 }}>{item.qty}</span>
                        <button onClick={()=>onQty(item.id,item.qty+1)} style={{ width:32, height:30, border:"none", background:"none", cursor:"pointer", fontSize:18, fontWeight:700, color:"#059669", display:"grid", placeItems:"center" }}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop:"1.5px solid #e5e7eb", padding:"18px 20px", background:"#fafafa", flexShrink:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#6b7280", marginBottom:5 }}><span>MRP Total</span><span style={{ textDecoration:"line-through" }}>₹{mrpTot.toLocaleString()}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#16a34a", fontWeight:600, marginBottom:5 }}><span>Discount</span><span>−₹{saved.toLocaleString()}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#6b7280", marginBottom:12 }}><span>Delivery</span><span style={{ color:"#059669", fontWeight:600 }}>FREE</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:17, fontWeight:700, color:"#111827", paddingTop:12, borderTop:"1.5px solid #e5e7eb", marginBottom:14 }}><span>Total</span><span style={{ color:"#059669" }}>₹{total.toLocaleString()}</span></div>
              <div style={{ background:"#dcfce7", borderRadius:8, padding:"8px 14px", fontSize:12, color:"#166534", fontWeight:600, textAlign:"center", marginBottom:14 }}>🎉 You save ₹{saved.toLocaleString()} on this order!</div>
              <button onClick={onConfirm} style={{ width:"100%", background:"#059669", color:"#fff", border:"none", borderRadius:12, padding:"15px 0", fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:10 }}>✅ Confirm Order · ₹{total.toLocaleString()}</button>
              <button onClick={onClose} style={{ width:"100%", background:"none", color:"#6b7280", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"11px 0", fontSize:13, fontWeight:600, cursor:"pointer" }}>Continue Shopping</button>
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}

/* ─── TOAST ───────────────────────────────────────────────────────────────── */
function Toast({ msg, visible }) {
  return (
    <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:9999, background:"#1f2937", color:"#fff", padding:"11px 22px", borderRadius:12, fontSize:13, fontWeight:500, whiteSpace:"nowrap", opacity:visible?1:0, pointerEvents:visible?"auto":"none", transition:"opacity 0.25s" }}>{msg}</div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */
function Navbar({ page, setPage, cartItems, onOpenCart, onOpenAccount, onOpenWishlist }) {
  const cartCount = cartItems.reduce((s,i) => s+i.qty, 0);
  const [search, setSearch] = useState("");
  const [searchCat, setSearchCat] = useState("All");
  const [showDrop, setShowDrop] = useState(false);
  const searchRef = useRef();

  const NAV = [
    { label:"Home", page:"home", icon:"🏠" },
    { label:"Medicines", page:"products", icon:"💊" },
    { label:"Health Packages", page:"packages", icon:"🔬" },
    { label:"Health Blog", page:"blog", icon:"📰", badge:"New" },
    { label:"Upload Prescription", page:"rx", icon:"📋" },
    { label:"Contact Us", page:"contact", icon:"📞" },
  ];

  // ✅ FIXED: filters by BOTH category AND search text
  const suggestions = search.trim().length > 0
    ? PRODUCTS.filter(p => {
        const catOk = searchCat === "All" || p.cat === searchCat;
        const textOk = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
        return catOk && textOk;
      }).slice(0, 5)
    : [];

  const handleGo = () => { setShowDrop(false); setPage("products"); };

  useEffect(() => {
    const h = e => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header style={{ position:"sticky", top:0, zIndex:500, background:"#fff", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
      <div className="navbar-strip" style={{ background:"#059669", padding:"6px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:"#fff", fontSize:12 }}>📞 Pharmacist Helpline: <strong>1800-103-0123</strong> · 24/7 Toll-free</span>
        <div style={{ display:"flex", gap:20 }}>
          {[["Upload Prescription","rx"],["Lab Tests","packages"]].map(([l,p]) => (
            <button key={l} onClick={() => setPage(p)} style={{ color:"#fff", background:"none", border:"none", cursor:"pointer", fontSize:12, textDecoration:"underline" }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ width:"100%", display:"grid", gridTemplateColumns:"auto 1fr auto", alignItems:"center", gap:24, padding:"14px 16px" }}>
        <button onClick={() => setPage("home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer" }}>
          <div className="logo-icon" style={{ width:38, height:38, background:"#059669", borderRadius:10, display:"grid", placeItems:"center", color:"#fff", fontWeight:900, fontSize:20 }}>✚</div>
          <span className="logo-text" style={{ fontSize:20, fontWeight:700, color:"#065f46", fontFamily:"'Playfair Display',serif" }}>MediCare<span style={{ color:"#f59e0b" }}>+</span></span>
        </button>

        <div ref={searchRef} style={{ position:"relative" }}>
          <div style={{ display:"flex", border:"2px solid #d1fae5", borderRadius:12, overflow:"hidden", background:"#f9fafb" }}>
            {/* ✅ FIXED select: controlled value + visible text color */}
            <select
              className="search-cat"
              value={searchCat}
              onChange={e => {
                const val = e.target.value;
                setSearchCat(val);
                if (search.trim().length > 0) setShowDrop(true);
              }}
              style={{ background:"#fff", border:"none", borderRight:"1px solid #e5e7eb", outline:"none", fontSize:13, color:"#111827", padding:"0 12px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", minWidth:100, height:"100%", fontWeight:500 }}
            >
              <option value="All">All</option>
              <option value="Medicines">Medicines</option>
              <option value="Vitamins">Vitamins</option>
              <option value="Skincare">Skincare</option>
              <option value="Devices">Devices</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Baby Care">Baby Care</option>
              <option value="Ayurveda">Ayurveda</option>
            </select>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setShowDrop(true); }}
              onFocus={() => { if (search.trim()) setShowDrop(true); }}
              onKeyDown={e => e.key==="Enter" && handleGo()}
              placeholder="Search medicines, vitamins, devices..."
              style={{ flex:1, border:"none", outline:"none", padding:"11px 14px", fontSize:13, background:"transparent", color:"#111827" }}
            />
            <button onClick={handleGo} style={{ background:"#059669", color:"#fff", border:"none", padding:"0 20px", cursor:"pointer", fontSize:15 }}>🔍</button>
          </div>

          {showDrop && suggestions.length > 0 && (
            <div className="search-drop" style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:12, boxShadow:"0 8px 30px rgba(0,0,0,0.12)", zIndex:600, overflow:"hidden" }}>
              {suggestions.map(p => (
                <button key={p.id} onClick={() => { setShowDrop(false); setSearch(p.name); setPage("detail"); }}
                  style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"10px 16px", background:"none", border:"none", cursor:"pointer", textAlign:"left", borderBottom:"1px solid #f9fafb" }}
                  onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
                  onMouseLeave={e => e.currentTarget.style.background="none"}
                >
                  <div style={{ width:36, height:36, borderRadius:8, overflow:"hidden", border:"1px solid #e5e7eb", flexShrink:0, background:"#f9fafb" }}>
                    <img src={p.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"#111827", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize:11, color:"#9ca3af" }}>{p.brand} · <span style={{ color:"#059669", fontWeight:700 }}>₹{p.price}</span></div>
                  </div>
                  <span style={{ fontSize:11, color:"#6b7280", background:"#f3f4f6", padding:"2px 8px", borderRadius:6, flexShrink:0 }}>{p.cat}</span>
                </button>
              ))}
              <div style={{ padding:"10px 16px", borderTop:"1px solid #f3f4f6" }}>
                <button onClick={handleGo} style={{ fontSize:12, fontWeight:600, color:"#059669", background:"none", border:"none", cursor:"pointer" }}>View all results for "{search}" →</button>
              </div>
            </div>
          )}
          {showDrop && search.trim().length > 0 && suggestions.length === 0 && (
            <div className="search-drop" style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, background:"#fff", border:"1.5px solid #e5e7eb", borderRadius:12, boxShadow:"0 8px 30px rgba(0,0,0,0.12)", zIndex:600, padding:"18px 16px", textAlign:"center" }}>
              <div style={{ fontSize:13, color:"#9ca3af" }}>No products found for "<strong style={{ color:"#111827" }}>{search}</strong>" in <strong>{searchCat}</strong></div>
              <button onClick={handleGo} style={{ fontSize:12, color:"#059669", background:"none", border:"none", cursor:"pointer", marginTop:6, fontWeight:600 }}>Search all products →</button>
            </div>
          )}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={onOpenAccount} style={{ display:"flex", flexDirection:"column", alignItems:"center", background:"none", border:"none", cursor:"pointer", color:"#4b5563", fontSize:11, gap:3, padding:"4px 6px" }}>
            <span style={{ fontSize:20 }}>👤</span><span className="nav-icon-text">Account</span>
          </button>
          <button onClick={onOpenWishlist} style={{ display:"flex", flexDirection:"column", alignItems:"center", background:"none", border:"none", cursor:"pointer", color:"#4b5563", fontSize:11, gap:3, padding:"4px 6px" }}>
            <span style={{ fontSize:20 }}>♡</span><span className="nav-icon-text">Wishlist</span>
          </button>
          <button onClick={onOpenCart} style={{ display:"flex", flexDirection:"column", alignItems:"center", background:"none", border:"none", cursor:"pointer", color:"#4b5563", fontSize:11, gap:3, padding:"4px 6px", position:"relative" }}>
            <span style={{ fontSize:20 }}>🛒</span>Cart
            {cartCount > 0 && <span style={{ position:"absolute", top:0, right:0, background:"#059669", color:"#fff", fontSize:10, fontWeight:700, width:18, height:18, borderRadius:"50%", display:"grid", placeItems:"center" }}>{cartCount}</span>}
          </button>
          <button onClick={() => setPage("rx")} className="rx-btn" style={{ background:"#059669", color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", cursor:"pointer", fontSize:13, fontWeight:700 }}>📋 <span className="rx-btn-text">Upload Rx</span></button>
        </div>
      </div>

      <div style={{ background:"#fff", borderTop:"1px solid #f1f5f9", borderBottom:"2px solid #e5e7eb" }}>
        <div className="nav-links-row" style={{ display:"flex", justifyContent:"center", padding:"0 32px" }}>
          {NAV.map(link => {
            const active = page === link.page;
            return (
              <button key={link.page} onClick={() => setPage(link.page)} style={{ display:"flex", alignItems:"center", gap:7, padding:"0 18px", height:48, fontSize:13.5, fontWeight:active?700:500, color:active?"#059669":"#4b5563", background:active?"#f0fdf4":"transparent", border:"none", borderBottom:`3px solid ${active?"#059669":"transparent"}`, cursor:"pointer", whiteSpace:"nowrap" }}>
                <span style={{ fontSize:14 }}>{link.icon}</span>
                {link.label}
                {link.badge && <span style={{ background:"#dcfce7", color:"#166534", fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:20 }}>{link.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

/* ─── PRODUCT CARD ────────────────────────────────────────────────────────── */
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

/* ─── HOME ────────────────────────────────────────────────────────────────── */
export function HomePage({ setPage, addToCart }) {
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

/* ─── PRODUCTS ────────────────────────────────────────────────────────────── */
export function ProductsPage({ setPage, addToCart }) {
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

/* ─── DETAIL ──────────────────────────────────────────────────────────────── */
export function DetailPage({ setPage, addToCart, showToast }) {
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

/* ─── RX ──────────────────────────────────────────────────────────────────── */
export function RxPage({ showToast }) {
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

/* ─── PACKAGES ────────────────────────────────────────────────────────────── */
export function PackagesPage({ onBookPkg }) {
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

/* ─── BLOG ────────────────────────────────────────────────────────────────── */
export function BlogPage() {
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

/* ─── CONTACT ─────────────────────────────────────────────────────────────── */
export function ContactPage({ showToast }) {
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

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#111827", color:"rgba(255,255,255,0.55)" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"52px 32px 0" }}>
        <div className="grid-footer" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:44, marginBottom:44 }}>
          <div>
            <button onClick={() => setPage("home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none", cursor:"pointer", marginBottom:16 }}>
              <div style={{ width:36, height:36, background:"#059669", borderRadius:9, display:"grid", placeItems:"center", color:"#fff", fontWeight:900, fontSize:18 }}>✚</div>
              <span style={{ fontSize:19, fontWeight:700, color:"#6ee7b7", fontFamily:"'Playfair Display',serif" }}>MediCare<span style={{ color:"#fbbf24" }}>+</span></span>
            </button>
            <p style={{ fontSize:13, lineHeight:1.8, maxWidth:220, marginBottom:18 }}>India's most trusted online pharmacy delivering genuine medicines since 2018.</p>
          </div>
          {[
            { title:"Shop", links:[["Medicines","products"],["Vitamins","products"],["Skincare","products"],["Lab Tests","packages"],["Ayurveda","products"]] },
            { title:"Services", links:[["Upload Prescription","rx"],["Health Packages","packages"],["Health Blog","blog"],["Contact Us","contact"]] },
            { title:"Help", links:[["Contact Us","contact"],["Track Order","contact"],["Returns Policy","contact"],["About Us","contact"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:"#fff", marginBottom:18 }}>{col.title}</h4>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12 }}>
                {col.links.map(([label,p]) => <li key={label}><button onClick={() => setPage(p)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"rgba(255,255,255,0.55)", padding:0 }} onMouseEnter={e=>e.target.style.color="#6ee7b7"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{label}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"20px 32px", maxWidth:1180, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontSize:12 }}>© 2025 MediCare+ Pharmacy. All rights reserved. Lic. No. MH/DRUGS/123/2018</p>
        <div className="footer-badges" style={{ display:"flex", gap:8 }}>
          {["🔒 SSL Secure","✚ CDSCO Certified","🏥 ISO 9001"].map(b => <span key={b} style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.6)", fontSize:11, padding:"4px 12px", borderRadius:8 }}>{b}</span>)}
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const page = pageFromPath(location.pathname);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartConfirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState({ msg:"", visible:false });
  const [accountOpen, setAccountOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [bookingPkg, setBookingPkg] = useState(null);
  const toastTimer = useRef(null);

  const showToast = msg => {
    setToast({ msg, visible:true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible:false })), 2800);
  };

  const addToCart = product => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id===product.id);
      return ex ? prev.map(i => i.id===product.id ? { ...i, qty:i.qty+1 } : i) : [...prev, { ...product, qty:1 }];
    });
    showToast("✅ Added to cart!");
  };

  const confirmOrder = () => {
    setConfirmed(true);
    setTimeout(() => { setConfirmed(false); setCartItems([]); }, 8000);
  };

  const navigate = p => {
    routerNavigate(ROUTE_PATHS[p] || ROUTE_PATHS.home);
    window.scrollTo(0,0);
  };

  return (
    <>
      <InjectStyles />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/*
        All modals use position:fixed so they always center in the viewport
        regardless of scroll position or page height.
      */}
      <div id="app-root" style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Navbar
          page={page} setPage={navigate}
          cartItems={cartItems} onOpenCart={() => setCartOpen(true)}
          onOpenAccount={() => setAccountOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
        />
        <main style={{ background:"#f3f4f6", flex:1 }}>
          <AppRoutes
            navigate={navigate}
            addToCart={addToCart}
            showToast={showToast}
            setBookingPkg={setBookingPkg}
          />
        </main>
        <Footer setPage={navigate} />

        {/* Modals inside #app-root so they overlay it correctly */}
        {cartOpen && (
          <CartPanel
            items={cartItems}
            onClose={() => { setCartOpen(false); if (cartConfirmed) { setConfirmed(false); setCartItems([]); } }}
            onQty={(id,qty) => setCartItems(prev => prev.map(i => i.id===id ? { ...i, qty } : i))}
            onRemove={id => setCartItems(prev => prev.filter(i => i.id!==id))}
            onConfirm={confirmOrder}
            confirmed={cartConfirmed}
          />
        )}
        {accountOpen && <AccountModal onClose={() => setAccountOpen(false)} />}
        {wishlistOpen && <WishlistModal onClose={() => setWishlistOpen(false)} />}
        {bookingPkg && <PackageBookModal pkg={bookingPkg} onClose={() => setBookingPkg(null)} showToast={showToast} />}
      </div>

      <Toast msg={toast.msg} visible={toast.visible} />
    </>
  );
}

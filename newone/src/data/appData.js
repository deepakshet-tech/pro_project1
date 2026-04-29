export const PRODUCTS = [
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

export const PACKAGES = [
  { icon:"🩺", name:"Complete Health Checkup", tagline:"75 tests · All-in-one wellness", price:999, mrp:2800, popular:true, img:"https://www.jeewanmalahospital.com/img/hospital.jpg", tests:["Complete Blood Count (CBC)","Lipid Profile","Liver Function Test","Kidney Function Test","Thyroid Profile (T3,T4,TSH)","+ 70 more tests"] },
  { icon:"🫀", name:"Cardiac Risk Profile", tagline:"28 tests · Heart health", price:799, mrp:1900, popular:false, img:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80", tests:["Lipid Profile Full","hs-CRP","Homocysteine","ECG Report","HbA1c","+ 23 more tests"] },
  { icon:"🌸", name:"Women's Wellness Plus", tagline:"42 tests · Hormonal health", price:1249, mrp:3200, popular:false, img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80", tests:["Thyroid Complete","Female Hormone Panel","Iron & Vitamin D","Bone Health Markers","+ 37 more tests"] },
  { icon:"🩸", name:"Diabetes Care Pack", tagline:"18 tests · Blood sugar", price:599, mrp:1400, popular:false, img:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80", tests:["HbA1c (3-month average)","Fasting & PP Blood Sugar","Insulin Resistance","Kidney Markers","Urine Routine"] },
  { icon:"👴", name:"Senior Citizen Checkup", tagline:"65 tests · Age-focused", price:1499, mrp:4000, popular:false, img:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&q=80", tests:["Bone Density Markers","PSA","Vitamin B12 & D3","Kidney & Liver Function","+ 60 more tests"] },
  { icon:"⚡", name:"Basic Health Scan", tagline:"12 tests · Quick snapshot", price:249, mrp:700, popular:false, img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80", tests:["Complete Blood Count","Blood Sugar","Cholesterol Total","Uric Acid","Haemoglobin"] },
];

export const BLOGS = [
  { img:"https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80", tag:"Cardiac", tagColor:"#991b1b", tagBg:"#fee2e2", title:"5 Foods Cardiologists Want You to Eat Every Week", excerpt:"Heart-protective foods that reduce inflammation and support arterial health.", author:"Dr. Priya Sharma", time:"5 min" },
  { img:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80", tag:"Medication", tagColor:"#92400e", tagBg:"#fef3c7", title:"How to Store Your Medicines Safely at Home", excerpt:"Temperature, humidity and light all affect drug potency. Keep medicines effective.", author:"PharmD. Rahul Nair", time:"3 min" },
  { img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80", tag:"Wellness", tagColor:"#065f46", tagBg:"#d1fae5", title:"Managing Diabetes Through Diet and Exercise", excerpt:"Evidence-based nutritional strategies and workout plans from endocrinologists.", author:"Dr. Anita Bose", time:"7 min" },
  { img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", tag:"Mental Health", tagColor:"#075985", tagBg:"#e0f2fe", title:"Sleep Hygiene: Why 7 Hours Changes Everything", excerpt:"Practical tips to fix your sleep cycle for better immunity, mood and cognition.", author:"Dr. Suresh Menon", time:"6 min" },
  { img:"https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=600&q=80", tag:"Nutrition", tagColor:"#581c87", tagBg:"#f3e8ff", title:"Vitamin D Deficiency: The Silent Epidemic in India", excerpt:"Over 70% of Indians are deficient in Vitamin D. How to test and supplement safely.", author:"PharmD. Divya Rao", time:"4 min" },
  { img:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", tag:"Fitness", tagColor:"#9a3412", tagBg:"#ffedd5", title:"The Right Protein Supplement: Whey, Plant or Collagen?", excerpt:"A pharmacist's honest guide to choosing the right protein powder for your goals.", author:"PharmD. Rahul Nair", time:"8 min" },
];

export const CATEGORIES = [
  { name:"Medicines", count:"12,400+", bg:"#eff6ff", border:"#bfdbfe", img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=80" },
  { name:"Vitamins", count:"2,800+", bg:"#fffbeb", border:"#fde68a", img:"https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=200&q=80" },
  { name:"Skincare", count:"4,200+", bg:"#fff1f2", border:"#fecdd3", img:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80" },
  { name:"Devices", count:"680+", bg:"#f0f9ff", border:"#bae6fd", img:"https://images.unsplash.com/photo-1576671081837-49000212a370?w=200&q=80" },
  { name:"Baby Care", count:"1,900+", bg:"#faf5ff", border:"#e9d5ff", img:"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&q=80" },
  { name:"Nutrition", count:"3,100+", bg:"#f0fdf4", border:"#bbf7d0", img:"https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&q=80" },
  { name:"Ayurveda", count:"980+", bg:"#f7fee7", border:"#d9f99d", img:"https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=200&q=80" },
  { name:"Lab Tests", count:"240+", bg:"#f0fdfa", border:"#99f6e4", img:"https://images.unsplash.com/photo-1581093458791-9d09c4a3b9f0?w=200&q=80" },
];

export const STORES = [
  { name:"MediCare+ Koramangala", addr:"80 Feet Rd, Koramangala 4th Block, Bengaluru", dist:"0.8 km" },
  { name:"MediCare+ Indiranagar", addr:"100 Feet Rd, HAL 2nd Stage, Indiranagar", dist:"2.1 km" },
  { name:"MediCare+ HSR Layout", addr:"Sector 1, HSR Layout, Bengaluru 560102", dist:"3.4 km" },
  { name:"MediCare+ Whitefield", addr:"ITPL Main Rd, Whitefield, Bengaluru", dist:"8.7 km" },
];

export const pct = (p, m) => Math.round(((m - p) / m) * 100);

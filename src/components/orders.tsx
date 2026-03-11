import { useState, useEffect } from "react";

const FONT = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:     #0a0a0a;
    --ink-2:   #1c1c1c;
    --ink-3:   #2e2e2e;
    --gray-1:  #404040;
    --gray-2:  #6b6b6b;
    --gray-3:  #9a9a9a;
    --gray-4:  #c4c4c4;
    --gray-5:  #e0e0e0;
    --gray-6:  #f0f0f0;
    --gray-7:  #f7f7f7;
    --white:   #ffffff;
    --font:    'Tajawal', sans-serif;
  }

  body { font-family: var(--font); background: var(--gray-7); color: var(--ink); direction: rtl; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--gray-6); }
  ::-webkit-scrollbar-thumb { background: var(--gray-4); }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes barGrow { from { width: 0; } to { width: var(--w); } }
  @keyframes countUp { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
  @keyframes drawerSlide {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .page { animation: fadeIn 0.4s ease; }
  .kpi  { animation: countUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
  .kpi:nth-child(1) { animation-delay: 0.05s; }
  .kpi:nth-child(2) { animation-delay: 0.12s; }
  .kpi:nth-child(3) { animation-delay: 0.19s; }
  .kpi:nth-child(4) { animation-delay: 0.26s; }
  .row-item { animation: fadeSlide 0.3s ease both; transition: background 0.12s; }
  .row-item:hover { background: var(--gray-7) !important; }
  .drawer { animation: drawerSlide 0.3s cubic-bezier(0.22,1,0.36,1) both; }

  button { cursor: pointer; font-family: var(--font); border: none; }
  input  { font-family: var(--font); }
  input:focus { outline: none; }
  select { font-family: var(--font); }

  .tab-btn {
    padding: 7px 18px; border-radius: 30px; font-size: 12px; font-weight: 700;
    transition: all 0.18s; background: transparent; color: var(--gray-2);
  }
  .tab-btn.active { background: var(--ink); color: var(--white); }

  .action-btn {
    width: 100%; padding: 11px; border-radius: 10px; font-size: 12px; font-weight: 700;
    transition: all 0.15s;
  }
  .action-primary { background: var(--ink); color: var(--white); }
  .action-primary:hover { background: var(--ink-3); }
  .action-secondary { background: var(--white); color: var(--gray-1); border: 1px solid var(--gray-5); }
  .action-secondary:hover { background: var(--gray-7); }

  .sort-col { transition: color 0.12s; }
  .sort-col:hover { color: var(--ink) !important; }

  .status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px; border-radius: 30px; font-size: 11px; font-weight: 700;
  }
  .status-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .chip {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 20px;
    font-size: 10px; font-weight: 700;
    background: var(--ink); color: var(--white);
  }

  .finishing-badge {
    padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700;
    background: var(--gray-7); color: var(--ink-2); border: 1px solid var(--gray-5);
  }

  .hover-row-detail { transition: background 0.12s; }
  .hover-row-detail:hover { background: var(--gray-7) !important; }
`;

// ─── Data ──────────────────────────────────────────────────────
const ORDERS = [
  { id:"ORD-041", client:"شركة الفجر للتوزيع",   product:"ملصق منتج غذائي",    shape:"مستطيل", material:"ورق لامع أبيض", qty:5000,  unit:0.180, total:900,  status:"completed",  date:"2025-06-01", finishing:["السلفان","سبوت UV"],           print:"CMYK",    roll:3 },
  { id:"ORD-042", client:"مؤسسة النخبة",          product:"ملصق عطور فاخر",     shape:"دائري",  material:"فويل ذهبي",     qty:2000,  unit:0.650, total:1300, status:"processing", date:"2025-06-03", finishing:["البصمة","فويل بصمة"],          print:"Pantone", roll:1 },
  { id:"ORD-043", client:"متجر الأصالة",          product:"ملصق تغليف هدايا",  shape:"مربع",   material:"كرافت بني",     qty:10000, unit:0.090, total:900,  status:"pending",    date:"2025-06-05", finishing:[],                             print:"CMYK",    roll:2 },
  { id:"ORD-044", client:"دار الجودة الطبية",     product:"ملصق صيدلاني",       shape:"مستطيل", material:"شفاف BOPP",     qty:8000,  unit:0.220, total:1760, status:"completed",  date:"2025-06-06", finishing:["السلفان"],                    print:"CMYK",    roll:4 },
  { id:"ORD-045", client:"مزرعة الخير",           product:"ملصق منتجات طازجة", shape:"دائري",  material:"ورق مطفي أبيض",qty:3000,  unit:0.310, total:930,  status:"cancelled",  date:"2025-06-07", finishing:["سلك سكرين"],                  print:"CMYK",    roll:6 },
  { id:"ORD-046", client:"تقنية الغد",            product:"ملصق إلكترونيات",    shape:"مستطيل", material:"شفاف BOPP",     qty:15000, unit:0.110, total:1650, status:"processing", date:"2025-06-08", finishing:["السلفان","سبوت UV"],          print:"أبيض",    roll:2 },
  { id:"ORD-047", client:"بيت الحلويات",          product:"ملصق معجنات",         shape:"شكل حر",material:"ورق لامع أبيض",qty:6000,  unit:0.190, total:1140, status:"pending",    date:"2025-06-09", finishing:["السلفان","البصمة"],           print:"CMYK",    roll:5 },
  { id:"ORD-048", client:"عطور الشرق",            product:"ملصق عبوة فاخرة",    shape:"مستطيل", material:"فويل فضي",      qty:1500,  unit:0.880, total:1320, status:"processing", date:"2025-06-10", finishing:["البصمة","فويل بصمة","فرنيش"],print:"Pantone", roll:1 },
  { id:"ORD-049", client:"النماء الزراعية",       product:"ملصق أسمدة",          shape:"مستطيل", material:"ورق لامع أبيض",qty:20000, unit:0.070, total:1400, status:"completed",  date:"2025-06-11", finishing:[],                             print:"CMYK",    roll:3 },
  { id:"ORD-050", client:"كافيه ستايل",           product:"ملصق مشروبات",        shape:"دائري",  material:"ورق مطفي أبيض",qty:4000,  unit:0.270, total:1080, status:"pending",    date:"2025-06-12", finishing:["السلفان","سبوت UV","سلك سكرين"],print:"CMYK",  roll:7 },
];

const STATUS = {
  pending:    { ar:"قيد الانتظار", dot:"#9a9a9a", pill:"#f0f0f0",   text:"#404040", border:"#e0e0e0" },
  processing: { ar:"جارٍ التنفيذ", dot:"#404040", pill:"#e0e0e0",   text:"#1c1c1c", border:"#c4c4c4" },
  completed:  { ar:"مكتمل",         dot:"#0a0a0a", pill:"#0a0a0a",   text:"#ffffff", border:"#0a0a0a" },
  cancelled:  { ar:"ملغي",          dot:"#c4c4c4", pill:"#f7f7f7",   text:"#9a9a9a", border:"#e0e0e0" },
};

const TABS = [
  { key:"all",        label:"الكل"       },
  { key:"pending",    label:"انتظار"     },
  { key:"processing", label:"تنفيذ"      },
  { key:"completed",  label:"مكتمل"      },
  { key:"cancelled",  label:"ملغي"       },
];

const sar  = (v) => v.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ر.س";
const date = (d) => new Date(d).toLocaleDateString("ar-SA", { year:"numeric", month:"short", day:"numeric" });
const count = (s) => ORDERS.filter(o => o.status === s).length;

// ─── Component ─────────────────────────────────────────────────
export default function OrdersPage() {
  const [tab,      setTab]      = useState("all");
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);
  const [sortKey,  setSortKey]  = useState("date");
  const [sortDir,  setSortDir]  = useState("desc");
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = ORDERS
    .filter(o => tab === "all" || o.status === tab)
    .filter(o => !search || o.id.includes(search) || o.client.includes(search) || o.product.includes(search))
    .sort((a, b) => {
      const m = sortDir === "desc" ? -1 : 1;
      if (sortKey === "date")  return m * (new Date(a.date) - new Date(b.date));
      if (sortKey === "total") return m * (a.total - b.total);
      return m * (a.qty - b.qty);
    });

  const revenue   = ORDERS.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const avgVal    = revenue / ORDERS.filter(o => o.status !== "cancelled").length;
  const visTotal  = filtered.reduce((s, o) => s + o.total, 0);

  const onSort = (k) => {
    if (sortKey === k) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  if (!mounted) return null;

  return (
    <>
      <style>{FONT}</style>

      <div className="page" style={{ minHeight:"100vh", background:"#f7f7f7" }}>

        {/* ══ TOPBAR ══ */}
        <div style={{ background:"#0a0a0a", height:3, width:"100%" }} />
        <header style={{
          background:"#ffffff", borderBottom:"1px solid #e0e0e0",
          padding:"0 40px", height:60,
          display:"flex", alignItems:"center", gap:20, position:"sticky", top:0, zIndex:50,
        }}>
          {/* Brand */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:"auto" }}>
            <div style={{ width:32, height:32, background:"#0a0a0a", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:15 }}>🏷️</span>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:900, color:"#0a0a0a", lineHeight:1.1 }}>بريمت</div>
              <div style={{ fontSize:9, color:"#9a9a9a", letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:600 }}>Print Studio</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display:"flex", gap:2, marginRight:32 }}>
            {[
              { l:"لوحة التحكم", a:false },
              { l:"التسعيرات",   a:true  },
              { l:"العملاء",     a:false },
              { l:"المواد",      a:false },
              { l:"التقارير",    a:false },
            ].map(n => (
              <button key={n.l} style={{
                padding:"6px 14px", borderRadius:7, fontSize:12, fontWeight:n.a ? 800 : 500,
                background: n.a ? "#f0f0f0" : "transparent",
                color: n.a ? "#0a0a0a" : "#6b6b6b",
                transition:"all 0.15s",
              }}>
                {n.l}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:"auto" }}>
            <div style={{ fontSize:11, color:"#9a9a9a", background:"#f0f0f0", padding:"4px 10px", borderRadius:20, fontWeight:600 }}>
              Durst Tau 340 RSC
            </div>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>
              👤
            </div>
          </div>
        </header>

        <div style={{ maxWidth:1440, margin:"0 auto", padding:"36px 40px" }}>

          {/* ══ PAGE HEADING ══ */}
          <div style={{ marginBottom:36 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
              <div>
                {/* Big editorial number */}
                <div style={{ fontSize:11, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:8 }}>
                  التسعيرات والطلبات — 2025
                </div>
                <h1 style={{
                  fontSize:48, fontWeight:900, color:"#0a0a0a",
                  letterSpacing:"-1.5px", lineHeight:1,
                  display:"flex", alignItems:"baseline", gap:16,
                }}>
                  الطلبات
                  <span style={{ fontSize:18, fontWeight:300, color:"#c4c4c4", letterSpacing:"0" }}>
                    {ORDERS.length} سجل
                  </span>
                </h1>
              </div>

              <button style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"12px 24px", background:"#0a0a0a", color:"#fff",
                borderRadius:12, fontSize:13, fontWeight:800,
                boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
                transition:"transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.2)"; }}
              >
                <span style={{ fontSize:16 }}>＋</span> طلب جديد
              </button>
            </div>

            {/* Ruled lines — editorial feel */}
            <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:3 }}>
              <div style={{ height:2, background:"#0a0a0a" }} />
              <div style={{ height:1, background:"#e0e0e0" }} />
            </div>
          </div>

          {/* ══ KPI ROW ══ */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:36 }}>
            {[
              { n:"إجمالي الإيرادات", v: sar(revenue),                 sub:`${ORDERS.filter(o=>o.status!=="cancelled").length} طلب نشط`,     dark:true  },
              { n:"متوسط قيمة الطلب", v: sar(avgVal),                  sub:"لكل طلب مكتمل أو جارٍ",                                          dark:false },
              { n:"طلبات مكتملة",     v: String(count("completed")),   sub:`${(count("completed")/ORDERS.length*100).toFixed(0)}% من الإجمالي`, dark:false },
              { n:"قيد التنفيذ الآن", v: String(count("processing")),  sub:"طلب جارٍ حالياً",                                                 dark:false },
            ].map((k, i) => (
              <div key={i} className="kpi" style={{
                padding:"24px 22px",
                background: k.dark ? "#0a0a0a" : "#ffffff",
                border: k.dark ? "none" : "1px solid #e0e0e0",
                borderRadius:16,
                position:"relative", overflow:"hidden",
                boxShadow: k.dark ? "0 8px 30px rgba(0,0,0,0.18)" : "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                {/* Corner accent */}
                {!k.dark && <div style={{ position:"absolute", top:0, right:0, width:40, height:40, borderBottom:"2px solid #e0e0e0", borderLeft:"2px solid #e0e0e0", borderBottomLeftRadius:12 }} />}

                <div style={{ fontSize:10, fontWeight:700, color: k.dark ? "#404040" : "#9a9a9a", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:12 }}>
                  {k.n}
                </div>
                <div style={{ fontSize:26, fontWeight:900, color: k.dark ? "#ffffff" : "#0a0a0a", lineHeight:1, marginBottom:8, letterSpacing:"-0.5px" }}>
                  {k.v}
                </div>
                <div style={{ fontSize:11, color: k.dark ? "#404040" : "#9a9a9a" }}>{k.sub}</div>

                {/* Dark card decorative element */}
                {k.dark && (
                  <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }} />
                )}
              </div>
            ))}
          </div>

          {/* ══ FILTERS ══ */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, flexWrap:"wrap" }}>

            {/* Tabs */}
            <div style={{ display:"flex", gap:3, background:"#f0f0f0", padding:"4px", borderRadius:30, border:"1px solid #e0e0e0" }}>
              {TABS.map(t => {
                const cnt = t.key === "all" ? ORDERS.length : count(t.key);
                return (
                  <button key={t.key} onClick={() => { setTab(t.key); setSelected(null); }}
                    className={`tab-btn ${tab === t.key ? "active" : ""}`}>
                    {t.label}
                    <span style={{ marginRight:5, fontSize:10, opacity:0.7 }}>{cnt}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div style={{ position:"relative", flex:1, maxWidth:260, minWidth:160 }}>
              <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#9a9a9a", pointerEvents:"none" }}>⌕</span>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="بحث بالاسم أو رقم الطلب..."
                style={{
                  width:"100%", padding:"9px 36px 9px 14px",
                  background:"#ffffff", border:"1px solid #e0e0e0",
                  borderRadius:10, fontSize:12, color:"#0a0a0a",
                  transition:"border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor="#0a0a0a"}
                onBlur={e  => e.target.style.borderColor="#e0e0e0"}
              />
            </div>

            {/* Sort */}
            <div style={{ display:"flex", gap:6, marginRight:"auto" }}>
              <span style={{ fontSize:11, color:"#9a9a9a", alignSelf:"center", fontWeight:600 }}>ترتيب:</span>
              {[{k:"date",l:"التاريخ"},{k:"total",l:"القيمة"},{k:"qty",l:"الكمية"}].map(s => (
                <button key={s.k} onClick={() => onSort(s.k)} style={{
                  padding:"7px 14px", border:`1px solid ${sortKey===s.k?"#0a0a0a":"#e0e0e0"}`,
                  borderRadius:8, fontSize:11, fontWeight:700,
                  background: sortKey===s.k ? "#0a0a0a" : "#ffffff",
                  color: sortKey===s.k ? "#ffffff" : "#6b6b6b",
                  display:"flex", alignItems:"center", gap:4, transition:"all 0.15s",
                }}>
                  {s.l}
                  {sortKey===s.k && <span style={{ fontSize:9 }}>{sortDir==="desc"?"↓":"↑"}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* ══ TABLE ══ */}
          <div style={{ background:"#ffffff", border:"1px solid #e0e0e0", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", marginBottom:24 }}>

            {/* Table Head */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"110px 1fr 140px 100px 90px 130px 130px 40px",
              padding:"14px 24px", gap:10,
              background:"#0a0a0a",
              alignItems:"center",
            }}>
              {[
                { l:"رقم الطلب", k:null      },
                { l:"العميل",    k:null      },
                { l:"المادة",    k:null      },
                { l:"الكمية",    k:"qty"     },
                { l:"سعر الحبة", k:null      },
                { l:"الإجمالي",  k:"total"   },
                { l:"الحالة",    k:null      },
                { l:"",          k:null      },
              ].map((h, i) => (
                <div key={i}
                  className={h.k ? "sort-col" : ""}
                  onClick={() => h.k && onSort(h.k)}
                  style={{
                    fontSize:9, fontWeight:700, color: h.k ? (sortKey===h.k?"#ffffff":"#6b6b6b") : "#6b6b6b",
                    textTransform:"uppercase", letterSpacing:"1.5px",
                    cursor: h.k ? "pointer" : "default",
                    display:"flex", alignItems:"center", gap:4,
                  }}>
                  {h.l}
                  {h.k && sortKey===h.k && <span style={{ fontSize:9, color:"#ffffff" }}>{sortDir==="desc"?"↓":"↑"}</span>}
                </div>
              ))}
            </div>

            {/* Rows */}
            {filtered.length === 0 ? (
              <div style={{ padding:"80px 24px", textAlign:"center" }}>
                <div style={{ fontSize:42, marginBottom:12 }}>📭</div>
                <p style={{ fontSize:15, fontWeight:700, color:"#6b6b6b" }}>لا توجد نتائج</p>
                <p style={{ fontSize:12, color:"#9a9a9a", marginTop:4 }}>جرب تغيير معايير البحث</p>
              </div>
            ) : filtered.map((o, idx) => {
              const st   = STATUS[o.status];
              const isLast = idx === filtered.length - 1;
              const isSel  = selected?.id === o.id;
              const delay  = Math.min(idx * 0.04, 0.4);
              return (
                <div key={o.id} className="row-item"
                  onClick={() => setSelected(isSel ? null : o)}
                  style={{
                    display:"grid",
                    gridTemplateColumns:"110px 1fr 140px 100px 90px 130px 130px 40px",
                    padding:"16px 24px", gap:10,
                    borderBottom: isLast ? "none" : "1px solid #f0f0f0",
                    background: isSel ? "#f7f7f7" : "#ffffff",
                    alignItems:"center", cursor:"pointer",
                    animationDelay: `${delay}s`,
                    transition:"background 0.12s",
                  }}
                >
                  {/* ID + date */}
                  <div>
                    <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, fontWeight:700, color:"#0a0a0a", background:"#f0f0f0", padding:"3px 7px", borderRadius:5, display:"inline-block", marginBottom:4 }}>
                      {o.id}
                    </div>
                    <div style={{ fontSize:10, color:"#9a9a9a" }}>{date(o.date)}</div>
                  </div>

                  {/* Client / Product */}
                  <div>
                    <div style={{ fontSize:13, fontWeight:800, color:"#0a0a0a", marginBottom:3 }}>{o.client}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, color:"#6b6b6b" }}>{o.product}</span>
                      <span style={{ fontSize:10, color:"#9a9a9a", background:"#f0f0f0", padding:"1px 7px", borderRadius:4 }}>{o.shape}</span>
                    </div>
                  </div>

                  {/* Material */}
                  <div style={{ fontSize:11, color:"#404040", fontWeight:600, lineHeight:1.5 }}>{o.material}</div>

                  {/* Qty */}
                  <div>
                    <span style={{ fontSize:14, fontWeight:900, color:"#0a0a0a" }}>{o.qty.toLocaleString("ar-SA")}</span>
                    <span style={{ fontSize:10, color:"#9a9a9a", marginRight:2 }}>حبة</span>
                  </div>

                  {/* Unit price */}
                  <div style={{ fontSize:12, fontWeight:700, color:"#404040" }}>
                    {o.unit.toFixed(3)}<span style={{ fontSize:10, color:"#9a9a9a" }}> ر.س</span>
                  </div>

                  {/* Total */}
                  <div style={{ fontSize:15, fontWeight:900, color:"#0a0a0a", letterSpacing:"-0.3px" }}>
                    {sar(o.total)}
                  </div>

                  {/* Status */}
                  <div>
                    <span className="status-pill" style={{ background:st.pill, color:st.text, border:`1px solid ${st.border}` }}>
                      <span className="status-dot" style={{ background:st.dot }} />
                      {st.ar}
                    </span>
                  </div>

                  {/* Expand */}
                  <div style={{ textAlign:"center", color:"#c4c4c4", fontSize:18, transition:"transform 0.2s", transform: isSel ? "rotate(-90deg)" : "rotate(0deg)" }}>
                    ›
                  </div>
                </div>
              );
            })}

            {/* Footer summary */}
            <div style={{ padding:"12px 24px", background:"#f7f7f7", borderTop:"1px solid #f0f0f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:11, color:"#9a9a9a" }}>
                عرض <strong style={{ color:"#404040" }}>{filtered.length}</strong> من {ORDERS.length} طلب
              </span>
              <span style={{ fontSize:12, fontWeight:800, color:"#0a0a0a" }}>
                مجموع: {sar(visTotal)}
              </span>
            </div>
          </div>

          {/* ══ DETAIL PANEL ══ */}
          {selected && (
            <div className="drawer" style={{
              background:"#ffffff", border:"1px solid #e0e0e0",
              borderRadius:18, overflow:"hidden",
              boxShadow:"0 8px 40px rgba(0,0,0,0.08)",
            }}>
              {/* Panel header */}
              <div style={{ background:"#0a0a0a", padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:14, fontWeight:800, color:"#fff", background:"#1c1c1c", padding:"5px 12px", borderRadius:6 }}>
                    {selected.id}
                  </span>
                  <span style={{ fontSize:14, fontWeight:700, color:"#9a9a9a" }}>{selected.client}</span>
                  <span style={{ fontSize:11, color:"#404040" }}>{date(selected.date)}</span>
                </div>
                <button onClick={() => setSelected(null)} style={{
                  width:30, height:30, borderRadius:8, background:"#1c1c1c",
                  color:"#6b6b6b", fontSize:18, display:"flex",
                  alignItems:"center", justifyContent:"center", lineHeight:1,
                  transition:"background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background="#2e2e2e"}
                  onMouseLeave={e => e.currentTarget.style.background="#1c1c1c"}
                >
                  ×
                </button>
              </div>

              {/* 3-column body */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 280px", gap:0 }}>

                {/* ── Col 1: Specs ── */}
                <div style={{ padding:"28px", borderLeft:"1px solid #f0f0f0" }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
                    مواصفات الطلب
                  </div>
                  {[
                    ["المنتج",       selected.product  ],
                    ["الشكل",        selected.shape    ],
                    ["المادة",       selected.material ],
                    ["نوع الطباعة", selected.print    ],
                    ["اتجاه الرول", `اتجاه ${selected.roll}`],
                    ["التاريخ",      date(selected.date)],
                  ].map(([l, v]) => (
                    <div key={l} className="hover-row-detail" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f0f0f0" }}>
                      <span style={{ fontSize:12, color:"#6b6b6b" }}>{l}</span>
                      <span style={{ fontSize:12, fontWeight:800, color:"#0a0a0a" }}>{v}</span>
                    </div>
                  ))}

                  {/* Finishing chips */}
                  <div style={{ marginTop:18 }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:10 }}>
                      التشطيبات
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {selected.finishing.length === 0
                        ? <span style={{ fontSize:11, color:"#9a9a9a" }}>لا توجد تشطيبات</span>
                        : selected.finishing.map(f => (
                            <span key={f} className="finishing-badge">{f}</span>
                          ))
                      }
                    </div>
                  </div>
                </div>

                {/* ── Col 2: Pricing ── */}
                <div style={{ padding:"28px", borderLeft:"1px solid #f0f0f0" }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
                    تفاصيل التسعير
                  </div>

                  {[
                    { l:"الكمية",                  v: selected.qty.toLocaleString("ar-SA") + " حبة", hi:false },
                    { l:"سعر الحبة",                v: selected.unit.toFixed(4) + " ر.س",            hi:false },
                    { l:"الإجمالي قبل الضريبة",    v: sar(selected.total),                           hi:false },
                    { l:"ضريبة القيمة المضافة 15%", v: sar(selected.total * 0.15),                   hi:false },
                    { l:"الإجمالي شامل الضريبة",   v: sar(selected.total * 1.15),                   hi:true  },
                  ].map(row => (
                    <div key={row.l} className={row.hi ? "" : "hover-row-detail"} style={{
                      display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding: row.hi ? "14px 12px" : "10px 0",
                      borderBottom: row.hi ? "none" : "1px solid #f0f0f0",
                      marginTop: row.hi ? 8 : 0,
                      background: row.hi ? "#0a0a0a" : "transparent",
                      borderRadius: row.hi ? 10 : 0,
                    }}>
                      <span style={{ fontSize:12, color: row.hi ? "#6b6b6b" : "#6b6b6b", fontWeight: row.hi ? 700 : 400 }}>{row.l}</span>
                      <span style={{ fontSize: row.hi ? 16 : 12, fontWeight:900, color: row.hi ? "#ffffff" : "#0a0a0a" }}>{row.v}</span>
                    </div>
                  ))}

                  {/* Cost bars */}
                  <div style={{ marginTop:24 }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>
                      توزيع التكلفة
                    </div>
                    {[
                      { l:"المواد الخام", pct:42, shade:"#0a0a0a" },
                      { l:"الطباعة",     pct:28, shade:"#404040" },
                      { l:"التشطيب",     pct: selected.finishing.length > 0 ? 18 : 0,  shade:"#6b6b6b" },
                      { l:"التشغيل",     pct: selected.finishing.length > 0 ? 12 : 30, shade:"#c4c4c4" },
                    ].filter(b => b.pct > 0).map(b => (
                      <div key={b.l} style={{ marginBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                          <span style={{ fontSize:11, color:"#6b6b6b" }}>{b.l}</span>
                          <span style={{ fontSize:11, fontWeight:800, color:"#0a0a0a" }}>{b.pct}%</span>
                        </div>
                        <div style={{ height:5, background:"#f0f0f0", borderRadius:10, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${b.pct}%`, background:b.shade, borderRadius:10, transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Col 3: Actions ── */}
                <div style={{ padding:"28px", background:"#f7f7f7" }}>
                  <div style={{ fontSize:9, fontWeight:700, color:"#9a9a9a", letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
                    الإجراءات
                  </div>

                  {/* Status badge */}
                  <div style={{ marginBottom:20 }}>
                    {(() => {
                      const st = STATUS[selected.status];
                      return (
                        <span className="status-pill" style={{ background:st.pill, color:st.text, border:`1px solid ${st.border}`, fontSize:12, padding:"7px 16px" }}>
                          <span className="status-dot" style={{ background:st.dot, width:7, height:7 }} />
                          {st.ar}
                        </span>
                      );
                    })()}
                  </div>

                  {/* Change status */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9a9a9a", letterSpacing:"1px", textTransform:"uppercase", marginBottom:8 }}>
                      تغيير الحالة
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      {["pending","processing","completed","cancelled"].map(s => {
                        const st = STATUS[s];
                        return (
                          <button key={s} style={{
                            padding:"7px 12px", borderRadius:8, fontSize:11, fontWeight:700,
                            background: selected.status===s ? "#0a0a0a" : "#ffffff",
                            color: selected.status===s ? "#fff" : "#6b6b6b",
                            border: `1px solid ${selected.status===s ? "#0a0a0a" : "#e0e0e0"}`,
                            textAlign:"right", transition:"all 0.15s",
                            display:"flex", alignItems:"center", gap:7,
                          }}>
                            <span style={{ width:6, height:6, borderRadius:"50%", background: selected.status===s ? "#fff" : st.dot }} />
                            {st.ar}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height:1, background:"#e0e0e0", marginBottom:20 }} />

                  {/* Action buttons */}
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    <button className="action-btn action-primary">📄 طباعة عرض السعر</button>
                    <button className="action-btn action-secondary">✉️ إرسال للعميل</button>
                    <button className="action-btn action-secondary">✏️ تعديل الطلب</button>
                    <button className="action-btn" style={{
                      background:"#fff", color:"#9a9a9a",
                      border:"1px dashed #e0e0e0", borderRadius:10,
                      padding:11, fontSize:12, fontWeight:700,
                    }}>
                      🗑️ حذف الطلب
                    </button>
                  </div>

                  {/* Small note */}
                  <p style={{ fontSize:10, color:"#c4c4c4", marginTop:14, lineHeight:1.6 }}>
                    آخر تعديل: {date(selected.date)} · Durst Tau 340 RSC
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══ BOTTOM STRIP ══ */}
          <div style={{ marginTop:36, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ height:1, flex:1, background:"#e0e0e0" }} />
            <span style={{ fontSize:10, color:"#c4c4c4", margin:"0 16px", fontWeight:600, letterSpacing:"1px", textTransform:"uppercase" }}>
              Bremat Print Studio © 2025
            </span>
            <div style={{ height:1, flex:1, background:"#e0e0e0" }} />
          </div>

        </div>
      </div>
    </>
  );
}
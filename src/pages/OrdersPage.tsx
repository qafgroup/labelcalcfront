/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, type JSX } from "react";
import { TABS } from "../data/static";

// ══════════════════════════════════════════════
// ─── TYPES
// ══════════════════════════════════════════════

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
type SortKey     = "date" | "total" | "qty";
type SortDir     = "asc" | "desc";
type TabKey      = "all" | OrderStatus;

interface Order {
  id:        string;
  client:    string;
  product:   string;
  shape:     string;
  material:  string;
  qty:       number;
  unit:      number;
  total:     number;
  status:    OrderStatus;
  date:      string;
  finishing: string[];
  print:     string;
  roll:      number;
}

interface StatusMeta {
  ar:         string;
  dotColor:   string;
  pillBg:     string;
  pillText:   string;
  pillBorder: string;
}

interface SortOption  { k: SortKey;        l: string; }
interface KpiCard     { n: string;         v: string; sub: string; dark: boolean; }
interface PricingRow  { l: string;         v: string; hi: boolean; }
interface CostBar     { l: string;         pct: number; shade: string; }

// ══════════════════════════════════════════════
// ─── STATIC DATA
// ══════════════════════════════════════════════

const ORDERS: Order[] = [
  { id:"ORD-041", client:"شركة الفجر للتوزيع",  product:"ملصق منتج غذائي",    shape:"مستطيل", material:"ورق لامع أبيض",  qty:5000,  unit:0.180, total:900,  status:"completed",  date:"2025-06-01", finishing:["السلفان","سبوت UV"],              print:"CMYK",    roll:3 },
  { id:"ORD-042", client:"مؤسسة النخبة",         product:"ملصق عطور فاخر",     shape:"دائري",  material:"فويل ذهبي",      qty:2000,  unit:0.650, total:1300, status:"processing", date:"2025-06-03", finishing:["البصمة","فويل بصمة"],             print:"Pantone", roll:1 },
  { id:"ORD-043", client:"متجر الأصالة",         product:"ملصق تغليف هدايا",   shape:"مربع",   material:"كرافت بني",      qty:10000, unit:0.090, total:900,  status:"pending",    date:"2025-06-05", finishing:[],                                print:"CMYK",    roll:2 },
  { id:"ORD-044", client:"دار الجودة الطبية",    product:"ملصق صيدلاني",       shape:"مستطيل", material:"شفاف BOPP",       qty:8000,  unit:0.220, total:1760, status:"completed",  date:"2025-06-06", finishing:["السلفان"],                       print:"CMYK",    roll:4 },
  { id:"ORD-045", client:"مزرعة الخير",          product:"ملصق منتجات طازجة",  shape:"دائري",  material:"ورق مطفي أبيض",  qty:3000,  unit:0.310, total:930,  status:"cancelled",  date:"2025-06-07", finishing:["سلك سكرين"],                     print:"CMYK",    roll:6 },
  { id:"ORD-046", client:"تقنية الغد",           product:"ملصق إلكترونيات",    shape:"مستطيل", material:"شفاف BOPP",       qty:15000, unit:0.110, total:1650, status:"processing", date:"2025-06-08", finishing:["السلفان","سبوت UV"],              print:"أبيض",    roll:2 },
  { id:"ORD-047", client:"بيت الحلويات",         product:"ملصق معجنات",         shape:"شكل حر", material:"ورق لامع أبيض",  qty:6000,  unit:0.190, total:1140, status:"pending",    date:"2025-06-09", finishing:["السلفان","البصمة"],              print:"CMYK",    roll:5 },
  { id:"ORD-048", client:"عطور الشرق",           product:"ملصق عبوة فاخرة",    shape:"مستطيل", material:"فويل فضي",        qty:1500,  unit:0.880, total:1320, status:"processing", date:"2025-06-10", finishing:["البصمة","فويل بصمة","فرنيش"],   print:"Pantone", roll:1 },
  { id:"ORD-049", client:"النماء الزراعية",      product:"ملصق أسمدة",          shape:"مستطيل", material:"ورق لامع أبيض",  qty:20000, unit:0.070, total:1400, status:"completed",  date:"2025-06-11", finishing:[],                                print:"CMYK",    roll:3 },
  { id:"ORD-050", client:"كافيه ستايل",          product:"ملصق مشروبات",        shape:"دائري",  material:"ورق مطفي أبيض",  qty:4000,  unit:0.270, total:1080, status:"pending",    date:"2025-06-12", finishing:["السلفان","سبوت UV","سلك سكرين"], print:"CMYK",    roll:7 },
];

const STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending:    { ar:"قيد الانتظار", dotColor:"#c4854a", pillBg:"#fef3e8", pillText:"#9a5a20", pillBorder:"#f0d0a8" },
  processing: { ar:"جارٍ التنفيذ", dotColor:"#3b092e", pillBg:"#fde8ee", pillText:"#3b092e", pillBorder:"#f0b8cc" },
  completed:  { ar:"مكتمل",         dotColor:"#ffffff", pillBg:"#3b092e", pillText:"#ffffff", pillBorder:"#3b092e" },
  cancelled:  { ar:"ملغي",          dotColor:"#bba090", pillBg:"#f9f2ec", pillText:"#9a7a68", pillBorder:"#e8d8cc" },
};

const SORT_OPTIONS: SortOption[] = [
  { k:"date",  l:"التاريخ" },
  { k:"total", l:"القيمة"  },
  { k:"qty",   l:"الكمية"  },
];

const sar = (v: number): string =>
  v.toLocaleString("ar", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ر.س";

const fmtDate = (d: string): string =>
  new Date(d).toLocaleDateString("ar", { year:"numeric", month:"short", day:"numeric" });

const countByStatus = (s: OrderStatus): number =>
  ORDERS.filter(o => o.status === s).length;

// ══════════════════════════════════════════════
// ─── DETAIL PANEL
// ══════════════════════════════════════════════

function DetailPanel({ order, onClose }: { order: Order; onClose: () => void }): JSX.Element {
  const st = STATUS_META[order.status];

  const specRows: [string, string][] = [
    ["المنتج",       order.product],
    ["الشكل",        order.shape],
    ["المادة",       order.material],
    ["نوع الطباعة", order.print],
    ["اتجاه الرول", `اتجاه ${order.roll}`],
    ["التاريخ",      fmtDate(order.date)],
  ];

  const pricingRows: PricingRow[] = [
    { l:"الكمية",                   v: order.qty.toLocaleString("ar-SA") + " حبة", hi:false },
    { l:"سعر الحبة",                 v: order.unit.toFixed(4) + " ر.س",            hi:false },
    { l:"قبل الضريبة",               v: sar(order.total),                           hi:false },
    { l:"ضريبة 15%",                 v: sar(order.total * 0.15),                   hi:false },
    { l:"الإجمالي شامل الضريبة",    v: sar(order.total * 1.15),                   hi:true  },
  ];

  const costBars: CostBar[] = [
    { l:"المواد الخام", pct:42,                                    shade:"#0a0a0a" },
    { l:"الطباعة",     pct:28,                                    shade:"#525252" },
    { l:"التشطيب",     pct: order.finishing.length > 0 ? 18 : 0,  shade:"#8a8a8a" },
    { l:"التشغيل",     pct: order.finishing.length > 0 ? 12 : 30, shade:"#c4c4c4" },
  ].filter(b => b.pct > 0);

  return (
    <div className="flex flex-col h-full" style={{ direction:"rtl" }}>

      {/* ── Panel Header ── */}
      <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ background: "#3b092e" }}>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-extrabold text-white bg-white/10 px-2.5 py-1 rounded-md">
            {order.id}
          </span>
          <div>
            <div className="text-xs font-bold text-white leading-tight">{order.client}</div>
            <div className="text-[10px] text-neutral-500">{fmtDate(order.date)}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg text-neutral-400 text-base flex items-center justify-center hover:bg-white/20 transition-colors"
        >×</button>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Status + Total */}
        <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "#ecdcc8" }}>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold"
            style={{ background:st.pillBg, color:st.pillText, border:`1px solid ${st.pillBorder}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:st.dotColor }} />
            {st.ar}
          </span>
          <div className="text-left">
            <div className="text-[10px] text-neutral-400">الإجمالي</div>
            <div className="text-base font-black text-neutral-950">{sar(order.total * 1.15)}</div>
          </div>
        </div>

        {/* مواصفات */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#ecdcc8" }}>
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-3">مواصفات الطلب</p>
          {specRows.map(([l, v]) => (
            <div key={l} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
              <span className="text-[11px] text-neutral-500">{l}</span>
              <span className="text-[11px] font-bold text-neutral-950">{v}</span>
            </div>
          ))}
        </div>

        {/* التشطيبات */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#ecdcc8" }}>
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-2.5">التشطيبات</p>
          <div className="flex flex-wrap gap-1.5">
            {order.finishing.length === 0
              ? <span className="text-[11px] text-neutral-400">لا توجد تشطيبات</span>
              : order.finishing.map(f => (
                  <span key={f} className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                    {f}
                  </span>
                ))
            }
          </div>
        </div>

        {/* التسعير */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#ecdcc8" }}>
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-3">تفاصيل التسعير</p>
          {pricingRows.map(row => (
            <div
              key={row.l}
              className={`flex justify-between items-center ${
                row.hi
                  ? "rounded-lg px-3 py-3 mt-2"
                  : "py-2 border-b border-neutral-50 last:border-0"
              }`}
              style={row.hi ? { background: "#3b092e" } : {}}
            >
              <span className={`text-[11px] ${row.hi ? "text-neutral-400 font-semibold" : "text-neutral-500"}`}>{row.l}</span>
              <span className={`font-black ${row.hi ? "text-sm text-white" : "text-[11px] text-neutral-950"}`}>{row.v}</span>
            </div>
          ))}
        </div>

        {/* توزيع التكلفة */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#ecdcc8" }}>
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-3">توزيع التكلفة</p>
          {costBars.map(b => (
            <div key={b.l} className="mb-2.5">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-neutral-500">{b.l}</span>
                <span className="text-[10px] font-bold text-neutral-800">{b.pct}%</span>
              </div>
              <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width:`${b.pct}%`, background:b.shade }} />
              </div>
            </div>
          ))}
        </div>

        {/* تغيير الحالة */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "#ecdcc8" }}>
          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-2.5">تغيير الحالة</p>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(STATUS_META) as OrderStatus[]).map(s => {
              const sm = STATUS_META[s];
              const isActive = order.status === s;
              return (
                <button
                  key={s}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-bold border transition-all ${
                    isActive
                      ? "text-white border-transparent"
                      : "text-neutral-500 border-neutral-200 hover:border-neutral-400"
                  }`}
                  style={isActive ? { background: "#3b092e" } : { background: "#fffaf4" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: isActive ? "#fff" : sm.dotColor }} />
                  {sm.ar}
                </button>
              );
            })}
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="px-5 py-4">
          <div className="flex flex-col gap-2">
            <button className="w-full py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90" style={{ background: "#3b092e" }}>
              📄 طباعة عرض السعر
            </button>
            <button className="w-full py-2.5 rounded-lg text-xs font-bold bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors">
              💬 إرسال للعميل
            </button>
            <button className="w-full py-2.5 rounded-lg text-xs font-bold bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors">
              ✏️ تعديل الطلب
            </button>
            <button className="w-full py-2.5 rounded-lg text-xs font-bold bg-white text-red-400 border border-dashed border-red-200 hover:bg-red-50 transition-colors">
              🗑️ حذف الطلب
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// ─── MAIN PAGE
// ══════════════════════════════════════════════

export default function OrdersPage(): JSX.Element {
  const [tab,      setTab]      = useState<TabKey>("all");
  const [search,   setSearch]   = useState<string>("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [sortKey,  setSortKey]  = useState<SortKey>("date");
  const [sortDir,  setSortDir]  = useState<SortDir>("desc");
  const [mounted,  setMounted]  = useState<boolean>(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered: Order[] = ORDERS
    .filter(o => tab === "all" || o.status === tab)
    .filter(o => !search || o.id.includes(search) || o.client.includes(search) || o.product.includes(search))
    .sort((a, b) => {
      const m = sortDir === "desc" ? -1 : 1;
      if (sortKey === "date")  return m * (new Date(a.date).getTime() - new Date(b.date).getTime());
      if (sortKey === "total") return m * (a.total - b.total);
      return m * (a.qty - b.qty);
    });

  const revenue  = ORDERS.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const avgVal   = revenue / ORDERS.filter(o => o.status !== "cancelled").length;
  const visTotal = filtered.reduce((s, o) => s + o.total, 0);

  const onSort = (k: SortKey): void => {
    if (sortKey === k) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  const kpiCards: KpiCard[] = [
    { n:"إجمالي الإيرادات", v:sar(revenue),                        sub:`${ORDERS.filter(o=>o.status!=="cancelled").length} طلب نشط`,                dark:true  },
    { n:"متوسط قيمة الطلب", v:sar(avgVal),                         sub:"لكل طلب مكتمل أو جارٍ",                                                     dark:false },
    { n:"طلبات مكتملة",     v:String(countByStatus("completed")),  sub:`${(countByStatus("completed")/ORDERS.length*100).toFixed(0)}% من الإجمالي`, dark:false },
    { n:"قيد التنفيذ",      v:String(countByStatus("processing")), sub:"طلب جارٍ حالياً",                                                           dark:false },
  ];

  if (!mounted) return <></>;

  return (
    <div dir="rtl" className="min-h-screen" >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-9">

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {kpiCards.map((k, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl px-4 sm:px-5 py-4 sm:py-5  ${
                k.dark
                  ? "shadow-[0_8px_30px_rgba(110,18,47,0.25)] bg-[#3b092e]"
                  : "border shadow-sm"
              }`}
            >
              {!k.dark && <div className="absolute top-0 right-0 w-8 h-8 border-b-2 border-l-2 border-neutral-200 rounded-bl-xl pointer-events-none " />}
              <p className={`text-[9px] sm:text-[10px] font-bold mb-2 uppercase tracking-wide ${k.dark ? "text-neutral-400" : "text-neutral-400"}`}>{k.n}</p>
              <p className={`text-lg sm:text-2xl font-black leading-none mb-1 tracking-tight ${k.dark ? "text-white" : "text-neutral-950"}`}>{k.v}</p>
              <p className={`text-[10px] ${k.dark ? "text-neutral-500" : "text-neutral-400"}`}>{k.sub}</p>
              {k.dark && <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full pointer-events-none bg-[#fef3e8]" />}
            </div>
          ))}
        </div>

        {/* ── Split Layout ── */}
        <div className="flex gap-5">

          {/* ════ قائمة الطلبات (يمين) ════ */}
          <div className={`flex flex-col shrink-0 transition-all duration-300 ${selected ? "w-[300px]" : "w-full"}`}>

            {/* Filters */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
              {/* Tabs */}
              <div className="flex gap-0.5 p-1 rounded-xl border" style={{ background: "#f5e6d3", borderColor: "#e8cdb0" }}>
                {TABS.map(t => {
                  const cnt = t.key === "all" ? ORDERS.length : countByStatus(t.key as OrderStatus);
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => { setTab(t.key as TabKey); setSelected(null); }}
                      className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        active ? "text-white shadow-sm" : "text-neutral-500 hover:text-neutral-800"
                      }`}
                      style={active ? { background: "#3b092e" } : {}}
                    >
                      {t.label}
                      <span className="mr-1 text-[9px] opacity-60">{cnt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-[140px] max-w-[240px]">
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs pointer-events-none">⌕</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="بحث..."
                  className="w-full py-2 pr-8 pl-3 rounded-xl text-xs text-neutral-950 placeholder:text-neutral-400 focus:outline-none transition-colors" style={{ background: "#fffaf4", border: "1px solid #e8cdb0" }}
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1 mr-auto">
                {SORT_OPTIONS.map(s => {
                  const active = sortKey === s.k;
                  return (
                    <button
                      key={s.k}
                      onClick={() => onSort(s.k)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        active ? "text-white border-transparent" : "text-neutral-500 border-neutral-200 hover:border-neutral-400"
                      }`}
                      style={active ? { background: "#3b092e" } : {}}
                    >
                      {s.l}
                      {active && <span className="text-[8px]">{sortDir === "desc" ? "↓" : "↑"}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orders List */}
            <div className="rounded-2xl overflow-hidden shadow-sm border" style={{ background: "#fffaf4", borderColor: "#ecdcc8" }}>

              {/* Empty */}
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-sm font-bold text-neutral-500">لا توجد نتائج</p>
                </div>
              )}

              {/* Rows */}
              {filtered.map((o, idx) => {
                const st    = STATUS_META[o.status];
                const isSel = selected?.id === o.id;
                const isLast = idx === filtered.length - 1;

                return (
                  <div
                    key={o.id}
                    onClick={() => setSelected(isSel ? null : o)}
                    className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 cursor-pointer transition-all ${
                      isSel ? "text-white" : "hover:bg-amber-50"
                    } ${isLast ? "" : "border-b"}`}
                    style={isSel ? { background: "#3b092e", borderColor: "#5a0f26" } : { borderColor: "#ecdcc8" }}
                  >
                    {/* رقم الطلب */}
                    <div className="shrink-0 w-[72px]">
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSel ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-700"
                      }`}>
                        {o.id}
                      </span>
                      <div className={`text-[9px] mt-0.5 ${isSel ? "text-neutral-400" : "text-neutral-400"}`}>{fmtDate(o.date)}</div>
                    </div>

                    {/* العميل والمنتج */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-extrabold truncate ${isSel ? "text-white" : "text-neutral-950"}`}>{o.client}</div>
                      <div className={`text-[10px] truncate ${isSel ? "text-neutral-400" : "text-neutral-500"}`}>{o.product}</div>
                    </div>

                    {/* الكمية — مخفية لما يكون البانيل مفتوح على شاشات صغيرة */}
                    {!selected && (
                      <div className="hidden sm:block shrink-0 text-left">
                        <div className={`text-xs font-black ${isSel ? "text-white" : "text-neutral-950"}`}>{o.qty.toLocaleString("ar-SA")}</div>
                        <div className={`text-[9px] ${isSel ? "text-neutral-400" : "text-neutral-400"}`}>حبة</div>
                      </div>
                    )}

                    {/* الإجمالي */}
                    <div className="shrink-0 text-left">
                      <div className={`text-xs font-black ${isSel ? "text-white" : "text-neutral-950"}`}>{sar(o.total)}</div>
                    </div>

                    {/* الحالة — مخفية لما البانيل مفتوح */}
                    {!selected && (
                      <div className="hidden md:block shrink-0">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                          style={{ background:st.pillBg, color:st.pillText, border:`1px solid ${st.pillBorder}` }}
                        >
                          <span className="w-1 h-1 rounded-full" style={{ background:st.dotColor }} />
                          {st.ar}
                        </span>
                      </div>
                    )}

                    {/* سهم */}
                    <div className={`text-sm shrink-0 transition-transform duration-200 ${isSel ? "rotate-180 text-neutral-400" : "text-neutral-300"}`}>›</div>
                  </div>
                );
              })}

              {/* Footer */}
              <div className="px-5 py-3 border-t flex justify-between items-center" style={{ background: "#f5e6d3", borderColor: "#e8cdb0" }}>
                <span className="text-[10px] text-neutral-400">
                  <strong className="text-neutral-600">{filtered.length}</strong> من {ORDERS.length} طلب
                </span>
                <span className="text-xs font-extrabold text-neutral-950">{sar(visTotal)}</span>
              </div>
            </div>
          </div>

          {/* ════ لوحة التفاصيل (يسار — كبيرة) ════ */}
          {selected && (
            <div
              className="flex-1 min-w-0 bg-white border mt-36 border-neutral-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
              style={{ maxHeight: "calc(100vh - 120px)", position: "sticky", top: 20 }}
            >
              <DetailPanel order={selected} onClose={() => setSelected(null)} />
            </div>
          )}

        </div>

      

      </div>
    </div>
  );
}
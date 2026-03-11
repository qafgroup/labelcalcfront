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
  dotColor:   string; // runtime hex → inline style only
  pillBg:     string;
  pillText:   string;
  pillBorder: string;
}


interface SortOption { k:   SortKey;   l:     string; }
interface TableHeader { l:  string;    k:     SortKey | null; }
interface KpiCard    { n:   string;    v:     string;  sub: string; dark: boolean; }
interface PricingRow { l:   string;    v:     string;  hi:  boolean; }
interface CostBar    { l:   string;    pct:   number;  shade: string; }

// ══════════════════════════════════════════════
// ─── STATIC DATA
// ══════════════════════════════════════════════

const ORDERS: Order[] = [
  { id:"ORD-041", client:"شركة الفجر للتوزيع",  product:"ملصق منتج غذائي",    shape:"مستطيل", material:"ورق لامع أبيض",  qty:5000,  unit:0.180, total:900,  status:"completed",  date:"2025-06-01", finishing:["السلفان","سبوت UV"],            print:"CMYK",    roll:3 },
  { id:"ORD-042", client:"مؤسسة النخبة",         product:"ملصق عطور فاخر",     shape:"دائري",  material:"فويل ذهبي",      qty:2000,  unit:0.650, total:1300, status:"processing", date:"2025-06-03", finishing:["البصمة","فويل بصمة"],           print:"Pantone", roll:1 },
  { id:"ORD-043", client:"متجر الأصالة",         product:"ملصق تغليف هدايا",   shape:"مربع",   material:"كرافت بني",      qty:10000, unit:0.090, total:900,  status:"pending",    date:"2025-06-05", finishing:[],                              print:"CMYK",    roll:2 },
  { id:"ORD-044", client:"دار الجودة الطبية",    product:"ملصق صيدلاني",       shape:"مستطيل", material:"شفاف BOPP",       qty:8000,  unit:0.220, total:1760, status:"completed",  date:"2025-06-06", finishing:["السلفان"],                     print:"CMYK",    roll:4 },
  { id:"ORD-045", client:"مزرعة الخير",          product:"ملصق منتجات طازجة",  shape:"دائري",  material:"ورق مطفي أبيض",  qty:3000,  unit:0.310, total:930,  status:"cancelled",  date:"2025-06-07", finishing:["سلك سكرين"],                   print:"CMYK",    roll:6 },
  { id:"ORD-046", client:"تقنية الغد",           product:"ملصق إلكترونيات",    shape:"مستطيل", material:"شفاف BOPP",       qty:15000, unit:0.110, total:1650, status:"processing", date:"2025-06-08", finishing:["السلفان","سبوت UV"],            print:"أبيض",    roll:2 },
  { id:"ORD-047", client:"بيت الحلويات",         product:"ملصق معجنات",         shape:"شكل حر", material:"ورق لامع أبيض",  qty:6000,  unit:0.190, total:1140, status:"pending",    date:"2025-06-09", finishing:["السلفان","البصمة"],            print:"CMYK",    roll:5 },
  { id:"ORD-048", client:"عطور الشرق",           product:"ملصق عبوة فاخرة",    shape:"مستطيل", material:"فويل فضي",        qty:1500,  unit:0.880, total:1320, status:"processing", date:"2025-06-10", finishing:["البصمة","فويل بصمة","فرنيش"], print:"Pantone", roll:1 },
  { id:"ORD-049", client:"النماء الزراعية",      product:"ملصق أسمدة",          shape:"مستطيل", material:"ورق لامع أبيض",  qty:20000, unit:0.070, total:1400, status:"completed",  date:"2025-06-11", finishing:[],                              print:"CMYK",    roll:3 },
  { id:"ORD-050", client:"كافيه ستايل",          product:"ملصق مشروبات",        shape:"دائري",  material:"ورق مطفي أبيض",  qty:4000,  unit:0.270, total:1080, status:"pending",    date:"2025-06-12", finishing:["السلفان","سبوت UV","سلك سكرين"], print:"CMYK",  roll:7 },
];

// ⚠️ Status uses dynamic hex at runtime → only the color values stay as inline styles
const STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending:    { ar:"قيد الانتظار", dotColor:"#9a9a9a", pillBg:"#f0f0f0", pillText:"#404040", pillBorder:"#e0e0e0" },
  processing: { ar:"جارٍ التنفيذ", dotColor:"#404040", pillBg:"#e0e0e0", pillText:"#1c1c1c", pillBorder:"#c4c4c4" },
  completed:  { ar:"مكتمل",         dotColor:"#0a0a0a", pillBg:"#0a0a0a", pillText:"#ffffff", pillBorder:"#0a0a0a" },
  cancelled:  { ar:"ملغي",          dotColor:"#c4c4c4", pillBg:"#f7f7f7", pillText:"#9a9a9a", pillBorder:"#e0e0e0" },
};





const SORT_OPTIONS: SortOption[] = [
  { k:"date",  l:"التاريخ" },
  { k:"total", l:"القيمة"  },
  { k:"qty",   l:"الكمية"  },
];

const TABLE_HEADERS: TableHeader[] = [
  { l:"رقم الطلب", k:null    },
  { l:"العميل",    k:null    },
  { l:"المادة",    k:null    },
  { l:"الكمية",    k:"qty"   },
  { l:"سعر الحبة", k:null    },
  { l:"الإجمالي",  k:"total" },
  { l:"الحالة",    k:null    },
  { l:"",          k:null    },
];

// ══════════════════════════════════════════════
// ─── HELPERS
// ══════════════════════════════════════════════

const sar = (v: number): string =>
  v.toLocaleString("ar", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ر.س";

const fmtDate = (d: string): string =>
  new Date(d).toLocaleDateString("ar", { year: "numeric", month: "short", day: "numeric" });

const countByStatus = (s: OrderStatus): number =>
  ORDERS.filter(o => o.status === s).length;



// Shared table column grid (too specific for core Tailwind)
const GRID_COLS = "grid-cols-[110px_1fr_140px_100px_90px_130px_130px_40px]";

// ══════════════════════════════════════════════
// ─── COMPONENT
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
    .filter(o =>
      !search ||
      o.id.includes(search) ||
      o.client.includes(search) ||
      o.product.includes(search)
    )
    .sort((a, b) => {
      const m = sortDir === "desc" ? -1 : 1;
      if (sortKey === "date")  return m * (new Date(a.date).getTime() - new Date(b.date).getTime());
      if (sortKey === "total") return m * (a.total - b.total);
      return m * (a.qty - b.qty);
    });

  const revenue:  number = ORDERS.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const avgVal:   number = revenue / ORDERS.filter(o => o.status !== "cancelled").length;
  const visTotal: number = filtered.reduce((s, o) => s + o.total, 0);

  const onSort = (k: SortKey): void => {
    if (sortKey === k) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  const kpiCards: KpiCard[] = [
    { n:"إجمالي الإيرادات", v: sar(revenue),                         sub:`${ORDERS.filter(o=>o.status!=="cancelled").length} طلب نشط`,        dark:true  },
    { n:"متوسط قيمة الطلب", v: sar(avgVal),                          sub:"لكل طلب مكتمل أو جارٍ",                                            dark:false },
    { n:"طلبات مكتملة",     v: String(countByStatus("completed")),   sub:`${(countByStatus("completed")/ORDERS.length*100).toFixed(0)}% من الإجمالي`, dark:false },
    { n:"قيد التنفيذ الآن", v: String(countByStatus("processing")),  sub:"طلب جارٍ حالياً",                                                   dark:false },
  ];

  if (!mounted) return <></>;

  return (
    <>
   

      <div dir="rtl" className="anim-page min-h-screen ">

      


        {/* ══ BODY ══ */}
        <div className="max-w-[1440px] mx-auto px-10 py-9">

          {/* ── KPI Row ── */}
          <div className="grid grid-cols-4 gap-4 mb-9">
            {kpiCards.map((k: KpiCard, i: number) => (
              <div
                key={i}
                className={`anim-kpi relative overflow-hidden rounded-2xl px-[22px] py-6 ${
                  k.dark
                    ? "bg-neutral-950 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                    : "bg-white border border-neutral-200 shadow-sm"
                }`}
              >
                {/* Corner accent (light cards only) */}
                {!k.dark && (
                  <div className="absolute top-0 right-0 w-10 h-10 border-b-2 border-l-2 border-neutral-200 rounded-bl-xl pointer-events-none" />
                )}

                <p className={`text-[10px] font-bold mb-3 uppercase ${k.dark ? "text-neutral-100" : "text-neutral-400"}`}>
                  {k.n}
                </p>
                <p className={`text-[26px] font-black leading-none mb-2 tracking-tight ${k.dark ? "text-white" : "text-neutral-950"}`}>
                  {k.v}
                </p>
                <p className={`text-[11px] ${k.dark ? "text-neutral-100 font-bold" : "text-neutral-400"}`}>
                  {k.sub}
                </p>

                {/* Decorative circle (dark card only) */}
                {k.dark && (
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/30 pointer-events-none" />
                )}
                {!k.dark && (
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-black/10 pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* ── Filters ── */}
          <div className="flex items-center gap-3.5 mb-5 flex-wrap">

            {/* Tab pills */}
            <div className="flex gap-[3px] bg-neutral-100 p-1 rounded-full border border-neutral-200">
              {TABS.map((t) => {
                const cnt: number  = t.key === "all" ? ORDERS.length : countByStatus(t.key as OrderStatus);
                const active: boolean = tab === t.key; 
                return (
                  <button
                    key={t.key}
                    onClick={() => { setTab(t.key as TabKey); setSelected(null); }}
                    className={`px-[18px] py-[7px] rounded-full text-xs font-bold transition-all ${
                      active
                        ? "bg-neutral-950 text-white"
                        : "bg-transparent text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {t.label}
                    <span className="mr-[5px] text-[10px] opacity-70">{cnt}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-[260px] min-w-[160px]">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-neutral-400 pointer-events-none select-none">
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                placeholder="بحث بالاسم أو رقم الطلب..."
                className="w-full py-[9px] pr-9 pl-3.5 bg-white border border-neutral-200 rounded-[10px] text-xs text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
              />
            </div>

            {/* Sort buttons */}
            <div className="flex items-center gap-1.5 mr-auto">
              <span className="text-[11px] text-neutral-400 font-semibold">ترتيب:</span>
              {SORT_OPTIONS.map((s: SortOption) => {
                const active: boolean = sortKey === s.k;
                return (
                  <button
                    key={s.k}
                    onClick={() => onSort(s.k)}
                    className={`flex items-center gap-1 px-3.5 py-[7px] rounded-lg text-[11px] font-bold border transition-all ${
                      active
                        ? "bg-neutral-950 text-white border-neutral-950"
                        : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {s.l}
                    {active && <span className="text-[9px]">{sortDir === "desc" ? "↓" : "↑"}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Table ── */}
          <div className="bg-white border border-neutral-200 rounded-[18px] overflow-hidden shadow-sm mb-6">

            {/* Head */}
            <div className={`grid ${GRID_COLS} px-6 py-3.5 gap-2.5 bg-neutral-950 items-center`}>
              {TABLE_HEADERS.map((h: TableHeader, i: number) => (
                <div
                  key={i}
                  onClick={() => h.k && onSort(h.k)}
                  className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-[1.5px] transition-colors ${
                    h.k
                      ? `cursor-pointer ${sortKey === h.k ? "text-white" : "text-neutral-600 hover:text-white"}`
                      : "text-neutral-600 cursor-default"
                  }`}
                >
                  {h.l}
                  {h.k && sortKey === h.k && (
                    <span className="text-[9px] text-white">{sortDir === "desc" ? "↓" : "↑"}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <div className="text-[42px] mb-3">📭</div>
                <p className="text-[15px] font-bold text-neutral-500">لا توجد نتائج</p>
                <p className="text-xs text-neutral-400 mt-1">جرب تغيير معايير البحث</p>
              </div>
            )}

            {/* Rows */}
            {filtered.map((o: Order, idx: number) => {
              const st:     StatusMeta = STATUS_META[o.status];
              const isLast: boolean    = idx === filtered.length - 1;
              const isSel:  boolean    = selected?.id === o.id;
              const delay:  number     = Math.min(idx * 0.04, 0.4);

              return (
                <div
                  key={o.id}
                  className={`anim-row grid ${GRID_COLS} px-6 py-4 gap-2.5 items-center cursor-pointer transition-colors hover:bg-neutral-50 ${
                    isSel   ? "bg-neutral-50"  : "bg-white"
                  } ${isLast ? "" : "border-b border-neutral-100"}`}
                  style={{ animationDelay: `${delay}s` }}
                  onClick={() => setSelected(isSel ? null : o)}
                >
                  {/* ID + date */}
                  <div>
                    <span className="font-mono text-[11px] font-bold text-neutral-950 bg-neutral-100 px-[7px] py-[3px] rounded-[5px] inline-block mb-1">
                      {o.id}
                    </span>
                    <div className="text-[10px] text-neutral-400">{fmtDate(o.date)}</div>
                  </div>

                  {/* Client / Product */}
                  <div>
                    <div className="text-[13px] font-extrabold text-neutral-950 mb-[3px]">{o.client}</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-neutral-500">{o.product}</span>
                      <span className="text-[10px] text-neutral-400 bg-neutral-100 px-[7px] py-px rounded">{o.shape}</span>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="text-[11px] text-neutral-600 font-semibold leading-snug">{o.material}</div>

                  {/* Qty */}
                  <div>
                    <span className="text-sm font-black text-neutral-950">{o.qty.toLocaleString("ar-SA")}</span>
                    <span className="text-[10px] text-neutral-400 mr-[2px]">حبة</span>
                  </div>

                  {/* Unit price */}
                  <div className="text-xs font-bold text-neutral-600">
                    {o.unit.toFixed(3)}
                    <span className="text-[10px] text-neutral-400"> ر.س</span>
                  </div>

                  {/* Total */}
                  <div className="text-[15px] font-black text-neutral-950 tracking-tight">
                    {sar(o.total)}
                  </div>

                  {/* Status pill — dynamic colors stay inline */}
                  <div>
                    <span
                      className="inline-flex items-center gap-[5px] px-[11px] py-1 rounded-full text-[11px] font-bold"
                      style={{ background: st.pillBg, color: st.pillText, border: `1px solid ${st.pillBorder}` }}
                    >
                      <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: st.dotColor }} />
                      {st.ar}
                    </span>
                  </div>

                  {/* Expand arrow */}
                  <div
                    className="text-center text-neutral-300 text-lg transition-transform duration-200"
                    style={{ transform: isSel ? "rotate(-90deg)" : "rotate(0deg)" }}
                  >
                    ›
                  </div>
                </div>
              );
            })}

            {/* Footer */}
            <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-[11px] text-neutral-400">
                عرض <strong className="text-neutral-600">{filtered.length}</strong> من {ORDERS.length} طلب
              </span>
              <span className="text-xs font-extrabold text-neutral-950">
                مجموع: {sar(visTotal)}
              </span>
            </div>
          </div>

          {/* ══ DETAIL DRAWER ══ */}
          {selected && (() => {
            const sel: Order      = selected;
            const st: StatusMeta  = STATUS_META[sel.status];

            const specRows: [string, string][] = [
              ["المنتج",       sel.product],
              ["الشكل",        sel.shape],
              ["المادة",       sel.material],
              ["نوع الطباعة", sel.print],
              ["اتجاه الرول", `اتجاه ${sel.roll}`],
              ["التاريخ",      fmtDate(sel.date)],
            ];

            const pricingRows: PricingRow[] = [
              { l:"الكمية",                   v: sel.qty.toLocaleString("ar-SA") + " حبة", hi:false },
              { l:"سعر الحبة",                 v: sel.unit.toFixed(4) + " ر.س",            hi:false },
              { l:"الإجمالي قبل الضريبة",     v: sar(sel.total),                           hi:false },
              { l:"ضريبة القيمة المضافة 15%", v: sar(sel.total * 0.15),                   hi:false },
              { l:"الإجمالي شامل الضريبة",    v: sar(sel.total * 1.15),                   hi:true  },
            ];

            const costBars: CostBar[] = [
              { l:"المواد الخام", pct:42,                                   shade:"#0a0a0a" },
              { l:"الطباعة",     pct:28,                                   shade:"#404040" },
              { l:"التشطيب",     pct: sel.finishing.length > 0 ? 18 : 0,  shade:"#6b6b6b" },
              { l:"التشغيل",     pct: sel.finishing.length > 0 ? 12 : 30, shade:"#c4c4c4" },
            ].filter((b: CostBar) => b.pct > 0);

            return (
              <div className="anim-drawer bg-white border border-neutral-200 rounded-[18px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">

                {/* Drawer header */}
                <div className="bg-neutral-950 px-7 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-sm font-extrabold text-white bg-[#1c1c1c] px-3 py-[5px] rounded-[6px]">
                      {sel.id}
                    </span>
                    <span className="text-sm font-bold text-neutral-400">{sel.client}</span>
                    <span className="text-[11px] text-neutral-600">{fmtDate(sel.date)}</span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-[30px] h-[30px] rounded-lg bg-[#1c1c1c] text-neutral-500 text-lg flex items-center justify-center leading-none hover:bg-[#2e2e2e] transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* 3-col body */}
                <div className="grid grid-cols-[1fr_1fr_280px]">

                  {/* ── Col 1: Specs ── */}
                  <div className="p-7 border-l border-neutral-100">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-[18px]">
                      مواصفات الطلب
                    </p>

                    {specRows.map(([l, v]: [string, string]) => (
                      <div
                        key={l}
                        className="flex justify-between items-center py-[10px] border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                      >
                        <span className="text-xs text-neutral-500">{l}</span>
                        <span className="text-xs font-extrabold text-neutral-950">{v}</span>
                      </div>
                    ))}

                    {/* Finishing tags */}
                    <div className="mt-[18px]">
                      <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-2.5">
                        التشطيبات
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sel.finishing.length === 0
                          ? <span className="text-[11px] text-neutral-400">لا توجد تشطيبات</span>
                          : sel.finishing.map((f: string) => (
                              <span
                                key={f}
                                className="px-3 py-[5px] rounded-[6px] text-[11px] font-bold bg-neutral-50 text-neutral-800 border border-neutral-200"
                              >
                                {f}
                              </span>
                            ))
                        }
                      </div>
                    </div>
                  </div>

                  {/* ── Col 2: Pricing ── */}
                  <div className="p-7 border-l border-neutral-100">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-[18px]">
                      تفاصيل التسعير
                    </p>

                    {pricingRows.map((row: PricingRow) => (
                      <div
                        key={row.l}
                        className={`flex justify-between items-center transition-colors ${
                          row.hi
                            ? "bg-neutral-950 rounded-[10px] px-3 py-[14px] mt-2"
                            : "py-[10px] border-b border-neutral-100 hover:bg-neutral-50"
                        }`}
                      >
                        <span className={`text-xs ${row.hi ? "text-neutral-500 font-bold" : "text-neutral-500"}`}>
                          {row.l}
                        </span>
                        <span className={`font-black ${row.hi ? "text-base text-white" : "text-xs text-neutral-950"}`}>
                          {row.v}
                        </span>
                      </div>
                    ))}

                    {/* Cost bars */}
                    <div className="mt-6">
                      <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-3.5">
                        توزيع التكلفة
                      </p>
                      {costBars.map((b: CostBar) => (
                        <div key={b.l} className="mb-2.5">
                          <div className="flex justify-between mb-[5px]">
                            <span className="text-[11px] text-neutral-500">{b.l}</span>
                            <span className="text-[11px] font-extrabold text-neutral-950">{b.pct}%</span>
                          </div>
                          <div className="h-[5px] bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="bar-fill h-full rounded-full"
                              style={{ width: `${b.pct}%`, background: b.shade }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Col 3: Actions ── */}
                  <div className="p-7 bg-neutral-50">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[2px] mb-[18px]">
                      الإجراءات
                    </p>

                    {/* Current status */}
                    <div className="mb-5">
                      <span
                        className="inline-flex items-center gap-[5px] px-4 py-[7px] rounded-full text-xs font-bold"
                        style={{ background: st.pillBg, color: st.pillText, border: `1px solid ${st.pillBorder}` }}
                      >
                        <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: st.dotColor }} />
                        {st.ar}
                      </span>
                    </div>

                    {/* Change status */}
                    <div className="mb-5">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[1px] mb-2">
                        تغيير الحالة
                      </p>
                      <div className="flex flex-col gap-[5px]">
                        {(Object.keys(STATUS_META) as OrderStatus[]).map((s: OrderStatus) => {
                          const sm: StatusMeta  = STATUS_META[s];
                          const isActive: boolean = sel.status === s;
                          return (
                            <button
                              key={s}
                              className={`flex items-center gap-[7px] px-3 py-[7px] rounded-lg text-[11px] font-bold text-right border transition-all ${
                                isActive
                                  ? "bg-neutral-950 text-white border-neutral-950"
                                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
                              }`}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: isActive ? "#ffffff" : sm.dotColor }}
                              />
                              {sm.ar}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-neutral-200 mb-5" />

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2">
                      <button className="w-full py-[11px] rounded-[10px] text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors">
                        📄 طباعة عرض السعر
                      </button>
                      <button className="w-full py-[11px] rounded-[10px] text-xs font-bold bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                        ✉️ إرسال للعميل
                      </button>
                      <button className="w-full py-[11px] rounded-[10px] text-xs font-bold bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                        ✏️ تعديل الطلب
                      </button>
                      <button className="w-full py-[11px] rounded-[10px] text-xs font-bold bg-white text-neutral-400 border border-dashed border-neutral-200 hover:bg-neutral-50 transition-colors">
                        🗑️ حذف الطلب
                      </button>
                    </div>

                    <p className="text-[10px] text-neutral-300 mt-3.5 leading-relaxed">
                      آخر تعديل: {fmtDate(sel.date)} · Durst Tau 340 RSC
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ══ BOTTOM STRIP ══ */}
          <div className="mt-9 flex items-center">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="mx-4 text-[10px] text-neutral-300 font-semibold tracking-[1px] uppercase">
              Bremat Print Studio © 2025
            </span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

        </div>
      </div>
    </>
  );
}
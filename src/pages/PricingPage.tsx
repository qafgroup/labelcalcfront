import { useState } from "react";
import { CustomerInfoSection } from "../components/CustomerInfoSection";
import { OrderSummary } from "../components/OrderSummary";
import { StickerDetailsSection } from "../components/StickerDetailsSection";
import { useAppState } from "../hooks/useAppState";
import { useCalculations } from "../hooks/useCalculations";
import { handleOrderSubmit, type SingleQuoteData } from "../utils/orderHandler";
import { validateForm } from "../utils/validation";

// ─── هوك تسعيرة واحدة مستقلة ────────────────────────────────────────────────
function useStickerQuote() {
  const state = useAppState();
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [MatCost, setMatCost] = useState(0);
  const [requiredLengthMeters, setRequiredLengthMeters] = useState(0);
  const [stickersPerMeter, setStickersPerMeter] = useState(0);
  const [requiredAreaM2, setRequiredAreaM2] = useState(0);
  const [stickersAcrossWidth, setStickersAcrossWidth] = useState(0);

  useCalculations(
    state.length, state.width, state.quantity, state.gaping, state.rollWidth,
    state.shape, state.cornerType, state.printType, state.designCount, state.material,
    state.hasLamination, state.hasEmbossing, state.embossingColor,
    state.hasSilkScreen, state.hasSpotUV, state.assembly,
    state.customerName, state.customerNumber, state.salesRep, state.salesRepPhone,
    (data) => { setSubtotal(data.subtotal); setTax(data.tax); setTotal(data.total); setUnitPrice(data.unitPrice); setMatCost(data.MatCost); },
    (data) => { setRequiredLengthMeters(data.requiredLengthMeters); setStickersPerMeter(data.stickersPerMeter); setRequiredAreaM2(data.requiredAreaM2); setStickersAcrossWidth(data.stickersAcrossWidth); },
    (isValid) => state.setIsFormValid(isValid),
    () => validateForm(state.customerName, state.customerNumber, state.salesRep, state.salesRepPhone, state.length, state.width, state.quantity)
  );

  return { state, subtotal, tax, total, unitPrice, MatCost, requiredLengthMeters, stickersPerMeter, requiredAreaM2, stickersAcrossWidth };
}

type Quote = ReturnType<typeof useStickerQuote>;

// ─── تحويل quote → SingleQuoteData ───────────────────────────────────────────
function toQuoteData(q: Quote, name: string): SingleQuoteData {
  const s = q.state;
  return {
    name,
    stickerDetails: {
      dimensions: { length: parseFloat(s.length) || 0, width: parseFloat(s.width) || 0 },
      quantity:    parseInt(s.quantity) || 0,
      shape:       s.shape,
      cornerType:  (s.shape === 'square' || s.shape === 'rectangle') ? s.cornerType : null,
      printType:   s.printType,
      designCount: parseInt(s.designCount) || 1,
      material:    s.material,
      options: {
        lamination:    s.hasLamination,
        laminationType: s.laminationType,
        embossing:     s.hasEmbossing ? { enabled: true, color: s.embossingColor } : { enabled: false },
        silkScreen:    s.hasSilkScreen,
        spotUV:        s.hasSpotUV,
        varnishType:   s.varnishType,
      },
      assembly:      s.assembly,
      rollDirection: s.rollDirection,
      rollWidth:     parseFloat(s.rollWidth) || 0,
      gaping:        parseFloat(s.gaping) || 0,
      workFee:       parseFloat(s.workFee) || 0,
    },
    pricing: {
      subtotal: q.subtotal,
      tax:      q.tax,
      total:    q.total,
      unitPrice: q.unitPrice,
      MatCost:  q.MatCost,
    },
    rollInfo: {
      requiredLengthMeters: q.requiredLengthMeters,
      stickersPerMeter:     q.stickersPerMeter,
      stickersAcrossWidth:  q.stickersAcrossWidth,
      requiredAreaM2:       q.requiredAreaM2,
    },
  };
}

// ─── بطاقة تسعيرة واحدة قابلة للطي ─────────────────────────────────────────
function QuoteCard({
  index, name, isOpen, onToggle, onRename, onRemove, canRemove, quote,
}: {
  index: number;
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  onRename: (v: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  quote: Quote;
}) {
  const [editing, setEditing] = useState(false);
  const { state } = quote;

  const arabicNums = ["١", "٢", "٣", "٤", "٥"];

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white
        ${isOpen ? "border-neutral-300 shadow-md" : "border-neutral-200 shadow-sm hover:border-neutral-300"}`}
      style={{ direction: "rtl" }}
    >
      {/* ── رأس البطاقة ── */}
      <div
        className={`flex items-center gap-3 px-5 py-4 cursor-pointer select-none transition-colors
          ${isOpen ? "bg-neutral-900" : "bg-white hover:bg-neutral-50"}`}
        onClick={onToggle}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0
          ${isOpen ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"}`}>
          {arabicNums[index]}
        </div>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => onRename(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => { if (e.key === "Enter") setEditing(false); }}
              className={`bg-transparent border-b outline-none text-sm font-bold w-40
                ${isOpen ? "border-white/50 text-white" : "border-neutral-400 text-neutral-900"}`}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={`text-sm font-bold truncate ${isOpen ? "text-white" : "text-neutral-800"}`}
              onDoubleClick={(e) => { e.stopPropagation(); setEditing(true); }}
            >
              {name}
            </span>
          )}

          {!isOpen && state.length && state.width && (
            <span className="text-xs text-neutral-400 font-medium shrink-0">
              {state.length}×{state.width} مم — {state.quantity} قطعة
            </span>
          )}
        </div>

        <div className={`text-sm font-black shrink-0 ${isOpen ? "text-white" : quote.total > 0 ? "text-neutral-900" : "text-neutral-300"}`}>
          {quote.total > 0 ? `${quote.total.toFixed(2)} ر.س` : "—"}
        </div>

        {canRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 transition-all
              ${isOpen ? "hover:bg-white/20 text-white/70 hover:text-white" : "hover:bg-red-50 text-neutral-300 hover:text-red-400"}`}
          >
            ✕
          </button>
        )}

        <span className={`text-xs shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-white/70" : "text-neutral-400"}`}>
          ▼
        </span>
      </div>

      {/* ── محتوى البطاقة ── */}
      {isOpen && (
        <div className="border-t border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-6 border-l border-neutral-100">
              <StickerDetailsSection
                length={state.length} setLength={state.setLength}
                width={state.width} setWidth={state.setWidth}
                quantity={state.quantity} setQuantity={state.setQuantity}
                shape={state.shape} setShape={state.setShape}
                cornerType={state.cornerType} setCornerType={state.setCornerType}
                printType={state.printType} setPrintType={state.setPrintType}
                designCount={state.designCount} setDesignCount={state.setDesignCount}
                material={state.material} setMaterial={state.setMaterial}
                hasLamination={state.hasLamination} setHasLamination={state.setHasLamination}
                hasEmbossing={state.hasEmbossing} setHasEmbossing={state.setHasEmbossing}
                embossingColor={state.embossingColor} setEmbossingColor={state.setEmbossingColor}
                laminationType={state.laminationType} setLaminationType={state.setLaminationType}
                hasSilkScreen={state.hasSilkScreen} setHasSilkScreen={state.setHasSilkScreen}
                hasSpotUV={state.hasSpotUV} setHasSpotUV={state.setHasSpotUV}
                varnishType={state.varnishType} setVarnishType={state.setVarnishType}
                varneshCover={state.varneshCover} setVarneshCover={state.setVarneshCover}
                assembly={state.assembly} setAssembly={state.setAssembly}
                rollDirection={state.rollDirection} setRollDirection={state.setRollDirection}
                gaping={state.gaping} setGaping={state.setGaping}
                rollWidth={state.rollWidth} setRollWidth={state.setRollWidth}
                stickersAcrossWidth={quote.stickersAcrossWidth}
                workFee={state.workFee} setWorkFee={state.setWorkFee}
                whiteInkCoverage={state.whiteInkCoverage} setWhiteInkCoverage={state.setWhiteInkCoverage}
                whiteInkPrice={state.whiteInkPrice} setWhiteInkPrice={state.setWhiteInkPrice}
              />
            </div>

            <div className="lg:col-span-1 p-6 bg-neutral-50">
              <OrderSummary
                MatCost={quote.MatCost}
                wasteAreaM2={quote.requiredAreaM2 * 0.1}
                subtotal={quote.subtotal}
                tax={quote.tax}
                total={quote.total}
                onSubmit={() => {}}
                requiredLengthMeters={quote.requiredLengthMeters}
                stickersPerMeter={quote.stickersPerMeter}
                requiredAreaM2={quote.requiredAreaM2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── الصفحة الرئيسية ──────────────────────────────────────────────────────────
const PricingPage = () => {
  const sharedState = useAppState();

  // ثابت 5 hooks (قاعدة React — لا نستدعي داخل loops)
  const q0 = useStickerQuote();
  const q1 = useStickerQuote();
  const q2 = useStickerQuote();
  const q3 = useStickerQuote();
  const q4 = useStickerQuote();
  const ALL_QUOTES = [q0, q1, q2, q3, q4];

  const [count, setCount] = useState(1);
  const [names, setNames] = useState(["ملصق ١", "ملصق ٢", "ملصق ٣", "ملصق ٤", "ملصق ٥"]);
  const [openCards, setOpenCards] = useState<boolean[]>([true, false, false, false, false]);

  const arabicNums = ["١", "٢", "٣", "٤", "٥"];

  const toggleCard = (i: number) =>
    setOpenCards((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const addQuote = () => {
    if (count >= 5) return;
    setOpenCards((prev) => prev.map((_v, i) => (i === count ? true : false)));
    setCount((c) => c + 1);
  };

  const removeQuote = (i: number) => {
    if (count <= 1) return;
    setNames((prev) => {
      const next = [...prev];
      next.splice(i, 1);
      next.push(`ملصق ${arabicNums[next.length]}`);
      return next;
    });
    setOpenCards((prev) => {
      const next = [...prev];
      next.splice(i, 1);
      next.push(false);
      return next;
    });
    setCount((c) => c - 1);
  };

  const renameQuote = (i: number, name: string) =>
    setNames((prev) => prev.map((n, idx) => (idx === i ? name : n)));

  const activeQuotes = ALL_QUOTES.slice(0, count);
  const grandTotal    = activeQuotes.reduce((sum, q) => sum + q.total,    0);
  const grandSubtotal = activeQuotes.reduce((sum, q) => sum + q.subtotal, 0);
  const grandTax      = activeQuotes.reduce((sum, q) => sum + q.tax,      0);

  // ── الإرسال — يجمع كل التسعيرات النشطة ──
  const handleFinalSubmit = () => {
    const quotesData = activeQuotes.map((q, i) => toQuoteData(q, names[i]));
    handleOrderSubmit(
      sharedState.customerName,
      sharedState.customerNumber,
      sharedState.salesRep,
      sharedState.salesRepPhone,
      sharedState.date,
      quotesData,
    );
  };

  return (
    <>
      {/* معلومات العميل */}
      <div className="mb-6">
        <CustomerInfoSection
          date={sharedState.date}
          customerName={sharedState.customerName} setCustomerName={sharedState.setCustomerName}
          customerNumber={sharedState.customerNumber} setCustomerNumber={sharedState.setCustomerNumber}
          salesRep={sharedState.salesRep} setSalesRep={sharedState.setSalesRep}
          salesRepPhone={sharedState.salesRepPhone} setSalesRepPhone={sharedState.setSalesRepPhone}
        />
      </div>

      {/* ── بطاقات التسعيرات ── */}
      <div className="space-y-3" style={{ direction: "rtl" }}>
        {activeQuotes.map((quote, idx) => (
          <QuoteCard
            key={idx}
            index={idx}
            name={names[idx]}
            isOpen={openCards[idx]}
            onToggle={() => toggleCard(idx)}
            onRename={(v) => renameQuote(idx, v)}
            onRemove={() => removeQuote(idx)}
            canRemove={count > 1}
            quote={quote}
          />
        ))}

        {/* زر إضافة تسعيرة */}
        {count < 5 && (
          <button
            onClick={addQuote}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-400 text-sm font-bold hover:border-neutral-500 hover:text-neutral-600 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl leading-none">+</span>
            إضافة تسعيرة ملصق جديدة
          </button>
        )}
      </div>

      {/* ── الإجمالي الكلي ── */}
      {count > 1 && (
        <div className="mt-6 bg-neutral-900 text-white rounded-2xl p-5" style={{ direction: "rtl" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-neutral-300">إجمالي جميع التسعيرات ({count} ملصقات)</h3>
            <span className="text-2xl font-black">{grandTotal.toFixed(2)} ر.س</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            {activeQuotes.map((q, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl px-3 py-2.5">
                <div className="text-xs text-neutral-400 mb-0.5">{names[idx]}</div>
                <div className="text-sm font-bold">{q.total > 0 ? `${q.total.toFixed(2)} ر.س` : "—"}</div>
                {q.state.length && q.state.width && (
                  <div className="text-[10px] text-neutral-500 mt-0.5">{q.state.length}×{q.state.width} مم</div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs text-neutral-400">
            <span>قبل الضريبة: {grandSubtotal.toFixed(2)} ر.س</span>
            <span>الضريبة: {grandTax.toFixed(2)} ر.س</span>
            <button
              onClick={handleFinalSubmit}
              className="px-5 py-2 bg-white text-neutral-900 rounded-lg font-bold text-xs hover:bg-neutral-100 transition-all"
            >
              إرسال الكل
            </button>
          </div>
        </div>
      )}

      {/* زر الإرسال للتسعيرة الواحدة */}
      {count === 1 && (
        <div className="mt-6 flex justify-end" style={{ direction: "rtl" }}>
          <button
            onClick={handleFinalSubmit}
            className="px-8 py-3 bg-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-700 transition-all shadow-md"
          >
            إرسال التسعيرة
          </button>
        </div>
      )}
    </>
  );
};

export default PricingPage;
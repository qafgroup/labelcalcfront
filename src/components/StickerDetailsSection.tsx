import { cornerTypesList, embossingColors, laminationTypes, materialsData, shapesList, varnishTypes } from "../data/static";
import { calculateRequiredRollWidth } from "../config/pricingConfig";
import { PRICING_CONFIG } from "../config/index";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ChangeChoosesPrice from "../widgets/ChangeChoosesPrice";
import ChangeItemsPrices from "../widgets/ChangeItemsPrices";
import { PrintTypeSection } from "../widgets/printType";

interface StickerDetailsSectionProps {
  length: string; setLength: (v: string) => void;
  width: string; setWidth: (v: string) => void;
  quantity: string; setQuantity: (v: string) => void;
  shape: string; setShape: (v: string) => void;
  cornerType: string; setCornerType: (v: string) => void;
  printType: string; setPrintType: (v: string) => void;
  designCount: string; setDesignCount: (v: string) => void;
  material: string; setMaterial: (v: string) => void;
  hasLamination: boolean; setHasLamination: (v: boolean) => void;
  hasEmbossing: boolean; setHasEmbossing: (v: boolean) => void;
  embossingColor: string; setEmbossingColor: (v: string) => void;
  laminationType: string; setLaminationType: (v: string) => void;
  hasSilkScreen: boolean; setHasSilkScreen: (v: boolean) => void;
  hasSpotUV: boolean; setHasSpotUV: (v: boolean) => void;
  varnishType: string; setVarnishType: (v: string) => void;
  varneshCover: string; setVarneshCover: (v: string) => void;
  assembly: string; setAssembly: (v: string) => void;
  rollDirection: string; setRollDirection: (v: string) => void;
  stickersPerMeter?: number;
  gaping: string; setGaping: (v: string) => void;
  rollWidth: string; setRollWidth: (v: string) => void;
  stickersAcrossWidth?: number;
  workFee: string; setWorkFee: (v: string) => void;
  whiteInkCoverage: number; setWhiteInkCoverage: (v: number) => void;
  whiteInkPrice: number; setWhiteInkPrice: (v: number) => void;
}

// ─── الصف الموحّد — Desktop: سطر واحد | Mobile: حقول تنزل تحت ────────────────
function Row({
  label, subLabel = "", isActive, onToggle, priceSlot, children,
}: {
  label: string; subLabel?: string;
  isActive?: boolean; onToggle?: () => void;
  priceSlot?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
      style={{ direction: "rtl" }}
    >
      {/* ── Desktop: كل شي في سطر | Mobile: زر + سعر فقط ── */}
      <div className="flex items-center gap-2 p-1">
        {/* زر الاسم */}
        <button
          onClick={onToggle}
          disabled={!onToggle}
          className={`px-4 py-1.5 rounded text-sm font-bold transition-all min-w-[110px] shrink-0 flex flex-col items-center justify-center
            ${isActive
              ? "bg-black text-white"
              : onToggle
                ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
                : "bg-gray-100 text-gray-600 cursor-default"
            }`}
        >
          <span>{label}</span>
          {subLabel && (
            <span className={`text-[9px] font-normal ${isActive ? "text-gray-300" : "text-gray-400"}`}>
              {subLabel}
            </span>
          )}
        </button>

        {/* حقول الوسط — desktop فقط، وفقط لما تكون مفعّلة */}
        <div className="flex-1 items-center gap-2 overflow-hidden min-h-[40px] hidden sm:flex">
          {children && isActive && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300 flex-1 py-1.5 flex-wrap">
              {children}
            </div>
          )}
        </div>

        {/* سعر يسار */}
        <div className="text-sm font-bold text-gray-700 min-w-[110px] px-3 border-r border-gray-100 text-left shrink-0">
          {priceSlot ?? <span className="text-gray-300">—</span>}
        </div>
      </div>

      {/* ── الحقول على الموبايل فقط — تنزل تحت ── */}
      {children && isActive && (
        <div className="sm:hidden px-2 pb-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Select بـ floating label ─────────────────────────────────────────────────
function FSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string; price?: number }[];
}) {
  return (
    <div className="relative w-full sm:w-auto sm:min-w-[150px] sm:flex-1 sm:max-w-[230px]">
      <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 pr-3 pl-8 bg-white border border-gray-300 rounded text-xs font-bold outline-none focus:border-black transition-all appearance-none cursor-pointer"
        style={{ direction: "rtl" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}{o.price && o.price > 0 ? ` ( +${o.price} ر.س )` : ""}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ─── Input بـ floating label ──────────────────────────────────────────────────
function FInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative w-full sm:w-auto sm:min-w-[120px] sm:flex-1 sm:max-w-[180px]">
      <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pr-3 pl-3 bg-white border border-gray-300 rounded text-xs font-bold outline-none focus:border-black transition-all"
        style={{ direction: "rtl" }}
      />
    </div>
  );
}

// ─── Pills ────────────────────────────────────────────────────────────────────
function Pills({ options, value, onChange }: {
  options: { value: string; label: string }[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap py-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 rounded text-xs font-bold border transition-all
            ${value === o.value ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── المكوّن الرئيسي ───────────────────────────────────────────────────────────
export function StickerDetailsSection(props: StickerDetailsSectionProps) {
  const {
    length, setLength, width, setWidth, quantity, setQuantity,
    shape, setShape, cornerType, setCornerType,
    designCount, setDesignCount, material, setMaterial,
    hasLamination, setHasLamination, laminationType, setLaminationType,
    hasEmbossing, setHasEmbossing, embossingColor, setEmbossingColor,
    hasSilkScreen, setHasSilkScreen,
    hasSpotUV, setHasSpotUV, varnishType, setVarnishType,
    varneshCover, setVarneshCover,
    assembly, setAssembly, rollDirection, setRollDirection,
    gaping, setGaping, rollWidth, setRollWidth,
    stickersAcrossWidth, workFee, setWorkFee,
    printType, setPrintType,
    whiteInkPrice, setWhiteInkPrice,
    whiteInkCoverage, setWhiteInkCoverage,
  } = props;

  const [shapeEnabled,    setShapeEnabled]    = useState(false);
  const [designEnabled,   setDesignEnabled]   = useState(false);
  const [materialEnabled, setMaterialEnabled] = useState(false);
  const [assemblyEnabled, setAssemblyEnabled] = useState(false);
  const [printEnabled,    setPrintEnabled]    = useState(false);
  const [whiteInkEnabled, setWhiteInkEnabled] = useState(false);

  const requiredRollWidthInfo = useMemo(() => {
    if (!width || !gaping || !stickersAcrossWidth) return null;
    return calculateRequiredRollWidth({
      width: parseFloat(width),
      gaping: parseFloat(gaping),
      stickersAcrossWidth,
    });
  }, [width, gaping, stickersAcrossWidth]);

  const allMaterials = [
    ...materialsData.paper_materials,
    ...materialsData.foil_materials,
    ...materialsData.plastic_materials,
  ];
  const materialPrice = allMaterials.find((m) => m.value === material)?.price || 0;
  const rollWarning =
    requiredRollWidthInfo &&
    parseFloat(rollWidth) > 0 &&
    requiredRollWidthInfo.requiredRollWidth > parseFloat(rollWidth);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-neutral-200" style={{ direction: "rtl" }}>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">مواصفات الملصق</h2>
        <p className="text-xs sm:text-sm text-neutral-500">حدد المواصفات والتفاصيل المطلوبة</p>
        <div className="h-px bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent mt-3" />
      </div>

      <div className="space-y-6 sm:space-y-7">

        {/* ══ ١. المقاسات والكمية ══ */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-neutral-700 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            المقاسات والكمية
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {[
              { label: "الطول (مم)",               value: length,   onChange: setLength,   placeholder: "10" },
              { label: "العرض (مم)",               value: width,    onChange: setWidth,    placeholder: "10" },
              { label: "الكمية",                    value: quantity, onChange: setQuantity, placeholder: "100" },
              { label: "المسافة بين الملصقات (مم)", value: gaping,   onChange: setGaping,   placeholder: "0.3" },
              { label: "تكلفة التشغيل",             value: workFee,  onChange: setWorkFee,  placeholder: "1" },
            ].map((f) => (
              <div key={f.label} className={f.label === "تكلفة التشغيل" ? "col-span-2 sm:col-span-1" : ""}>
                <label className="block text-[10px] sm:text-xs font-semibold text-neutral-600 mb-1.5 sm:mb-2">{f.label}</label>
                <input
                  type="number"
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2 sm:py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══ ٢. إعدادات الرول ══ */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-full" />
            إعدادات الرول
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-neutral-700 mb-1.5 sm:mb-2">عرض الرول المتاح (مم)</label>
              <input
                type="number"
                placeholder="330"
                value={rollWidth}
                onChange={(e) => setRollWidth(e.target.value)}
                className="w-full bg-white border border-blue-300 rounded-lg px-3 py-2 sm:py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>
            {requiredRollWidthInfo && (
              <>
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-neutral-700 mb-1.5 sm:mb-2">عرض الرول المطلوب (مم)</label>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2 sm:py-2.5 text-sm font-bold text-center">
                    {requiredRollWidthInfo.requiredRollWidth} مم
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-600 mt-1">
                    شامل الهوامش ({requiredRollWidthInfo.edgeMargin} مم)
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-semibold text-neutral-700 mb-1.5 sm:mb-2">عدد الملصقات في العرض</label>
                  <div className="bg-gradient-to-r from-neutral-500 to-neutral-600 text-white rounded-lg px-3 py-2 sm:py-2.5 text-sm font-bold text-center">
                    {stickersAcrossWidth}
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-600 mt-1">ملصق</p>
                </div>
              </>
            )}
          </div>
          {rollWarning && (
            <div className="mt-3 sm:mt-4 bg-red-100 border border-red-300 rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-600 text-base sm:text-lg shrink-0">⚠️</span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-red-800">تحذير: عرض الرول غير كافٍ!</p>
                <p className="text-[10px] sm:text-xs text-red-700 mt-1">
                  المطلوب ({requiredRollWidthInfo!.requiredRollWidth} مم) أكبر من المتاح ({rollWidth} مم).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ══ ٣. خصائص الطلب ══ */}
        <div className="space-y-1.5">
          <h3 className="text-xs sm:text-sm font-bold text-neutral-700 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            خصائص الطلب
          </h3>

          {/* الشكل */}
          <Row
            label="الشكل" subLabel="Shape"
            isActive={shapeEnabled} onToggle={() => setShapeEnabled(!shapeEnabled)}
            priceSlot={<span className="text-gray-400 text-xs">—</span>}
          >
            <FSelect label="نوع الشكل" value={shape} onChange={setShape} options={shapesList} />
            {(shape === "square" || shape === "rectangle") && (
              <FSelect label="نوع الحواف" value={cornerType} onChange={setCornerType} options={cornerTypesList} />
            )}
          </Row>

          {/* الطباعة */}
          <PrintTypeSection
            printEnabled={printEnabled}    setPrintEnabled={setPrintEnabled}
            printType={printType}          setPrintType={setPrintType}
            whiteInkEnabled={whiteInkEnabled} setWhiteInkEnabled={setWhiteInkEnabled}
            whiteInkCoverage={whiteInkCoverage} setWhiteInkCoverage={setWhiteInkCoverage}
            whiteInkPrice={whiteInkPrice}  setWhiteInkPrice={setWhiteInkPrice}
          />

          {/* التصاميم */}
          <Row
            label="التصاميم" subLabel="Designs"
            isActive={designEnabled} onToggle={() => setDesignEnabled(!designEnabled)}
            priceSlot={<span className="text-gray-400 text-xs">—</span>}
          >
            <FInput label="عدد التصاميم" value={designCount} onChange={setDesignCount} placeholder="1" />
          </Row>

          {/* المادة */}
          <Row
            label="المادة" subLabel="Material"
            isActive={materialEnabled} onToggle={() => setMaterialEnabled(!materialEnabled)}
            priceSlot={
              materialEnabled ? (
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs sm:text-sm">{materialPrice} ر.س</span>
                  <ChangeChoosesPrice listTypeOfData={materialsData} />
                </div>
              ) : <span className="text-gray-300 text-xs">0.00 ر.س</span>
            }
          >
            <div className="relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[320px]">
              <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">نوع المادة</span>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full h-9 pr-3 pl-8 bg-white border border-gray-300 rounded text-xs font-bold outline-none focus:border-black appearance-none cursor-pointer transition-all"
                style={{ direction: "rtl" }}
              >
                <option value="">بدون</option>
                <optgroup label="خامات ورقية">
                  {materialsData.paper_materials.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </optgroup>
                <optgroup label="خامات فويل">
                  {materialsData.foil_materials.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </optgroup>
                <optgroup label="خامات بلاستيكية">
                  {materialsData.plastic_materials.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </optgroup>
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </Row>

          {/* السلفان */}
          <Row
            label="السلفان" subLabel="Lamination"
            isActive={hasLamination} onToggle={() => setHasLamination(!hasLamination)}
            priceSlot={
              <div className="flex items-center gap-1">
                <ChangeItemsPrices label="السلفان" price={PRICING_CONFIG.additionalCosts.lamination.perSqm} />
                <span className="text-xs">{hasLamination ? `+${PRICING_CONFIG.additionalCosts.lamination.perSqm}` : "0.00"} ر.س</span>
              </div>
            }
          >
            <FSelect label="نوع السلفان" value={laminationType} onChange={setLaminationType} options={laminationTypes} />
          </Row>

          {/* سلك سكرين */}
          <Row
            label="سلك سكرين" subLabel="Silk Screen"
            isActive={hasSilkScreen} onToggle={() => setHasSilkScreen(!hasSilkScreen)}
            priceSlot={
              <div className="flex items-center gap-1">
                <ChangeItemsPrices label="سلك سكرين" price={PRICING_CONFIG.additionalCosts.silkScreen.perSqm} />
                <span className="text-xs">{hasSilkScreen ? `+${PRICING_CONFIG.additionalCosts.silkScreen.perSqm}` : "0.00"} ر.س</span>
              </div>
            }
          />

          {/* البصمة */}
          <Row
            label="البصمة" subLabel="Embossing"
            isActive={hasEmbossing} onToggle={() => setHasEmbossing(!hasEmbossing)}
            priceSlot={
              <div className="flex items-center gap-1">
                <ChangeChoosesPrice listTypeOfData={embossingColors} />
                <span className="text-xs">{hasEmbossing ? `${embossingColors.find(c => c.value === embossingColor)?.price || 0}` : "0.00"} ر.س</span>
              </div>
            }
          >
            <FSelect label="لون البصمة" value={embossingColor} onChange={setEmbossingColor} options={embossingColors} />
            <FInput label="نسبة التغطية %" value={varneshCover} onChange={setVarneshCover} placeholder="10" />
            <FInput label="تكلفة القالب" value={varneshCover} onChange={setVarneshCover} placeholder="400" />
          </Row>

          {/* الفرنيش */}
          <Row
            label="الفرنيش" subLabel="UV Varnish"
            isActive={hasSpotUV} onToggle={() => setHasSpotUV(!hasSpotUV)}
            priceSlot={
              <div className="flex items-center gap-1">
                <ChangeItemsPrices label="سبوت UV" price={PRICING_CONFIG.additionalCosts.spotUV.perSqm} />
                <span className="text-xs">{hasSpotUV ? `+${PRICING_CONFIG.additionalCosts.spotUV.perSqm}` : "0.00"} ر.س</span>
              </div>
            }
          >
            <FSelect label="نوع الفرنيش" value={varnishType} onChange={setVarnishType} options={varnishTypes} />
            <FInput label="نسبة التغطية % (موضعي)" value={varneshCover} onChange={setVarneshCover} placeholder="10" />
          </Row>

          {/* التركيب + اتجاه الرول — سطر واحد */}
          <Row
            label="التركيب والرول" subLabel="Assembly & Direction"
            isActive={assemblyEnabled} onToggle={() => setAssemblyEnabled(!assemblyEnabled)}
            priceSlot={<span className="text-gray-400 text-xs">—</span>}
          >
            {/* التركيب */}
            <Pills
              value={assembly}
              onChange={setAssembly}
              options={[{ value: "manual", label: "يدوي" }, { value: "automatic", label: "آلي" }]}
            />

            {/* فاصل */}
            <div className="w-px h-6 bg-gray-200 shrink-0 hidden sm:block" />

            {/* اتجاه الرول */}
            <div className="flex items-center gap-1.5 flex-wrap py-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => setRollDirection(String(num))}
                  className={`w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded border-2 transition-all
                    ${rollDirection === String(num) ? "border-black ring-1 ring-gray-400" : "border-gray-200 hover:border-gray-400"}`}
                >
                  <img src={`/assets/SVG/Asset ${num}.svg`} alt={`اتجاه ${num}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </Row>

        </div>
      </div>
    </div>
  );
}
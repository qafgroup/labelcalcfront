import {  cornerTypesList, embossingColors, laminationTypes, materialsData, shapesList, varnishTypes } from "../data/static";
import {  calculateRequiredRollWidth } from "../config/pricingConfig";
import {PRICING_CONFIG} from "../config/index"
import { useMemo } from "react";
import ChangeChoosesPrice from "../widgets/ChangeChoosesPrice";
import ChangeItemsPrices from "../widgets/ChangeItemsPrices";
import { PrintTypeSection } from "../widgets/printType";

interface StickerDetailsSectionProps {
  length: string;
  setLength: (value: string) => void;
  width: string;
  setWidth: (value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  shape: string;
  setShape: (value: string) => void;
  cornerType: string;
  setCornerType: (value: string) => void;
  printType: string;
  setPrintType: (value: string) => void;
  designCount: string;
  setDesignCount: (value: string) => void;
  material: string;
  setMaterial: (value: string) => void;
  hasLamination: boolean;
  setHasLamination: (value: boolean) => void;
  hasEmbossing: boolean;
  setHasEmbossing: (value: boolean) => void;
  embossingColor: string;
  setEmbossingColor: (value: string) => void;
  laminationType: string;
  setLaminationType: (value: string) => void;
  hasSilkScreen: boolean;
  setHasSilkScreen: (value: boolean) => void;
  hasSpotUV: boolean;
  setHasSpotUV: (value: boolean) => void;
  varnishType: string;
  setVarnishType: (value: string) => void;
  varneshCover: string;
  setVarneshCover: (value: string) => void;
  assembly: string;
  setAssembly: (value: string) => void;
  rollDirection: string;
  setRollDirection: (value: string) => void;
  stickersPerMeter?: number;
  gaping: string;
  setGaping: (value: string) => void;
  rollWidth: string; // ✅ إضافة
  setRollWidth: (value: string) => void; // ✅ إضافة
  stickersAcrossWidth?: number; // ✅ إضافة
  workFee: string;
  setWorkFee: (value: string) => void;
}

export function StickerDetailsSection(props: StickerDetailsSectionProps) {
  const {
    length, setLength,
    width, setWidth,
    quantity, setQuantity,
    shape, setShape,
    cornerType, setCornerType,
    designCount, setDesignCount,
    material, setMaterial,
    hasLamination, setHasLamination,
    hasEmbossing, setHasEmbossing,
    embossingColor, setEmbossingColor,
    laminationType, setLaminationType,
    hasSilkScreen, setHasSilkScreen,
    hasSpotUV, setHasSpotUV,
    varnishType, setVarnishType,
    assembly, setAssembly,
    rollDirection, setRollDirection,
    gaping, setGaping,
    rollWidth, setRollWidth, // ✅ إضافة
    stickersAcrossWidth, // ✅ إضافة
    workFee, setWorkFee,
    varneshCover, setVarneshCover,
  } = props;

  // ✅ حساب عرض الرول المطلوب
  const requiredRollWidthInfo = useMemo(() => {
    if (!width || !gaping || !stickersAcrossWidth) return null;
    
    return calculateRequiredRollWidth({
      width: parseFloat(width),
      gaping: parseFloat(gaping),
      stickersAcrossWidth: stickersAcrossWidth,
    });
  }, [width, gaping, stickersAcrossWidth]);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-1">مواصفات الملصق</h2>
        <p className="text-sm text-neutral-500">حدد المواصفات والتفاصيل المطلوبة</p>
        <div className="h-px bg-linear-to-r from-neutral-300 via-neutral-200 to-transparent mt-3" />
      </div>

      <div className="space-y-7">
        {/* المقاسات والكمية */}
        <div>
          <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            المقاسات والكمية
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                الطول (مم)
              </label>
              <input
                type="number"
                placeholder="10"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                العرض (مم)
              </label>
              <input
                type="number"
                placeholder="10"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                الكمية
              </label>
              <input
                type="number"
                placeholder="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                المسافة بين الملصقات (مم)
              </label>
              <input
                type="number"
                placeholder="0.3"
                value={gaping}
                onChange={(e) => setGaping(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* الملصقات في المتر */}
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                تكلفة التشغيل
              </label>
              <input
                type="number"
                placeholder="1"
                value={workFee}
                onChange={(e) => setWorkFee(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* ✅ قسم عرض الرول */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-full" />
            إعدادات الرول
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* عرض الرول المتاح */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                عرض الرول المتاح (مم)
              </label>
              <input
                type="number"
                placeholder="330"
                value={rollWidth}
                onChange={(e) => setRollWidth(e.target.value)}
                className="w-full bg-white border border-blue-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-blue-600 focus:outline-none transition-all"
              />
            </div>

            {/* عرض الرول المطلوب */}
            {requiredRollWidthInfo && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    عرض الرول المطلوب (مم)
                  </label>
                  <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
                    {requiredRollWidthInfo.requiredRollWidth} مم
                  </div>
                  <p className="text-[10px] text-neutral-600 mt-1">
                    شامل الهوامش في جانبي الرول ({requiredRollWidthInfo.edgeMargin} مم)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    عدد الملصقات في العرض                  </label>
                  <div className="bg-linear-to-r from-neutral-500 to-neutral-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
                    {stickersAcrossWidth}
                  </div>
                  <p className="text-[10px] text-neutral-600 mt-1">
                    ملصق
                  </p>
                </div>
              </>
            )}
          </div>

          {/* تحذير  إذا عرض الرول المطلوب أكبر من المتاح */}
          {requiredRollWidthInfo && parseFloat(rollWidth) > 0 &&
            requiredRollWidthInfo.requiredRollWidth > parseFloat(rollWidth) && (
              <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3 flex items-start gap-2">
                <span className="text-red-600 text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-800">تحذير: عرض الرول غير كافٍ!</p>
                  <p className="text-xs text-red-700 mt-1">
                    عرض الرول المطلوب ({requiredRollWidthInfo.requiredRollWidth} مم) أكبر من العرض المتاح ({rollWidth} مم).
                    <br />
                    يرجى: تقليل عرض الملصق، تقليل الجاب، تقليل عدد الملصقات في العرض، أو استخدام رول أعرض.
                  </p>
                </div>
              </div>
            )}

          {/* معلومة عن المعادلة
          <div className="mt-3 bg-white/50 rounded-lg p-2 text-[10px] text-neutral-600">
            <strong>المعادلة:</strong> ((عرض الملصق + الجاب) × عدد الملصقات في العرض) + الهامش من الجنبين
          </div> */}
        </div>

        {/* الشكل */}
        <div>
          <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            شكل الملصق
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shapesList.map((item) => (
              <button
                key={item.value}
                onClick={() => setShape(item.value)}
                className={`py-2 rounded-lg border text-sm font-semibold transition-all ${shape === item.value
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* نوع الحواف */}
        {(shape === 'square' || shape === 'rectangle') && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 animate-fadeIn">
            <label className="block text-xs font-semibold text-neutral-600 mb-3">
              نوع الحواف
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cornerTypesList.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setCornerType(item.value)}
                  className={`py-2 rounded-lg border text-sm font-semibold transition-all ${cornerType === item.value
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* نوع الطباعة */}
        <PrintTypeSection />

        {/* عدد التصاميم ونوع المادة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-2">
              عدد التصاميم
            </label>
            <div className="flex items-center gap-2">
               <input
                type="number"
                placeholder="10"
                value={designCount}
                onChange={(e) => setDesignCount(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-2">
              نوع المادة (الورق)
            </label>
            <div className="flex items-center gap-2">
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:bg-white transition-all cursor-pointer"
              >
                <option value="">اختر المادة...</option>

                <optgroup label="خامات ورقية (Paper Materials)">
                  {materialsData.paper_materials.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="خامات فويل (Foil Materials)">
                  {materialsData.foil_materials.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="خامات بلاستيكية (Plastic Materials)">
                  {materialsData.plastic_materials.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              </select>

              <div className="min-w-17.5 text-center py-2 px-1 bg-neutral-900 text-white rounded-lg text-xs font-bold">
                {[...materialsData.paper_materials, ...materialsData.foil_materials, ...materialsData.plastic_materials].find(m => m.value === material)?.price || 0} ر.س
              </div>
              <span className="flex items-center bg-neutral-900 text-white rounded-lg text-xs font-bold text-center item-center"><ChangeChoosesPrice listTypeOfData={materialsData} /></span>
            </div>
          </div>
        </div>

        {/* التشطيبات الإضافية */}
        
<div>
  <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
    <span className="w-1 h-4 bg-neutral-900 rounded-full" />
    التشطيبات الإضافية
  </h3>

  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">

      {/* السلفان */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-900">السلفان</div>
            <div className="text-xs text-neutral-500 mt-0.5">Lamination</div>
          </div>
          <div className="flex items-center gap-2">
            {hasLamination && (
              <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
                +{PRICING_CONFIG.additionalCosts.lamination.perSqm} ر.س/م²
              </div>
            )}
            <ChangeItemsPrices label="السلفان" price={PRICING_CONFIG.additionalCosts.lamination.perSqm} />
            <button
              onClick={() => setHasLamination(!hasLamination)}
              className={`relative w-12 h-6 rounded-full transition-all shrink-0 ${hasLamination ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasLamination ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
        {hasLamination && (
          <div className="mt-3 pt-3 border-t border-neutral-200 animate-fadeIn">
            <label className="block text-xs font-semibold text-neutral-600 mb-2">نوع السلفان</label>
            <select
              value={laminationType}
              onChange={(e) => setLaminationType(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
            >
              {laminationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} {type.price > 0 ? `( +${type.price} ر.س )` : ''}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* سلك سكرين */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-900">سلك سكرين</div>
            <div className="text-xs text-neutral-500 mt-0.5">Silk Screen</div>
          </div>
          <div className="flex items-center gap-2">
            {hasSilkScreen && (
              <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
                +{PRICING_CONFIG.additionalCosts.silkScreen.perSqm} ر.س/م²
              </div>
            )}
            <ChangeItemsPrices label="سلك سكرين" price={PRICING_CONFIG.additionalCosts.silkScreen.perSqm} />
            <button
              onClick={() => setHasSilkScreen(!hasSilkScreen)}
              className={`relative w-12 h-6 rounded-full transition-all shrink-0 ${hasSilkScreen ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasSilkScreen ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">

      {/* البصمة */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-900">البصمة</div>
            <div className="text-xs text-neutral-500 mt-0.5">Embossing - تأثير بارز</div>
          </div>
          <div className="flex items-center gap-2">
            {hasEmbossing && (
              <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
                {embossingColors.find(c => c.value === embossingColor)?.price || 0} ر.س/م²
              </div>
            )}
            <ChangeChoosesPrice listTypeOfData={embossingColors} />
            <button
              onClick={() => setHasEmbossing(!hasEmbossing)}
              className={`relative w-12 h-6 rounded-full transition-all shrink-0 ${hasEmbossing ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasEmbossing ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
        {hasEmbossing && (
          <div className="mt-3 pt-3 border-t border-neutral-200 animate-fadeIn space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">لون البصمة</label>
              <select
                value={embossingColor}
                onChange={(e) => setEmbossingColor(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
              >
                {embossingColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label} {color.price > 0 ? `( +${color.price} ر.س )` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2">نسبة التغطية %</label>
                <input
                  type="number"
                  placeholder="مثال: 10%"
                  value={varneshCover}
                  onChange={(e) => setVarneshCover(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2">تكلفة القالب (ثابتة)</label>
                <input
                  type="number"
                  placeholder="مثال: 400"
                  value={varneshCover}
                  onChange={(e) => setVarneshCover(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* الفرنيش */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-neutral-900">الفرنيش (varnish)</div>
            <div className="text-xs text-neutral-500 mt-0.5">UV - لمعان انتقائي</div>
          </div>
          <div className="flex items-center gap-2">
            {hasSpotUV && (
              <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
                +{PRICING_CONFIG.additionalCosts.spotUV.perSqm} ر.س/م²
              </div>
            )}
            <ChangeItemsPrices label="سبوت UV" price={PRICING_CONFIG.additionalCosts.spotUV.perSqm} />
            <button
              onClick={() => setHasSpotUV(!hasSpotUV)}
              className={`relative w-12 h-6 rounded-full transition-all shrink-0 ${hasSpotUV ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasSpotUV ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
        {hasSpotUV && (
          <div className="mt-3 pt-3 border-t border-neutral-200 animate-fadeIn space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">نوع الفرنيش</label>
              <select
                value={varnishType}
                onChange={(e) => setVarnishType(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
              >
                {varnishTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} {type.price > 0 ? `( +${type.price} ر.س )` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-2">نسبة التغطية % (للفرنيش الموضعي)</label>
              <input
                type="number"
                placeholder="مثال: 10%"
                value={varneshCover}
                onChange={(e) => setVarneshCover(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  </div>
</div>
        {/* التركيب واتجاه الرول */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-2">
              نوع التركيب
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'manual', label: 'يدوي' },
                { value: 'automatic', label: 'آلي' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setAssembly(item.value)}
                  className={`px-3 py-3 rounded-lg border text-sm font-semibold transition-all ${assembly === item.value
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
  <label className="block text-xs font-semibold text-neutral-600 mb-2">
    اتجاه الرول
  </label>

  <div className="grid grid-cols-4 gap-2 h-full">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
    <button
      key={num}
      onClick={() => setRollDirection(String(num))}
      className={`relative w-full h-full overflow-hidden transition-all
        ${
          rollDirection === String(num)
            ? "ring-1 ring-neutral-400"
            : ""
        }`}
    >
      <img
        src={`/assets/SVG/Asset ${num}.svg`}
        alt={`اتجاه الرول ${num}`}
        className="w-full h-full object-contain"
      />
    </button>
  ))}
</div>
 
  </div>
  </div>
  </div>
  </div>
  );
}
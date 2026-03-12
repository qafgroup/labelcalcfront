// import {  cornerTypesList, embossingColors, laminationTypes, materialsData, shapesList, varnishTypes } from "../data/static";
// import {  calculateRequiredRollWidth } from "../config/pricingConfig";
// import {PRICING_CONFIG} from "../config/index"
// import { useMemo } from "react";
// import ChangeChoosesPrice from "../widgets/ChangeChoosesPrice";
// import ChangeItemsPrices from "../widgets/ChangeItemsPrices";
// import { PrintTypeSection } from "../widgets/printType";

// interface StickerDetailsSectionProps {
//   length: string;
//   setLength: (value: string) => void;
//   width: string;
//   setWidth: (value: string) => void;
//   quantity: string;
//   setQuantity: (value: string) => void;
//   shape: string;
//   setShape: (value: string) => void;
//   cornerType: string;
//   setCornerType: (value: string) => void;
//   printType: string;
//   setPrintType: (value: string) => void;
//   designCount: string;
//   setDesignCount: (value: string) => void;
//   material: string;
//   setMaterial: (value: string) => void;
//   hasLamination: boolean;
//   setHasLamination: (value: boolean) => void;
//   hasEmbossing: boolean;
//   setHasEmbossing: (value: boolean) => void;
//   embossingColor: string;
//   setEmbossingColor: (value: string) => void;
//   laminationType: string;
//   setLaminationType: (value: string) => void;
//   hasSilkScreen: boolean;
//   setHasSilkScreen: (value: boolean) => void;
//   hasSpotUV: boolean;
//   setHasSpotUV: (value: boolean) => void;
//   varnishType: string;
//   setVarnishType: (value: string) => void;
//   varneshCover: string;
//   setVarneshCover: (value: string) => void;
//   assembly: string;
//   setAssembly: (value: string) => void;
//   rollDirection: string;
//   setRollDirection: (value: string) => void;
//   stickersPerMeter?: number;
//   gaping: string;
//   setGaping: (value: string) => void;
//   rollWidth: string; // ✅ إضافة
//   setRollWidth: (value: string) => void; // ✅ إضافة
//   stickersAcrossWidth?: number; // ✅ إضافة
//   workFee: string;
//   setWorkFee: (value: string) => void;
// }

// export function StickerDetailsSection(props: StickerDetailsSectionProps) {
//   const {
//     length, setLength,
//     width, setWidth,
//     quantity, setQuantity,
//     shape, setShape,
//     cornerType, setCornerType,
//     designCount, setDesignCount,
//     material, setMaterial,
//     hasLamination, setHasLamination,
//     hasEmbossing, setHasEmbossing,
//     embossingColor, setEmbossingColor,
//     laminationType, setLaminationType,
//     hasSilkScreen, setHasSilkScreen,
//     hasSpotUV, setHasSpotUV,
//     varnishType, setVarnishType,
//     assembly, setAssembly,
//     rollDirection, setRollDirection,
//     gaping, setGaping,
//     rollWidth, setRollWidth, // ✅ إضافة
//     stickersAcrossWidth, // ✅ إضافة
//     workFee, setWorkFee,
//     varneshCover, setVarneshCover,
//   } = props;

//   // ✅ حساب عرض الرول المطلوب
//   const requiredRollWidthInfo = useMemo(() => {
//     if (!width || !gaping || !stickersAcrossWidth) return null;
    
//     return calculateRequiredRollWidth({
//       width: parseFloat(width),
//       gaping: parseFloat(gaping),
//       stickersAcrossWidth: stickersAcrossWidth,
//     });
//   }, [width, gaping, stickersAcrossWidth]);

//   return (
//     <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-neutral-900 mb-1">مواصفات الملصق</h2>
//         <p className="text-sm text-neutral-500">حدد المواصفات والتفاصيل المطلوبة</p>
//         <div className="h-px bg-linear-to-r from-neutral-300 via-neutral-200 to-transparent mt-3" />
//       </div>

//       <div className="space-y-7">
//         {/* المقاسات والكمية */}
//         <div>
//           <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-neutral-900 rounded-full" />
//             المقاسات والكمية
//           </h3>
          
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//             <div>
//               <label className="block text-xs font-semibold text-neutral-600 mb-2">
//                 الطول (مم)
//               </label>
//               <input
//                 type="number"
//                 placeholder="10"
//                 value={length}
//                 onChange={(e) => setLength(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-neutral-600 mb-2">
//                 العرض (مم)
//               </label>
//               <input
//                 type="number"
//                 placeholder="10"
//                 value={width}
//                 onChange={(e) => setWidth(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-neutral-600 mb-2">
//                 الكمية
//               </label>
//               <input
//                 type="number"
//                 placeholder="100"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-neutral-600 mb-2">
//                 المسافة بين الملصقات (مم)
//               </label>
//               <input
//                 type="number"
//                 placeholder="0.3"
//                 value={gaping}
//                 onChange={(e) => setGaping(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>

//             {/* الملصقات في المتر */}
//             <div>
//               <label className="block text-xs font-semibold text-neutral-600 mb-2">
//                 تكلفة التشغيل
//               </label>
//               <input
//                 type="number"
//                 placeholder="1"
//                 value={workFee}
//                 onChange={(e) => setWorkFee(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ✅ قسم عرض الرول */}
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
//           <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-blue-600 rounded-full" />
//             إعدادات الرول
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* عرض الرول المتاح */}
//             <div>
//               <label className="block text-xs font-semibold text-neutral-700 mb-2">
//                 عرض الرول المتاح (مم)
//               </label>
//               <input
//                 type="number"
//                 placeholder="330"
//                 value={rollWidth}
//                 onChange={(e) => setRollWidth(e.target.value)}
//                 className="w-full bg-white border border-blue-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-blue-600 focus:outline-none transition-all"
//               />
//             </div>

//             {/* عرض الرول المطلوب */}
//             {requiredRollWidthInfo && (
//               <>
//                 <div>
//                   <label className="block text-xs font-semibold text-neutral-700 mb-2">
//                     عرض الرول المطلوب (مم)
//                   </label>
//                   <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
//                     {requiredRollWidthInfo.requiredRollWidth} مم
//                   </div>
//                   <p className="text-[10px] text-neutral-600 mt-1">
//                     شامل الهوامش في جانبي الرول ({requiredRollWidthInfo.edgeMargin} مم)
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-neutral-700 mb-2">
//                     عدد الملصقات في العرض                  </label>
//                   <div className="bg-linear-to-r from-neutral-500 to-neutral-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
//                     {stickersAcrossWidth}
//                   </div>
//                   <p className="text-[10px] text-neutral-600 mt-1">
//                     ملصق
//                   </p>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* تحذير  إذا عرض الرول المطلوب أكبر من المتاح */}
//           {requiredRollWidthInfo && parseFloat(rollWidth) > 0 &&
//             requiredRollWidthInfo.requiredRollWidth > parseFloat(rollWidth) && (
//               <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3 flex items-start gap-2">
//                 <span className="text-red-600 text-lg">⚠️</span>
//                 <div className="flex-1">
//                   <p className="text-sm font-bold text-red-800">تحذير: عرض الرول غير كافٍ!</p>
//                   <p className="text-xs text-red-700 mt-1">
//                     عرض الرول المطلوب ({requiredRollWidthInfo.requiredRollWidth} مم) أكبر من العرض المتاح ({rollWidth} مم).
//                     <br />
//                     يرجى: تقليل عرض الملصق، تقليل الجاب، تقليل عدد الملصقات في العرض، أو استخدام رول أعرض.
//                   </p>
//                 </div>
//               </div>
//             )}
//         </div>

//         {/* الشكل */}
//         <div>
//           <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-neutral-900 rounded-full" />
//             شكل الملصق
//           </h3>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {shapesList.map((item) => (
//               <button
//                 key={item.value}
//                 onClick={() => setShape(item.value)}
//                 className={`py-2 rounded-lg border text-sm font-semibold transition-all ${shape === item.value
//                     ? 'bg-neutral-900 text-white border-neutral-900'
//                     : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
//                   }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* نوع الحواف */}
//         {(shape === 'square' || shape === 'rectangle') && (
//           <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 animate-fadeIn">
//             <label className="block text-xs font-semibold text-neutral-600 mb-3">
//               نوع الحواف
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {cornerTypesList.map((item) => (
//                 <button
//                   key={item.value}
//                   onClick={() => setCornerType(item.value)}
//                   className={`py-2 rounded-lg border text-sm font-semibold transition-all ${cornerType === item.value
//                       ? 'bg-neutral-900 text-white border-neutral-900'
//                       : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
//                     }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* نوع الطباعة */}
//         <PrintTypeSection />

//         {/* عدد التصاميم ونوع المادة */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-xs font-semibold text-neutral-600 mb-2">
//               عدد التصاميم
//             </label>
//             <div className="flex items-center gap-2">
//                <input
//                 type="number"
//                 placeholder="10"
//                 value={designCount}
//                 onChange={(e) => setDesignCount(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-neutral-600 mb-2">
//               نوع المادة (الورق)
//             </label>
//             <div className="flex items-center gap-2">
//               <select
//                 value={material}
//                 onChange={(e) => setMaterial(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:bg-white transition-all cursor-pointer"
//               >
//                 <option value="">بدون</option>

//                 <optgroup label="خامات ورقية (Paper Materials)">
//                   {materialsData.paper_materials.map((item) => (
//                     <option key={item.value} value={item.value}>
//                       {item.label}
//                     </option>
//                   ))}
//                 </optgroup>

//                 <optgroup label="خامات فويل (Foil Materials)">
//                   {materialsData.foil_materials.map((item) => (
//                     <option key={item.value} value={item.value}>
//                       {item.label}
//                     </option>
//                   ))}
//                 </optgroup>
//                 <optgroup label="خامات بلاستيكية (Plastic Materials)">
//                   {materialsData.plastic_materials.map((item) => (
//                     <option key={item.value} value={item.value}>
//                       {item.label}
//                     </option>
//                   ))}
//                 </optgroup>
//               </select>

//               <div className="min-w-17.5 text-center py-2 px-1 bg-neutral-900 text-white rounded-lg text-xs font-bold">
//                 {[...materialsData.paper_materials, ...materialsData.foil_materials, ...materialsData.plastic_materials].find(m => m.value === material)?.price || 0} ر.س
//               </div>
//               <span className="flex items-center bg-neutral-900 text-white rounded-lg text-xs font-bold text-center item-center"><ChangeChoosesPrice listTypeOfData={materialsData} /></span>
//             </div>
//           </div>
//         </div>

        
// {/* التشطيبات الإضافية */}
// <div>
//   <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
//     <span className="w-1 h-4 bg-neutral-900 rounded-full" />
//     التشطيبات الإضافية
//   </h3>

//   <div className="border border-neutral-200 rounded-xl overflow-hidden">

//     {/* ── السلفان ── */}
//     <div className={`flex items-stretch border-b border-neutral-200 transition-all ${hasLamination ? 'bg-white' : 'bg-neutral-50'}`}>
//       {/* زر التفعيل */}
//       <button
//         onClick={() => setHasLamination(!hasLamination)}
//         className={`shrink-0 w-28 flex flex-col items-center justify-center gap-0.5 px-3 py-3 border-l border-neutral-200 transition-all
//           ${hasLamination ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
//       >
//         <span className="text-sm font-bold">السلفان</span>
//         <span className={`text-[10px] ${hasLamination ? 'text-neutral-300' : 'text-neutral-400'}`}>Lamination</span>
//       </button>

//       {/* الحقول */}
//       <div className="flex-1 flex items-center flex-wrap gap-2 px-4 py-2.5 min-h-[52px]">
//         {hasLamination && (
//           <div className="relative min-w-[140px]">
//             <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">نوع السلفان</span>
//             <select
//               value={laminationType}
//               onChange={(e) => setLaminationType(e.target.value)}
//               className="w-full h-11 pt-4 pb-1 pr-2.5 pl-6 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none appearance-none cursor-pointer transition-all"
//               style={{ direction: 'rtl' }}
//             >
//               {laminationTypes.map((type) => (
//                 <option key={type.value} value={type.value}>
//                   {type.label} {type.price > 0 ? `( +${type.price} ر.س )` : ''}
//                 </option>
//               ))}
//             </select>
//             <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">﹀</span>
//           </div>
//         )}
//       </div>

//       {/* السعر + تعديل */}
//       <div className="shrink-0 flex items-center gap-1.5 px-4 border-r border-neutral-200 min-w-[100px] justify-end">
//         <ChangeItemsPrices label="السلفان" price={PRICING_CONFIG.additionalCosts.lamination.perSqm} />
//         {hasLamination && (
//           <span className="text-xs font-bold text-neutral-700">
//             +{PRICING_CONFIG.additionalCosts.lamination.perSqm} ر.س/م²
//           </span>
//         )}
//       </div>
//     </div>

//     {/* ── سلك سكرين ── */}
//     <div className={`flex items-stretch border-b border-neutral-200 transition-all ${hasSilkScreen ? 'bg-white' : 'bg-neutral-50'}`}>
//       <button
//         onClick={() => setHasSilkScreen(!hasSilkScreen)}
//         className={`shrink-0 w-28 flex flex-col items-center justify-center gap-0.5 px-3 py-3 border-l border-neutral-200 transition-all
//           ${hasSilkScreen ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
//       >
//         <span className="text-sm font-bold">سلك سكرين</span>
//         <span className={`text-[10px] ${hasSilkScreen ? 'text-neutral-300' : 'text-neutral-400'}`}>Silk Screen</span>
//       </button>

//       <div className="flex-1 flex items-center px-4 py-2.5 min-h-[52px]" />

//       <div className="shrink-0 flex items-center gap-1.5 px-4 border-r border-neutral-200 min-w-[100px] justify-end">
//         <ChangeItemsPrices label="سلك سكرين" price={PRICING_CONFIG.additionalCosts.silkScreen.perSqm} />
//         {hasSilkScreen && (
//           <span className="text-xs font-bold text-neutral-700">
//             +{PRICING_CONFIG.additionalCosts.silkScreen.perSqm} ر.س/م²
//           </span>
//         )}
//       </div>
//     </div>

//     {/* ── البصمة ── */}
//     <div className={`flex items-stretch border-b border-neutral-200 transition-all ${hasEmbossing ? 'bg-white' : 'bg-neutral-50'}`}>
//       <button
//         onClick={() => setHasEmbossing(!hasEmbossing)}
//         className={`shrink-0 w-28 flex flex-col items-center justify-center gap-0.5 px-3 py-3 border-l border-neutral-200 transition-all
//           ${hasEmbossing ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
//       >
//         <span className="text-sm font-bold">البصمة</span>
//         <span className={`text-[10px] ${hasEmbossing ? 'text-neutral-300' : 'text-neutral-400'}`}>Embossing</span>
//       </button>

//       <div className="flex-1 flex items-center flex-wrap gap-2 px-4 py-2.5 min-h-[52px]">
//         {hasEmbossing && (
//           <>
//             {/* لون البصمة */}
//             <div className="relative min-w-[140px]">
//               <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">لون البصمة</span>
//               <select
//                 value={embossingColor}
//                 onChange={(e) => setEmbossingColor(e.target.value)}
//                 className="w-full h-11 pt-4 pb-1 pr-2.5 pl-6 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none appearance-none cursor-pointer transition-all"
//                 style={{ direction: 'rtl' }}
//               >
//                 {embossingColors.map((color) => (
//                   <option key={color.value} value={color.value}>
//                     {color.label} {color.price > 0 ? `( +${color.price} ر.س )` : ''}
//                   </option>
//                 ))}
//               </select>
//               <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">﹀</span>
//             </div>

//             {/* نسبة التغطية */}
//             <div className="relative min-w-[120px]">
//               <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">نسبة التغطية %</span>
//               <input
//                 type="number"
//                 placeholder="مثال: 10"
//                 value={varneshCover}
//                 onChange={(e) => setVarneshCover(e.target.value)}
//                 className="w-full h-11 pt-4 pb-1 pr-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none transition-all"
//                 style={{ direction: 'rtl' }}
//               />
//             </div>

//             {/* تكلفة القالب */}
//             <div className="relative min-w-[130px]">
//               <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">تكلفة القالب (ثابتة)</span>
//               <input
//                 type="number"
//                 placeholder="مثال: 400"
//                 value={varneshCover}
//                 onChange={(e) => setVarneshCover(e.target.value)}
//                 className="w-full h-11 pt-4 pb-1 pr-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none transition-all"
//                 style={{ direction: 'rtl' }}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="shrink-0 flex items-center gap-1.5 px-4 border-r border-neutral-200 min-w-[100px] justify-end">
//         <ChangeChoosesPrice listTypeOfData={embossingColors} />
//         {hasEmbossing && (
//           <span className="text-xs font-bold text-neutral-700">
//             {embossingColors.find(c => c.value === embossingColor)?.price || 0} ر.س/م²
//           </span>
//         )}
//       </div>
//     </div>

//     {/* ── الفرنيش ── */}
//     <div className={`flex items-stretch transition-all ${hasSpotUV ? 'bg-white' : 'bg-neutral-50'}`}>
//       <button
//         onClick={() => setHasSpotUV(!hasSpotUV)}
//         className={`shrink-0 w-28 flex flex-col items-center justify-center gap-0.5 px-3 py-3 border-l border-neutral-200 transition-all
//           ${hasSpotUV ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}
//       >
//         <span className="text-sm font-bold">الفرنيش</span>
//         <span className={`text-[10px] ${hasSpotUV ? 'text-neutral-300' : 'text-neutral-400'}`}>UV Varnish</span>
//       </button>

//       <div className="flex-1 flex items-center flex-wrap gap-2 px-4 py-2.5 min-h-[52px]">
//         {hasSpotUV && (
//           <>
//             {/* نوع الفرنيش */}
//             <div className="relative min-w-[140px]">
//               <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">نوع الفرنيش</span>
//               <select
//                 value={varnishType}
//                 onChange={(e) => setVarnishType(e.target.value)}
//                 className="w-full h-11 pt-4 pb-1 pr-2.5 pl-6 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none appearance-none cursor-pointer transition-all"
//                 style={{ direction: 'rtl' }}
//               >
//                 {varnishTypes.map((type) => (
//                   <option key={type.value} value={type.value}>
//                     {type.label} {type.price > 0 ? `( +${type.price} ر.س )` : ''}
//                   </option>
//                 ))}
//               </select>
//               <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">﹀</span>
//             </div>

//             {/* نسبة التغطية */}
//             <div className="relative min-w-[150px]">
//               <span className="absolute top-1 right-2.5 text-[9px] text-neutral-400 font-semibold pointer-events-none z-10">نسبة التغطية % (موضعي)</span>
//               <input
//                 type="number"
//                 placeholder="مثال: 10"
//                 value={varneshCover}
//                 onChange={(e) => setVarneshCover(e.target.value)}
//                 className="w-full h-11 pt-4 pb-1 pr-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:border-neutral-900 focus:outline-none transition-all"
//                 style={{ direction: 'rtl' }}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       <div className="shrink-0 flex items-center gap-1.5 px-4 border-r border-neutral-200 min-w-[100px] justify-end">
//         <ChangeItemsPrices label="سبوت UV" price={PRICING_CONFIG.additionalCosts.spotUV.perSqm} />
//         {hasSpotUV && (
//           <span className="text-xs font-bold text-neutral-700">
//             +{PRICING_CONFIG.additionalCosts.spotUV.perSqm} ر.س/م²
//           </span>
//         )}
//       </div>
//     </div>

//   </div>
// </div>
//         {/* التركيب واتجاه الرول */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-xs font-semibold text-neutral-600 mb-2">
//               نوع التركيب
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { value: 'manual', label: 'يدوي' },
//                 { value: 'automatic', label: 'آلي' },
//               ].map((item) => (
//                 <button
//                   key={item.value}
//                   onClick={() => setAssembly(item.value)}
//                   className={`px-3 py-3 rounded-lg border text-sm font-semibold transition-all ${assembly === item.value
//                       ? 'bg-neutral-900 text-white border-neutral-900'
//                       : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
//                     }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//   <label className="block text-xs font-semibold text-neutral-600 mb-2">
//     اتجاه الرول
//   </label>

//   <div className="grid grid-cols-4 gap-2 h-full">
//   {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//     <button
//       key={num}
//       onClick={() => setRollDirection(String(num))}
//       className={`relative w-full h-full overflow-hidden transition-all
//         ${
//           rollDirection === String(num)
//             ? "ring-1 ring-neutral-400"
//             : ""
//         }`}
//     >
//       <img
//         src={`/assets/SVG/Asset ${num}.svg`}
//         alt={`اتجاه الرول ${num}`}
//         className="w-full h-full object-contain"
//       />
//     </button>
//   ))}
// </div>
 
//   </div>
//   </div>
//   </div>
//   </div>
//   );
// }
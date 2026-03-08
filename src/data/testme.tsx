// // ===================================
// // ملف حساب التسعير والطباعة - نسخة نهائية
// // ===================================

// // ====== 1. إعدادات المكينة ======
// export const MACHINE_CONFIG = {
//   rollWidth: 33, // عرض الرول بالسنتيمتر
//   minSpacing: 0.3, // الحد الأدنى للمسافة بين الملصقات (سم)
//   edgeMargin: 0.3, // هامش الحواف من جانبي الرول (سم)
// };

// // ====== 2. إعدادات التسعير ======
// export const PRICING_CONFIG = {
//   // سعر المتر المربع الأساسي (بالريال)
//   basePricePerSqm: 50,

//   // تكلفة إضافية حسب نوع الطباعة (بالريال لكل متر مربع)
//   printTypes: {
//     'cmyk-4': 0, // الأساسي
//     'colors-5': 15,
//     'colors-6': 25,
//     'colors-7': 35,
//   },

//   // تكلفة إضافية حسب نوع المادة (بالريال لكل متر مربع)
//   materials: {
//     'vinyl-white': 0, // الأساسي
//     'vinyl-transparent': 20,
//     'paper-coated': -10,
//     'reflective': 80,
//     'chrome': 120,
//     'holographic': 100,
//   },

//   // تكاليف إضافية ثابتة
//   additionalCosts: {
//     lamination: {
//       perSqm: 25, // السلفان لكل متر مربع
//     },
//     embossing: {
//       perSqm: 30, // البصمة لكل متر مربع
//       colorCost: 10, // تكلفة إضافية للون البصمة
//     },
//     silkScreen: {
//       perSqm: 40, // طباعة سلك سكرين لكل متر مربع
//     },
//     spotUV: {
//       perSqm: 35, // سبوت UV لكل متر مربع
//     },
//   },

//   // تكلفة التركيب
//   assembly: {
//     manual: 0, // يدوي
//     automatic: 50, // آلي (تكلفة ثابتة)
//   },

//   // تكلفة حسب الشكل (نسبة مئوية إضافية)
//   shapes: {
//     circle: 1.1, // دائري - زيادة 10%
//     square: 1.0, // مربع - لا زيادة
//     rectangle: 1.0, // مستطيل - لا زيادة
//     custom: 1.25, // شكل آخر - زيادة 25%
//   },

//   // تكلفة الحواف المستديرة للمربع
//   roundedCorners: {
//     cost: 15, // تكلفة ثابتة
//   },

//   // تكلفة إضافية لكل تصميم إضافي
//   designCost: {
//     perDesign: 20,
//   },

//   // نسبة الضريبة
//   taxRate: 0.15, // 15%
// };

// // ====== 3. دالة حساب عدد الملصقات في المتر ======
// export function calculateStickersPerSquareMeter(params: {
//   length: number; // سم
//   width: number; // سم
//   shape: string;
//   spacing?: number; // المسافة بين الملصقات (سم)
// }) {
//   const { length, width, shape, spacing = MACHINE_CONFIG.minSpacing } = params;

//   // عرض الرول الفعلي (بعد خصم الهوامش)
//   const effectiveRollWidth = MACHINE_CONFIG.rollWidth - (MACHINE_CONFIG.edgeMargin * 2);
  
//   // المساحة الفعلية مع المسافات
//   const effectiveLength = length + spacing;
//   const effectiveWidth = width + spacing;

//   // التحقق إذا كان الطول مختلف عن العرض
//   const isDifferentDimensions = length !== width;
  
//   // حساب كم ملصق يدخل بعرض الرول
//   let stickersPerRowAcrossRoll = 0;
//   let isRotated = false;
//   let rotationMessage = null;
  
//   // نجرب الوضع الحالي (كما أدخله المستخدم)
//   const currentFit = Math.floor(effectiveRollWidth / effectiveWidth);
//   const currentRowsPerMeter = Math.floor(100 / effectiveLength);
//   const currentStickersPerMeter = currentFit * currentRowsPerMeter;
  
//   // نجرب الوضع المعكوس
//   let alternateFit = 0;
//   let alternateRowsPerMeter = 0;
//   let alternateStickersPerMeter = 0;
  
//   if (isDifferentDimensions) {
//     alternateFit = Math.floor(effectiveRollWidth / effectiveLength);
//     alternateRowsPerMeter = Math.floor(100 / effectiveWidth);
//     alternateStickersPerMeter = alternateFit * alternateRowsPerMeter;
//   }
  
//   // نختار الوضع الأفضل
//   if (isDifferentDimensions && alternateStickersPerMeter > currentStickersPerMeter) {
//     // الوضع المعكوس أفضل - نقلب
//     stickersPerRowAcrossRoll = alternateFit;
//     isRotated = true;
    
//     const improvement = ((alternateStickersPerMeter - currentStickersPerMeter) / currentStickersPerMeter * 100).toFixed(0);
    
//     rotationMessage = `⚠️ تنبيه: تم قلب الملصق تلقائياً لتوفير المساحة!\n` +
//                      `الوضع الأصلي: ${length}×${width} سم → الوضع الجديد: ${width}×${length} سم\n` +
//                      `التوفير: ${improvement}% ملصقات أكثر في المتر`;
//   } else {
//     // الوضع الحالي هو الأفضل - نستخدمه
//     stickersPerRowAcrossRoll = currentFit;
//     isRotated = false;
    
//     // رسالة توضيحية للمستخدم
//     if (!isDifferentDimensions) {
//       rotationMessage = 'الملصق أبعاده متساوية - لا يحتاج قلب';
//     } else if (alternateStickersPerMeter > 0) {
//       rotationMessage = '✅ الوضع الحالي هو الأمثل - لا يحتاج قلب';
//     } else {
//       rotationMessage = 'الوضع الحالي هو الأمثل - لا يحتاج قلب';
//     }
//   }

//   // التأكد إن الملصق يدخل في الرول أصلاً
//   if (stickersPerRowAcrossRoll === 0) {
//     const minDimension = Math.min(length, width);
    
//     return {
//       stickersPerSqm: 0,
//       stickersPerMeter: 0,
//       stickersPerRowAcrossRoll: 0,
//       utilizationRate: 0,
//       wastePercentage: 100,
//       error: `❌ الملصق أعرض من الرول!\n` +
//              `عرض الرول المتاح: ${effectiveRollWidth} سم\n` +
//              `أصغر بُعد للملصق: ${minDimension} سم\n` +
//              `يجب تصغير العرض إلى ${effectiveRollWidth - spacing} سم أو أقل`,
//       isRotated: false,
//       rotationMessage: null,
//     };
//   }

//   // حساب كم صف يدخل في المتر الطولي
//   const lengthDimension = isRotated ? effectiveWidth : effectiveLength;
//   const rowsPerMeter = Math.floor(100 / lengthDimension);

//   // إجمالي الملصقات في المتر
//   const stickersPerMeter = stickersPerRowAcrossRoll * rowsPerMeter;

//   // حساب نسبة الاستفادة
//   let actualStickerArea = length * width;
  
//   if (shape === 'circle') {
//     // مساحة الدائرة الفعلية
//     const radius = Math.min(length, width) / 2;
//     actualStickerArea = Math.PI * radius * radius;
//   } else if (shape === 'custom') {
//     // للأشكال المخصصة نفترض استفادة 85%
//     actualStickerArea = actualStickerArea * 0.85;
//   }

//   const totalUsedArea = stickersPerMeter * actualStickerArea;
//   const rollAreaPerMeter = effectiveRollWidth * 100;
//   const utilizationRate = (totalUsedArea / rollAreaPerMeter) * 100;
//   const wastePercentage = 100 - utilizationRate;

//   return {
//     stickersPerSqm: Math.floor(stickersPerMeter),
//     stickersPerMeter: Math.floor(stickersPerMeter),
//     stickersPerRowAcrossRoll,
//     rowsPerMeter,
//     utilizationRate: Math.round(utilizationRate * 100) / 100,
//     wastePercentage: Math.round(wastePercentage * 100) / 100,
//     isRotated,
//     rotationMessage,
//     effectiveRollWidth,
//     // معلومات إضافية للمقارنة
//     comparisonData: isDifferentDimensions ? {
//       normalOrientation: {
//         stickersPerRow: currentFit,
//         rowsPerMeter: currentRowsPerMeter,
//         stickersPerMeter: currentStickersPerMeter,
//       },
//       rotatedOrientation: {
//         stickersPerRow: alternateFit,
//         rowsPerMeter: alternateRowsPerMeter,
//         stickersPerMeter: alternateStickersPerMeter,
//       },
//     } : null,
//   };
// }

// // ====== 4. دالة حساب الطول المطلوب من الرول ======
// export function calculateRequiredRollLength(params: {
//   length: number; // سم
//   width: number; // سم
//   quantity: number;
//   shape: string;
//   spacing?: number;
// }) {
//   const stickersInfo = calculateStickersPerSquareMeter(params);

//   if (stickersInfo.error) {
//     return {
//       error: stickersInfo.error,
//       requiredLengthMeters: 0,
//       requiredLengthCm: 0,
//       requiredAreaM2: 0,
//       stickersPerMeter: 0,
//       totalStickersProduced: 0,
//       extraStickers: 0,
//       rotationMessage: null,
//     };
//   }

//   // حساب الطول المطلوب بالمتر
//   const requiredLengthMeters = Math.ceil(params.quantity / stickersInfo.stickersPerMeter);
//   const requiredLengthCm = requiredLengthMeters * 100;
  
//   // ✅ حساب المساحة المطلوبة بالمتر المربع
//   const rollWidthMeters = MACHINE_CONFIG.rollWidth / 100; // تحويل من سم إلى متر
//   const requiredAreaM2 = requiredLengthMeters * rollWidthMeters;
  
//   const totalStickersProduced = requiredLengthMeters * stickersInfo.stickersPerMeter;
//   const extraStickers = totalStickersProduced - params.quantity;

//   // حساب التوفير في حال القلب
//   let savingsInfo = null;
//   if (stickersInfo.isRotated && stickersInfo.comparisonData) {
//     const normalRequiredMeters = Math.ceil(
//       params.quantity / stickersInfo.comparisonData.normalOrientation.stickersPerMeter
//     );
//     const savedMeters = normalRequiredMeters - requiredLengthMeters;
//     const savedPercentage = ((savedMeters / normalRequiredMeters) * 100).toFixed(1);
    
//     // ✅ حساب التوفير بالمتر المربع
//     const normalRequiredAreaM2 = normalRequiredMeters * rollWidthMeters;
//     const savedAreaM2 = normalRequiredAreaM2 - requiredAreaM2;
    
//     savingsInfo = {
//       savedMeters,
//       savedAreaM2,
//       savedPercentage: parseFloat(savedPercentage),
//       normalRequiredMeters,
//       normalRequiredAreaM2,
//       optimizedRequiredMeters: requiredLengthMeters,
//       optimizedRequiredAreaM2: requiredAreaM2,
//     };
//   }

//   return {
//     requiredLengthMeters,
//     requiredLengthCm,
//     requiredAreaM2, // ✅ إضافة
//     stickersPerMeter: stickersInfo.stickersPerMeter,
//     stickersPerRowAcrossRoll: stickersInfo.stickersPerRowAcrossRoll,
//     rowsPerMeter: stickersInfo.rowsPerMeter,
//     totalStickersProduced,
//     extraStickers,
//     utilizationRate: stickersInfo.utilizationRate,
//     wastePercentage: stickersInfo.wastePercentage,
//     isRotated: stickersInfo.isRotated,
//     rotationMessage: stickersInfo.rotationMessage,
//     savingsInfo,
//     comparisonData: stickersInfo.comparisonData,
//   };
// }

// // ====== 5. دالة حساب السعر الإجمالي (الأصلية) ======
// export function calculateTotalPrice(params: {
//   length: number; // سم
//   width: number; // سم
//   quantity: number;
//   shape: string;
//   cornerType?: string;
//   printType: string;
//   designCount: number;
//   material: string;
//   hasLamination: boolean;
//   hasEmbossing: boolean;
//   embossingColor?: string;
//   hasSilkScreen: boolean;
//   hasSpotUV: boolean;
//   assembly: string;
// }) {
//   const {
//     length,
//     width,
//     quantity,
//     shape,
//     cornerType,
//     printType,
//     designCount,
//     material,
//     hasLamination,
//     hasEmbossing,
//     embossingColor,
//     hasSilkScreen,
//     hasSpotUV,
//     assembly,
//   } = params;

//   // حساب المساحة
//   const areaPerStickerCm2 = length * width;
//   const areaPerStickerM2 = areaPerStickerCm2 / 10000;
//   const totalAreaM2 = areaPerStickerM2 * quantity;

//   // السعر الأساسي
//   let pricePerSqm = PRICING_CONFIG.basePricePerSqm;

//   // إضافة تكلفة نوع الطباعة
//   pricePerSqm += PRICING_CONFIG.printTypes[printType as keyof typeof PRICING_CONFIG.printTypes] || 0;

//   // إضافة تكلفة المادة
//   pricePerSqm += PRICING_CONFIG.materials[material as keyof typeof PRICING_CONFIG.materials] || 0;

//   // إضافة السلفان
//   if (hasLamination) {
//     pricePerSqm += PRICING_CONFIG.additionalCosts.lamination.perSqm;
//   }

//   // إضافة البصمة
//   if (hasEmbossing) {
//     pricePerSqm += PRICING_CONFIG.additionalCosts.embossing.perSqm;
//     if (embossingColor) {
//       pricePerSqm += PRICING_CONFIG.additionalCosts.embossing.colorCost;
//     }
//   }

//   // إضافة سلك سكرين
//   if (hasSilkScreen) {
//     pricePerSqm += PRICING_CONFIG.additionalCosts.silkScreen.perSqm;
//   }

//   // إضافة سبوت UV
//   if (hasSpotUV) {
//     pricePerSqm += PRICING_CONFIG.additionalCosts.spotUV.perSqm;
//   }

//   // حساب السعر حسب المساحة
//   let subtotal = totalAreaM2 * pricePerSqm;

//   // تطبيق نسبة الشكل
//   const shapeMultiplier = PRICING_CONFIG.shapes[shape as keyof typeof PRICING_CONFIG.shapes] || 1.0;
//   subtotal *= shapeMultiplier;

//   // إضافة تكلفة الحواف المستديرة
//   if (shape === 'square' && cornerType === 'rounded') {
//     subtotal += PRICING_CONFIG.roundedCorners.cost;
//   }

//   // إضافة تكلفة التصاميم الإضافية
//   if (designCount > 1) {
//     subtotal += (designCount - 1) * PRICING_CONFIG.designCost.perDesign;
//   }

//   // إضافة تكلفة التركيب
//   if (assembly === 'automatic') {
//     subtotal += PRICING_CONFIG.assembly.automatic;
//   }

//   // حساب الضريبة
//   const tax = subtotal * PRICING_CONFIG.taxRate;
//   const total = subtotal + tax;

//   // حساب سعر الوحدة
//   const unitPrice = quantity > 0 ? total / quantity : 0;

//   return {
//     totalAreaM2,
//     subtotal,
//     tax,
//     total,
//     unitPrice,
//   };
// }

// // ====== 6. دالة حساب التكلفة بناءً على طول الرول ======
// export function calculatePriceByRollLength(params: {
//   length: number;
//   width: number;
//   quantity: number;
//   shape: string;
//   cornerType?: string;
//   printType: string;
//   designCount: number;
//   material: string;
//   hasLamination: boolean;
//   hasEmbossing: boolean;
//   embossingColor?: string;
//   hasSilkScreen: boolean;
//   hasSpotUV: boolean;
//   assembly: string;
//   spacing?: number;
// }) {
//   // أولاً: نحسب كم طول رول نحتاج
//   const rollInfo = calculateRequiredRollLength({
//     length: params.length,
//     width: params.width,
//     quantity: params.quantity,
//     shape: params.shape,
//     spacing: params.spacing,
//   });

//   if (rollInfo.error) {
//     return {
//       error: rollInfo.error,
//       total: 0,
//       rotationMessage: null,
//     };
//   }

//   // ثانياً: نحسب السعر بناءً على المساحة الفعلية
//   const totalAreaM2 = rollInfo.requiredAreaM2;

//   // استخدام دالة الحساب الأصلية
//   const pricing = calculateTotalPrice({
//     ...params,
//     length: rollInfo.requiredLengthCm,
//     width: MACHINE_CONFIG.rollWidth,
//     quantity: 1,
//   });

//   return {
//     ...pricing,
//     rollInfo,
//     totalAreaM2,
//     pricePerSticker: params.quantity > 0 ? pricing.total / params.quantity : 0,
//     rotationMessage: rollInfo.rotationMessage,
//     savingsInfo: rollInfo.savingsInfo,
//   };
// }


// import { colorList, cornerTypesList, designCountList, embossingColors, materialsData, shapesList } from "../data/static";
// import { PRICING_CONFIG, calculateRequiredRollWidth } from "../config/pricingConfig";
// import { Settings } from "lucide-react";
// import { useMemo } from "react";

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
//   hasSilkScreen: boolean;
//   setHasSilkScreen: (value: boolean) => void;
//   hasSpotUV: boolean;
//   setHasSpotUV: (value: boolean) => void;
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
// }

// export function StickerDetailsSection(props: StickerDetailsSectionProps) {
//   const {
//     length, setLength,
//     width, setWidth,
//     quantity, setQuantity,
//     shape, setShape,
//     cornerType, setCornerType,
//     printType, setPrintType,
//     designCount, setDesignCount,
//     material, setMaterial,
//     hasLamination, setHasLamination,
//     hasEmbossing, setHasEmbossing,
//     embossingColor, setEmbossingColor,
//     hasSilkScreen, setHasSilkScreen,
//     hasSpotUV, setHasSpotUV,
//     assembly, setAssembly,
//     rollDirection, setRollDirection,
//     stickersPerMeter, 
//     gaping, setGaping,
//     rollWidth, setRollWidth, // ✅ إضافة
//     stickersAcrossWidth, // ✅ إضافة
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
//                 ملصق/المتر
//               </label>
//               <input
//                 type="text"
//                 value={stickersPerMeter || 0}
//                 disabled
//                 className="w-full bg-neutral-100 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium placeholder-neutral-400 cursor-not-allowed"
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
//                 placeholder="33"
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
//                   <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
//                     {requiredRollWidthInfo.requiredRollWidth} مم
//                   </div>
//                   <p className="text-[10px] text-neutral-600 mt-1">
//                     شامل الهوامش ({requiredRollWidthInfo.edgeMargin} مم)
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-neutral-700 mb-2">
//                     عرض الطباعة الفعلي (مم)
//                   </label>
//                   <div className="bg-gradient-to-r from-neutral-500 to-neutral-600 text-white rounded-lg px-3 py-2.5 text-sm font-bold text-center">
//                     {stickersAcrossWidth} 
//                   </div>
//                   <p className="text-[10px] text-neutral-600 mt-1">
//                    ملصق في العرض
//                   </p>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* تحذير  إذا عرض الرول المطلوب أكبر من المتاح */}
//           {requiredRollWidthInfo && parseFloat(rollWidth) > 0 && 
//            requiredRollWidthInfo.requiredRollWidth > parseFloat(rollWidth) && (
//             <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3 flex items-start gap-2">
//               <span className="text-red-600 text-lg">⚠️</span>
//               <div className="flex-1">
//                 <p className="text-sm font-bold text-red-800">تحذير: عرض الرول غير كافٍ!</p>
//                 <p className="text-xs text-red-700 mt-1">
//                   عرض الرول المطلوب ({requiredRollWidthInfo.requiredRollWidth} مم) أكبر من العرض المتاح ({rollWidth} مم).
//                   <br />
//                   يرجى: تقليل عرض الملصق، تقليل الجاب، تقليل عدد الملصقات في العرض، أو استخدام رول أعرض.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* معلومة عن المعادلة
//           <div className="mt-3 bg-white/50 rounded-lg p-2 text-[10px] text-neutral-600">
//             <strong>المعادلة:</strong> ((عرض الملصق + الجاب) × عدد الملصقات في العرض) + الهامش من الجنبين
//           </div> */}
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
//                 className={`px-4 py-3 rounded-lg border text-sm font-semibold transition-all ${
//                   shape === item.value
//                     ? 'bg-neutral-900 text-white border-neutral-900'
//                     : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
//                 }`}
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
//                   className={`px-3 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
//                     cornerType === item.value
//                       ? 'bg-neutral-900 text-white border-neutral-900'
//                       : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* نوع الطباعة */}
//         <div>
//           <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-neutral-900 rounded-full" />
//             نوع الطباعة
//           </h3>
          
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 grow">
//               {colorList.map((item) => (
//                 <button
//                   key={item.value}
//                   onClick={() => setPrintType(item.value)}
//                   className={`px-1 py-2 rounded-lg border transition-all ${
//                     printType === item.value
//                       ? 'bg-neutral-900 text-white border-neutral-900'
//                       : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
//                   }`}
//                 >
//                   <div className="font-bold text-sm">{item.label}</div>
//                   <div className="text-xs opacity-70 mt-0.5">{item.subtitle}</div>
//                 </button>
//               ))}
//             </div>

//             {printType && (
//               <div className="min-w-fit px-4 py-2 bg-neutral-100 rounded-lg border border-dashed border-neutral-400">
//                 <span className="text-xs text-neutral-500 block">السعر الإضافي:</span>
//                 <span className="text-lg font-bold text-neutral-900">
//                   {colorList.find(c => c.value === printType)?.price} ر.س
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* عدد التصاميم ونوع المادة */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-xs font-semibold text-neutral-600 mb-2">
//               عدد التصاميم
//             </label>
//             <div className="flex items-center gap-2">
//               <select
//                 value={designCount}
//                 onChange={(e) => setDesignCount(e.target.value)}
//                 className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:bg-white transition-all cursor-pointer"
//               >
//                 {designCountList.map((num) => (
//                   <option key={num.value} value={num.value}>
//                     {num.label} 
//                   </option>
//                 ))}
//               </select>
              
//               <div className="min-w-17.5 text-center py-2 px-1 bg-neutral-900 text-white rounded-lg text-xs font-bold">
//                 {designCountList.find(d => String(d.value) === String(designCount))?.price || 0} ر.س
//               </div>
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
//                 <option value="">اختر المادة...</option>

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
//               </select>

//               <div className="min-w-17.5 text-center py-2 px-1 bg-neutral-900 text-white rounded-lg text-xs font-bold">
//                 {[...materialsData.paper_materials, ...materialsData.foil_materials].find(m => m.value === material)?.price || 0} ر.س
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* التشطيبات الإضافية */}
//         <div>
//           <h3 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-neutral-900 rounded-full" />
//             التشطيبات الإضافية
//           </h3>

//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {/* السلفان */}
//               <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
//                 <div>
//                   <div className="text-sm font-semibold text-neutral-900">السلفان</div>
//                   <div className="text-xs text-neutral-500 mt-0.5">Lamination</div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {hasLamination && (
//                     <div className="flex items-center gap-1.5">
//                       <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
//                         +{PRICING_CONFIG.additionalCosts.lamination.perSqm} ر.س/م²
//                       </div>
//                     </div>
//                   )}
//                   <button
//                     type="button"
//                     title="إعدادات السلفان"
//                     aria-label="إعدادات السلفان"
//                     className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-all"
//                   >
//                     <Settings size={14} />
//                   </button>
//                   <button
//                     onClick={() => setHasLamination(!hasLamination)}
//                     className={`relative w-12 h-6 rounded-full transition-all ${
//                       hasLamination ? 'bg-neutral-900' : 'bg-neutral-300'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
//                       hasLamination ? 'right-1' : 'left-1'
//                     }`} />
//                   </button>
//                 </div>
//               </div>

//               {/* سلك سكرين */}
//               <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
//                 <div>
//                   <div className="text-sm font-semibold text-neutral-900">سلك سكرين</div>
//                   <div className="text-xs text-neutral-500 mt-0.5">silk screen</div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {hasSilkScreen && (
//                     <div className="flex items-center gap-1.5">
//                       <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
//                         +{PRICING_CONFIG.additionalCosts.silkScreen.perSqm} ر.س/م²
//                       </div>
//                     </div>
//                   )}
//                   <button
//                     type="button"
//                     title="إعدادات سلك السكرين"
//                     aria-label="إعدادات سلك السكرين"
//                     className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-all"
//                   >
//                     <Settings size={14} />
//                   </button>
//                   <button
//                     onClick={() => setHasSilkScreen(!hasSilkScreen)}
//                     className={`relative w-12 h-6 rounded-full transition-all ${
//                       hasSilkScreen ? 'bg-neutral-900' : 'bg-neutral-300'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
//                       hasSilkScreen ? 'right-1' : 'left-1'
//                     }`} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {/* البصمة */}
//               <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all">
//                 <div className="flex items-center justify-between mb-2">
//                   <div>
//                     <div className="text-sm font-semibold text-neutral-900">البصمة</div>
//                     <div className="text-xs text-neutral-500 mt-0.5">Embossing - تأثير بارز</div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {hasEmbossing && (
//                       <div className="flex items-center gap-1.5">
//                         <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
//                           {PRICING_CONFIG.additionalCosts.embossing.perSqm + (embossingColors.find(c => c.value === embossingColor)?.price || 0)} ر.س/م²
//                         </div>
//                       </div>
//                     )}
//                     <button
//                       type="button"
//                       title="إعدادات البصمة"
//                       aria-label="إعدادات البصمة"
//                       className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-all"
//                     >
//                       <Settings size={14} />
//                     </button>
//                     <button
//                       onClick={() => setHasEmbossing(!hasEmbossing)}
//                       className={`relative w-12 h-6 rounded-full transition-all ${
//                         hasEmbossing ? 'bg-neutral-900' : 'bg-neutral-300'
//                       }`}
//                     >
//                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
//                         hasEmbossing ? 'right-1' : 'left-1'
//                       }`} />
//                     </button>
//                   </div>
//                 </div>
                
//                 {hasEmbossing && (
//                   <div className="mt-3 pt-3 border-t border-neutral-200 animate-fadeIn">
//                     <label className="block text-xs font-semibold text-neutral-600 mb-2">لون البصمة</label>
//                     <select
//                       value={embossingColor}
//                       onChange={(e) => setEmbossingColor(e.target.value)}
//                       className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none transition-all"
//                     >
//                       {embossingColors.map((color) => (
//                         <option key={color.value} value={color.value}>
//                           {color.label} {color.price > 0 ? `( +${color.price} ر.س )` : ''}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </div>

//               {/* سبوت UV */}
//               <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 hover:bg-neutral-100 transition-all self-start">
//                 <div>
//                   <div className="text-sm font-semibold text-neutral-900">سبوت UV</div>
//                   <div className="text-xs text-neutral-500 mt-0.5">Spot UV - لمعان انتقائي</div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {hasSpotUV && (
//                     <div className="flex items-center gap-1.5">
//                       <div className="px-2.5 py-1 bg-neutral-900 text-white rounded-md text-[11px] font-semibold">
//                         +{PRICING_CONFIG.additionalCosts.spotUV.perSqm} ر.س/م²
//                       </div>
//                     </div>
//                   )}
//                   <button
//                     type="button"
//                     title="إعدادات سبوت UV"
//                     aria-label="إعدادات سبوت UV"
//                     className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-all"
//                   >
//                     <Settings size={14} />
//                   </button>
//                   <button
//                     onClick={() => setHasSpotUV(!hasSpotUV)}
//                     className={`relative w-12 h-6 rounded-full transition-all ${
//                       hasSpotUV ? 'bg-neutral-900' : 'bg-neutral-300'
//                     }`}
//                   >
//                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
//                       hasSpotUV ? 'right-1' : 'left-1'
//                     }`} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

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
//                   className={`px-3 py-3 rounded-lg border text-sm font-semibold transition-all ${
//                     assembly === item.value
//                       ? 'bg-neutral-900 text-white border-neutral-900'
//                       : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-neutral-600 mb-2">
//               اتجاه الرول
//             </label>
//             <select
//               value={rollDirection}
//               onChange={(e) => setRollDirection(e.target.value)}
//               className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-neutral-900 text-sm font-medium focus:border-neutral-900 focus:outline-none focus:bg-white transition-all cursor-pointer"
//             >
//               <option value="horizontal">أفقي (Horizontal)</option>
//               <option value="vertical">عمودي (Vertical)</option>
//               <option value="out-1">خارج 1 (Out 1)</option>
//               <option value="out-3">خارج 3 (Out 3)</option>
//               <option value="out-8">خارج 8 (Out 8)</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }
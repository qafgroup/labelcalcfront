// ===================================
// ملف حساب التسعير والطباعة - نسخة محدثة ومصححة
// ===================================

// ====== 1. إعدادات المكينة ======
import { colorList, embossingColors, materialsData } from "../data/static";
import { MACHINE_CONFIG, PRICING_CONFIG } from "./index";

// ====== 3. دالة حساب عرض الرول المطلوب ======
export function calculateRequiredRollWidth(params: {
  width: number; // عرض الملصق (mm)
  gaping: number; // المسافة بين الملصقات (mm)
  stickersAcrossWidth: number; // عدد الملصقات في العرض
  edgeMargin?: number; // الهامش من الجانبين (mm)
}) {
  const { width, gaping, stickersAcrossWidth, edgeMargin = MACHINE_CONFIG.edgeMargin } = params;
  
  // المعادلة: ((عرض الملصق + الجاب) * عدد الملصقات في العرض) + الهامش من الجنبين
  const requiredWidth = ((width + gaping) * stickersAcrossWidth) + (edgeMargin * 2);
    
  return {
    requiredRollWidth: Math.ceil(requiredWidth * 10) / 10, // تقريب لأقرب 0.1
    effectivePrintWidth: requiredWidth - (edgeMargin * 2),
    edgeMargin: edgeMargin * 2,
  };
}

// ====== 4. دالة حساب عدد الملصقات في المتر ======
export function calculateStickersPerSquareMeter(params: { /// ====================
  length: number; // طول الملصق (mm)
  width: number; // عرض الملصق (mm)
  shape: string;
  gaping: number; // المسافة بين الملصقات (mm)
  rollWidth?: number; // عرض الرول المتاح (mm)
}) {
  const { length, width, shape, gaping, rollWidth = MACHINE_CONFIG.rollWidth } = params;

  // عرض الرول الفعلي (بعد خصم الهوامش)
  const effectiveRollWidth = rollWidth - (MACHINE_CONFIG.edgeMargin * 2);
  
  // المساحة الفعلية مع المسافات
  const effectiveLength = length + gaping;/// طول صف واحد (ملصق + جاب)
  const effectiveWidth = width + gaping;/// عرض صف واحد (ملصق + جاب)

  // حساب كم ملصق يدخل بعرض الرول
  const stickersPerRowAcrossRoll = Math.floor(effectiveRollWidth / effectiveWidth);

  // التأكد أن الملصق يدخل في الرول
  if (stickersPerRowAcrossRoll === 0) {
    return {
      stickersPerSqm: 0,
      stickersPerMeter: 0,
      stickersPerRowAcrossRoll: 0,
      utilizationRate: 0,
      
      wastePercentage: 0,
      error: `❌ الملصق أعرض من الرول!\n` +
             `عرض الرول المتاح: ${effectiveRollWidth.toFixed(2)} سم\n` +
             `عرض الملصق مع الجاب: ${effectiveWidth.toFixed(2)} سم\n` +
             `يجب تصغير العرض أو زيادة عرض الرول`,
    };
  }

  // حساب كم صف يدخل في المتر الطولي
  const rowsPerMeter = Math.floor(1000/ effectiveLength);

  // إجمالي الملصقات في المتر المربع  
  const stickersPerMeter = stickersPerRowAcrossRoll * rowsPerMeter;

  // حساب نسبة الاستفادة
  let actualStickerArea = length * width;
  
  if (shape === 'circle') {
    const radius = Math.min(length, width) / 2;
    actualStickerArea = Math.PI * radius * radius;
  } else if (shape === 'custom') {
    actualStickerArea = actualStickerArea * 0.85;
  }

  const totalUsedArea = stickersPerMeter * actualStickerArea;
  const rollAreaPerMeter = effectiveRollWidth * 100;
  const utilizationRate = (totalUsedArea / rollAreaPerMeter) * 100;
  const wastePercentage = 100 - utilizationRate;

  return {
    stickersPerSqm: Math.floor(stickersPerMeter),
    stickersPerMeter: Math.floor(stickersPerMeter),
    stickersPerRowAcrossRoll,
    rowsPerMeter,
    utilizationRate: Math.round(utilizationRate * 100) / 100,
    wastePercentage: Math.round(wastePercentage * 100) / 100,
    effectiveRollWidth,
  
  };
}
// ====== 5. دالة حساب الطول المطلوب من الرول (الإدخال بالملي) ======
export function calculateRequiredRollLength(params: {///===ن==نخنة
  length: number; // طول الملصق (mm)
  width: number;  // عرض الملصق (mm)
  quantity: number;
  shape: string;
  gaping: number; // الجاب من كل طرف (mm)
  rollWidth?: number; // عرض الرول (mm)
}) {
  const stickersInfo = calculateStickersPerSquareMeter({
    length: params.length,
    width: params.width,
    shape: params.shape,
    gaping: params.gaping,
    rollWidth: params.rollWidth,
  });

  if (stickersInfo.error) {
    return {
      error: stickersInfo.error,
      requiredLengthMeters: 0,
      requiredLengthMm: 0,
      requiredAreaM2: 0,
      stickersPerMeter: 0,
      totalStickersProduced: 0,
      extraStickers: 0,
      utilizationRate: 0,
      wastePercentage: 100,
    };
  }

  // === القيم بالملي مباشرة ===
  const labelLengthMm = params.length;
  const gapMm = params.gaping ;
  const labelsAcross = stickersInfo.stickersPerRowAcrossRoll;

  // === المعادلة الصناعية المباشرة ===
  const requiredLengthMeters = Math.ceil(
    ((labelLengthMm + gapMm) * (params.quantity / labelsAcross)) / 1000
  );

  const requiredLengthMm = requiredLengthMeters * 1000;// تحويلة مرة اخرى الى ملي 

  // === حساب المساحة ===
  const rollWidthMeters =
    (params.rollWidth || MACHINE_CONFIG.rollWidth) / 1000;

  const requiredAreaM2 = requiredLengthMeters * rollWidthMeters;/// بالمتر المربع 

  const totalStickersProduced =
    requiredLengthMeters * stickersInfo.stickersPerMeter;/// عدد الملصقات الكلي 

  const extraStickers = totalStickersProduced - params.quantity;/// عدد الملصقات الزائدة 

  return {
    requiredLengthMeters,
    requiredLengthMm,
    requiredAreaM2,
    stickersPerMeter: stickersInfo.stickersPerMeter,
    stickersPerRowAcrossRoll: labelsAcross,
    rowsPerMeter: stickersInfo.rowsPerMeter,
    totalStickersProduced,
    extraStickers,
    utilizationRate: stickersInfo.utilizationRate,
    wastePercentage: stickersInfo.wastePercentage,
  };
}


// ====== 6. دالة حساب السعر الإجمالي ======
export function calculateTotalPrice(params: {
  quantity: number;
  shape: string;
  cornerType?: string;
  printType: string;
  designCount: number;
  material: string;
  hasLamination: boolean;
  hasEmbossing: boolean;
  embossingColor?: string;
  hasSilkScreen: boolean;
  hasSpotUV: boolean;
  assembly: string;
  requiredAreaM2: number;
}) {
  const {
    quantity,
    shape,
    cornerType,
    printType,
    designCount,
    material,
    hasLamination,
    hasEmbossing,
    embossingColor,
    hasSilkScreen,
    hasSpotUV,
    assembly,
    requiredAreaM2,
  } = params;

  // السعر الأساسي
  let pricePerSqm = PRICING_CONFIG.basePricePerSqm;

  // إضافة تكلفة نوع الطباعة
  pricePerSqm +=parseFloat(colorList.find(item => item.value === printType)?.price ?? '0');

  // إضافة تكلفة المادة
 const singalMatPrice = parseFloat(
  materialsData.paper_materials.find(item => item.value === material)?.price ??
  materialsData.foil_materials.find(item => item.value === material)?.price ??
  '0'
);

  const materialCost = singalMatPrice * requiredAreaM2 + (requiredAreaM2 * 0.1);
  // إضافة السلفان
  if (hasLamination) {
    pricePerSqm += PRICING_CONFIG.additionalCosts.lamination.perSqm;
  }

  // إضافة البصمة
  if (hasEmbossing) {
    pricePerSqm += embossingColors.find(item => item.value === embossingColor)?.price ?? 0;
   
  }

  // إضافة سلك سكرين
  if (hasSilkScreen) {
    pricePerSqm += PRICING_CONFIG.additionalCosts.silkScreen.perSqm;
  }

  // إضافة سبوت UV
  if (hasSpotUV) {
    pricePerSqm += PRICING_CONFIG.additionalCosts.spotUV.perSqm;
  }

  // حساب السعر حسب المساحة
  let subtotal = requiredAreaM2 * pricePerSqm;

  // تطبيق نسبة الشكل
  const shapeMultiplier = PRICING_CONFIG.shapes[shape as keyof typeof PRICING_CONFIG.shapes] || 1.0;
  subtotal *= shapeMultiplier;

  // إضافة تكلفة الحواف المستديرة
  if (shape === 'square' && cornerType === 'rounded') {
    subtotal += PRICING_CONFIG.roundedCorners.cost;
  }

  // إضافة تكلفة التصاميم الإضافية
  if (designCount > 1) {
    subtotal += (designCount - 1) * PRICING_CONFIG.designCost.perDesign;
  }

  // إضافة تكلفة التركيب
  if (assembly === 'automatic') {
    subtotal += PRICING_CONFIG.assembly.automatic;
  }

  // حساب الضريبة
  const tax = subtotal * PRICING_CONFIG.taxRate;
  const total = subtotal + tax;

  // حساب سعر الوحدة
  const unitPrice = quantity > 0 ? total / quantity : 0;

  return {
    requiredAreaM2,
    materialCost,
    subtotal,
    tax,
    total,
    unitPrice,
  };
}

// ====== 7. دالة حساب التكلفة بناءً على طول الرول ======
export function calculatePriceByRollLength(params: {
  length: number;
  width: number;
  quantity: number;
  shape: string;
  cornerType?: string;
  printType: string;
  designCount: number;
  material: string;
  hasLamination: boolean;
  hasEmbossing: boolean;
  embossingColor?: string;
  hasSilkScreen: boolean;
  hasSpotUV: boolean;
  assembly: string;
  gaping?: number; // ✅ تصحيح
  rollWidth?: number;
}) {
  // أولاً: نحسب كم طول رول نحتاج
  const rollInfo = calculateRequiredRollLength({
    length: params.length,
    width: params.width,
    quantity: params.quantity,
    shape: params.shape,
    gaping: params.gaping ?? 3, // ✅ تصحيح
    rollWidth: params.rollWidth,
  });

  if (rollInfo.error) {
    return {
      error: rollInfo.error,
      total: 0,
      rotationMessage: null,
    };
  }

  // ثانياً: نحسب السعر بناءً على المساحة الفعلية
  const totalAreaM2 = rollInfo.requiredAreaM2;

  // استخدام دالة الحساب الأصلية
  const pricing = calculateTotalPrice({
    ...params,
    quantity: 1,
    requiredAreaM2: totalAreaM2
  });

  return {
    ...pricing,
    rollInfo,
    totalAreaM2,
    pricePerSticker: params.quantity > 0 ? pricing.total / params.quantity : 0,
  };
}
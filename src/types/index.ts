// ===================================
// أنواع البيانات (Types)
// ===================================

/**
 * معلومات الملصق الأساسية
 */
export interface StickerDimensions {
  length: number;      // الطول بالملي متر
  width: number;       // العرض بالملي متر
  quantity: number;    // الكمية المطلوبة
  shape: string;       // الشكل: circle, square, rectangle, custom
  cornerType?: string; // نوع الزوايا: rounded أو sharp
  gaping: number;      // المسافة بين الملصقات بالملي متر
}

/**
 * معلومات الطباعة والمواد
 */
export interface PrintingSpecs {
  printType: string;       // نوع الطباعة: cmyk-4, colors-5, إلخ
  material: string;        // المادة: vinyl-white, chrome, إلخ
  hasLamination: boolean;  // هل يوجد سلفان؟
  hasEmbossing: boolean;   // هل يوجد بصمة؟
  embossingColor?: string; // لون البصمة
  hasSilkScreen: boolean;  // هل يوجد سلك سكرين؟
  hasSpotUV: boolean;      // هل يوجد سبوت UV؟
  designCount: number;     // عدد التصاميم المختلفة
  assembly: string;        // نوع التركيب: manual أو automatic
}

/**
 * معلومات الرول
 */
export interface RollInfo {
  requiredLengthMeters: number;    // الطول المطلوب بالمتر
  requiredLengthMm: number;        // الطول المطلوب بالملي متر
  requiredAreaM2: number;          // المساحة المطلوبة بالمتر المربع
  stickersPerMeter: number;        // عدد الملصقات في المتر
  stickersPerRowAcrossRoll: number; // عدد الملصقات في الصف الواحد
  rowsPerMeter: number;            // عدد الصفوف في المتر
  totalStickersProduced: number;   // إجمالي الملصقات المنتجة
  extraStickers: number;           // الملصقات الزائدة
  utilizationRate: number;         // نسبة الاستفادة من الرول
  wastePercentage: number;         // نسبة الهدر
  error?: string;                  // رسالة خطأ إن وجدت
}

/**
 * معلومات التسعير
 */
export interface PricingResult {
  totalAreaM2: number;    // المساحة الإجمالية
  subtotal: number;       // السعر قبل الضريبة
  tax: number;            // الضريبة
  total: number;          // السعر النهائي
  unitPrice: number;      // سعر الوحدة الواحدة
  pricePerSticker?: number; // سعر الملصق الواحد
  rollInfo?: RollInfo;    // معلومات الرول
}

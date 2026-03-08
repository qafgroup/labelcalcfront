import { Receipt } from 'lucide-react';

interface OrderSummaryProps {
  // بيانات الرول والطباعة
  requiredLengthMeters?: number;
  stickersPerMeter?: number;
  requiredAreaM2?: number; 
  // بيانات السعر (القديمة)
  MatCost: number;
  wasteAreaM2: number;
  subtotal: number;
  tax: number;
  total: number;
  onSubmit: () => void;
}

export function OrderSummary({
  requiredLengthMeters,
  stickersPerMeter,
  requiredAreaM2,
  MatCost,
  wasteAreaM2,
  subtotal,
  tax,
  total,
  onSubmit,
}: OrderSummaryProps) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-neutral-200">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-1">ملخص التكلفة</h2>
          <p className="text-xs text-neutral-500">حساب تلقائي ودقيق</p>
          <div className="h-px bg-linear-to-r from-neutral-300 via-neutral-200 to-transparent mt-3" />
        </div>
        {/* معلومات الرول والطباعة */}
        {requiredLengthMeters !== undefined && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-neutral-700 mb-3">معلومات الطباعة</h3>
            
            {/* عدد الأمتار المطلوبة - مميز */}
            <div className="mb-3 bg-neutral-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-black">عدد الأمتار المطلوبة </span>
                <div className="bg-neutral-500 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-[12px] font-bold text-white">م² </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-black text-black">
                  {requiredAreaM2?.toFixed(2)}
                </div>
                <div className="text-lg font-bold text-black">متر مربع</div>
              </div>
              <div className="text-xs text-black mt-2 font-medium">
                = {(requiredLengthMeters ).toFixed(0)} متر  طولي
              </div>
            </div>


          </div>
        )}

        <div className="space-y-3 mb-6">
          {/* صف 1: عدد الأمتار + الهدر + إجمالي الأمتار */}
          <div className="grid grid-cols-3 gap-2">
            {/* عدد الأمتار */}
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
              <div className="mb-1">
                <span className="text-[10px] font-semibold text-neutral-600 block">تكلفة المادة الخام</span>
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {MatCost.toFixed(2)}
              </div>
              <span className="text-[10px] text-neutral-500">ر.س</span>
            </div>

            {/* الهدر */}
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
              <div className="mb-1">
                <span className="text-[10px] font-semibold text-neutral-600 block">الهدر</span>
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {wasteAreaM2.toFixed(2)}
              </div>
              <span className="text-[10px] text-neutral-500">م²</span>
            </div>

            {/* إجمالي الأمتار */}
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
              <div className="mb-1">
                <span className="text-[10px] font-semibold text-neutral-600 block">عدد الملصقات في  </span>
              </div>
              <div className="text-lg font-bold text-neutral-900">
                {stickersPerMeter}
              </div>
              <span className="text-[10px] text-neutral-500">م²</span>
            </div>
          </div>

          {/* فاصل */}
          <div className="py-1">
            <div className="h-px bg-neutral-200" />
          </div>

          {/* صف 2: سعر المتر المربع + المجموع قبل الضريبة */}
          <div className="grid grid-cols-2 gap-2">
            {/* المجموع قبل الضريبة */}
            <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-neutral-600">المجموع قبل الضريبة</span>
              </div>
              <div className="text-xl font-bold text-neutral-900">
                {subtotal.toFixed(2)}
              </div>
              <span className="text-xs text-neutral-500 font-medium">ريال</span>
            </div>
             {/* صف 3: الضريبة */}
          <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-neutral-600">ضريبة القيمة المضافة</span>
              <span className="text-xs font-bold text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200">15%</span>
            </div>
            <div className="text-xl font-bold text-neutral-900">
              {tax.toFixed(2)} <span className="text-sm text-neutral-500 font-medium">ريال</span>
            </div>
          </div>
          </div>

         

          {/* فاصل */}
          <div className="py-2">
            <div className="h-px bg-neutral-300" />
          </div>

          {/* الإجمالي النهائي */}
          <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-neutral-400">الإجمالي النهائي</span>
              <span className="text-xs text-neutral-500">شامل الضريبة</span>
            </div>
            <div className="text-2xl font-black text-white">
              {total.toFixed(2)}
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-medium">ريال سعودي</div>
          </div>
        </div>

        {/* زر إرسال العرض */}
        <button
          onClick={onSubmit}
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-98"
        >
          <Receipt className="w-4 h-4" />
          <span>إرسال العرض للعميل</span>
        </button>
      </div>
    </div>
  );
}
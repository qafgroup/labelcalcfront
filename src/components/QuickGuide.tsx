import {  X } from 'lucide-react';
import { useState } from 'react';

export function QuickGuide() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-7 mb-6 shadow-sm border border-neutral-200 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-lg md:text-xl font-bold text-neutral-900 mb-1">
              دليل سريع للاستخدام
            </h3>
            <p className="text-xs text-neutral-500">خطوات بسيطة لحساب التكلفة</p>
            <div className="h-px bg-linear-to-r from-neutral-300 via-neutral-200 to-transparent mt-3" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '1',
                title: 'بيانات العميل',
                desc: 'أدخل معلومات العميل والمندوب',
              },
              {
                num: '2',
                title: 'المواصفات',
                desc: 'حدد المقاس والشكل والخيارات',
              },
              {
                num: '3',
                title: 'السعر النهائي',
                desc: 'حساب تلقائي فوري للتكلفة',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="relative bg-neutral-50 rounded-lg p-4 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 bg-neutral-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.num}
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    {item.title}
                  </h4>
                </div>
                
                {/* Description */}
                <p className="text-neutral-600 text-xs leading-relaxed pr-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all"
          aria-label="إخفاء الدليل"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
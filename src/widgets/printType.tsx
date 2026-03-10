import { Droplets, Percent, Settings } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { colorList } from '../data/static';
import ChangeChoosesPrice from './ChangeChoosesPrice';

export function PrintTypeSection() {
 const [printType, setPrintType] = useState('cmyk-4');
  const [whiteInkEnabled, setWhiteInkEnabled] = useState(false);
  const [whiteInkCoverage, setWhiteInkCoverage] = useState(100);
  const [whiteInkPrice, setWhiteInkPrice] = useState(3);

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      
      {/* 1. نوع الطباعة الأساسي */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            نوع الطباعة
          </h3>
        
        <div className="flex flex-wrap items-end gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 grow">
            {colorList.map((item) => (
              <button
                key={item.value}
                onClick={() => setPrintType(item.value)}
                className={`group relative py-2 text-center rounded-xl border transition-all duration-200 text-right ${
                  printType === item.value
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-200'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="font-bold text-center text-sm">{item.label}</div>
                <div className={`text-[12px] text-center  ${printType === item.value ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {item.subtitle}
                </div>
                {printType === item.value && (
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {printType && (
              <div className="min-w-fit px-4 py-2 bg-neutral-100 rounded-lg border border-dashed border-neutral-400 items-center">
                <span className="text-xs text-neutral-500 block">سعر المتر المربع:</span>
                <span className="text-lg font-bold text-neutral-900">
                  {colorList.find(c => c.value === printType)?.price} ر.س
                </span>
                <ChangeChoosesPrice listTypeOfData={colorList} />
              </div>
            )}
        </div>
      </div>

      {/* 2. خيار الحبر الأبيض (الميزة الجديدة) */}
      <div className=" border-t border-neutral-50">
        <div 
          onClick={() => setWhiteInkEnabled(!whiteInkEnabled)}
          className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2 ${
            whiteInkEnabled 
            ? 'bg-blue-50/30 border-blue-200 shadow-sm' 
            : 'bg-neutral-50 border-transparent hover:border-neutral-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              whiteInkEnabled ? 'bg-blue-600 text-white rotate-12' : 'bg-white text-neutral-400'
            }`}>
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900">إضافة حبر أبيض (White Ink)</h4>
              <p className="text-xs text-neutral-500 mt-0.5">تغطية إضافية تحت أو فوق الألوان</p>
            </div> 
          </div>
          
          <div className={`w-12 h-6 rounded-full relative transition-all ${whiteInkEnabled ? 'bg-black' : 'bg-neutral-300'}`}>
           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${whiteInkEnabled ? 'left-1' : 'left-7'}`} />
          </div>
        </div>

        {/* حقل نسبة التغطية وسعر المتر المربع - يظهر فقط عند تفعيل الحبر الأبيض */}
        {whiteInkEnabled && (
          <div className="mt-4 mr-4 pr-6 border-r-2 border-blue-300 animate-in slide-in-from-right-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* سعر المتر المربع للحبر الأبيض */}
              <div className="group bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100 p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-blue-400 to-blue-600 rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-neutral-700">سعر المتر المربع</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-neutral-900">{whiteInkPrice}</span>
                    <span className="text-sm font-semibold text-neutral-400">ر.س</span>
                  </div>
                  <button
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-blue-200 text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:cursor-pointer transition-all duration-200 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      Swal.fire({
                        title: 'تعديل سعر الحبر الأبيض',
                        html: `
                          <div style="text-align:right; direction: rtl; font-family: inherit;">
                            <label style="font-weight: bold; display: block; margin-bottom: 5px;">سعر المتر المربع الجديد (ر.س)</label>
                            <input
                              id="whiteInkPriceInput"
                              type="number"
                              step="0.01"
                              value="${whiteInkPrice}"
                              class="swal2-input"
                              style="width: 100%; margin: 10px 0;"
                            />
                          </div>
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'تحديث السعر',
                        cancelButtonText: 'إلغاء',
                        preConfirm: () => {
                          const priceInput = document.getElementById('whiteInkPriceInput') as HTMLInputElement;
                          const price = Number(priceInput.value);
                          if (!priceInput.value || price < 0) {
                            Swal.showValidationMessage('الرجاء إدخال سعر صحيح');
                            return false;
                          }
                          return { newPrice: price };
                        },
                      }).then((result) => {
                        if (result.isConfirmed && result.value) {
                          setWhiteInkPrice(result.value.newPrice);
                        }
                      });
                    }}
                  >
                    <Settings size={14} />
                  </button>
                </div>
              </div>

              {/* نسبة التغطية */}
              <div className="group bg-gradient-to-br from-gray-50/80 to-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-gray-400 to-gray-600 rounded-t-2xl" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Percent className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-neutral-700">نسبة التغطية</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={whiteInkCoverage}
                      onChange={(e) => setWhiteInkCoverage(Number(e.target.value))}
                      className="w-full bg-white border border-gray-200 h-11 rounded-xl pl-10 pr-4 text-lg font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 outline-none transition-all"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">%</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  * الافتراضي: تغطية كاملة 100%
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
{/* <div>
          <h3 className="text-sm font-bold text-neutral-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-neutral-900 rounded-full" />
            نوع الطباعة
          </h3>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 grow">
              {colorList.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setPrintType(item.value)}
                  className={`py-2 rounded-lg border transition-all ${printType === item.value
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                    }`}
                >
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-xs mt-0.5">{item.subtitle}</div>
                </button>
              ))}
            </div>

            {printType && (
              <div className="min-w-fit px-4 py-2 bg-neutral-100 rounded-lg border border-dashed border-neutral-400 items-center">
                <span className="text-xs text-neutral-500 block">السعر الإضافي:</span>
                <span className="text-lg font-bold text-neutral-900">
                  {colorList.find(c => c.value === printType)?.price} ر.س
                </span>
                <ChangeChoosesPrice listTypeOfData={colorList} />
              </div>
            )}
          </div>
        </div> */}
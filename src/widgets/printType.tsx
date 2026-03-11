import { ChevronDown, Percent, Settings } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { colorList } from '../data/static';
import ChangeChoosesPrice from './ChangeChoosesPrice';

export function PrintTypeSection() {
  const [printEnabled, setPrintEnabled] = useState(true);
  const [printType, setPrintType] = useState('cmyk-4');
  const [whiteInkEnabled, setWhiteInkEnabled] = useState(false);
  const [whiteInkCoverage, setWhiteInkCoverage] = useState(100);
  const [whiteInkPrice, setWhiteInkPrice] = useState(3);

  // جلب سعر الخيار المحدد حالياً
  const currentPrintPrice = colorList.find(c => c.value === printType)?.price || 0;

  return (
    <div className="space-y-1 bg-gray-50 p-2 rounded-lg" style={{ direction: 'rtl' }}>
      
      {/* 1. سطر الطباعة الأساسي */}
      <div className="flex items-center gap-2 bg-white p-1 border border-gray-200 rounded-md shadow-sm">
        {/* الزر القائد (يمين) */}
        <button
          onClick={() => setPrintEnabled(!printEnabled)}
          className={`px-8 py-1.5 rounded text-sm font-bold transition-all min-w-[120px] ${
            printEnabled ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
          }`}
        >
          الطباعة
        </button>

        {/* الحقول الوسطى */}
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          {printEnabled && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300 flex-1 py-2">
              <div className="relative flex-1 max-w-[250px]">
                <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium ">نوع الطباعة</span>
                <select
                  value={printType}
                  onChange={(e) => setPrintType(e.target.value)}
                  className="w-full h-9 pr-3 pl-8 bg-white border border-gray-300 rounded text-xs font-bold outline-none focus:border-black transition-all appearance-none"
                >
                  {colorList.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              
              {/* زر تغيير أسعار الوان الطباعة */}
              <div className="shrink-0 scale-90">
                <ChangeChoosesPrice listTypeOfData={colorList} />
              </div>
            </div>
          )}
        </div>

        {/* السعر (يسار) */}
        <div className="text-sm font-bold text-gray-700 min-w-[100px] px-3 border-r border-gray-100 text-left">
          {printEnabled ? currentPrintPrice : "0.00"} ر.س
        </div>
      </div>

      {/* 2. سطر الحبر الأبيض */}
      <div className="flex items-center gap-2 bg-white p-1 border border-gray-200 rounded-md shadow-sm">
        {/* الزر القائد (يمين) */}
        <button
          onClick={() => setWhiteInkEnabled(!whiteInkEnabled)}
          className={`px-8 py-1.5 rounded text-sm font-bold transition-all min-w-[120px] ${
            whiteInkEnabled ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
          }`}
        >
          حبر أبيض
        </button>

        {/* الحقول الوسطى */}
        <div className="flex-1 flex items-center gap-4 overflow-hidden">
          {whiteInkEnabled && (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300 py-2">
              {/* حقل نسبة التغطية */}
              <div className="relative w-32">
                <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">نسبة التغطية</span>
                <input
                  type="number"
                  value={whiteInkCoverage}
                  onChange={(e) => setWhiteInkCoverage(Number(e.target.value))}
                  className="w-full h-9 pr-3 pl-8 border border-gray-300 rounded text-xs font-bold outline-none focus:border-black"
                />
                <Percent className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              </div>

              {/* حقل سعر المتر */}
              <div className="relative w-32">
                <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">سعر المتر</span>
                <div className="flex items-center justify-between h-9 px-3 border border-gray-200 rounded bg-gray-50 text-xs font-bold text-gray-600">
                  <span>{whiteInkPrice}</span>
                  <Settings 
                    size={14} 
                    className="cursor-pointer text-gray-400 hover:text-black transition-colors" 
                    onClick={() => {
                      Swal.fire({
                        title: 'تعديل سعر المتر للأبيض',
                        input: 'number',
                        inputValue: whiteInkPrice,
                        confirmButtonText: 'تحديث',
                        confirmButtonColor: '#000'
                      }).then(r => r.isConfirmed && setWhiteInkPrice(Number(r.value)))
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* السعر (يسار) */}
        <div className="text-sm font-bold text-gray-700 min-w-[100px] px-3 border-r border-gray-100 text-left">
          {whiteInkEnabled ? (whiteInkPrice * (whiteInkCoverage/100)).toFixed(2) : "0.00"} ر.س
        </div>
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
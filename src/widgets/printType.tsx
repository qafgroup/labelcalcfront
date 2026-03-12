import { ChevronDown, Percent, Settings } from 'lucide-react';
import Swal from 'sweetalert2';
import { colorList } from '../data/static';
import ChangeChoosesPrice from './ChangeChoosesPrice';

// ─── Row مشترك — Desktop: سطر واحد | Mobile: حقول تنزل تحت ─────────────────
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
      <div className="flex items-center gap-2 p-1">
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

        <div className="text-sm font-bold text-gray-700 min-w-[110px] px-3 border-r border-gray-100 text-left shrink-0">
          {priceSlot ?? <span className="text-gray-300">—</span>}
        </div>
      </div>

      {/* حقول موبايل فقط */}
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

interface PrintTypeSectionProps {
  printEnabled: boolean; setPrintEnabled: (v: boolean) => void;
  printType: string; setPrintType: (v: string) => void;
  whiteInkEnabled: boolean; setWhiteInkEnabled: (v: boolean) => void;
  whiteInkCoverage: number; setWhiteInkCoverage: (v: number) => void;
  whiteInkPrice: number; setWhiteInkPrice: (v: number) => void;
}

export function PrintTypeSection({
  printEnabled, setPrintEnabled,
  printType, setPrintType,
  whiteInkEnabled, setWhiteInkEnabled,
  whiteInkCoverage, setWhiteInkCoverage,
  whiteInkPrice, setWhiteInkPrice,
}: PrintTypeSectionProps) {

  const currentPrintPrice = colorList.find(c => c.value === printType)?.price || 0;

  return (
    <>
      {/* ── ١. الطباعة ── */}
      <Row
        label="الطباعة"
        isActive={printEnabled}
        onToggle={() => setPrintEnabled(!printEnabled)}
        priceSlot={printEnabled
          ? <span className="text-xs sm:text-sm font-bold">{currentPrintPrice} ر.س</span>
          : undefined
        }
      >
        {/* نوع الطباعة */}
        <div className="relative w-full sm:flex-1 sm:max-w-[250px]">
          <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">نوع الطباعة</span>
          <select
            value={printType}
            onChange={(e) => setPrintType(e.target.value)}
            className="w-full h-9 pr-3 pl-8 bg-white border border-gray-300 rounded text-xs font-bold outline-none focus:border-black transition-all appearance-none"
            style={{ direction: "rtl" }}
          >
            {colorList.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        {/* زر تغيير أسعار الطباعة */}
        <div className="shrink-0 scale-90">
          <ChangeChoosesPrice listTypeOfData={colorList} />
        </div>
      </Row>

      {/* ── ٢. الحبر الأبيض ── */}
      <Row
        label="حبر أبيض"
        isActive={whiteInkEnabled}
        onToggle={() => setWhiteInkEnabled(!whiteInkEnabled)}
        priceSlot={whiteInkEnabled
          ? <span className="text-xs sm:text-sm font-bold">{(whiteInkPrice * (whiteInkCoverage / 100)).toFixed(2)} ر.س</span>
          : undefined
        }
      >
        {/* نسبة التغطية */}
        <div className="relative w-full sm:w-32">
          <span className="absolute -top-2 right-3 bg-white px-1 text-[10px] text-gray-400 z-10 font-medium">نسبة التغطية</span>
          <input
            type="number"
            value={whiteInkCoverage}
            onChange={(e) => setWhiteInkCoverage(Number(e.target.value))}
            className="w-full h-9 pr-3 pl-8 border border-gray-300 rounded text-xs font-bold outline-none focus:border-black"
          />
          <Percent className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
        </div>

        {/* سعر المتر */}
        <div className="relative w-full sm:w-32">
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
                  confirmButtonColor: '#000',
                }).then(r => r.isConfirmed && setWhiteInkPrice(Number(r.value)));
              }}
            />
          </div>
        </div>
      </Row>
    </>
  );
}
import { CheckCircle } from 'lucide-react';

interface CalculationIndicatorProps {
  isValid: boolean;
}

export function CalculationIndicator({ isValid }: CalculationIndicatorProps) {
  return (
    <div className={`fixed bottom-24 left-6 z-40 transition-all duration-500 transform ${isValid ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
      <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-green-300">
        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-sm">✓ البيانات كاملة</div>
          <div className="text-xs text-green-100">جاهز للإرسال</div>
        </div>
      </div>
    </div>
  );
}

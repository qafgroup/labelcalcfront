import { User, Calendar, Phone, UserCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useState } from 'react';

interface CustomerInfoSectionProps {
  date: string;
  customerName: string;
  setCustomerName: (value: string) => void;
  customerNumber: string;
  setCustomerNumber: (value: string) => void;
  salesRep: string;
  setSalesRep: (value: string) => void;
  salesRepPhone: string;
  setSalesRepPhone: (value: string) => void;
}

export function CustomerInfoSection({
  date,
  customerName,
  setCustomerName,
  customerNumber,
  setCustomerNumber,
  salesRep,
  setSalesRep,
  salesRepPhone,
  setSalesRepPhone,
}: CustomerInfoSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`bg-white rounded-2xl transition-all duration-300 border ${isCollapsed ? 'border-gray-100 shadow-sm' : 'border-gray-200 shadow-md'}`}>
      
      {/* Header - قابل للضغط للطي */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between p-5 cursor-pointer select-none"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl transition-colors ${isCollapsed ? 'bg-gray-50 text-gray-400' : 'bg-gray-900 text-white'}`}>
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">بيانات العميل والطلب</h2>
            {isCollapsed && (
              <p className="text-xs text-gray-500 mt-0.5 animate-in fade-in duration-500">
                العميل: <span className="font-semibold text-gray-700">{customerName || '---'}</span> • 
                المندوب: <span className="font-semibold text-gray-700">{salesRep || '---'}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
           {!isCollapsed && (
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-gray-600">{date}</span>
            </div>
          )}
          <div className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            {isCollapsed ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </div>

      {/* Body - الحقول */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
        <div className="p-6 pt-0 border-t border-gray-50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            
            {/* حقل اسم العميل */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                اسم العميل
                <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسم العميل الرباعي"
                  className="w-full bg-gray-50/50 border border-gray-200 h-11 rounded-xl pr-10 pl-4 text-sm focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* حقل رقم العميل */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                رقم التواصل
                <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="tel"
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-gray-50/50 border border-gray-200 h-11 rounded-xl pr-10 pl-4 text-sm focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* حقل اسم المندوب */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                المندوب المسؤول
              </label>
              <div className="relative group">
                <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  value={salesRep}
                  onChange={(e) => setSalesRep(e.target.value)}
                  placeholder="اسم المندوب"
                  className="w-full bg-gray-50/50 border border-gray-200 h-11 rounded-xl pr-10 pl-4 text-sm focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all outline-none"
                />
              </div>
            </div>

            {/* حقل جوال المندوب */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                جوال المندوب
              </label>
              <div className="relative group">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="tel"
                  value={salesRepPhone}
                  onChange={(e) => setSalesRepPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-gray-50/50 border border-gray-200 h-11 rounded-xl pr-10 pl-4 text-sm focus:bg-white focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5 transition-all outline-none"
                />
              </div>
            </div>

          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-400 bg-gray-50/50 p-2 rounded-lg w-fit">
            <Info className="w-3.5 h-3.5" />
            <span>سيتم استخدام هذه البيانات في ترويسة الفاتورة النهائية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
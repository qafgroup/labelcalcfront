import { User, Calendar, Phone, UserCheck } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
      {/* Header with Date */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">بيانات العميل</h2>
          <p className="text-sm text-gray-500">المعلومات الأساسية للطلب</p>
        </div>
        
        {/* التاريخ */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700 font-medium">{date}</span>
        </div>
      </div>

      {/* Single Row with All Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* اسم العميل */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            اسم العميل <span className="text-gray-900">*</span>
          </label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="أدخل اسم العميل"
              className="w-full bg-white border border-gray-300 h-11 rounded-lg pr-10 pl-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>

        {/* رقم العميل */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            رقم العميل <span className="text-gray-900">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="tel"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="05xxxxxxxx"
              className="w-full bg-white border border-gray-300 h-11 rounded-lg pr-10 pl-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>

        {/* المندوب */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            اسم المندوب <span className="text-gray-900">*</span>
          </label>
          <div className="relative">
            <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={salesRep}
              onChange={(e) => setSalesRep(e.target.value)}
              placeholder="اسم المندوب"
              className="w-full bg-white border border-gray-300 h-11 rounded-lg pr-10 pl-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>

        {/* جوال المندوب */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            جوال المندوب <span className="text-gray-900">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="tel"
              value={salesRepPhone}
              onChange={(e) => setSalesRepPhone(e.target.value)}
              placeholder="05xxxxxxxx"
              className="w-full bg-white border border-gray-300 h-11 rounded-lg pr-10 pl-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
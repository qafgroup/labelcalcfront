import { User, Package, LogOutIcon, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function ArabicHeader({ userEmail, onLogout }: { userEmail: string, onLogout: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-[0_2px_6px_rgba(0,0,0,.04)]">
      <div className="px-4 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* اللوجو والعنوان */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black whitespace-nowrap">
 نظام إدارة الطلبات والتسعير
              </h1>
             
            </div>
            <div className="md:hidden">
              <h3 className="text-sm font-bold text-black">نظام إدارة الطلبات والتسعير</h3>
            </div>
          </div>

          {/* الأزرار على الشاشات الكبيرة */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {/* <button 
              className="p-2.5 px-4 w-50 lg:p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 shrink-0 text-center flex flex-col items-center justify-center gap-1"
              title="الاضافات"
            >
              <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 text-center items-center justify-center" />
              <span className="text-sm font-medium text-center text-gray-700">الاضافات</span>
            </button> */}
            <span className="text-xs lg:text-sm text-gray-600 font-medium truncate max-w-xs">
              {userEmail}
            </span>
            <button 
              className="p-2.5 lg:p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 shrink-0"
              title="الملف الشخصي"
            >
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
               
            </button>
            <button 
              onClick={onLogout}
              className="p-2.5 lg:p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 shrink-0"
              title="تسجيل الخروج"
            >
              <LogOutIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
            </button>
          </div>

          {/* زر القائمة على الهواتف */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 shrink-0"
            title="القائمة"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* القائمة على الهواتف */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-gray-700 truncate mt-1">
                {userEmail}
              </p>
            </div>
            <div className="flex gap-2">
              {/* <button 
                className="flex-1 p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
                title="الاضافات"
              
              >
                <Plus className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">الاضافات</span>
              </button> */}
              {/* <button 
                className="flex-1 p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
                title="الملف الشخصي"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">الملف الشخصي</span>
              </button> */}
              <button 
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 flex items-center justify-center gap-2"
                title="تسجيل الخروج"
              >
                <LogOutIcon className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">خروج</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
import { User, Package, LogOut, Menu, X, DollarSign, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ArabicHeaderProps {
  userEmail: string;
  onLogout: () => void;
}

export function ArabicHeader({ userEmail, onLogout }: ArabicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // تأثير بسيط لتغيير شفافية الهيدر عند التمرير
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-22">
          
          {/* الجانب الأيمن - Branding (RTL Support) */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <Package className="w-6 h-6 text-gray-700" />
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-base md:text-lg font-extrabold text-gray-900 leading-tight tracking-tight">
                نظام <span className="text-gray-600">الإدارة الذكية</span>
              </h1>
              <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest">
                الطلبات • التسعير • الفواتير
              </span>
            </div>
          </div>

          {/* الجانب الأيسر - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Actions Area */}
            <nav className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-100">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all">
                <DollarSign className="w-4 h-4" />
                التسعيرات
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </nav>

            {/* User Profile Dropdown Placeholder */}
            <div className="flex items-center gap-3 bg-gray-50/50 p-1.5 pr-4 rounded-full border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group">
              <div className="flex flex-col items-end">
                <p className="text-[11px] text-gray-400 leading-none mb-1">مرحباً بك</p>
                <p className="text-xs font-bold text-gray-700 truncate max-w-[120px]">
                  {userEmail.split('@')[0]}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="mr-2 p-2.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-50 text-gray-600 active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Overlay style) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-white border-b border-gray-100 shadow-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-[10px] text-gray-400 font-bold uppercase">الحساب الحالي</p>
              <p className="text-sm font-medium text-gray-800 truncate">{userEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-2xl border border-gray-100 transition-all">
              <DollarSign className="w-6 h-6 text-gray-400" />
              <span className="text-xs font-bold">التسعيرات</span>
            </button>
            <button 
              onClick={onLogout}
              className="flex flex-col items-center justify-center gap-2 py-4 bg-red-50/50 hover:bg-red-50 text-red-600 rounded-2xl border border-red-100 transition-all"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs font-bold">خروج</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
import {  Package, LogOut, Menu, X, Calculator, ClipboardList, Bell, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

// ══════════════════════════════════════════════
// ─── TYPES
// ══════════════════════════════════════════════

export type ActivePage = 'pricing-calc' | 'orders';

interface NavItem {
  id:       ActivePage;
  label:    string;
  sublabel: string;
  icon:     React.ReactNode;
}

interface ArabicHeaderProps {
  userEmail:   string;
  activePage:  ActivePage;
  onNavigate:  (page: ActivePage) => void;
  onLogout:    () => void;
  /** عدد الإشعارات غير المقروءة */
  notifCount?: number;
}

// ══════════════════════════════════════════════
// ─── NAV CONFIG
// ══════════════════════════════════════════════

const NAV_ITEMS: NavItem[] = [
  {
    id:       'pricing-calc',
    label:    'التسعير',
    sublabel: 'حاسبة الأسعار',
    icon:     <Calculator className="w-4 h-4" />,
  },
  {
    id:       'orders',
    label:    'التسعيرات',
    sublabel: 'سجل الطلبات',
    icon:     <ClipboardList className="w-4 h-4" />,
  },
];

// ══════════════════════════════════════════════
// ─── COMPONENT
// ══════════════════════════════════════════════

export function ArabicHeader({
  userEmail,
  activePage,
  onNavigate,
  onLogout,
  notifCount = 0,
}: ArabicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled,     setIsScrolled]     = useState<boolean>(false);
  const [userDropOpen,   setUserDropOpen]   = useState<boolean>(false);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close mobile menu on resize ──
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Close user dropdown on outside click ──
  useEffect(() => {
    if (!userDropOpen) return;
    const handler = () => setUserDropOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [userDropOpen]);

  const username = userEmail.split('@')[0];

  // ── Navigate + close mobile menu ──
  const navigate = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${
        isScrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[68px]" dir="rtl">

          {/* ── BRAND (right in RTL) ── */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <Package className="w-5 h-5 text-gray-700" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-sm md:text-base font-extrabold text-gray-900 tracking-tight">
                نظام <span className="text-gray-500">الإدارة الذكية</span>
              </h1>
              <span className="text-[9px] md:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                الطلبات · التسعير · الفواتير
              </span>
            </div>
          </div>

          {/* ── DESKTOP NAV (center) ── */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`
                    relative flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold
                    transition-all duration-200 select-none
                    ${isActive
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-white hover:shadow-sm'
                    }
                  `}
                >
                  {/* Icon */}
                  <span className={`transition-colors ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span>{item.label}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── DESKTOP RIGHT ACTIONS ── */}
          <div className="hidden md:flex items-center gap-2">

            {/* Notifications */}
            <button
              className="relative p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all"
              aria-label="الإشعارات"
            >
              <Bell className="w-5 h-5" />
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-0.5 bg-gray-900 text-white rounded-full text-[9px] font-black flex items-center justify-center leading-none">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setUserDropOpen(o => !o); }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition-all duration-200 ${
                  userDropOpen
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-gray-50 border-gray-100 hover:border-gray-200 text-gray-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  userDropOpen ? 'bg-white/10 text-white' : 'bg-white border border-gray-100 text-gray-700'
                }`}>
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <span className={`text-[9px] font-semibold leading-none mb-0.5 ${userDropOpen ? 'text-gray-400' : 'text-gray-400'}`}>
                    مرحباً
                  </span>
                  <span className="text-xs font-bold max-w-[90px] truncate">{username}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {userDropOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* User info */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">الحساب</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{userEmail}</p>
                  </div>

                  {/* Nav items (mobile-style inside dropdown) */}
                  <div className="p-2">
                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { navigate(item.id); setUserDropOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-all ${
                          activePage === item.id
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className={activePage === item.id ? 'text-gray-400' : 'text-gray-400'}>
                          {item.icon}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-bold">{item.label}</span>
                          <span className={`text-[10px] ${activePage === item.id ? 'text-gray-400' : 'text-gray-400'}`}>
                            {item.sublabel}
                          </span>
                        </div>
                        {activePage === item.id && (
                          <span className="mr-auto text-gray-400 text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Logout */}
                  <div className="p-2 pt-0">
                    <div className="h-px bg-gray-100 mb-2" />
                    <button
                      onClick={() => { setUserDropOpen(false); onLogout(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-xs font-bold">تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── MOBILE: bell + menu button ── */}
          <div className="md:hidden flex items-center gap-2">
            <button className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-50 transition-all">
              <Bell className="w-5 h-5" />
              {notifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gray-900 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="p-2 rounded-xl bg-gray-50 text-gray-600 active:scale-95 transition-all border border-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-white border-b border-gray-100 shadow-xl z-40 p-4 space-y-3">

          {/* User info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100" dir="rtl">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-black flex-shrink-0">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">الحساب الحالي</p>
              <p className="text-sm font-bold text-gray-800 truncate">{userEmail}</p>
            </div>
          </div>

          {/* Navigation pages */}
          <div className="grid grid-cols-2 gap-2" dir="rtl">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-100'
                  }`}
                >
                  <span className={isActive ? 'text-gray-300' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <div className="text-center">
                    <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      {item.label}
                    </div>
                    <div className={`text-[9px] mt-0.5 ${isActive ? 'text-gray-400' : 'text-gray-400'}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={() => { setMobileMenuOpen(false); onLogout(); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all"
            dir="rtl"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-bold">تسجيل الخروج</span>
          </button>
        </div>
      )}
    </header>
  );
}
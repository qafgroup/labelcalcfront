/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// المكونات
import { ArabicHeader, type ActivePage } from './components/ArabicHeader';
import { CalculationIndicator } from './components/CalculationIndicator';
import { ScrollToTop } from './components/ScrollToTop';
import { LoginPage } from './components/LoginPage';

// الـ Hooks
import { useAppState } from './hooks/useAppState';


import {
  handleLogin as authHandleLogin,
  loadLoginStatus,
  handleLogout as authHandleLogout,
} from './utils/authHandler';
import PricingPage from './pages/PricingPage';
import OrdersPage from './pages/OrdersPage';

// Config

export default function App() {
  const state = useAppState();
const [page, setPage] = useState<ActivePage>('pricing-calc');
  // تهيئة التاريخ
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ar', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    state.setDate(formattedDate);
  }, []);

  // تحميل حالة المستخدم
  useEffect(() => {
    const loginStatus = loadLoginStatus();
    if (loginStatus.isLoggedIn) {
      state.setIsLoggedIn(true);
      state.setUserEmail(loginStatus.email);
    }
  }, []);

  

  const handleLogin = async (email: string, password: string) => {
    await authHandleLogin(email, password, (userEmail) => {
      state.setIsLoggedIn(true);
      state.setUserEmail(userEmail);
    });
  };

  const handleLogout = () => {
    authHandleLogout();
    state.setIsLoggedIn(false);
    state.setUserEmail('');
  };

  

  if (!state.isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <ArabicHeader userEmail={state.userEmail} onLogout={handleLogout}
        activePage={page}
        onNavigate={setPage}
        notifCount={3}
      />
      <main className="max-w-400 mx-auto px-4 md:px-8 py-4 md:py-6">
        {page==='pricing-calc' &&(<PricingPage />)}
      {page === 'orders'       && <OrdersPage />}
      </main>
      <CalculationIndicator isValid={state.isFormValid} />
      <ScrollToTop />
    </div>
  );
}

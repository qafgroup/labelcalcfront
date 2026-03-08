import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Swal from 'sweetalert2';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.length > 0;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول الفارغة
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'فشل تسجيل الدخول',
        text: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
        customClass: { popup: 'rounded-3xl' },
        confirmButtonText: 'حسناً'
      });
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'فشل تسجيل الدخول',
        text: 'يرجى إدخال بريد إلكتروني صحيح',
        customClass: { popup: 'rounded-3xl' },
        confirmButtonText: 'حسناً'
      });
      return;
    }

    // التحقق من طول كلمة المرور
    if (!validatePassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'فشل تسجيل الدخول',
        text: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        customClass: { popup: 'rounded-3xl' },
        confirmButtonText: 'حسناً'
      });
      return;
    }

    // تسجيل الدخول الناجح
    Swal.fire({
      icon: 'success',
      title: 'تم تسجيل الدخول بنجاح',
      text: 'مرحباً بك في نظام إدارة  التسعيرات',
      customClass: { popup: 'rounded-3xl' },
      confirmButtonText: 'متابعة',
      timer: 2000
    }).then(() => {
      onLogin(email, password);
      setEmail('');
      setPassword('');
    });
  };

  return (
    <div 
      className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4" 
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Lock className="h-10 w-10 text-gray-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل الدخول
          </h1>
          <p className="text-gray-600">
            نظام إدارة التسعيرات
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                dir="ltr"
                autoComplete="email"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                dir="ltr"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
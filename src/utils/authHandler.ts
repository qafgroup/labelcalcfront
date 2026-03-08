import Swal from 'sweetalert2';

const VALID_CREDENTIALS = {
  email: 'ehab@ee.com',
  password: '123456',
};

const STORAGE_KEYS = {
  EMAIL: 'lebel-user-email',
  LOGIN_STATUS: 'lebel-login-status',
};

export const handleLogin = async (
  email: string,
  password: string,
  onLoginSuccess: (email: string) => void
): Promise<boolean> => {
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
    localStorage.setItem(STORAGE_KEYS.LOGIN_STATUS, 'true');
    onLoginSuccess(email);
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'فشل تسجيل الدخول',
      text: 'البريد أو كلمة المرور غير صحيحة',
      customClass: { popup: 'rounded-3xl' },
    });  
    return false;
  }
};

export const loadLoginStatus = (): { isLoggedIn: boolean; email: string } => {
  const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const savedLoginStatus = localStorage.getItem(STORAGE_KEYS.LOGIN_STATUS);

  if (savedEmail && savedLoginStatus === 'true') {
    return { isLoggedIn: true, email: savedEmail };
  }

  return { isLoggedIn: false, email: '' };
};

export const handleLogout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.EMAIL);
  localStorage.removeItem(STORAGE_KEYS.LOGIN_STATUS);
};

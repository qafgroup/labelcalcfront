import { useState } from 'react';

export const useAppState = () => {
  // ========================
  // حالة المستخدم والتسجيل
  // ========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // ========================
  // بيانات العميل
  // ========================
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [salesRepPhone, setSalesRepPhone] = useState('');

  // ========================
  // بيانات الملصق
  // ========================
  const [length, setLength] = useState('100');
  const [width, setWidth] = useState('100');
  const [quantity, setQuantity] = useState('0');
  const [gaping, setGaping] = useState('3');
  const [rollWidth, setRollWidth] = useState('');
  const [material, setMaterial] = useState('');
  const [shape, setShape] = useState('rectangle');
  const [cornerType, setCornerType] = useState('normal');
  const [printType, setPrintType] = useState('cmyk-4');
  const [designCount, setDesignCount] = useState('1');
  const [hasLamination, setHasLamination] = useState(false);
  const [hasEmbossing, setHasEmbossing] = useState(false);
  const [embossingColor, setEmbossingColor] = useState('');
  const [hasSilkScreen, setHasSilkScreen] = useState(false);
  const [hasSpotUV, setHasSpotUV] = useState(false);
  const [assembly, setAssembly] = useState('manual');
  const [rollDirection, setRollDirection] = useState('horizontal');
  const [workFee, setWorkFee] = useState('0');

  // ========================
  // ملخص الطلب والأسعار
  // ========================
  const [MatCost, setMatCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);

  // ========================
  // بيانات الحسابات والمقاييس
  // ========================
  const [stickersPerMeter, setStickersPerMeter] = useState(0);
  const [requiredLengthMeters, setRequiredLengthMeters] = useState(0);
  const [requiredAreaM2, setRequiredAreaM2] = useState(0);
  const [stickersAcrossWidth, setStickersAcrossWidth] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  return {
    // المستخدم
    isLoggedIn, setIsLoggedIn,
    userEmail, setUserEmail,
    
    // بيانات العميل
    date, setDate,
    customerName, setCustomerName,
    customerNumber, setCustomerNumber,
    salesRep, setSalesRep,
    salesRepPhone, setSalesRepPhone,
    
    // بيانات الملصق
    length, setLength,
    width, setWidth,
    quantity, setQuantity,
    gaping, setGaping,
    rollWidth, setRollWidth,
    material, setMaterial,
    shape, setShape,
    cornerType, setCornerType,
    printType, setPrintType,
    designCount, setDesignCount,
    hasLamination, setHasLamination,
    hasEmbossing, setHasEmbossing,
    embossingColor, setEmbossingColor,
    hasSilkScreen, setHasSilkScreen,
    hasSpotUV, setHasSpotUV,
    assembly, setAssembly,
    rollDirection, setRollDirection,
    workFee, setWorkFee,
    
    // الأسعار
    MatCost, setMatCost,
    subtotal, setSubtotal,
    tax, setTax,
    total, setTotal,
    unitPrice, setUnitPrice,
    
    // الحسابات
    stickersPerMeter, setStickersPerMeter,
    requiredLengthMeters, setRequiredLengthMeters,
    requiredAreaM2, setRequiredAreaM2,
    stickersAcrossWidth, setStickersAcrossWidth,
    isFormValid, setIsFormValid,
  };
};
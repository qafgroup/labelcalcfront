import Swal from 'sweetalert2';
import { validateForm, formatErrorMessage } from '../utils/validation';

export interface OrderData {
  customerInfo: {
    date: string;
    customerName: string;
    customerNumber: string;
    salesRep: string;
    salesRepPhone: string;
  };
  stickerDetails: {
    dimensions: { length: number; width: number };
    quantity: number;
    shape: string;
    cornerType: string | null;
    printType: string;
    designCount: number;
    material: string;
    options: {
      lamination: boolean;
      embossing: { enabled: boolean; color?: string };
      silkScreen: boolean;
      spotUV: boolean;
    };
    assembly: string;
    rollDirection: string;
    rollWidth: number;
    gaping: number;
  };
  pricing: {
    subtotal: number;
    tax: number;
    total: number;
    unitPrice: number;
  };
  rollInfo: {
    requiredLengthMeters: number;
    stickersPerMeter: number;
    stickersAcrossWidth: number;
  };
}

export const handleOrderSubmit = (
  customerName: string,
  customerNumber: string,
  salesRep: string,
  salesRepPhone: string,
  length: string,
  width: string,
  quantity: string,
  shape: string,
  cornerType: string,
  printType: string,
  designCount: string,
  material: string,
  hasLamination: boolean,
  hasEmbossing: boolean,
  embossingColor: string,
  hasSilkScreen: boolean,
  hasSpotUV: boolean,
  assembly: string,
  rollDirection: string,
  rollWidth: string,
  gaping: string,
  date: string,
  subtotal: number,
  tax: number,
  total: number,
  unitPrice: number,
  requiredLengthMeters: number,
  stickersPerMeter: number,
  _requiredAreaM2: number,
  stickersAcrossWidth: number,
  onSuccess?: (orderData: OrderData) => void
): boolean => {
  const errors = validateForm(
    customerName, customerNumber, salesRep, salesRepPhone,
    length, width, quantity
  );

  if (errors.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'خطأ في إدخال البيانات',
      text: formatErrorMessage(errors),
      customClass: { popup: 'rounded-3xl' },
    });
    return false;
  }

  const orderData: OrderData = {
    customerInfo: {
      date, customerName, customerNumber, salesRep, salesRepPhone,
    },
    stickerDetails: {
      dimensions: { length: parseFloat(length), width: parseFloat(width) },
      quantity: parseInt(quantity),
      shape,
      cornerType: shape === 'square' ? cornerType : null,
      printType,
      designCount: parseInt(designCount),
      material,
      options: {
        lamination: hasLamination,
        embossing: hasEmbossing ? { enabled: true, color: embossingColor } : { enabled: false },
        silkScreen: hasSilkScreen,
        spotUV: hasSpotUV,
      },
      assembly,
      rollDirection,
      rollWidth: parseFloat(rollWidth),
      gaping: parseFloat(gaping),
    },
    pricing: { subtotal, tax, total, unitPrice },
    rollInfo: { requiredLengthMeters, stickersPerMeter, stickersAcrossWidth },
  };

  showSuccessMessage(orderData);
  if (onSuccess) onSuccess(orderData);
  return true;
};

export const showSuccessMessage = (orderData: OrderData): void => {
  const embossingText = orderData.stickerDetails.options.embossing.enabled ? 'نعم' : 'لا';

  const htmlContent = `
    <div class="success-message-container" style="text-align: right; direction: rtl; font-family: 'Tajawal', Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 16px; margin-bottom: 16px; color: white;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold;">بيانات العميل</h3>
        <div style="display: grid; gap: 10px; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.customerInfo.customerName}</span>
            <span style="opacity: 0.9;">العميل</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.customerInfo.customerNumber}</span>
            <span style="opacity: 0.9;">رقم العميل</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.customerInfo.date}</span>
            <span style="opacity: 0.9;">التاريخ</span>
          </div>
        </div>
      </div>
      <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 16px; margin-bottom: 16px; color: white;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold;">تفاصيل الملصق</h3>
        <div style="display: grid; gap: 10px; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.stickerDetails.dimensions.length} × ${orderData.stickerDetails.dimensions.width} سم</span>
            <span style="opacity: 0.9;">المقاسات</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.stickerDetails.quantity.toLocaleString()} قطعة</span>
            <span style="opacity: 0.9;">الكمية</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.rollInfo.requiredLengthMeters.toFixed(1)} متر</span>
            <span style="opacity: 0.9;">طول الرول المطلوب</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${orderData.stickerDetails.rollWidth} سم</span>
            <span style="opacity: 0.9;">عرض الرول</span>
          </div>
          <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px;">
            <span style="font-weight: 600;">${embossingText}</span>
            <span style="opacity: 0.9;">بصمة</span>
          </div>
        </div>
      </div>
      <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 20px; border-radius: 16px; color: white;">
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; border: 2px solid rgba(255,255,255,0.3);">
          <span style="font-weight: 700; font-size: 18px;">${orderData.pricing.total.toFixed(2)} ريال</span>
          <span style="font-weight: 600; font-size: 16px;">الإجمالي النهائي</span>
        </div>
      </div>
    </div>`;

  Swal.fire({
    icon: 'success',
    title: '<span style="color: #10b981; font-family: \'Tajawal\', Arial;">تم إنشاء العرض بنجاح</span>',
    html: htmlContent,
    width: '600px',
    padding: '2rem',
    background: '#f8fafc',
    customClass: {
      popup: 'rounded-3xl shadow-2xl',
      confirmButton: 'bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-xl transition-all',
    },
    confirmButtonText: 'حسناً',
    cancelButtonText: 'إغلاق',
    showCancelButton: true,
    focusConfirm: false,
  });
};

// orderHandler.ts
import Swal from 'sweetalert2';
import { validateForm, formatErrorMessage } from '../utils/validation';
import { downloadOrderPDF } from '../components/QuotePDF';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SingleQuoteData {
  name: string;
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
      laminationType?: string;
      embossing: { enabled: boolean; color?: string };
      silkScreen: boolean;
      spotUV: boolean;
      varnishType?: string;
    };
    assembly: string;
    rollDirection: string;
    rollWidth: number;
    gaping: number;
    workFee: number;
  };
  pricing: {
    subtotal: number;
    tax: number;
    total: number;
    unitPrice: number;
    MatCost: number;
  };
  rollInfo: {
    requiredLengthMeters: number;
    stickersPerMeter: number;
    stickersAcrossWidth: number;
    requiredAreaM2: number;
  };
}

export interface OrderData {
  customerInfo: {
    date: string;
    customerName: string;
    customerNumber: string;
    salesRep: string;
    salesRepPhone: string;
  };
  quotes: SingleQuoteData[];
  grandTotal: number;
  grandSubtotal: number;
  grandTax: number;
}

// ─── واتساب — رسالة ترحيبية + تحميل PDF تلقائي ──────────────────────────────

export const sendViaWhatsApp = async (order: OrderData): Promise<void> => {
  const rawPhone = order.customerInfo.customerNumber.replace(/\D/g, '');
  const phone    = rawPhone.startsWith('0') ? `966${rawPhone.slice(1)}` : rawPhone;

  // ١. تحميل الـ PDF أولاً
  await downloadOrderPDF(order);

  // ٢. رسالة ترحيبية بسيطة — بدون تفاصيل التسعيرة
  const itemsCount = order.quotes.length;
  const greeting = [
    `السلام عليكم ورحمة الله وبركاته 🌿`,
    ``,
    `نشكركم على تواصلكم مع شركتنا،`,
    `يسعدنا تقديم عرض الأسعار الخاص بكم.`,
    ``,
    `📎 *مرفق عرض السعر*`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 العميل: ${order.customerInfo.customerName}`,
    `🗓️ التاريخ: ${order.customerInfo.date}`,
    `🏷️ عدد الأصناف: ${itemsCount} ${itemsCount === 1 ? 'صنف' : 'أصناف'}`,
    `💵 الإجمالي: *${order.grandTotal.toFixed(2)} ر.س* (شامل الضريبة)`,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    `نرجو مراجعة الملف المرفق للاطلاع على كافة التفاصيل.`,
    `نحن بانتظار تأكيدكم 🤝`,
    ``,
    `مع التحية،`,
    `${order.customerInfo.salesRep}`,
  ].join('\n');

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`, '_blank');
};

// ─── الدالة الرئيسية ──────────────────────────────────────────────────────────

export const handleOrderSubmit = (
  customerName: string,
  customerNumber: string,
  salesRep: string,
  salesRepPhone: string,
  date: string,
  quotes: SingleQuoteData[],
  onSuccess?: (orderData: OrderData) => void
): boolean => {
  const first = quotes[0];
  const errors = validateForm(
    customerName, customerNumber, salesRep, salesRepPhone,
    String(first?.stickerDetails.dimensions.length ?? ''),
    String(first?.stickerDetails.dimensions.width ?? ''),
    String(first?.stickerDetails.quantity ?? '')
  );

  if (errors.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'خطأ في إدخال البيانات',
      html: `<div style="direction:rtl;text-align:right;">${formatErrorMessage(errors)}</div>`,
      customClass: { popup: 'rounded-3xl' },
      confirmButtonColor: '#111827',
    });
    return false;
  }

  const grandTotal    = quotes.reduce((s, q) => s + q.pricing.total,    0);
  const grandSubtotal = quotes.reduce((s, q) => s + q.pricing.subtotal, 0);
  const grandTax      = quotes.reduce((s, q) => s + q.pricing.tax,      0);

  const orderData: OrderData = {
    customerInfo: { date, customerName, customerNumber, salesRep, salesRepPhone },
    quotes,
    grandTotal,
    grandSubtotal,
    grandTax,
  };

  showSuccessDialog(orderData);
  if (onSuccess) onSuccess(orderData);
  return true;
};

// ─── نافذة النجاح ─────────────────────────────────────────────────────────────

export const showSuccessDialog = (order: OrderData): void => {
  const quotesHtml = order.quotes.map((q) => `
    <div style="display:flex;justify-content:space-between;align-items:center;
      background:rgba(255,255,255,0.13);padding:9px 13px;border-radius:9px;margin-bottom:7px;">
      <span style="font-size:14px;font-weight:800;">${q.pricing.total.toFixed(2)} ر.س</span>
      <div style="text-align:right">
        <div style="font-weight:700;font-size:12px;">${q.name}</div>
        <div style="font-size:10px;opacity:.75;">
          ${q.stickerDetails.dimensions.length}×${q.stickerDetails.dimensions.width} مم —
          ${q.stickerDetails.quantity.toLocaleString('ar-SA')} قطعة
        </div>
      </div>
    </div>`).join('');

  const grandHtml = order.quotes.length > 1 ? `
    <div style="display:flex;justify-content:space-between;align-items:center;
      background:rgba(255,255,255,0.22);padding:11px 13px;border-radius:9px;
      border:2px solid rgba(255,255,255,0.35);margin-top:10px;">
      <span style="font-size:17px;font-weight:900;">${order.grandTotal.toFixed(2)} ر.س</span>
      <span style="font-size:13px;font-weight:700;">الإجمالي الكلي</span>
    </div>` : '';

  Swal.fire({
    icon: 'success',
    title: `<span style="font-family:'Tajawal',Arial;color:#10b981;font-size:17px;">
              ✓ تم إنشاء العرض بنجاح
            </span>`,
    html: `
      <div style="direction:rtl;text-align:right;font-family:'Tajawal',Arial,sans-serif;">
        <!-- العميل -->
        <div style="background:linear-gradient(135deg,#667eea,#764ba2);
          padding:15px;border-radius:12px;margin-bottom:12px;color:white;">
          <div style="font-weight:700;font-size:13px;margin-bottom:10px;">بيانات العميل</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;font-size:12px;">
            ${[
              ['العميل',       order.customerInfo.customerName],
              ['الرقم',        order.customerInfo.customerNumber],
              ['المندوب',      order.customerInfo.salesRep],
              ['التاريخ',      order.customerInfo.date],
            ].map(([label, value]) => `
              <div style="background:rgba(255,255,255,0.13);padding:7px 10px;border-radius:7px;">
                <div style="opacity:.7;font-size:10px;">${label}</div>
                <div style="font-weight:700;">${value}</div>
              </div>`).join('')}
          </div>
        </div>
        <!-- التسعيرات -->
        <div style="background:linear-gradient(135deg,#f093fb,#f5576c);
          padding:15px;border-radius:12px;color:white;">
          <div style="font-weight:700;font-size:13px;margin-bottom:10px;">
            التسعيرات (${order.quotes.length} ملصق)
          </div>
          ${quotesHtml}
          ${grandHtml}
        </div>
      </div>`,
    width: '560px',
    background: '#f8fafc',
    showConfirmButton: true,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: '📄 تحميل PDF',
    cancelButtonText: '💬 إرسال واتساب + PDF',
    denyButtonText: 'إغلاق',
    reverseButtons: false,
    customClass: {
      popup:         'rounded-3xl shadow-2xl',
      confirmButton: 'swal-pdf-btn',
      cancelButton:  'swal-wa-btn',
      denyButton:    'swal-close-btn',
    },
    didOpen: () => {
      const el = document.createElement('style');
      el.textContent = `
        .swal-pdf-btn   { background:#1e293b!important; color:#fff!important; font-weight:700!important; border-radius:9px!important; padding:9px 22px!important; font-family:'Tajawal',Arial; }
        .swal-wa-btn    { background:#25d366!important; color:#fff!important; font-weight:700!important; border-radius:9px!important; padding:9px 22px!important; font-family:'Tajawal',Arial; }
        .swal-close-btn { background:#e2e8f0!important; color:#64748b!important; font-weight:700!important; border-radius:9px!important; padding:9px 22px!important; font-family:'Tajawal',Arial; }
      `;
      document.head.appendChild(el);
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      // ── تحميل PDF فقط ──
      await downloadOrderPDF(order);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // ── تحميل PDF + فتح واتساب برسالة ترحيبية ──
      await sendViaWhatsApp(order);
    }
    // deny = إغلاق — لا شيء
  });
};
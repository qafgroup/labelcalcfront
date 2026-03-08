export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (
  customerName: string,
  customerNumber: string,
  salesRep: string,
  salesRepPhone: string,
  length: string,
  width: string,
  quantity: string
): string[] => {
  const errors: string[] = [];

  if (!customerName.trim()) {
    errors.push('اسم العميل مطلوب');
  }

  if (!customerNumber.trim()) {
    errors.push('رقم العميل مطلوب');
  }

  if (!salesRep.trim()) {
    errors.push('اسم المندوب مطلوب');
  }

  if (!salesRepPhone.trim()) {
    errors.push('جوال المندوب مطلوب');
  }

  const lengthNum = parseFloat(length);
  if (!lengthNum || lengthNum <= 0) {
    errors.push('الطول يجب أن يكون أكبر من صفر');
  }

  const widthNum = parseFloat(width);
  if (!widthNum || widthNum <= 0) {
    errors.push('العرض يجب أن يكون أكبر من صفر');
  }

  const quantityNum = parseInt(quantity);
  if (!quantityNum || quantityNum <= 0) {
    errors.push('الكمية يجب أن تكون أكبر من صفر');
  }

  return errors;
};

export const formatErrorMessage = (errors: string[]): string => {
  return `يرجى تصحيح الأخطاء التالية:\n\n${errors.map((err, i) => `${i + 1}. ${err}`).join('\n')}`;
};

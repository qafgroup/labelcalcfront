import { Settings } from "lucide-react";
import Swal from "sweetalert2";

export default function ChangeItemsPrices({ label, price }: { label: string; price: number }) {
  return (
    <button
      className="w-7 h-7 flex items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 transition-all"
      onClick={() => {
        Swal.fire({
          title: 'تحديث السعر',
          html: `
            <div style="text-align:right; direction: rtl; font-family: inherit;">
              <label style="font-weight: bold; display: block; margin-bottom: 5px;">البند:</label>
              <div style="background: #f3f4f6; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                ${label}
              </div>

              <label style="font-weight: bold; display: block; margin-bottom: 5px;">السعر الجديد</label>
              <input
                id="printPriceInput"
                type="number"
                step="0.01"
                class="swal2-input"
                value="${price}" 
                style="width: 100%; margin: 0; box-sizing: border-box;"
              />
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'تحديث',
          cancelButtonText: 'إلغاء',
          focusConfirm: false,
          preConfirm: () => {
            const priceInput = document.getElementById('printPriceInput') as HTMLInputElement;
            const newPrice = priceInput.value;

            if (!newPrice || parseFloat(newPrice) <= 0) {
              Swal.showValidationMessage('الرجاء إدخال سعر صحيح');
              return false;
            }

            return { label: label, newPrice: newPrice };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("إرسال التحديث لـ", result.value.label, "بالسعر الجديد:", result.value.newPrice);
            // هنا تضع دالة الـ API الخاصة بك
            // updatePriceInDB(label, result.value.newPrice);
          }
        });
      }}
    >
      <Settings size={15} />
    </button>
  );
}
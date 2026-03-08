import { Settings } from "lucide-react";
import Swal from "sweetalert2";

interface ItemData {
  value: string | number;
  label: string;
  price: string | number;
}

interface ChangePriceProps {
  // نقبل إما مصفوفة أو كائن مفتاحه نص وقيمته مصفوفة
  listTypeOfData: ItemData[] | { [key: string]: ItemData[] };
}

export default function ChangeChoosesPrice({ listTypeOfData }: ChangePriceProps) {
  
  // دالة لتحويل البيانات لشكل موحد (Array of Groups) لسهولة العرض
  const getUnifiedData = () => {
    if (Array.isArray(listTypeOfData)) {
      return [{ group: "القائمة", items: listTypeOfData }];
    }
    return Object.entries(listTypeOfData).map(([key, value]) => ({
      group: key.replace("_", " "), // تجميل اسم المجموعة
      items: value,
    }));
  };

  return (
    <button
      className="px-2 py-2 hover:bg-neutral-200 hover:cursor-pointer bg-transparent transition-colors"
      onClick={() => {
        const unifiedData = getUnifiedData();
        
        Swal.fire({
          title: 'تحديث الأسعار',
          html: `
            <div style="text-align:right; direction: rtl; font-family: inherit;">
              <label style="font-weight: bold; display: block; margin-bottom: 5px;">البند المراد تعديله</label>
              <select id="printColorSelect" class="swal2-select" style="width: 100%; margin: 10px 0;">
                ${unifiedData.map(group => `
                  <optgroup label="${group.group}">
                    ${group.items.map(item => `
                      <option value="${item.value}" data-price="${item.price}">
                        ${item.label}
                      </option>
                    `).join('')}
                  </optgroup>
                `).join('')}
              </select>

              <label style="font-weight: bold; margin-top: 15px; display: block;">السعر الجديد</label>
              <input
                id="printPriceInput"
                type="number"
                step="0.01"
                class="swal2-input"
                style="width: 100%; margin: 10px 0;"
              />
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'تحديث السعر',
          cancelButtonText: 'إلغاء',
          didOpen: () => {
            const select = document.getElementById('printColorSelect') as HTMLSelectElement;
            const priceInput = document.getElementById('printPriceInput') as HTMLInputElement;

            const updatePrice = () => {
              if (select && priceInput) {
                const selectedOption = select.options[select.selectedIndex];
                const price = selectedOption.getAttribute('data-price');
                priceInput.value = price || "";
              }
            };

            updatePrice();
            select.addEventListener('change', updatePrice);
          },
          preConfirm: () => {
            const select = document.getElementById('printColorSelect') as HTMLSelectElement;
            const priceInput = document.getElementById('printPriceInput') as HTMLInputElement;
            
            const val = select.value;
            const price = priceInput.value;

            if (!price) {
              Swal.showValidationMessage('الرجاء إدخال سعر');
              return false;
            }

            return { id: val, newPrice: price };
          },
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("البيانات المراد إرسالها للـ Database:", result.value);
            // استدعاء دالة التحديث هنا
            // updatePriceInDB(result.value.id, result.value.newPrice);
          }
        });
      }}
    >
      <Settings size={15} />
    </button>
  );
}
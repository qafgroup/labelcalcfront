/* eslint-disable react-refresh/only-export-components */
// QuotePDF.tsx
// npm install @react-pdf/renderer

import {
  Document, Page, Text, View, StyleSheet, Font, pdf,
} from '@react-pdf/renderer';
import type { SingleQuoteData, OrderData } from '../utils/orderHandler';

// ─── تسجيل خط عربي ──────────────────────────────────────────────────────────
// ضع ملف الخط في /public/fonts/ أو استخدم رابط CDN
Font.register({
  family: 'Cairo',
  fonts: [
    { src: '/fonts/Cairo-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Cairo-Bold.ttf',    fontWeight: 700 },
  ],
});

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Cairo',
    fontSize: 9,
    padding: 32,
    backgroundColor: '#ffffff',
    direction: 'rtl',
  },
  // Header
  header: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#ffffff', fontSize: 16, fontWeight: 700 },
  headerSub: { color: '#9ca3af', fontSize: 8, marginTop: 2, textAlign: 'right' },
  headerDate: { color: '#d1d5db', fontSize: 8, textAlign: 'left' },

  // Section
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: '#6b7280',
    textAlign: 'right',
    marginBottom: 6,
    marginTop: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: 8,
    border: '1 solid #e5e7eb',
    overflow: 'hidden',
    marginBottom: 4,
  },

  // Customer row
  customerGrid: { flexDirection: 'row-reverse', gap: 8 },
  customerCell: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: '8 10',
    border: '1 solid #e5e7eb',
  },
  cellLabel: { color: '#9ca3af', fontSize: 7, textAlign: 'right', marginBottom: 2 },
  cellValue: { color: '#111827', fontSize: 9, fontWeight: 700, textAlign: 'right' },

  // Table
  tableHeader: {
    flexDirection: 'row-reverse',
    backgroundColor: '#111827',
    padding: '6 10',
  },
  tableHeaderText: { color: '#ffffff', fontSize: 8, fontWeight: 700, flex: 1, textAlign: 'right' },
  tableRow: {
    flexDirection: 'row-reverse',
    padding: '5 10',
    borderBottom: '1 solid #f3f4f6',
  },
  tableRowAlt: { backgroundColor: '#f9fafb' },
  tableCell: { flex: 1, color: '#374151', fontSize: 8, textAlign: 'right' },
  tableCellBold: { flex: 1, color: '#111827', fontSize: 8, fontWeight: 700, textAlign: 'right' },

  // Quote header
  quoteHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: '8 12',
  },
  quoteHeaderName: { color: '#ffffff', fontSize: 10, fontWeight: 700 },
  quoteHeaderPrice: { color: '#34d399', fontSize: 11, fontWeight: 700 },

  // Pricing row
  pricingRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: '5 12',
    borderBottom: '1 solid #f3f4f6',
  },
  pricingLabel: { color: '#6b7280', fontSize: 8, textAlign: 'right' },
  pricingValue: { color: '#111827', fontSize: 9, fontWeight: 700, textAlign: 'left' },

  // Grand total
  grandTotal: {
    backgroundColor: '#111827',
    borderRadius: 10,
    padding: '14 18',
    marginTop: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: { color: '#9ca3af', fontSize: 9 },
  grandTotalValue: { color: '#ffffff', fontSize: 18, fontWeight: 700 },
  grandTotalSub: { color: '#6b7280', fontSize: 7, marginTop: 3, textAlign: 'left' },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 8,
  },
  footerText: { color: '#d1d5db', fontSize: 7 },

  divider: { height: 1, backgroundColor: '#f3f4f6', marginVertical: 8 },
  badge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    padding: '2 6',
  },
  badgeText: { color: '#374151', fontSize: 7, fontWeight: 700 },
});

// ─── مكوّن تسعيرة واحدة ──────────────────────────────────────────────────────
function QuoteSection({ quote, index }: { quote: SingleQuoteData; index: number }) {
  const d = quote.stickerDetails;
  const p = quote.pricing;
  const r = quote.rollInfo;

  const finishing = [
    d.options.lamination    && `سلفان${d.options.laminationType ? ` (${d.options.laminationType})` : ''}`,
    d.options.embossing.enabled && `بصمة${d.options.embossing.color ? ` (${d.options.embossing.color})` : ''}`,
    d.options.silkScreen    && 'سلك سكرين',
    d.options.spotUV        && `فرنيش${d.options.varnishType ? ` (${d.options.varnishType})` : ''}`,
  ].filter(Boolean).join('  •  ') || 'لا يوجد';

  const specs = [
    ['المقاس (مم)',        `${d.dimensions.length} × ${d.dimensions.width}`],
    ['الكمية',            d.quantity.toLocaleString('ar-SA')],
    ['الشكل',             d.shape],
    ['نوع الطباعة',       d.printType],
    ['المادة',            d.material || '—'],
    ['عدد التصاميم',      String(d.designCount)],
    ['عرض الرول (مم)',    String(d.rollWidth)],
    ['الجاب (مم)',        String(d.gaping)],
    ['طول الرول (م)',     r.requiredLengthMeters.toFixed(2)],
    ['ملصق/متر',          String(r.stickersPerMeter)],
    ['ملصق في العرض',    String(r.stickersAcrossWidth)],
    ['نوع التركيب',       d.assembly || '—'],
  ];

  return (
    <View style={{ marginBottom: 12 }}>
      {/* عنوان التسعيرة */}
      <View style={[s.card, { overflow: 'hidden' }]}>
        <View style={s.quoteHeader}>
          <Text style={s.quoteHeaderName}>🏷  {index + 1}. {quote.name}</Text>
          <Text style={s.quoteHeaderPrice}>{p.total.toFixed(2)} ر.س</Text>
        </View>

        {/* جدول المواصفات */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, { flex: 2 }]}>القيمة</Text>
          <Text style={s.tableHeaderText}>المواصفة</Text>
          <Text style={[s.tableHeaderText, { flex: 2 }]}>القيمة</Text>
          <Text style={s.tableHeaderText}>المواصفة</Text>
        </View>

        {/* صفوف جدول 2 عمود */}
        {Array.from({ length: Math.ceil(specs.length / 2) }).map((_, rowIdx) => {
          const left  = specs[rowIdx * 2];
          const right = specs[rowIdx * 2 + 1];
          return (
            <View key={rowIdx} style={[s.tableRow, rowIdx % 2 === 0 ? {} : s.tableRowAlt]}>
              <Text style={[s.tableCell, { flex: 2 }]}>{left?.[1]  ?? ''}</Text>
              <Text style={s.tableCellBold}>{left?.[0]  ?? ''}</Text>
              <Text style={[s.tableCell, { flex: 2 }]}>{right?.[1] ?? ''}</Text>
              <Text style={s.tableCellBold}>{right?.[0] ?? ''}</Text>
            </View>
          );
        })}

        {/* التشطيبات */}
        <View style={[s.tableRow, { backgroundColor: '#fffbeb' }]}>
          <Text style={[s.tableCell, { flex: 5, color: '#92400e' }]}>{finishing}</Text>
          <Text style={[s.tableCellBold, { color: '#92400e' }]}>التشطيبات</Text>
        </View>

        {/* التسعير */}
        <View style={{ backgroundColor: '#f9fafb', borderTop: '1 solid #e5e7eb' }}>
          <View style={s.pricingRow}>
            <Text style={s.pricingLabel}>سعر الوحدة</Text>
            <Text style={s.pricingValue}>{p.unitPrice.toFixed(4)} ر.س</Text>
          </View>
          <View style={s.pricingRow}>
            <Text style={s.pricingLabel}>المجموع قبل الضريبة</Text>
            <Text style={s.pricingValue}>{p.subtotal.toFixed(2)} ر.س</Text>
          </View>
          <View style={s.pricingRow}>
            <Text style={s.pricingLabel}>ضريبة القيمة المضافة (15%)</Text>
            <Text style={s.pricingValue}>{p.tax.toFixed(2)} ر.س</Text>
          </View>
          <View style={[s.pricingRow, { backgroundColor: '#f0fdf4', borderBottom: 'none' }]}>
            <Text style={[s.pricingLabel, { color: '#15803d', fontWeight: 700 }]}>الإجمالي</Text>
            <Text style={[s.pricingValue, { color: '#15803d', fontSize: 11 }]}>{p.total.toFixed(2)} ر.س</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── المستند الكامل ───────────────────────────────────────────────────────────
function QuoteDocument({ order }: { order: OrderData }) {
  const { customerInfo: c, quotes, grandTotal, grandSubtotal, grandTax } = order;

  return (
    <Document title={`عرض سعر — ${c.customerName}`} author="نظام التسعير">
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>عرض سعر ملصقات</Text>
            <Text style={s.headerSub}>نظام التسعير الآلي</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.headerDate}>{c.date}</Text>
          </View>
        </View>

        {/* معلومات العميل */}
        <Text style={s.sectionTitle}>بيانات العميل</Text>
        <View style={s.customerGrid}>
          {[
            { label: 'اسم العميل',    value: c.customerName },
            { label: 'رقم العميل',    value: c.customerNumber },
            { label: 'المندوب',       value: c.salesRep },
            { label: 'جوال المندوب', value: c.salesRepPhone },
          ].map((item) => (
            <View key={item.label} style={s.customerCell}>
              <Text style={s.cellLabel}>{item.label}</Text>
              <Text style={s.cellValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* التسعيرات */}
        <Text style={s.sectionTitle}>
          التسعيرات ({quotes.length} {quotes.length === 1 ? 'ملصق' : 'ملصقات'})
        </Text>
        {quotes.map((q, i) => <QuoteSection key={i} quote={q} index={i} />)}

        {/* Grand Total */}
        {quotes.length > 1 && (
          <View style={s.grandTotal}>
            <View>
              <Text style={s.grandTotalLabel}>إجمالي جميع التسعيرات</Text>
              <Text style={[s.grandTotalSub]}>
                قبل الضريبة: {grandSubtotal.toFixed(2)} ر.س   |   ضريبة: {grandTax.toFixed(2)} ر.س
              </Text>
            </View>
            <Text style={s.grandTotalValue}>{grandTotal.toFixed(2)} ر.س</Text>
          </View>
        )}

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>نظام التسعير الآلي — {c.date}</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>

      </Page>
    </Document>
  );
}

// ─── دالة توليد وتحميل PDF ────────────────────────────────────────────────────
export const downloadOrderPDF = async (order: OrderData): Promise<void> => {
  const blob = await pdf(<QuoteDocument order={order} />).toBlob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `عرض_سعر_${order.customerInfo.customerName}_${order.customerInfo.date}.pdf`.replace(/\s/g, '_');
  a.click();
  URL.revokeObjectURL(url);
};

export { QuoteDocument };
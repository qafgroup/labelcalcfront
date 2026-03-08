export const shapesList = [
    { value: 'circle', label: 'دائري' },
    { value: 'square', label: 'مربع' },
    { value: 'rectangle', label: 'مستطيل' },
    { value: 'custom', label: 'شكل آخر' },
];

export const cornerTypesList = [
    { value: 'normal', label: 'حواف عادية' },
    { value: 'rounded', label: 'حواف مستديرة' },
];

export const colorList = [
    { value: 'CMYK-4', label: 'CMYK', subtitle: '4 ألوان',price:'4' },
    { value: 'colors-5', label: '5 ألوان', subtitle: 'احترافي' ,price:'5'},
    { value: 'colors-6', label: '6 ألوان', subtitle: 'متقدم' ,price:'6'},
    { value: 'colors-7', label: '7 ألوان', subtitle: 'فائق' ,price:'7'},
];
export const designCountList = [
  {value: 1,label: '1 تصميم', price: '2' },
  {value: 2, label: '2 تصاميم' ,price:'4'},
  {value: 3, label: '3 تصاميم' ,price:'6'},
  {value: 4, label: '4 تصاميم' ,price:'8'},
    { value: 5, label: '5 تصاميم', price: '10' },
    { value: 6, label: '6 تصاميم', price: '12' },
    { value: 7, label: '7 تصاميم', price: '14' },
    { value: 8, label: '8 تصاميم', price: '16' },
    { value: 9, label: '9 تصاميم', price: '18' },
   { value: 10, label: '10 تصاميم', price: '20' },
];

export const embossingColors = [
  { value: 'none', label: 'بدون لون محدد', price: 30 },
  { value: 'gold', label: 'ذهبي', price: 20 },
  { value: 'silver', label: 'فضي', price: 10 },
  { value: 'black', label: 'أسود', price: 5 },
  { value: 'white', label: 'أبيض', price: 3 },
];
   
export const  materialsData = {
    "paper_materials": [
    { value: "white_sg_std", label: "White semi-gloss paper, standard adhesive", price: "0.55" },
    { value: "white_sg_strong", label: "White semi-gloss paper, strong adhesive", price: "9" },
    { value: "white_sg_std_24h", label: "White semi-gloss paper, standard adhesive (24h)", price: "10" },
  ],
  "foil_materials": [
    { value: "white_pp_std", label: "White PP foil, standard adhesive", price: "12" },
    { value: "white_pp_strong", label: "White PP foil, strong adhesive", price: "15" },
    { value: "trans_pp_std", label: "Transparent PP foil, standard adhesive", price: "14" },
    { value: "white_pp_std_24h", label: "White PP foil, standard adhesive (24h)", price: "16" },
  ]
};  

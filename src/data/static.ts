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
// export const designCountList = [
//   {value: 1,label: '1 تصميم', price: '2' },
//   {value: 2, label: '2 تصاميم' ,price:'4'},
//   {value: 3, label: '3 تصاميم' ,price:'6'},
//   {value: 4, label: '4 تصاميم' ,price:'8'},
//     { value: 5, label: '5 تصاميم', price: '10' },
//     { value: 6, label: '6 تصاميم', price: '12' },
//     { value: 7, label: '7 تصاميم', price: '14' },
//     { value: 8, label: '8 تصاميم', price: '16' },
//     { value: 9, label: '9 تصاميم', price: '18' },
//    { value: 10, label: '10 تصاميم', price: '20' },
// ];

export const embossingColors = [
 
  { value: 'Hot-gold', label: 'هوت ستامب ذهبي', price: 20 },
  { value: 'Hot-silver', label: 'هوت ستامب فضي', price: 10 },
  { value: 'Hot-colors', label: 'هوت ستامب ملون', price: 5 },
  { value: 'cold', label: 'كولد فويل', price: 3 },
];
  export const laminationTypes = [
    { value: 'none', label: 'بدون لون محدد', price: 30 },
    { value: 'gloss', label: 'لامع', price: 20 },
    { value: 'matte', label: 'مطفي soft touch', price: 10 },
    { value: 'bpop', label: 'BOPP فيلم', price: 5 },
    { value: 'pet', label: 'PET فيلم', price: 3 },
]; 
  export const varnishTypes = [
  
    { value: 'gloss', label: 'UV لامع', price: 20 },
    { value: 'matte', label: 'UV مطفي', price: 10 },
    { value: 'water', label: 'فرنيش مائي', price: 5 },
    { value: 'spot', label: 'فرنيش موضعي UV', price: 3 },
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
  ],
  "plastic_materials": [
  { value: "vinyl_pvc", label: "Vinyl (PVC), waterproof outdoor material", price: "18" },
  { value: "pet_white", label: "White PET film, heat resistant for laser printers", price: "17" },
  { value: "pet_clear", label: "Transparent PET film, high print precision", price: "17" },
  { value: "pp_matte", label: "Matte PP film, waterproof and moisture resistant", price: "14" },
  { value: "pp_glossy", label: "Glossy PP film, waterproof and moisture resistant", price: "14" },
  { value: "polyester_clear", label: "Transparent polyester film, ultra clear", price: "19" }
]

};  

const categories = [
  { id: 1, name: "أدوية", url: "category.html?categoryID=1", img:"imges/mid.jpeg" },
  { id: 2, name: "مكملات غذائية", url: "category.html?categoryID=2", img: "imges/supplements.jpg" },
  { id: 3, name: "مستلزمات أطفال", url: "category.html?categoryID=3", img: "imges/kids.jpg" },
  { id: 4, name: "منتجات بشرة", url: "category.html?categoryID=4", img: "imges/skin.jpeg" },
  { id: 5, name: "أدوات تعقيم", url: "category.html?categoryID=5", img: "imges/sterilizers.jpeg" },
  { id: 6, name: "عناية شخصية", url: "category.html?categoryID=6", img: "imges/self.jpg" }
];

const products = [
  {
    id: 1,
    name: "باراسيتامول",
    desc: "دواء مسكن وخافض للحرارة",
    categoryId: 1,
        category:"أدوية",

    price: 15,
    image: "imges/para.webp",
    barcode: "1234567890123"
  },
  {
    id: 2,
    name: "مرطب البشرة",
    desc: "كريم مرطب عالي الجودة",
    categoryId: 4,
    price: 30,
    image: "imges/skin1.jpg",
    barcode: "2345678901234"
  },
  {
    id: 3,
    name: "مناديل أطفال",
    desc: "مناديل مبللة ناعمة للبشرة",
    categoryId: 3,
    price: 5,
    image: "imges/kidswipes.jpg",
    barcode: "3456789012345"
  },
   {
    id: 4,
    name: "هايدرالازين",
    desc: "دواء  منظم لضغط الدم",
    categoryId: 1,
    category:"أدوية",
    price: 40,
    image: "imges/hyd.jpg",
    barcode: "1234567890123"
  },
  {
    id: 5,
    name: "فيتامين B12",
    desc: "فيتامين ب 12 سريع الامتصاص ",
    categoryId: 2,
    price: 33,
    image: "imges/b12.webp",
    barcode: "2345678901234"
  },
  {
    id:6,
    name: "رضاعة اطفال",
    desc: "رضاعة اطفال 250مل",
    categoryId: 3,
    price: 20,
    image: "imges/babyB.jpeg",
    barcode: "3456789012345"
  }, {
    id:7,
    name: "زينوكسيمور",
    desc: "دواء مضاد التهاب قوي",
    categoryId: 1,
    price: 25,
    image: "imges/zino.jpeg",
    barcode: "1234567890123"
  },
  {
    id: 8,
    name: "جل معقم يدين",
    desc: "جل معقم  لليدبن مضاض للباكتيريا 500مل ",
    categoryId: 5,
    price: 19,
    image: "imges/handGel.webp",
    barcode: "2345678901234"
  },
  {
    id: 9,
    name: "معجون اسنان",
    desc: "معجون اسنان للاسنان الحساسة بخلاصة النعنع ",
    categoryId: 6,
    price: 13,
    image: "imges/toothpaste.jpeg",
    barcode: "3456789012345"
  }
];

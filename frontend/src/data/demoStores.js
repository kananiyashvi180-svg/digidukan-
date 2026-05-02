export const demoStores = [
  {
    id: 1,
    name: "Ram Kirana Store",
    slug: "ram-kirana",
    category: "Grocery",
    tagline: "Ghar ka saara saamaan, ab ek hi jagah!",
    owner: "Ram Prasad",
    village: "Ramgarh, UP",
    timing: "8:00 AM - 9:00 PM",
    rating: 4.8,
    phone: "9100000001",
    whatsapp: "9100000001",
    theme: {
      primary: "#10b981", // green
      secondary: "#facc15", // yellow
      accent: "#064e3b",
      bg: "#f0fdf4"
    },
    products: [
      { name: "Onion (Pyaz)", price: "₹30/kg", emoji: "🧅" },
      { name: "Tomato (Tamatar)", price: "₹40/kg", emoji: "🍅" },
      { name: "Milk (Doodh)", price: "₹60/L", emoji: "🥛" },
      { name: "Rice (Chawal)", price: "₹50/kg", emoji: "🍚" },
      { name: "Biscuit", price: "₹10", emoji: "🍪" },
      { name: "Atta (Chakki Fresh)", price: "₹45/kg", emoji: "🫓" },
    ],
    offers: [
      { title: "Sunday Special", desc: "1kg Sugar FREE on orders above ₹1000", code: "SUN100" },
      { title: "New Customer", desc: "Flat ₹50 OFF on first order", code: "FIRST50" }
    ]
  },
  {
    id: 2,
    name: "Village Bakery",
    slug: "village-bakery",
    category: "Bakery",
    tagline: "Taza aur swadisht cakes aur biscuits!",
    owner: "Suresh Kumar",
    village: "Sonpur, Bihar",
    timing: "9:00 AM - 8:30 PM",
    rating: 4.9,
    phone: "9100000002",
    whatsapp: "9100000002",
    theme: {
      primary: "#78350f", // brown
      secondary: "#fef3c7", // cream
      accent: "#451a03",
      bg: "#fffbeb"
    },
    products: [
      { name: "Fresh Bread", price: "₹30", emoji: "🍞" },
      { name: "Chocolate Cake", price: "₹350", emoji: "🎂" },
      { name: "Butter Cookies", price: "₹120/pk", emoji: "🍪" },
      { name: "Cream Donut", price: "₹40", emoji: "🍩" },
      { name: "Walnut Brownie", price: "₹80", emoji: "🍫" },
    ],
    offers: [
      { title: "Birthday Offer", desc: "Get FREE candles with every cake", code: "BDAY" },
      { title: "Combo Deal", desc: "Bread + Jam at just ₹70", code: "COMBO" }
    ]
  },
  {
    id: 3,
    name: "Laxmi Tea Stall",
    slug: "laxmi-tea-stall",
    category: "Cafe",
    tagline: "Kadak Chai aur Garam Nashta!",
    owner: "Laxmi Devi",
    village: "Pipariya, MP",
    timing: "6:00 AM - 10:00 PM",
    rating: 4.7,
    phone: "9100000003",
    whatsapp: "9100000003",
    theme: {
      primary: "#92400e", // tea brown
      secondary: "#fb923c", // orange
      accent: "#78350f",
      bg: "#fff7ed"
    },
    products: [
      { name: "Masala Chai", price: "₹10", emoji: "☕" },
      { name: "Milk Tea", price: "₹15", emoji: "🥛" },
      { name: "Bun Maska", price: "₹30", emoji: "🍞" },
      { name: "Veg Sandwich", price: "₹40", emoji: "🥪" },
      { name: "Special Maggie", price: "₹50", emoji: "🍜" },
    ],
    offers: [
      { title: "Morning Special", desc: "2 Chai + 1 Bun Maska at ₹45", code: "CHAI10" },
      { title: "Student Discount", desc: "10% OFF on Maggie for students", code: "STUDENT" }
    ]
  },
  {
    id: 4,
    name: "Krishna Tailors",
    slug: "krishna-tailors",
    category: "Clothing",
    tagline: "Behtareen fitting, sahi samay par!",
    owner: "Mohan Lal",
    village: "Udaipur, Rajasthan",
    timing: "10:00 AM - 8:00 PM",
    rating: 4.6,
    phone: "9100000004",
    whatsapp: "9100000004",
    theme: {
      primary: "#1e40af", // blue
      secondary: "#fdfaf6", // cream
      accent: "#1e3a8a",
      bg: "#eff6ff"
    },
    products: [
      { name: "Shirt Stitching", price: "₹300", emoji: "👕" },
      { name: "Pant Stitching", price: "₹400", emoji: "👖" },
      { name: "Designer Blouse", price: "₹500+", emoji: "🥻" },
      { name: "Quick Alteration", price: "₹50", emoji: "🧵" },
    ],
    offers: [
      { title: "Festival Sale", desc: "Stitch 3 Shirts, get 1 Pant FREE", code: "DIWALI" },
      { title: "Wedding Combo", desc: "Full suit stitching at ₹1500", code: "GROOM" }
    ]
  },
  {
    id: 5,
    name: "Aman Medical Shop",
    slug: "aman-medical",
    category: "Pharmacy",
    tagline: "Aapki sehat, hamari zimmedari!",
    owner: "Dr. Aman Verma",
    village: "Chandpur, Haryana",
    timing: "24 Hours Open",
    rating: 5.0,
    phone: "9100000005",
    whatsapp: "9100000005",
    theme: {
      primary: "#15803d", // green
      secondary: "#ffffff", // white
      accent: "#14532d",
      bg: "#f0fdf4"
    },
    products: [
      { name: "Paracetamol", price: "₹20/strip", emoji: "💊" },
      { name: "Bandage/Cotton", price: "₹15", emoji: "🩹" },
      { name: "Digital Thermometer", price: "₹250", emoji: "🌡️" },
      { name: "Cough Syrup", price: "₹80", emoji: "🧴" },
    ],
    offers: [
      { title: "Senior Citizen", desc: "Flat 15% OFF on all medicines", code: "HEALTH" },
      { title: "Free Delivery", desc: "Home delivery free within village", code: "HOME" }
    ]
  },
  {
    id: 6,
    name: "Kisan Vegetable Shop",
    slug: "kisan-vegetables",
    category: "Grocery",
    tagline: "Khet se seedha aapki rasoi tak!",
    owner: "Ganpat Singh",
    village: "Kisan Nagar, Punjab",
    timing: "5:00 AM - 12:00 PM",
    rating: 4.8,
    phone: "9100000006",
    whatsapp: "9100000006",
    theme: {
      primary: "#166534", // dark green
      secondary: "#d9f99d", // lime
      accent: "#064e3b",
      bg: "#f7fee7"
    },
    products: [
      { name: "Potato (Aloo)", price: "₹20/kg", emoji: "🥔" },
      { name: "Tomato (Tamatar)", price: "₹40/kg", emoji: "🍅" },
      { name: "Onion (Pyaz)", price: "₹35/kg", emoji: "🧅" },
      { name: "Fresh Spinach", price: "₹15/bunch", emoji: "🥬" },
      { name: "Carrot (Gajar)", price: "₹30/kg", emoji: "🥕" },
    ],
    offers: [
      { title: "Mandi Rates", desc: "Lowest rates guaranteed daily!", code: "FRESH" },
      { title: "Bulk Purchase", desc: "10% OFF on orders above 5kg", code: "BULK" }
    ]
  }
];

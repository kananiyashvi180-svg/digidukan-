import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      createStore: "Create Your Digital Store",
      generateWithAI: "Generate with AI",
      describeStore: "Describe your ideal store (e.g., 'A vibrant electronics shop in Mumbai')",
      processing: "Processing...",
      generateAiStore: "Generate AI Store",
      manualSetup: "Or setup manually",
      storeName: "Store Name",
      category: "Category",
      phone: "Phone Number",
      address: "Store Address",
      selectLocationMap: "Select Location on Map",
      createStoreBtn: "Create Store",
      creating: "Creating...",
      locationSelected: "Location Selected!",
      lat: "Lat",
      lng: "Lng",
      language: "Language"
    }
  },
  hi: {
    translation: {
      createStore: "अपना डिजिटल स्टोर बनाएं",
      generateWithAI: "AI के साथ बनाएं",
      describeStore: "अपने आदर्श स्टोर का वर्णन करें (उदा. 'मुंबई में एक इलेक्ट्रॉनिक दुकान')",
      processing: "प्रसंस्करण...",
      generateAiStore: "AI स्टोर बनाएं",
      manualSetup: "या मैन्युअल सेटअप करें",
      storeName: "स्टोर का नाम",
      category: "श्रेणी",
      phone: "फ़ोन नंबर",
      address: "स्टोर का पता",
      selectLocationMap: "मानचित्र पर स्थान चुनें",
      createStoreBtn: "स्टोर बनाएं",
      creating: "बनाया जा रहा है...",
      locationSelected: "स्थान चुना गया!",
      lat: "अक्षांश",
      lng: "देशांतर",
      language: "भाषा"
    }
  },
  gu: {
    translation: {
      createStore: "તમારો ડિજિટલ સ્ટોર બનાવો",
      generateWithAI: "AI સાથે બનાવો",
      describeStore: "તમારા આદર્શ સ્ટોરનું વર્ણન કરો (દા.ત., 'મુંબઈમાં એક ઇલેક્ટ્રોનિક્સ દુકાન')",
      processing: "પ્રક્રિયા થઈ રહી છે...",
      generateAiStore: "AI સ્ટોર બનાવો",
      manualSetup: "અથવા મેન્યુઅલ સેટઅપ કરો",
      storeName: "સ્ટોરનું નામ",
      category: "શ્રેણી",
      phone: "ફોન નંબર",
      address: "સ્ટોરનું સરનામું",
      selectLocationMap: "નકશા પર સ્થાન પસંદ કરો",
      createStoreBtn: "સ્ટોર બનાવો",
      creating: "બનાવવામાં આવી રહ્યું છે...",
      locationSelected: "સ્થાન પસંદ થયેલ છે!",
      lat: "અક્ષાંશ",
      lng: "રેખાંશ",
      language: "ભાષા"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;

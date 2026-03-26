import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// We'll use a simple fallback if expo-localization is not ready or installed
// Usually, we'd use expo-localization, but for simplicity we'll default to 'en'

const resources = {
  en: { translation: { welcome: 'Welcome to AI RAKSHAK', dashboard: 'Dashboard', analyze: 'Analyze Call', video: 'Analyze Video', alerts: 'Alerts', settings: 'Settings' } },
  hi: { translation: { welcome: 'AI RAKSHAK में आपका स्वागत है', dashboard: 'डैशबोर्ड', analyze: 'कॉल विश्लेषण', video: 'वीडियो विश्लेषण', alerts: 'अलर्ट', settings: 'सेटिंग्स' } },
  bn: { translation: { welcome: 'AI RAKSHAK-এ স্বাগতম', dashboard: 'ড্যাশবোর্ড', analyze: 'কল বিশ্লেষণ', video: 'ভিডিও বিশ্লেষণ', alerts: 'সতর্কতা', settings: 'সেটিংস' } },
  te: { translation: { welcome: 'AI RAKSHAK కు స్వాగతం', dashboard: 'డ్యాష్‌బోర్డ్', analyze: 'కాల్ విశ్లేషణ', video: 'వీడియో విశ్లేషణ', alerts: 'హెచ్చరికలు', settings: 'సెట్టింగ్‌లు' } },
  mr: { translation: { welcome: 'AI RAKSHAK मध्ये आपले स्वागत आहे', dashboard: 'डॅशबोर्ड', analyze: 'कॉल विश्लेषण', video: 'व्हिडिओ विश्लेषण', alerts: 'अलर्ट', settings: 'सेटिंग्ज' } },
  ta: { translation: { welcome: 'AI RAKSHAK க்கு வரவேற்கிறோம்', dashboard: 'முகப்பு', analyze: 'அழைப்பு பகுப்பாய்வு', video: 'வீடியோ பகுப்பாய்வு', alerts: 'விழிப்பூட்டல்கள்', settings: 'அமைப்புகள்' } },
  ur: { translation: { welcome: 'AI RAKSHAK میں خوش آمدید', dashboard: 'ڈیش بورڈ', analyze: 'کال کا تجزیہ', video: 'ویڈیو کا تجزیہ', alerts: 'انتباہات', settings: 'ترتیبات' } },
  gu: { translation: { welcome: 'AI RAKSHAK માં આપનું સ્વાગત છે', dashboard: 'ડેશબોર્ડ', analyze: 'કૉલ વિશ્લેષણ', video: 'વિડિઓ વિશ્લેષણ', alerts: 'ચેતવણીઓ', settings: 'સેટિંગ્સ' } },
  kn: { translation: { welcome: 'AI RAKSHAK ಗೆ ಸುಸ್ವಾಗತ', dashboard: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್', analyze: 'ಕರೆ ವಿಶ್ಲೇಷಣೆ', video: 'ವೀಡಿಯೊ ವಿಶ್ಲೇಷಣೆ', alerts: 'ಎಚ್ಚರಿಕೆಗಳು', settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು' } },
  or: { translation: { welcome: 'AI RAKSHAK ରେ ସ୍ୱାଗତ', dashboard: 'ଡ୍ୟାସବୋର୍ଡ', analyze: 'କଲ୍ ବିଶ୍ଳେଷଣ', video: 'ଭିଡିଓ ବିଶ୍ଳେଷଣ', alerts: 'ଆଲର୍ଟ', settings: 'ସେଟିଂସ' } },
  ml: { translation: { welcome: 'AI RAKSHAK ലേക്ക് സ്വാഗതം', dashboard: 'ഡാഷ്‌ബോർഡ്', analyze: 'കോൾ വിശകലനം', video: 'വീഡിയോ വിശകലനം', alerts: 'അലർട്ടുകൾ', settings: 'ക്രമീകരണങ്ങൾ' } },
  pa: { translation: { welcome: 'AI RAKSHAK ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ', dashboard: 'ਡੈਸ਼ਬੋਰਡ', analyze: 'ਕਾਲ ਵਿਸ਼ਲੇਸ਼ਣ', video: 'ਵੀਡੀਓ ਵਿਸ਼ਲੇਸ਼ਣ', alerts: 'ਚੇਤਾਵਨੀਆਂ', settings: 'ਸੈਟਿੰਗਾਂ' } },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3' as any,
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


const availablelanguage=['en','hin','chi']
const option={
    order:['navigator','htmlTag','path','subdomain'],
    checkwhitelist:true
}
i18n
  
  .use(Backend)
  
  .use(LanguageDetector)
  
  .use(initReactI18next)
 
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist:availablelanguage,
    detection:option,
    interpolation: {
      escapeValue: false, 
    }
  });


export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { es_ar } from './langs/es_ar';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es_ar: {
                translation: es_ar
            }
        },
        lng: 'es_ar',
        fallbackLng: 'es_ar',
        // debug: process.env.NODE_ENV === 'development',
    });


export default i18n;
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';
import {MMKV} from 'react-native-mmkv';
import resources from 'translations'
const storage = new MMKV();
const STORE_LANGUAGE_KEY = 'language';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetectorPlugin = {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async function (callback) {
        try {
            //get stored language from Async storage
            const language = storage.getString(STORE_LANGUAGE_KEY);
            console.log('loaded language', language);
            if (language) {
                //if language was stored before, use this language in the app
                return callback(language);
            } else {
                // console.log(
                //     '333212',
                //     `${Localization.locale}-${Localization.region}`,
                // );
                //if language was not stored yet, use device's locale
                return callback(`${Localization.locale}-${Localization.region}`);
            }
        } catch (error) {
            console.log('Error reading language', error);
        }
    },
    cacheUserLanguage: async function (language) {
        try {
            //save a user's language choice in Async storage
            storage.set(STORE_LANGUAGE_KEY, language);
        } catch (error) {
            console.log('Error saving language', error);
        }
    },
};

i18n.use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
        fallbackLng: 'en-US',
        supportedLngs: ['en-US', 'zh-CN'],
        resources,

        // have a common namespace used around the full app
        ns: 'app',
        // defaultNS: 'app',

        debug: true,
        react: {
            // useSuspense: false, //   <---- this will do the magic
        },
        load:'currentOnly',
        // cache: {
        //   enabled: true
        // },

        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        },
    });

export default i18n;

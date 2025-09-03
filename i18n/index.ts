import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en-US.json";
import translationKa from "./locales/ka-GE.json";
import translationRu from "./locales/ru-RU.json";

const resources = {
  "ka-GE": { translation: translationKa },
  "en-US": { translation: translationEn },
  "ru-RU": { translation: translationRu },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "ka-GE",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

import translationEn from './locales/en-US.json';
import translationKa from './locales/ka-GE.json';
import translationRu from './locales/ru-RU.json';

const resources = {
  'ka-GE': { translation: translationKa },
  'en-US': { translation: translationEn },
  'ru-RU': { translation: translationRu },
};

const getStoredLanguage = async (): Promise<string | null> => {
  // Skip AsyncStorage during server-side rendering
  if (Platform.OS === 'web' && typeof window === 'undefined') {
    return null;
  }

  try {
    return await AsyncStorage.getItem('language');
  } catch (error) {
    console.warn('Failed to get stored language:', error);
    return null;
  }
};

const initI18n = async () => {
  let savedLanguage: string | null = null;

  try {
    savedLanguage = await getStoredLanguage();
  } catch (error) {
    console.warn('Failed to initialize language storage:', error);
  }

  if (!savedLanguage) {
    try {
      const locales = Localization.getLocales();
      savedLanguage = locales.length > 0 ? (locales[0]?.languageTag ?? 'ka-GE') : 'ka-GE';
    } catch (error) {
      console.warn('Failed to get device locales:', error);
      savedLanguage = 'ka-GE';
    }
  }

  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage ?? 'ka-GE',
    fallbackLng: 'ka-GE',
    interpolation: {
      escapeValue: false,
    },
  });
};

// Initialize i18n with error handling for SSR
if (Platform.OS === 'web' && typeof window === 'undefined') {
  // Server-side rendering: Initialize with default language immediately
  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ka-GE',
    fallbackLng: 'ka-GE',
    interpolation: {
      escapeValue: false,
    },
  });
} else {
  // Client-side: Initialize asynchronously with stored preferences
  initI18n().catch(error => {
    console.error('Failed to initialize i18n:', error);
    // Fallback initialization
    // eslint-disable-next-line import/no-named-as-default-member
    i18n.use(initReactI18next).init({
      resources,
      lng: 'ka-GE',
      fallbackLng: 'ka-GE',
      interpolation: {
        escapeValue: false,
      },
    });
  });
}

export default i18n;

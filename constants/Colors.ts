/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  gradient: {
    primary: {
      start: '#662D91',
      end: '#302E9C',
    },
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  brand: {
    primary: '#662D91',
  },
  text: {
    error: {
      primary: '#D92D20',
    },
    tertiary: '#535862',
    secondary: '#414651',
    placeholder: '#717680',
    primary: '#181D27',
    white: '#FFFFFF',
  },
  border: {
    primary: '#E6E8EB',
    focused: '#302E9C',
    subtleError: '#FDA29B',
    activeError: '#F04438',
    disabledBorder: '#E9EAEB',
    borderLight: '#00000014',
    secondary: '#D5D7DA',
    card: '#E2E3E5',
  },
  background: {
    white: '#FFFFFF',
    disabled: '#FAFAFA',
    transparent: 'transparent',
    body: '#F5F5F5',
    body_dark: '#151718',
    successSecondary: '#17B26A',
    avatar: '#F0F0F0',
    imagePlaceholder: '#D9D9D9',
  },
  button: {
    primaryBorder: '#FFFFFF',
    primaryBackgroundStart: '#662D91',
    primaryBackgroundEnd: '#302E9C',
    primaryPressedOverlay: 'rgba(0,0,0,0.2)',
    secondaryBackground: '#FFFFFF',
    secondaryBorder: '#D5D7DA',
    secondaryText: '#414651',
    secondaryHoverText: '#252B37',
    secondaryHoverBackground: '#FAFAFA',
    primaryText: '#FFFFFF',
    primaryHoverText: '#FFFFFF',
    disabledBackground: '#F5F5F5',
    disabledBorder: '#E9EAEB',
    disabledText: '#A4A7AE',
    outline: '#9E77ED',
  },
  checkbox: {
    border: '#6670804D',
    background: '#FFFFFF',
    checkmark: '#000000',
    disabledBackground: '#FAFAFA',
    disabledBorder: '#D5D7DA',
  },
  login: {
    title: '#000000',
    forgotPassword: '#000000',
  },
  icon: {
    primary: '#717680',
    black: '#000000',
    secondary: '#A4A7AE',
  },
  tag: {
    success: {
      border: '#ABEFC6',
      background: '#ECFDF3',
      icon: '#17B26A',
      label: '#067647',
    },
    warning: {
      border: '#FEDF89',
      background: '#FFFAEB',
      icon: '#F79009',
      label: '#B54708',
    },
    danger: {
      border: '#FECDCA',
      background: '#FEF3F2',
      icon: '#F04438',
      label: '#B42318',
    },
  },
  modal: {
    background: '#F2F2F2',
    overlay: 'rgba(0,0,0,0.5)',
  },
};

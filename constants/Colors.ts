/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
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
  text: {
    brand: {
      tertiary: '#7F56D9',
    },
    error: {
      primary: '#D92D20',
    },
    tertiary: '#535862',
    secondary: '#414651',
    placeholder: '#717680',
    primary: '#181D27',
  },
  border: {
    primary: '#E6E8EB',
    focused: '#302E9C',
    subtle_error: '#FDA29B',
    active_error: '#F04438',
  },
  background: {
    disabled: '#FAFAFA',
    transparent: 'transparent',
  },
};

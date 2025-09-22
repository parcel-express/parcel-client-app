import type { ViewStyle } from 'react-native';
export const Shadows: Record<string, ViewStyle> = {
  shadow_xs: {
    shadowColor: '#0A0D120D',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
  shadow_xl03: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, // IOS
    shadowRadius: 3, // IOS
    elevation: 3, // Android
  },
  shadow_xl02: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12, // IOS
    shadowRadius: 8, // IOS
    elevation: 8, // Android
  },
  shadow_xl01: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1, // IOS
    shadowRadius: 24, // IOS
    elevation: 20, // Android
  },
} as const;

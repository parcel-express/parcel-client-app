import type { ViewStyle } from 'react-native';
export const Shadows: Record<string, ViewStyle> = {
  shadow_xs: {
    shadowColor: '#0A0D12',
    shadowOffset: {
      width: 0, // 0px horizontal offset
      height: 1, // 1px vertical offset
    },
    shadowOpacity: 0.05, // ~5% opacity (from the alpha channel in the color)
    shadowRadius: 2, // 2px blur radius
    elevation: 0.5, // For Android (changed from 0)
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
  shadow_lg03: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },

  // box-shadow: 0px 4px 6px -2px var(--ColorsEffectsShadowsshadow-lg02);
  shadow_lg02: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },

  // box-shadow: 0px 12px 16px -4px var(--ColorsEffectsShadowsshadow-lg01);
  shadow_lg01: {
    shadowColor: '#0A0D12',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
  },
} as const;

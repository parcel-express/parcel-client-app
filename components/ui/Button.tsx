import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useState } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useButtonColors } from '@/hooks/useButtonColors';
export type ButtonProps = Omit<PressableProps, 'style' | 'children' | 'onPress' | 'disabled'> & {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant: 'primary' | 'secondary';
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

const sizes = {
  sm: { paddingVertical: 8, paddingHorizontal: 12, gap: 4 },
  md: { paddingVertical: 10, paddingHorizontal: 14, gap: 4 },
  lg: { paddingVertical: 10, paddingHorizontal: 16, gap: 6 },
  xl: { paddingVertical: 12, paddingHorizontal: 18, gap: 6 },
  '2xl': { paddingVertical: 16, paddingHorizontal: 22, gap: 8, borderRadius: 10 },
};

const typography = {
  sm: Typography.textSmSemiBold,
  md: Typography.textMdSemiBold,
  lg: Typography.textLgSemiBold,
  xl: Typography.textMdSemiBold,
  '2xl': Typography.textLgSemiBold,
};

type PressableRef = React.ComponentRef<typeof Pressable>;

const Button = forwardRef<PressableRef, ButtonProps>(
  ({ size, variant, disabled, children, leftIconName, rightIconName, style, ...rest }, ref) => {
    const [showOutline, setShowOutline] = useState(false);
    const { getIconColor, getBorderColor, getTextColor } = useButtonColors(variant, disabled);

    return (
      <Pressable
        ref={ref} // ✅ forward the ref
        disabled={disabled}
        accessibilityRole='button'
        accessibilityState={{ disabled: !!disabled }}
        focusable={!disabled}
        onFocus={() => setShowOutline(true)}
        onBlur={() => setShowOutline(false)}
        style={[showOutline && styles.buttonOutline, styles.full]}
        {...rest}
      >
        {({ pressed }) => (
          <LinearGradient
            colors={
              disabled
                ? [Colors.button.disabledBackground, Colors.button.disabledBackground]
                : variant === 'secondary'
                  ? [
                      pressed
                        ? Colors.button.secondaryHoverBackground
                        : Colors.button.secondaryBackground,
                      +pressed
                        ? Colors.button.secondaryHoverBackground
                        : Colors.button.secondaryBackground,
                    ]
                  : [Colors.gradient.primary.start, Colors.gradient.primary.end]
            }
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              style,
              styles.button,
              {
                ...sizes[size],
                borderColor: getBorderColor(),
              },
            ]}
          >
            {pressed && variant === 'primary' && (
              <LinearGradient
                colors={[Colors.button.primaryPressedOverlay, Colors.button.primaryPressedOverlay]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            {leftIconName && (
              <MaterialIcons name={leftIconName} size={20} color={getIconColor(pressed)} />
            )}
            <Text
              style={[
                typography[size],
                {
                  color: getTextColor(pressed),
                },
                styles.label,
              ]}
            >
              {children}
            </Text>
            {rightIconName && (
              <MaterialIcons name={rightIconName} size={20} color={getIconColor(pressed)} />
            )}
          </LinearGradient>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  buttonOutline: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.button.outline,
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
  full: { flex: 1 },
});

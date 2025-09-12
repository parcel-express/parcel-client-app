import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
type Props = {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant: 'primary' | 'secondary';
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
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
const Button = ({
  size,
  variant,
  onPress,
  disabled,
  children,
  leftIconName,
  rightIconName,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getIconColor = (pressed: boolean) => {
    if (disabled) {
      return Colors.button.disabledText;
    }

    if (pressed) {
      return variant === 'secondary'
        ? Colors.button.secondaryHoverText
        : Colors.button.primaryHoverText;
    }

    return variant === 'secondary' ? Colors.button.secondaryText : Colors.button.primaryText;
  };

  const getBorderColor = () => {
    if (disabled) {
      return Colors.button.disabledBorder;
    }
    return variant === 'secondary' ? Colors.button.secondaryBorder : Colors.button.primaryBorder;
  };

  const getTextColor = (pressed: boolean) => {
    if (disabled) {
      return Colors.button.disabledText;
    }
    if (pressed) {
      return variant === 'secondary'
        ? Colors.button.secondaryHoverText
        : Colors.button.primaryHoverText;
    }
    return variant === 'secondary' ? Colors.button.secondaryText : Colors.button.primaryText;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[isFocused && styles.buttonOutline]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed && variant === 'secondary'
              ? [Colors.button.secondaryHoverBackground, Colors.button.secondaryHoverBackground]
              : disabled
                ? [Colors.button.disabledBackground, Colors.button.disabledBackground]
                : variant === 'secondary'
                  ? [Colors.button.secondaryBackground, Colors.button.secondaryBackground]
                  : [Colors.button.primaryBackgroundStart, Colors.button.primaryBackgroundEnd]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
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
            {children || 'Button Text'}
          </Text>
          {rightIconName && (
            <MaterialIcons name={rightIconName} size={20} color={getIconColor(pressed)} />
          )}
        </LinearGradient>
      )}
    </Pressable>
  );
};

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
    outlineOffset: 4,
    outlineWidth: 2,
    outlineColor: Colors.button.outline,
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});

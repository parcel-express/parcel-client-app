import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typohraphy';
type Props = {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant: 'primary' | 'secondary';
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  left_icon_name?: keyof typeof MaterialIcons.glyphMap;
  right_icon_name?: keyof typeof MaterialIcons.glyphMap;
};

const Button = ({
  size,
  variant,
  onPress,
  disabled,
  children,
  left_icon_name,
  right_icon_name,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 12, gap: 4 },
    md: { paddingVertical: 10, paddingHorizontal: 14, gap: 4 },
    lg: { paddingVertical: 10, paddingHorizontal: 16, gap: 6 },
    xl: { paddingVertical: 12, paddingHorizontal: 18, gap: 6 },
    '2xl': { paddingVertical: 16, paddingHorizontal: 22, gap: 8, borderRadius: 10 },
  };
  const typography = {
    sm: Typography.text_sm_semiBold,
    md: Typography.text_sm_semiBold,
    lg: Typography.text_md_semiBold,
    xl: Typography.text_md_semiBold,
    '2xl': Typography.text_lg_semiBold,
  };
  const getIconColor = (pressed: boolean) => {
    if (disabled) {
      return Colors.button.disabled_text;
    }

    if (pressed) {
      return variant === 'secondary'
        ? Colors.button.secondary_hover_text
        : Colors.button.primary_hover_text;
    }

    return variant === 'secondary' ? Colors.button.secondary_text : Colors.button.primary_text;
  };

  const getBorderColor = () => {
    if (disabled) {
      return Colors.button.disabled_border;
    }
    return variant === 'secondary' ? Colors.button.secondary_border : Colors.button.primary_border;
  };

  const getTextColor = (pressed: boolean) => {
    if (disabled) {
      return Colors.button.disabled_text;
    }
    if (pressed) {
      return variant === 'secondary'
        ? Colors.button.secondary_hover_text
        : Colors.button.primary_hover_text;
    }
    return variant === 'secondary' ? Colors.button.secondary_text : Colors.button.primary_text;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[isFocused && styles.button_outline]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed && variant === 'secondary'
              ? [Colors.button.secondary_hover_background, Colors.button.secondary_hover_background]
              : disabled
                ? [Colors.button.disabled_background, Colors.button.disabled_background]
                : variant === 'secondary'
                  ? [Colors.button.secondary_background, Colors.button.secondary_background]
                  : [Colors.button.primary_background_start, Colors.button.primary_background_end]
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
              colors={[
                Colors.button.primary_pressed_overlay,
                Colors.button.primary_pressed_overlay,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          {left_icon_name && (
            <MaterialIcons name={left_icon_name} size={20} color={getIconColor(pressed)} />
          )}
          <Text
            style={[
              typography[size],
              {
                color: getTextColor(pressed),
              },
            ]}
          >
            {children || 'Button Text'}
          </Text>
          {right_icon_name && (
            <MaterialIcons name={right_icon_name} size={20} color={getIconColor(pressed)} />
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
  button_outline: {
    borderRadius: 8,
    outlineOffset: 4,
    outlineWidth: 2,
    outlineColor: Colors.button.outline,
  },
});

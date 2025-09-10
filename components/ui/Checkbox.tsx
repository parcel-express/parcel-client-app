import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';

type Props = {
  label: string;
  toggleCheckbox: () => void;
  checked: boolean;
  size: 'sm' | 'md';
  indeterminate?: boolean;
  disabled?: boolean;
};

const Checkbox = ({ label, toggleCheckbox, checked, size, indeterminate, disabled }: Props) => {
  const sizes = {
    sm: { width: 16, height: 16 },
    md: { width: 20, height: 20 },
  };
  const iconSizes = {
    sm: 14,
    md: 16,
  };
  return (
    <TouchableOpacity
      style={styles.checkbox_container}
      onPress={toggleCheckbox}
      accessibilityRole='checkbox'
      accessibilityState={{ checked, disabled, busy: indeterminate }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View
        style={[
          { ...sizes[size] },
          styles.checkbox,
          !checked && styles.checkbox_border,
          disabled && styles.disabled_checkbox,
        ]}
      >
        {checked && (
          <>
            {!disabled && (
              <LinearGradient
                colors={[
                  Colors.button.primary_background_start,
                  Colors.button.primary_background_end,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <MaterialIcons
              name={indeterminate ? 'remove' : 'check'}
              size={iconSizes[size]}
              color={disabled ? Colors.checkbox.disabled_border : Colors.background.white}
            />
          </>
        )}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  checkbox_border: {
    borderWidth: 1,
    borderColor: Colors.checkbox.border,
  },
  disabled_checkbox: {
    backgroundColor: Colors.checkbox.disabled_background,
    borderColor: Colors.checkbox.disabled_border,
  },
});

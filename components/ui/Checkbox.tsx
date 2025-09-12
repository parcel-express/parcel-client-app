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
const sizes = {
  sm: { width: 16, height: 16 },
  md: { width: 20, height: 20 },
};
const iconSizes = {
  sm: 14,
  md: 16,
};
const Checkbox = ({ label, toggleCheckbox, checked, size, indeterminate, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => !disabled && toggleCheckbox()}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole='checkbox'
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View
        style={[
          { ...sizes[size] },
          styles.checkbox,
          !checked && styles.checkboxBorder,
          disabled && styles.disabledCheckbox,
        ]}
      >
        {checked && (
          <>
            {!disabled && (
              <LinearGradient
                colors={[Colors.button.primaryBackgroundStart, Colors.button.primaryBackgroundEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            )}
            <MaterialIcons
              name={indeterminate ? 'remove' : 'check'}
              size={iconSizes[size]}
              color={disabled ? Colors.checkbox.disabledBorder : Colors.background.white}
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
  checkboxContainer: {
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
  checkboxBorder: {
    borderWidth: 1,
    borderColor: Colors.checkbox.border,
  },
  disabledCheckbox: {
    backgroundColor: Colors.checkbox.disabledBackground,
    borderColor: Colors.checkbox.disabledBorder,
  },
});

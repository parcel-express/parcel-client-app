import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type Props = {
  label?: string;
  setValue: (value: string) => void;
  value?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
};

const Select = ({ label, setValue, value, placeholder, options, disabled }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getBorderColor = () => {
    if (disabled) {
      return Colors.border.disabled_border;
    }
    return isFocused ? Colors.border.focused : Colors.border.primary;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.flex_row}>
          <Text style={{ ...Typography.text_xs_medium, color: Colors.text.secondary }}>
            {label}
            {label && <Text style={{ color: Colors.text.brand.tertiary }}>*</Text>}
          </Text>
        </View>
        <Pressable
          onPress={() => !disabled && setIsFocused(prev => !prev)}
          style={{
            ...styles.input_container,
            borderColor: getBorderColor(),
            backgroundColor: disabled ? Colors.background.disabled : Colors.background.white,
          }}
        >
          <Text
            style={[
              Typography.text_md_medium,
              { color: value ? Colors.text.primary : Colors.text.placeholder },
            ]}
          >
            {value || placeholder}
          </Text>
          <MaterialIcons
            style={[styles.icon, isFocused && { transform: [{ rotate: '270deg' }] }]}
            name={'chevron-right'}
            size={20}
            color={Colors.text.placeholder}
          />
        </Pressable>
      </View>

      {isFocused && (
        <View style={styles.dropdown}>
          <ScrollView>
            {options.map(item => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.option,
                  value === item.value && { backgroundColor: Colors.background.disabled },
                ]}
                onPress={() => {
                  setValue(item.value);
                  setIsFocused(false);
                }}
              >
                <Text style={[Typography.text_md_medium, styles.label]}>{item.label}</Text>
                {value === item.value && <MaterialIcons name='check' size={20} color={'#7F56D9'} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  input_container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    paddingHorizontal: 12,
    ...Shadows.shadow_xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: Colors.background.white,
    height: 44,
  },

  icon: {
    transform: [{ rotate: '90deg' }],
  },
  dropdown: {
    backgroundColor: Colors.background.white,
    borderRadius: 8,
    paddingVertical: 4,
    maxHeight: 256,
    borderWidth: 1,
    borderColor: Colors.border.disabled_border,
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    paddingRight: 16,
    paddingLeft: 14,
  },
  label: {
    color: Colors.text.primary,
  },
});

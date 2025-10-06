// ...existing code...
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';
// ...existing code...

type Props = {
  label?: string;
  setValue: (value: string) => void;
  value?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  allowInput?: boolean; // <-- new: allow typing
  inputType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad';
};

const Select = ({
  label,
  setValue,
  value,
  placeholder,
  options,
  disabled,
  variant = 'primary',
  size = 'md',
  allowInput = false,
  inputType = 'default',
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // input state used when allowInput=true
  const [inputValue, setInputValue] = React.useState<string>(
    () => options.find(opt => opt.value === value)?.label ?? ''
  );
  const inputRef = React.useRef<TextInput | null>(null);

  React.useEffect(() => {
    // when external value changes, sync label into inputValue
    const labelForValue = options.find(opt => opt.value === value)?.label;
    if (labelForValue !== undefined) {
      setInputValue(labelForValue);
    }
  }, [value, options]);

  const getBorderColor = () => {
    if (disabled) {
      return Colors.border.disabledBorder;
    }

    return isFocused ? Colors.border.focused : Colors.border[variant];
  };

  const onPressContainer = () => {
    if (disabled) return;

    setIsFocused(prev => !prev);
  };

  const handleSelectOption = (item: { label: string; value: string }) => {
    setValue(item.value);
    setInputValue(item.label);
    setIsFocused(false);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    // pass typed text upstream as value as well
    setValue(text);
  };

  const filteredOptions =
    allowInput && inputValue
      ? options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()))
      : options;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {!!label && (
          <Text style={{ ...Typography.textXsMedium, color: Colors.text.secondary }}>{label}</Text>
        )}
        <Pressable
          disabled={!!disabled}
          onPress={onPressContainer}
          style={{
            ...styles.inputContainer,
            ...(size === 'sm' ? styles.smallGap : styles.mediumGap),
            borderColor: getBorderColor(),
            backgroundColor: disabled ? Colors.background.disabled : Colors.background.white,
          }}
          accessibilityRole='button'
          accessibilityLabel={label || placeholder}
          accessibilityHint={isFocused ? 'Collapse options' : 'Expand options'}
          accessibilityState={{ expanded: isFocused, disabled: !!disabled }}
        >
          {allowInput ? (
            <TextInput
              ref={inputRef}
              value={inputValue}
              onChangeText={handleInputChange}
              placeholder={placeholder}
              placeholderTextColor={Colors.text.placeholder}
              style={[
                size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                {
                  color: inputValue ? Colors.text[variant] : Colors.text.placeholder,
                },
                styles.textInput,
              ]}
              editable={!disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              numberOfLines={1}
              underlineColorAndroid='transparent'
              keyboardType={inputType}
            />
          ) : (
            <Text
              style={[
                size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                { color: value ? Colors.text[variant] : Colors.text.placeholder },
              ]}
            >
              {options.find(opt => opt.value === value)?.label || placeholder}
            </Text>
          )}

          <View style={{ transform: [{ rotate: isFocused ? '90deg' : '-90deg' }] }}>
            <MaterialIcons name={'chevron-left'} size={20} color={Colors.text.placeholder} />
          </View>
        </Pressable>
      </View>

      {isFocused && (
        <View style={[styles.dropdown, !label && styles.topWithoutLabel]} accessibilityRole='menu'>
          <ScrollView keyboardShouldPersistTaps='handled'>
            {filteredOptions.length === 0 ? (
              <View style={styles.option}>
                <Text
                  style={[
                    size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                    styles.label,
                  ]}
                >
                  {allowInput ? 'No results' : 'No options'}
                </Text>
              </View>
            ) : (
              filteredOptions.map(item => (
                <TouchableOpacity
                  accessibilityRole='menuitem'
                  key={item.value}
                  style={[
                    styles.option,
                    value === item.value && { backgroundColor: Colors.background.disabled },
                  ]}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text
                    style={[
                      size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                      styles.label,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <MaterialIcons name='check' size={20} color={Colors.brand.primary} />
                  )}
                </TouchableOpacity>
              ))
            )}
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

  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    ...Shadows.shadow_xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: Colors.background.white,
  },
  smallGap: {
    gap: 4,
  },
  mediumGap: {
    gap: 8,
  },
  dropdown: {
    backgroundColor: Colors.background.white,
    borderRadius: 8,
    paddingVertical: 4,
    maxHeight: 256,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    elevation: 8,
    zIndex: 1000,
  },
  topWithoutLabel: {
    top: 50,
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
  textInput: {
    flex: 1,
    lineHeight: 19.7,
  },
});

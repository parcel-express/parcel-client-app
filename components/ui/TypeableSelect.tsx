import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  Platform,
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
import { useTabBarHeight } from '@/hooks/useTabBarHeight';

type Props = {
  label?: string;
  setValue: (value: string) => void;
  value?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  allowInput?: boolean;
  inputType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  maxW?: number;
  isInModal?: boolean;
};

const OPTION_HEIGHT = 44;
const ICON_AND_PADDING_WIDTH = 54;

const TypeableSelect = ({
  label,
  setValue,
  value,
  placeholder,
  options,
  disabled,
  variant = 'primary',
  size = 'md',
  allowInput = true,
  inputType = 'default',
}: Props) => {
  const tabBarHeight = useTabBarHeight();
  const { height: screenHeight } = Dimensions.get('window');
  const { i18n } = useTranslation();
  const [isFocused, setIsFocused] = React.useState(false);
  const isSelectingRef = React.useRef(false);
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const triggerRef = React.useRef<View | null>(null);
  const inputRef = React.useRef<TextInput | null>(null);
  const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const [inputValue, setInputValue] = React.useState<string>(
    () => options.find(opt => opt.value === value)?.label ?? ''
  );

  React.useEffect(() => {
    const labelForValue = options.find(opt => opt.value === value)?.label;
    if (labelForValue !== undefined) {
      setInputValue(labelForValue);
    }
  }, [value, options]);

  const getBorderColor = () => {
    if (disabled) return Colors.border.disabledBorder;
    return isFocused ? Colors.border.focused : Colors.border[variant];
  };

  const openDropdown = () => {
    if (disabled) return;
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setIsFocused(true);
      if (allowInput) {
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    });
  };

  const closeDropdown = () => {
    setIsFocused(false);
  };

  const onPressContainer = () => {
    if (disabled) return;
    if (isFocused) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleSelectOption = (item: { label: string; value: string }) => {
    isSelectingRef.current = true;
    setValue(item.value);
    setInputValue(item.label);
    closeDropdown();
    setTimeout(() => (isSelectingRef.current = false), 100);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setValue(text);
  };

  useEffect(() => {
    if (!inputValue) {
      setFilteredOptions(options);
      return;
    }

    // Filter options that include the input
    const filtered = options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()));

    // Add inputValue as new option if not already in filtered options
    const isNewOption = !filtered.some(o => o.label.toLowerCase() === inputValue.toLowerCase());

    const newOption = isNewOption ? [{ label: inputValue, value: inputValue }] : [];

    // Combine new option on top + filtered options
    setFilteredOptions([...newOption, ...filtered]);
  }, [inputValue, options]);

  const factor = i18n.language?.startsWith('en')
    ? 6.6
    : i18n.language?.startsWith('ka')
      ? 7.5
      : 6.5;

  const maxLabelLen =
    filteredOptions.length > 0
      ? Math.max(...filteredOptions.map(opt => opt.label.length))
      : placeholder?.length || 0;

  const dropdownWidth = Math.max(layout.width, maxLabelLen * factor + ICON_AND_PADDING_WIDTH);

  const getDropdownPosition = () => {
    const OPTIONS_HEIGHT = filteredOptions.length * OPTION_HEIGHT;
    let top = layout.height + 20 + 12;
    let width: number | string = layout.width;

    const isOverflowingBottom = layout.y + OPTIONS_HEIGHT + tabBarHeight > screenHeight;

    if (isOverflowingBottom) top = layout.y - OPTIONS_HEIGHT - 8;
    if (variant === 'secondary') width = dropdownWidth;

    return { top, width };
  };

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.container}>
        {!!label && (
          <Text style={{ ...Typography.textXsMedium, color: Colors.text.secondary }}>{label}</Text>
        )}

        <Pressable
          ref={triggerRef}
          disabled={!!disabled}
          onPress={onPressContainer}
          style={[
            styles.inputContainer,
            variant === 'secondary' && styles.fullWidth,
            size === 'sm' ? styles.smallGap : styles.mediumGap,
            (!allowInput || Platform.OS === 'ios') && styles.verticalPadding,
            { borderColor: getBorderColor() },
            { backgroundColor: disabled ? Colors.background.disabled : Colors.background.white },
          ]}
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
                { color: inputValue ? Colors.text[variant] : Colors.text.placeholder },
                styles.textInput,
              ]}
              editable={!disabled}
              onFocus={openDropdown}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              numberOfLines={1}
              underlineColorAndroid='transparent'
              keyboardType={inputType}
            />
          ) : (
            <Text
              style={[
                size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                {
                  color: value ? Colors.text[variant] : Colors.text.placeholder,
                  width:
                    layout.width > ICON_AND_PADDING_WIDTH
                      ? layout.width - ICON_AND_PADDING_WIDTH
                      : undefined,
                },
              ]}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {options.find(opt => opt.value === value)?.label || placeholder}
            </Text>
          )}

          <View style={{ transform: [{ rotate: isFocused ? '90deg' : '-90deg' }] }}>
            <MaterialIcons name='chevron-left' size={20} color={Colors.text.placeholder} />
          </View>
        </Pressable>
      </View>
      {isFocused && (
        <>
          <View style={[styles.dropdown, getDropdownPosition()]} accessibilityRole='menu'>
            <ScrollView keyboardShouldPersistTaps='always'>
              {filteredOptions.map(item => (
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
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default TypeableSelect;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
    flex: 1,
  },
  container: {
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
    paddingHorizontal: 14,
    backgroundColor: Colors.background.white,
  },
  verticalPadding: { paddingVertical: 9 },
  smallGap: { gap: 4 },
  mediumGap: { gap: 8 },
  dropdown: {
    backgroundColor: Colors.background.white,
    borderRadius: 8,
    paddingVertical: 4,
    maxHeight: 256,
    borderWidth: 1,
    borderColor: Colors.border.disabledBorder,
    position: 'absolute',
    elevation: 8,
    zIndex: 1000,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    paddingRight: 16,
    paddingLeft: 14,
    gap: 4,
  },
  label: { color: Colors.text.primary },
  textInput: { flex: 1, lineHeight: 19.7 },
  fullWidth: { width: '100%' },
});

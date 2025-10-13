import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  allowInput?: boolean;
  inputType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  maxW?: number;
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
  maxW,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const triggerRef = React.useRef<View | null>(null);
  const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const { i18n } = useTranslation();

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

  const openDropdown = () => {
    if (disabled) return;
    // measure trigger position in window and open modal dropdown
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ x, y, width, height });
      setIsFocused(true);
      // focus input if allowed
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
  const factor = i18n.language === 'en-US' ? 6.6 : i18n.language === 'en-GE' ? 7.16 : 6.5;
  const width = Math.max(...filteredOptions.map(opt => opt.label.length)) * factor;
  const maxWidth = maxW || '100%';

  const getModalPosition = () => {
    return {
      top: Math.min(Math.max(8, layout.y + layout.height + 8), screenHeight - 140),
      width:
        variant === 'secondary'
          ? width + 54 < layout.width
            ? layout.width
            : width + 54
          : layout.width,
      left:
        layout.x + width + 54 > screenWidth && width + 54 > layout.width
          ? layout.x - (width + 54 - layout.width)
          : layout.x - 4,
      maxHeight: Math.min(
        filteredOptions.length * 44 + 16,
        screenHeight - Math.min(Math.max(8, layout.y + layout.height + 8), screenHeight - 140) - 100
      ),
    };
  };
  return (
    <View style={[styles.wrapper, variant === 'secondary' && { maxWidth }]}>
      <View style={styles.container}>
        {!!label && (
          <Text style={{ ...Typography.textXsMedium, color: Colors.text.secondary }}>{label}</Text>
        )}
        <View ref={triggerRef} collapsable={false}>
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
                onFocus={() => openDropdown()}
                onBlur={() => {
                  if (!isFocused) setIsFocused(false);
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

                    width: layout.width - 50,
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {options.find(opt => opt.value === value)?.label || placeholder}
              </Text>
            )}

            <View style={{ transform: [{ rotate: isFocused ? '90deg' : '-90deg' }] }}>
              <MaterialIcons name={'chevron-left'} size={20} color={Colors.text.placeholder} />
            </View>
          </Pressable>
        </View>
      </View>

      <Modal visible={isFocused} transparent animationType='fade' onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View
                style={[styles.dropdown, !label && styles.topWithoutLabel, getModalPosition()]}
                accessibilityRole='menu'
              >
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  modalWrapper: { flex: 1, backgroundColor: Colors.background.transparent },
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
    width: '100%',
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
    gap: 4,
  },
  label: {
    color: Colors.text.primary,
  },
  textInput: {
    flex: 1,
    lineHeight: 19.7,
  },
});

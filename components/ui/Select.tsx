import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  maxW?: number;
  isInModal?: boolean;
};
const DROPDOWN_SPACING = 8;
const OPTION_HEIGHT = 44;
const ICON_AND_PADDING_WIDTH = 54;
const Select = ({
  label,
  setValue,
  value,
  placeholder,
  options,
  disabled,
  variant = 'primary',
  size = 'md',
  maxW,
  isInModal,
}: Props) => {
  const tabBarHeight = useTabBarHeight();
  const [isFocused, setIsFocused] = React.useState(false);
  const triggerRef = React.useRef<View | null>(null);
  const [layout, setLayout] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const { t, i18n } = useTranslation();

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
      Keyboard?.dismiss();
      setTimeout(() => {
        openDropdown();
      }, 10);
    }
  };

  const handleSelectOption = (item: { label: string; value: string }) => {
    setValue(item.value);
    setIsFocused(false);
  };

  const factor = i18n.language?.startsWith('en')
    ? 6.6
    : i18n.language?.startsWith('ka')
      ? 7.5
      : 6.5;
  const maxLabelLen =
    options.length > 0
      ? Math.max(...options.map(opt => opt.label.length))
      : placeholder?.length || 0;
  const dropdownWidth = Math.max(layout.width, maxLabelLen * factor + ICON_AND_PADDING_WIDTH);
  const getModalPosition = () => {
    const MAX_DROPDOWN_HEIGHT = 256;
    const optionsHeight = Math.min(options.length * OPTION_HEIGHT, MAX_DROPDOWN_HEIGHT);
    const baseTop =
      Platform.OS === 'android' && isInModal
        ? layout.y
        : layout.y + layout.height + DROPDOWN_SPACING;
    let top = baseTop;

    if (Platform.OS === 'android' && isInModal) {
      top = layout.y;
    } else {
      top = layout.y + layout.height + DROPDOWN_SPACING;
    }
    let width: number | string = layout.width;
    let left = layout.x;
    const spaceBelow = screenHeight - (baseTop + tabBarHeight);
    const isOverflowingBottom = spaceBelow < optionsHeight;
    const isOverflowingRight = layout.x + dropdownWidth > screenWidth;
    if (isOverflowingBottom) {
      top = layout.y - optionsHeight - 8;
    }
    if (isOverflowingBottom && isInModal) {
      top = layout.y - optionsHeight - layout.height - 20;
    }
    if (variant === 'secondary') {
      width = dropdownWidth;
    }
    if (isOverflowingRight && variant === 'secondary') {
      left = layout.x - (dropdownWidth - layout.width); // 16 for some right margin
    }

    return { top, width, left };
  };
  return (
    <View style={[styles.wrapper, variant === 'secondary' && maxW != null && { maxWidth: maxW }]}>
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
            styles.verticalPadding,
            { borderColor: getBorderColor() },
            { backgroundColor: disabled ? Colors.background.disabled : Colors.background.white },
          ]}
          accessibilityRole='button'
          accessibilityLabel={label || placeholder}
          accessibilityHint={isFocused ? 'Collapse options' : 'Expand options'}
          accessibilityState={{ expanded: isFocused, disabled: !!disabled }}
        >
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

          <View style={{ transform: [{ rotate: isFocused ? '90deg' : '-90deg' }] }}>
            <MaterialIcons name={'chevron-left'} size={20} color={Colors.text.placeholder} />
          </View>
        </Pressable>
      </View>

      <Modal visible={isFocused} transparent animationType='fade' onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={[styles.dropdown, getModalPosition()]} accessibilityRole='menu'>
                <ScrollView keyboardShouldPersistTaps='handled'>
                  {options.length === 0 ? (
                    <View style={styles.option}>
                      <Text
                        style={[
                          size === 'md' ? Typography.textMdMedium : Typography.textXsMedium,
                          styles.label,
                        ]}
                      >
                        {t('select.noOptions')}
                      </Text>
                    </View>
                  ) : (
                    options.map(item => (
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
    flex: 1,
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
    paddingHorizontal: 14,
    backgroundColor: Colors.background.white,
  },
  verticalPadding: {
    paddingVertical: 9,
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
  label: {
    color: Colors.text.primary,
  },

  fullWidth: {
    width: '100%',
  },
});

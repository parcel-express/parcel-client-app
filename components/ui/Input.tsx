import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormikProps } from 'formik';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type InputProps<T extends Record<string, string | boolean>> = {
  name: Extract<keyof T, string>;
  label: string;
  placeholder?: string;
  hintMessage?: string;
  disabled?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  formik: FormikProps<T>;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
};

const Input = <T extends Record<string, string | boolean>>({
  label,
  placeholder,
  hintMessage,
  disabled,
  iconName,
  formik,
  secureTextEntry,
  name,
  keyboardType,
  autoComplete,
  textContentType,
  autoCapitalize,
}: InputProps<T>) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Check if this field has an error
  const fieldError =
    formik.submitCount > 0 && formik.errors[name] ? String(formik.errors[name]) : null;

  const getBorderColor = () => {
    if (disabled) {
      return Colors.border.secondary;
    }
    if (fieldError) {
      return isFocused ? Colors.border.activeError : Colors.border.subtleError;
    }
    return isFocused ? Colors.border.focused : Colors.border.secondary;
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.textXsMedium, color: Colors.text.secondary }}>{label}</Text>

      <View
        style={{
          ...styles.inputContainer,
          borderColor: getBorderColor(),
          backgroundColor: disabled ? Colors.background.disabled : Colors.background.white,
        }}
      >
        <TextInput
          accessibilityLabel={label}
          accessibilityHint={hintMessage}
          accessibilityState={{ disabled: !!disabled }}
          keyboardType={keyboardType ?? 'default'}
          autoComplete={autoComplete ?? undefined}
          textContentType={textContentType ?? undefined}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.placeholder}
          autoCapitalize={autoCapitalize ?? 'none'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            formik.setFieldTouched(name, true, false);
          }}
          editable={!disabled}
          onChangeText={text => {
            formik.setFieldValue(name, text);
          }}
          value={typeof formik.values[name] === 'string' ? formik.values[name] : ''}
          secureTextEntry={secureTextEntry}
        />

        {iconName && (
          <MaterialIcons
            style={styles.icon}
            name={iconName}
            size={20}
            color={Colors.text.placeholder}
          />
        )}
      </View>
      {hintMessage && !fieldError && !disabled && (
        <Text style={{ ...Typography.textSmRegular, color: Colors.text.tertiary }}>
          {hintMessage}
        </Text>
      )}
      {fieldError && !disabled && (
        <Text style={{ ...Typography.textSmRegular, color: Colors.text.error.primary }}>
          {fieldError}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',

    elevation: 10,
  },
  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    paddingHorizontal: 12,
    ...Shadows.shadow_xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    color: Colors.text.primary,
    ...Typography.textMdRegular,
    lineHeight: 19.7,
    // height: 44,
  },
});

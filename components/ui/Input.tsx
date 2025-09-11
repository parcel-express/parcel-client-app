import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FormikProps } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type InputProps<T = string | boolean> = {
  name: string & keyof T;
  label: string;
  placeholder?: string;
  hint_message?: string;
  disabled?: boolean;
  icon_name?: keyof typeof MaterialIcons.glyphMap;
  formik: FormikProps<T>;
  hint_message_on_press?: () => void;
  secure_text_entry?: boolean;
  keyboard_type?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'url'
    | undefined;
  auto_complete?: React.ComponentProps<typeof TextInput>['autoComplete'];
  text_content_type?: React.ComponentProps<typeof TextInput>['textContentType'];
  autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
};

const Input = <T extends Record<string, string | boolean>>({
  label,
  placeholder,
  hint_message,
  disabled,
  icon_name,
  formik,
  hint_message_on_press,
  secure_text_entry,
  name,
  keyboard_type,
  auto_complete,
  text_content_type,
  autoCapitalize,
}: InputProps<T>) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Check if this field has an error
  const fieldError =
    formik.touched[name] && formik.errors[name] ? String(formik.errors[name]) : null;

  const getBorderColor = () => {
    if (disabled) {
      return Colors.border.primary;
    }
    if (fieldError) {
      return isFocused ? Colors.border.active_error : Colors.border.subtle_error;
    }
    return isFocused ? Colors.border.focused : Colors.border.primary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex_row}>
        <Text style={{ ...Typography.text_xs_medium, color: Colors.text.secondary }}>
          {label} <Text style={{ color: Colors.text.brand.tertiary }}>*</Text>
        </Text>
      </View>
      <View
        style={{
          ...styles.input_container,
          borderColor: getBorderColor(),
          backgroundColor: disabled ? Colors.background.disabled : Colors.background.white,
        }}
      >
        <TextInput
          keyboardType={keyboard_type ?? 'default'}
          autoComplete={auto_complete ?? undefined}
          textContentType={text_content_type ?? undefined}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.placeholder}
          autoCapitalize={autoCapitalize ?? 'none'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            formik.setFieldTouched(name, true);
          }}
          editable={!disabled}
          onChangeText={text => {
            formik.setFieldValue(name, text);
          }}
          value={typeof formik.values[name] === 'string' ? formik.values[name] : ''}
          secureTextEntry={secure_text_entry}
        />

        {icon_name && (
          <MaterialIcons
            style={styles.icon}
            name={icon_name}
            size={20}
            color={Colors.text.placeholder}
          />
        )}
      </View>
      {hint_message && !fieldError && !disabled && (
        <Pressable onPress={hint_message_on_press}>
          <Text style={{ ...Typography.text_sm_regular, color: Colors.text.tertiary }}>
            {hint_message}
          </Text>
        </Pressable>
      )}
      {fieldError && !disabled && (
        <Text style={{ ...Typography.text_sm_regular, color: Colors.text.error.primary }}>
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
  },
  icon: {
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: Colors.text.primary,
    ...Typography.text_md_regular,
    lineHeight: undefined,
  },
});

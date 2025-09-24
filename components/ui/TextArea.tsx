import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

type TextAreaProps = {
  label: string;
  placeholder?: string;
  hintMessage?: string;
  disabled?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  numberOfLines?: number;
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: TextInputProps['autoCorrect'];
};

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  hintMessage,
  disabled,
  value,
  onChangeText,
  numberOfLines = 4,
  autoComplete,
  textContentType,
  autoCapitalize,
  autoCorrect,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getBorderColor = () => {
    if (disabled) {
      return Colors.border.secondary;
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
          style={[styles.input, { height: numberOfLines * 24 }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          multiline
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize ?? 'none'}
          autoCorrect={autoCorrect ?? false}
        />
      </View>
      {hintMessage && !disabled && (
        <Text style={{ ...Typography.textSmRegular, color: Colors.text.tertiary }}>
          {hintMessage}
        </Text>
      )}
    </View>
  );
};

export default TextArea;

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
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    color: Colors.text.primary,
    ...Typography.textMdRegular,
    lineHeight: 19.7,
    textAlignVertical: 'top',
  },
});

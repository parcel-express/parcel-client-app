import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

type Props = {
  variant?: 'success' | 'error' | 'warning';
  label: string;
};

const Tag = ({ variant = 'success', label }: Props) => {
  const colorScheme = Colors.tag[variant];
  return (
    <View
      style={[
        styles.tag,
        { borderColor: colorScheme.border, backgroundColor: colorScheme.background },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: colorScheme.icon }]} />
      <Text style={[Typography.textXsMedium, { color: colorScheme.label }]}>{label}</Text>
    </View>
  );
};

export default React.memo(Tag);

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

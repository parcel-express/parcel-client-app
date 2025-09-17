import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

import PlusIcon from './icons/PlusIcon';

type Props = {
  onPress?: () => void;
  children?: string;
};

const SettingsButton = ({ onPress, children }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.overlay} />
      <PlusIcon />
      <Text style={[styles.label, Typography.textSmSemiBold]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.text.brand.primary,
    borderRadius: 8,
    opacity: 0.1,
  },
  label: {
    color: Colors.text.brand.primary,
  },
});

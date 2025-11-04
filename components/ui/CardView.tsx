import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noBorder?: boolean;
};

const CardView = ({ children, style, noBorder }: Props) => {
  return <View style={[styles.card, style, noBorder && styles.noBorder]}>{children}</View>;
};

export default CardView;
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    ...Shadows.shadow_xs,
    backgroundColor: Colors.background.white,
    padding: 16,
  },
  noBorder: {
    borderWidth: 0,
  },
});

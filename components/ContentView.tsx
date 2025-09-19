import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedView } from './ThemedView';
type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ContentView = ({ children, style }: Props) => {
  return (
    <ThemedView
      style={[styles.contentsContainer, style]}
      lightColor={Colors.background.body}
      darkColor={Colors.background.body_dark}
    >
      {children}
    </ThemedView>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    zIndex: 1000,
    marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

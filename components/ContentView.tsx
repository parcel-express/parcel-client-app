import React from 'react';
import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

import { ThemedView } from './ThemedView';
type Props = {
  children: React.ReactNode;
};

const ContentView = ({ children }: Props) => {
  return (
    <ThemedView
      style={styles.contentsContainer}
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

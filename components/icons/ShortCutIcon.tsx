import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
const ShortCut = () => {
  return (
    <View style={styles.shortCutWrapper}>
      <Text style={[Typography.textXsMedium, { color: Colors.icon.primary }]}>⌘K</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  shortCutWrapper: {
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
});
export default React.memo(ShortCut);

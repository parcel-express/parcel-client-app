import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import MarkerPinIcon from './icons/MarkerPinIcon';
import SenderIcon from './icons/SenderIcon';

const DropDown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  return (
    <TouchableOpacity onPress={() => setIsDropDownOpen(true)} style={styles.button}>
      <View style={styles.labelContainer}>
        <SenderIcon />
        <Text style={[Typography.textSmMedium, { color: Colors.text.primary }]}>
          აირჩიეთ გამგზავნი
        </Text>
      </View>
      {isDropDownOpen && (
        <Animated.View style={styles.dropDown}>
          {[1, 2, 3].map(item => (
            <TouchableOpacity
              onPress={() => setIsDropDownOpen(false)}
              style={[styles.labelContainer, styles.dropDownItem]}
              key={item}
            >
              <MarkerPinIcon />
              <Text style={[Typography.textSmMedium, { color: Colors.text.primary }]}>
                ახალი მისამართი
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 22,
    gap: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropDown: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_lg03,
    ...Shadows.shadow_lg02,
    ...Shadows.shadow_lg01,
  },
  dropDownItem: {
    padding: 10,
  },
});

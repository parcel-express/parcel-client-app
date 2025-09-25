import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';
import { Typography } from '@/constants/Typography';

import BellIcon from '../icons/BellIcon';

type Props = {
  message: string;
  onPress?: () => void;
};

const NotificationCard = ({ message, onPress }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <LinearGradient
          colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
          style={styles.icon}
        >
          <View style={styles.overlay} />
          <BellIcon />
        </LinearGradient>
        <TouchableOpacity onPress={onPress}>
          <Text style={[Typography.textSmBold, styles.full]}>ვრცლად</Text>
        </TouchableOpacity>
      </View>
      <Text style={[Typography.textXsMedium, styles.content]}>{message}</Text>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.border.secondary,
    borderRadius: 8,
    backgroundColor: Colors.background.white,
    ...Shadows.shadow_xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background.white,
    opacity: 0.9,
    borderRadius: 6,
  },
  icon: {
    width: 43,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  full: {
    color: Colors.brand.primary,
  },
  content: {
    color: Colors.text.black,
    lineHeight: 24,
  },
});

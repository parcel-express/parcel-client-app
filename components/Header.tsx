import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

type Props = {
  title: string;
  closeButton?: boolean;
  hasGoBack?: boolean;
};

const Header = ({ title, closeButton, hasGoBack }: Props) => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[
        styles.header,
        hasGoBack && styles.paddingBottomXs,
        closeButton && styles.paddingBottomSm,
      ]}
      accessibilityRole='header'
    >
      {hasGoBack && !closeButton && (
        <TouchableOpacity
          style={styles.chevronIcon}
          onPress={() => router.back()}
          accessibilityLabel='Go back'
          accessibilityRole='button'
          accessibilityHint='Go back to previous screen'
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={[styles.overlay, styles.rounded]} />
          <MaterialIcons name='arrow-back-ios' size={10} color={'#FFF'} style={styles.chevron} />
        </TouchableOpacity>
      )}
      <Text
        style={[hasGoBack ? styles.smallTitle : styles.title, hasGoBack && styles.centeredText]}
      >
        {title}
      </Text>
      {hasGoBack && !closeButton && <View style={styles.rightPlaceholder}></View>}
      {closeButton && !hasGoBack && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
          accessibilityLabel='Close'
          accessibilityRole='button'
          accessibilityHint='Go back to previous screen'
        >
          <View style={styles.overlay} />
          <MaterialIcons name='close' size={20} color={Colors.text.white} />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: 22,
    paddingBottom: 48,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paddingBottomSm: {
    paddingBottom: 40,
  },
  paddingBottomXs: {
    paddingBottom: 28,
  },
  smallTitle: {
    ...Typography.textSmSemiBold,
    color: Colors.text.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.text.white,
  },
  centeredText: {
    textAlign: 'center',
  },
  chevronIcon: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: { width: 6.25, height: 10.49 },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 9.23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 9.23,
    backgroundColor: Colors.background.white,
    opacity: 0.2,
  },
  rounded: {
    borderRadius: 28,
  },
  rightPlaceholder: {
    width: 28,
    height: 28,
  },
});

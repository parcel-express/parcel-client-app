import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';

type Props = {
  title: string;
  closeButton?: boolean;
};

const Header = ({ title, closeButton }: Props) => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.header}
      accessibilityRole='header'
    >
      <Text style={styles.title}>{title}</Text>
      {closeButton && (
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
  title: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.text.white,
  },
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
});
